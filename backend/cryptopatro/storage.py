"""SQLite persistence. Every private query is scoped by the authenticated portfolio."""

import hashlib
import json
import secrets
import sqlite3
import time
from contextlib import contextmanager
from datetime import UTC, datetime, timedelta
from pathlib import Path
from uuid import uuid4

from .schemas import AlertInput, HoldingInput, HoldingPatch, Share

DEMO_HOLDINGS = [
    {"id": "demo-bitcoin", "asset_id": "bitcoin", "quantity": 0.42, "avg_cost": 52300},
    {"id": "demo-ethereum", "asset_id": "ethereum", "quantity": 3.5, "avg_cost": 2750},
    {"id": "demo-solana", "asset_id": "solana", "quantity": 38, "avg_cost": 112},
    {"id": "demo-usdc", "asset_id": "usd-coin", "quantity": 2450, "avg_cost": 1},
]


def now() -> str:
    return datetime.now(UTC).isoformat()


def token_hash(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()


class Store:
    def __init__(self, path: str):
        self.path = path

    @contextmanager
    def connect(self):
        connection = sqlite3.connect(self.path, timeout=10)
        connection.row_factory = sqlite3.Row
        connection.execute("PRAGMA foreign_keys=ON")
        try:
            with connection:
                yield connection
        finally:
            connection.close()

    def initialize(self):
        Path(self.path).parent.mkdir(parents=True, exist_ok=True)
        with self.connect() as db:
            if db.execute("PRAGMA user_version").fetchone()[0] > 3:
                raise RuntimeError("Database schema is newer than this application supports.")
            db.execute("PRAGMA journal_mode=WAL")
            db.executescript("""
                CREATE TABLE IF NOT EXISTS portfolios (
                    id TEXT PRIMARY KEY, token_hash TEXT UNIQUE NOT NULL,
                    created_at TEXT NOT NULL, referral TEXT
                );
                CREATE TABLE IF NOT EXISTS holdings (
                    id TEXT PRIMARY KEY, portfolio_id TEXT NOT NULL REFERENCES portfolios(id),
                    asset_id TEXT NOT NULL, quantity REAL NOT NULL CHECK(quantity > 0),
                    avg_cost REAL NOT NULL CHECK(avg_cost >= 0),
                    UNIQUE(portfolio_id, asset_id)
                );
                CREATE TABLE IF NOT EXISTS alerts (
                    id TEXT PRIMARY KEY, portfolio_id TEXT NOT NULL REFERENCES portfolios(id),
                    asset_id TEXT NOT NULL, direction TEXT NOT NULL,
                    target_price REAL NOT NULL, created_at TEXT NOT NULL, triggered_at TEXT
                );
                CREATE TABLE IF NOT EXISTS shares (
                    slug TEXT PRIMARY KEY, portfolio_id TEXT REFERENCES portfolios(id),
                    payload TEXT NOT NULL, created_at TEXT NOT NULL
                );
                CREATE TABLE IF NOT EXISTS events (
                    id INTEGER PRIMARY KEY, name TEXT NOT NULL, referral TEXT, created_at TEXT NOT NULL
                );
                CREATE INDEX IF NOT EXISTS idx_alerts_owner ON alerts(portfolio_id);
                CREATE INDEX IF NOT EXISTS idx_shares_owner ON shares(portfolio_id);
                CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at);
                CREATE TABLE IF NOT EXISTS ai_runs (
                    id INTEGER PRIMARY KEY, created_at REAL NOT NULL
                );
                CREATE INDEX IF NOT EXISTS idx_ai_runs_created_at ON ai_runs(created_at);
            """)
            db.execute("BEGIN IMMEDIATE")
            columns = {row[1] for row in db.execute("PRAGMA table_info(portfolios)")}
            if "activated_at" not in columns:
                db.execute("ALTER TABLE portfolios ADD COLUMN activated_at TEXT")
                # Do not manufacture historical activation events for existing portfolios.
                db.execute(
                    "UPDATE portfolios SET activated_at=created_at WHERE "
                    "EXISTS (SELECT 1 FROM holdings WHERE holdings.portfolio_id=portfolios.id)"
                )
            db.execute("PRAGMA user_version=3")

    def reserve_ai_run(self, hourly_limit: int, daily_limit: int) -> bool:
        """Durable, identity-independent budget. Failed runs still consume a reservation."""
        current = time.time()
        with self.connect() as db:
            db.execute("BEGIN IMMEDIATE")
            db.execute("DELETE FROM ai_runs WHERE created_at <= ?", (current - 86400,))
            counts = db.execute(
                "SELECT count(*), COALESCE(sum(created_at > ?), 0) FROM ai_runs",
                (current - 3600,),
            ).fetchone()
            if counts[0] >= daily_limit or counts[1] >= hourly_limit:
                return False
            db.execute("INSERT INTO ai_runs(created_at) VALUES (?)", (current,))
        return True

    def create_session(self, seed_demo: bool, referral: str | None) -> tuple[str, str]:
        portfolio_id, token = str(uuid4()), secrets.token_urlsafe(32)
        with self.connect() as db:
            if referral and not db.execute("SELECT 1 FROM shares WHERE slug=?", (referral,)).fetchone():
                referral = None
            db.execute(
                "INSERT INTO portfolios(id, token_hash, created_at, referral) VALUES (?, ?, ?, ?)",
                (portfolio_id, token_hash(token), now(), referral),
            )
            if seed_demo:
                db.executemany(
                    "INSERT INTO holdings VALUES (?, ?, ?, ?, ?)",
                    [
                        (str(uuid4()), portfolio_id, h["asset_id"], h["quantity"], h["avg_cost"])
                        for h in DEMO_HOLDINGS
                    ],
                )
            db.execute(
                "INSERT INTO events(name, referral, created_at) VALUES (?, ?, ?)",
                ("session_created", referral, now()),
            )
            self._prune_events(db)
        return portfolio_id, token

    def authenticate(self, token: str) -> str | None:
        if len(token) > 128 or len(token) < 32:
            return None
        with self.connect() as db:
            row = db.execute("SELECT id FROM portfolios WHERE token_hash=?", (token_hash(token),)).fetchone()
        return row["id"] if row else None

    def holdings(self, owner: str) -> list[dict]:
        with self.connect() as db:
            return [
                dict(row)
                for row in db.execute(
                    "SELECT id, asset_id, quantity, avg_cost FROM holdings "
                    "WHERE portfolio_id=? ORDER BY rowid",
                    (owner,),
                ).fetchall()
            ]

    def create_holding(self, owner: str, data: HoldingInput) -> str:
        holding_id = str(uuid4())
        with self.connect() as db:
            db.execute(
                "INSERT INTO holdings VALUES (?, ?, ?, ?, ?)",
                (holding_id, owner, data.asset_id, data.quantity, data.avg_cost),
            )
            activated_at = now()
            first = db.execute(
                "UPDATE portfolios SET activated_at=? WHERE id=? AND activated_at IS NULL",
                (activated_at, owner),
            ).rowcount
            if first:
                referral = db.execute("SELECT referral FROM portfolios WHERE id=?", (owner,)).fetchone()[0]
                db.execute(
                    "INSERT INTO events(name, referral, created_at) VALUES (?, ?, ?)",
                    ("portfolio_activated", referral, activated_at),
                )
                if referral:
                    db.execute(
                        "INSERT INTO events(name, referral, created_at) VALUES (?, ?, ?)",
                        ("referral_activated", referral, activated_at),
                    )
                self._prune_events(db)
        return holding_id

    def update_holding(self, owner: str, holding_id: str, data: HoldingPatch) -> bool:
        values = data.model_dump(exclude_unset=True)
        # Keys come exclusively from the validated model, never from raw input.
        setters = ", ".join(f"{key}=?" for key in values)
        with self.connect() as db:
            return (
                db.execute(
                    f"UPDATE holdings SET {setters} WHERE id=? AND portfolio_id=?",
                    (*values.values(), holding_id, owner),
                ).rowcount
                > 0
            )

    def delete_holding(self, owner: str, holding_id: str) -> bool:
        with self.connect() as db:
            return (
                db.execute("DELETE FROM holdings WHERE id=? AND portfolio_id=?", (holding_id, owner)).rowcount
                > 0
            )

    def create_alert(self, owner: str, data: AlertInput) -> dict:
        record = {"id": str(uuid4()), **data.model_dump(), "created_at": now(), "triggered_at": None}
        with self.connect() as db:
            db.execute("BEGIN IMMEDIATE")
            count = db.execute("SELECT count(*) FROM alerts WHERE portfolio_id=?", (owner,)).fetchone()[0]
            if count >= 50:
                raise ValueError("You can keep up to 50 alerts. Delete an old alert first.")
            db.execute(
                "INSERT INTO alerts VALUES (?, ?, ?, ?, ?, ?, ?)",
                (
                    record["id"],
                    owner,
                    data.asset_id,
                    data.direction,
                    data.target_price,
                    record["created_at"],
                    None,
                ),
            )
        return record

    def alerts(self, owner: str, prices: dict[str, float] | None) -> list[dict]:
        with self.connect() as db:
            records = [
                dict(r)
                for r in db.execute(
                    "SELECT id, asset_id, direction, target_price, created_at, triggered_at FROM alerts "
                    "WHERE portfolio_id=? ORDER BY created_at DESC",
                    (owner,),
                )
            ]
            for record in records:
                price = prices.get(record["asset_id"]) if prices else None
                if price is None or record["triggered_at"]:
                    continue
                hit = (
                    price >= record["target_price"]
                    if record["direction"] == "above"
                    else (price <= record["target_price"])
                )
                if hit:
                    record["triggered_at"] = now()
                    db.execute(
                        "UPDATE alerts SET triggered_at=? WHERE id=? AND portfolio_id=? "
                        "AND triggered_at IS NULL",
                        (record["triggered_at"], record["id"], owner),
                    )
        return records

    def delete_alert(self, owner: str, alert_id: str) -> bool:
        with self.connect() as db:
            return (
                db.execute("DELETE FROM alerts WHERE id=? AND portfolio_id=?", (alert_id, owner)).rowcount > 0
            )

    def save_share(self, owner: str | None, share: Share):
        with self.connect() as db:
            db.execute(
                "INSERT INTO shares VALUES (?, ?, ?, ?)", (share.slug, owner, share.model_dump_json(), now())
            )
            db.execute(
                "INSERT INTO events(name, referral, created_at) VALUES (?, ?, ?)",
                ("share_created", share.slug, now()),
            )

            self._prune_events(db)

    def shares(self, owner: str) -> list[Share]:
        with self.connect() as db:
            records = db.execute(
                "SELECT payload FROM shares WHERE portfolio_id=? "
                "ORDER BY created_at DESC, rowid DESC LIMIT 100",
                (owner,),
            ).fetchall()
        return [Share.model_validate_json(record["payload"]) for record in records]

    def share(self, slug: str) -> Share | None:
        with self.connect() as db:
            record = db.execute("SELECT payload FROM shares WHERE slug=?", (slug,)).fetchone()
        return Share.model_validate(json.loads(record["payload"])) if record else None

    def delete_share(self, owner: str, slug: str) -> bool:
        with self.connect() as db:
            return (
                db.execute("DELETE FROM shares WHERE slug=? AND portfolio_id=?", (slug, owner)).rowcount > 0
            )

    def event(self, name: str, referral: str | None):
        with self.connect() as db:
            if referral and not db.execute("SELECT 1 FROM shares WHERE slug=?", (referral,)).fetchone():
                referral = None
            db.execute(
                "INSERT INTO events(name, referral, created_at) VALUES (?, ?, ?)", (name, referral, now())
            )
            # Keep acquisition telemetry bounded; no addresses, tokens or financial data are stored.
            self._prune_events(db)

    @staticmethod
    def _prune_events(db):
        cutoff = (datetime.now(UTC) - timedelta(days=90)).isoformat()
        db.execute("DELETE FROM events WHERE created_at < ?", (cutoff,))
