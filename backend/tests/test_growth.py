import json
import sqlite3
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor
from datetime import UTC, datetime, timedelta

import pytest

from cryptopatro.growth import EVENT_NAMES, report
from cryptopatro.schemas import HoldingInput, HoldingPatch, Share
from cryptopatro.storage import Store, token_hash


@pytest.fixture
def store(tmp_path):
    store = Store(str(tmp_path / "growth.sqlite3"))
    store.initialize()
    return store


def share(store, slug="referral-card"):
    record = Share(
        is_demo=True,
        slug=slug,
        title="Sample",
        created_at=datetime.now(UTC),
        allocation=[],
        profit_loss_pct=None,
        asset_count=0,
        data_source="sample",
        as_of=datetime.now(UTC),
    )
    store.save_share(None, record)
    return record


def event_counts(store):
    with store.connect() as db:
        return dict(db.execute("SELECT name, count(*) FROM events GROUP BY name").fetchall())


def test_first_manual_holding_activates_once_across_edits_deletes_readds_and_restart(store):
    source = share(store)
    owner, _ = store.create_session(False, source.slug)
    data = HoldingInput(asset_id="bitcoin", quantity=1, avg_cost=100)
    assert event_counts(store).get("portfolio_activated", 0) == 0
    holding_id = store.create_holding(owner, data)
    store.update_holding(owner, holding_id, HoldingPatch(quantity=2))
    store.delete_holding(owner, holding_id)
    store = Store(store.path)
    store.initialize()
    store.create_holding(owner, data)
    counts = event_counts(store)
    assert counts["portfolio_activated"] == 1
    assert counts["referral_activated"] == 1
    with store.connect() as db:
        assert db.execute("SELECT activated_at FROM portfolios WHERE id=?", (owner,)).fetchone()[0]
        assert (
            db.execute("SELECT referral FROM events WHERE name='referral_activated'").fetchone()[0]
            == source.slug
        )


def test_demo_seed_and_invalid_referral_do_not_count_as_activation(store):
    owner, _ = store.create_session(True, "invalid-referral")
    assert event_counts(store).get("portfolio_activated", 0) == 0
    first = store.holdings(owner)[0]
    store.update_holding(owner, first["id"], HoldingPatch(quantity=2))
    assert event_counts(store).get("portfolio_activated", 0) == 0
    store.create_holding(owner, HoldingInput(asset_id="chainlink", quantity=1, avg_cost=1))
    counts = event_counts(store)
    assert counts["portfolio_activated"] == 1
    assert counts.get("referral_activated", 0) == 0


def test_concurrent_manual_holdings_record_only_one_activation(store):
    owner, _ = store.create_session(False, None)
    data = [HoldingInput(asset_id=asset, quantity=1, avg_cost=1) for asset in ("bitcoin", "ethereum")]
    with ThreadPoolExecutor(max_workers=2) as pool:
        list(pool.map(lambda item: store.create_holding(owner, item), data))
    assert len(store.holdings(owner)) == 2
    assert event_counts(store)["portfolio_activated"] == 1


def test_v1_migration_preserves_existing_holdings_without_fabricating_events(tmp_path):
    path = tmp_path / "legacy.sqlite3"
    with sqlite3.connect(path) as db:
        db.executescript("""
            CREATE TABLE portfolios (id TEXT PRIMARY KEY, token_hash TEXT UNIQUE NOT NULL,
                                     created_at TEXT NOT NULL, referral TEXT);
            CREATE TABLE holdings (id TEXT PRIMARY KEY, portfolio_id TEXT NOT NULL,
                                   asset_id TEXT NOT NULL, quantity REAL NOT NULL, avg_cost REAL NOT NULL,
                                   UNIQUE(portfolio_id, asset_id));
            PRAGMA user_version=1;
        """)
        db.execute(
            "INSERT INTO portfolios VALUES (?, ?, ?, ?)",
            ("old", token_hash("x" * 40), datetime.now(UTC).isoformat(), None),
        )
        db.execute("INSERT INTO holdings VALUES ('holding', 'old', 'bitcoin', 1, 1)")
    store = Store(str(path))
    store.initialize()
    assert event_counts(store) == {}
    store.delete_holding("old", "holding")
    store.create_holding("old", HoldingInput(asset_id="bitcoin", quantity=2, avg_cost=1))
    assert event_counts(store) == {}
    with store.connect() as db:
        assert db.execute("PRAGMA user_version").fetchone()[0] == 3


def test_report_is_read_only_aggregate_with_distinct_windows_and_valid_share_counts(store):
    end = datetime.now(UTC)
    source = share(store)
    owner, token = store.create_session(False, source.slug)
    store.create_holding(owner, HoldingInput(asset_id="bitcoin", quantity=1, avg_cost=10))
    store.event("maker_clicked", source.slug)
    with store.connect() as db:
        db.execute(
            "INSERT INTO events(name, created_at) VALUES (?, ?)",
            ("maker_clicked", (end - timedelta(days=10)).isoformat()),
        )
        db.execute(
            "INSERT INTO events(name, created_at) VALUES (?, ?)",
            ("maker_clicked", (end - timedelta(days=35)).isoformat()),
        )
    snapshot = report(store.path, datetime.now(UTC))
    assert snapshot["windows"]["last_7_days"]["events"]["maker_clicked"] == 1
    assert snapshot["windows"]["last_30_days"]["events"]["maker_clicked"] == 2
    assert set(snapshot["windows"]["last_7_days"]["events"]) == set(EVENT_NAMES)
    assert snapshot["valid_share_totals"] == {"all": 1, "demo": 1, "portfolio": 0}
    rendered = json.dumps(snapshot)
    for private in (token, token_hash(token), source.slug, owner, "quantity", "avg_cost", "token_hash"):
        assert private not in rendered
    before = event_counts(store)
    result = subprocess.run(
        [sys.executable, "-m", "cryptopatro.growth", "--database", store.path],
        capture_output=True,
        text=True,
        check=True,
    )
    assert json.loads(result.stdout)["valid_share_totals"]["all"] == 1
    assert event_counts(store) == before
    missing = store.path + ".missing"
    with pytest.raises(sqlite3.OperationalError):
        report(missing)
    from pathlib import Path

    assert not Path(missing).exists()


def test_activation_event_failure_rolls_back_holding_and_flag(store):
    owner, _ = store.create_session(False, None)
    with store.connect() as db:
        db.executescript("""
            CREATE TRIGGER fail_activation BEFORE INSERT ON events
            WHEN NEW.name='portfolio_activated'
            BEGIN SELECT RAISE(ABORT, 'test event failure'); END;
        """)
    with pytest.raises(sqlite3.IntegrityError):
        store.create_holding(owner, HoldingInput(asset_id="bitcoin", quantity=1, avg_cost=1))
    assert store.holdings(owner) == []
    with store.connect() as db:
        assert db.execute("SELECT activated_at FROM portfolios WHERE id=?", (owner,)).fetchone()[0] is None
    assert event_counts(store).get("portfolio_activated", 0) == 0
