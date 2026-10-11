# Browser verification

Run from `frontend` after installing backend dependencies with `uv sync --frozen`:

```sh
npm ci
npx playwright install chromium
npm run test:e2e
```

The Playwright configuration starts its own backend at `127.0.0.1:8001`, builds the frontend, and runs the production Node server at `127.0.0.1:4322`. Both ports must be free. It never reuses another running application.

The backend receives a new temporary SQLite database and `CRYPTOPATRO_MARKET_ENABLED=false`. Provider credentials and the AI model are unset for the subprocess. The temporary database is removed when the backend exits. Browser requests stay local, and no live market or AI provider is required.

Ten cases cover holding creation, editing, removal and reload persistence; isolation between private portfolios; in-app alerts; deterministic copilot responses; share privacy, provenance, search metadata, PNG output and persisted revocation; hidden balances and quantities; missing-share errors; direct onboarding links; modal keyboard behavior; and desktop/mobile layout. The viewport tests write full-page screenshots at 1440 × 1000 and 390 × 844 into `test-results`. Failures retain traces and screenshots, with a report in `playwright-report`.

`npm run test:postcards` exercises the actual PNG handler with deterministic renderers. It verifies reuse, revocation and upstream failure before cached responses, snapshot changes, coalescing, bounded callers and render concurrency, entry and byte eviction, oversized results, and recovery after a failed render. The browser share test also fetches the generated PNG before revoking its share, then verifies that the image returns 404. PNG responses use `no-store`; only the server process keeps a bounded cache of 16 images or 8 MiB, with two active renders and at most 32 callers per active snapshot. These are per-process capacity limits, not visitor identification or comprehensive abuse prevention.
