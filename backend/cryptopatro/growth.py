"""Read-only aggregate acquisition report. No portfolio-level data leaves SQLite."""

import argparse
import json
import sqlite3
import sys
from contextlib import closing
from datetime import UTC, datetime, timedelta
from pathlib import Path

from .settings import Settings

EVENT_NAMES = (
    "session_created",
    "portfolio_activated",
    "referral_activated",
    "share_created",
    "share_view",
    "share_download",
    "share_copy",
    "start_clicked",
    "maker_clicked",
)


def report(database_path: str, at: datetime | None = None) -> dict:
    end = (at or datetime.now(UTC)).astimezone(UTC)
    # mode=ro fails on a missing DB rather than creating one. No initialization or migrations run here.
    uri = Path(database_path).resolve().as_uri() + "?mode=ro"
    with closing(sqlite3.connect(uri, uri=True, timeout=5)) as db:
        db.execute("PRAGMA query_only=ON")
        db.execute("BEGIN")
        totals = db.execute(
            "SELECT count(*), COALESCE(sum(CASE WHEN json_extract(payload, '$.is_demo')=1 "
            "THEN 1 ELSE 0 END), 0) FROM shares"
        ).fetchone()
        windows = {}
        for days in (7, 30):
            start = end - timedelta(days=days)
            counts = dict.fromkeys(EVENT_NAMES, 0)
            for name, count in db.execute(
                "SELECT name, count(*) FROM events WHERE created_at>=? AND created_at<=? GROUP BY name",
                (start.isoformat(), end.isoformat()),
            ):
                if name in counts:
                    counts[name] = count
            windows[f"last_{days}_days"] = {
                "from": start.isoformat(),
                "to": end.isoformat(),
                "events": counts,
                "valid_shares_created": db.execute(
                    "SELECT count(*) FROM shares WHERE created_at>=? AND created_at<=?",
                    (start.isoformat(), end.isoformat()),
                ).fetchone()[0],
            }
    return {
        "generated_at": end.isoformat(),
        "windows": windows,
        "valid_share_totals": {"all": totals[0], "demo": totals[1], "portfolio": totals[0] - totals[1]},
        "note": (
            "Event counts, not unique visitors or cohort conversion rates. Public interaction counts are "
            "unverified. Activation counts are server recorded once per portfolio. Historical events are "
            "retained for 90 days; revoked shares are excluded from valid share totals."
        ),
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Read-only CryptoPatro growth totals for 7 and 30 days.")
    parser.add_argument(
        "--database", default=None, help="SQLite path; defaults to CRYPTOPATRO_DATABASE_PATH."
    )
    args = parser.parse_args()
    try:
        result = report(args.database or Settings().database_path)
    except sqlite3.Error:
        print(
            "Growth database is unavailable or not initialized. Start the API and verify the database path.",
            file=sys.stderr,
        )
        return 1
    print(json.dumps(result, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
