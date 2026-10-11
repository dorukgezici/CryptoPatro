# CryptoPatro API contract

Base: `/api`. JSON uses snake_case. Money and percentages are JSON numbers. Timestamps are UTC ISO 8601 strings. Errors use `{ "detail": "human-readable message" }` (validation errors use standard FastAPI validation details).

## Identity

- `POST /session` body `{ "seed_demo": false, "referral": "optional share slug" }` returns 201 `{ "token": "random secret", "portfolio_id": "uuid" }`. Seed defaults false. UI may offer 'Try with sample holdings' using true. Store token locally and send `X-Portfolio-Token` for private calls. Token is a bearer secret. No cookies or cross-site credential handling.
- `GET /portfolio` without a token returns a read-only sample portfolio, `is_demo: true`. With valid token returns private portfolio, `is_demo: false`. Invalid token returns 401. No-token mutations return 401.

## Market and portfolio

- `GET /health` returns `{ "status": "ok", "version": "2.0.0", "ai_configured": false }`.
- `GET /market` returns `{ "assets": Asset[], "source": "coingecko" | "cached" | "sample", "as_of": "...", "notice": "..." }`.
- Asset: `{ "id": "bitcoin", "symbol": "BTC", "name": "Bitcoin", "price": 67420, "change_24h_pct": 2.3, "color": "#F7931A", "sparkline": number[] }`. Supported IDs: bitcoin, ethereum, solana, usd-coin, avalanche-2, chainlink. Sparklines represent 7d USD asset prices; sample data is explicitly illustrative.
- Portfolio: `{ "is_demo": true, "holdings": Holding[], "total_value": 42500, "total_cost": 36000, "profit_loss": 6500, "profit_loss_pct": 18.05, "change_24h": 800, "change_24h_pct": 1.9, "allocation": Allocation[], "insight": Insight, "market": Market, "updated_at": "..." }`.
- Holding: `{ "id": "uuid", "asset_id": "bitcoin", "symbol": "BTC", "name": "Bitcoin", "quantity": 0.25, "avg_cost": 54000, "price": 67420, "value": 16855, "cost": 13500, "profit_loss": 3355, "profit_loss_pct": 24.85, "change_24h_pct": 2.3, "allocation_pct": 39.65, "color": "#F7931A", "sparkline": number[] }`.
- Allocation: `{ "asset_id": "bitcoin", "symbol": "BTC", "name": "Bitcoin", "pct": 39.65, "color": "#F7931A" }`.
- Insight: `{ "title": "Bitcoin is your largest position", "description": "...", "tone": "balanced" | "concentrated" | "empty", "concentration_pct": 39.65 }`.
- `POST /holdings` authenticated body `{ "asset_id": "bitcoin", "quantity": 0.25, "avg_cost": 54000 }`, returns 201 Holding. One row per asset. Duplicate returns 409.
- `PATCH /holdings/{id}` authenticated body partial `{ "quantity": 0.3, "avg_cost": 55000 }`, returns Holding. Quantity must be greater than zero; avg_cost zero allowed.
- `DELETE /holdings/{id}` authenticated, returns 204.
- Portfolio metrics are snapshots derived from current holdings. 24h movement estimates today's quantities at yesterday's inferred price; not realized performance. Zero cost means unknown basis: the holding profit_loss_pct is null and its profit_loss is 0. Aggregate profit_loss sums only known-basis holdings; aggregate profit_loss_pct is null if any holding has unknown basis. The UI should suppress aggregate P&L when basis is incomplete. Minimum positive monetary input is 1e-12.

## Alerts

- `GET /alerts` authenticated returns `{ "alerts": Alert[], "market_source": "sample", "evaluated_at": "..." }`. Alerts evaluated on read with fresh CoinGecko data only; sample prices never trigger private alerts.
- `POST /alerts` authenticated body `{ "asset_id": "bitcoin", "direction": "above" | "below", "target_price": 75000 }`, returns 201 Alert.
- `DELETE /alerts/{id}` authenticated returns 204.
- Alert: `{ "id": "uuid", "asset_id": "bitcoin", "symbol": "BTC", "direction": "above", "target_price": 75000, "created_at": "...", "triggered_at": null, "status": "watching" | "triggered" }`.
- Alerts are in-app checks when viewed. No email, push or background notification claims.

## Copilot

- `POST /chat` body `{ "message": "How concentrated am I?" }`. Optional token: absent uses read-only sample portfolio, present uses private portfolio.
- Returns `{ "mode": "ai" | "local", "message": "...", "highlights": [{ "label": "Largest holding", "value": "BTC 39.7%", "detail": "..." }], "suggested_questions": ["..."], "disclaimer": "...", "data_source": "sample", "as_of": "..." }`. Local mode is explicitly a deterministic portfolio summary, not an AI response. No trading execution, predictions or price advice.

## Privacy-safe sharing

- `POST /shares` optional token body `{ "title": "My crypto mix", "include_performance": false }`, returns 201 Share. Absent token produces a demo snapshot. Performance percentage is null unless include_performance is true. Optional title max 60 chars, default 'My crypto mix'.
- `GET /shares` authenticated returns `{ "shares": Share[] }`, only the owner's newest 100 cards, newest first. Persists across browser reloads and service restarts. No token returns 401.
- `GET /shares/{slug}` public returns Share. Snapshot is immutable.
- Share: `{ "is_demo": true, "slug": "random slug", "title": "My crypto mix", "created_at": "...", "allocation": Allocation[], "profit_loss_pct": 18.05, "asset_count": 4, "data_source": "sample", "as_of": "...", "maker": "Doruk Gezici", "maker_url": "https://github.com/dorukgezici" }`. No quantity, portfolio value, cost basis, ID or token is ever public.
- `DELETE /shares/{slug}` authenticated owner-only returns 204.

## Acquisition events

- `POST /events` public body `{ "name": "share_view" | "share_download" | "share_copy" | "start_clicked" | "maker_clicked", "referral": "optional share slug" }`, returns 204. Rate limited. Invalid referral slugs are ignored. No financial data or browser identifiers are accepted.
- Server events: `session_created`, `share_created`, `portfolio_activated`, and `referral_activated`. First manual holding creation records activation once per portfolio in the same transaction. Edits, delete/re-add and restarts do not duplicate it; seeded demo holdings do not count. Referral activation uses the stored referral validated at session creation. Activation event names cannot be submitted through the public endpoint.
- `uv run python -m cryptopatro.growth [--database PATH]` opens SQLite read-only and prints aggregate 7-day/30-day UTC event counts and valid share totals. It includes no individual slugs, portfolio IDs, tokens, financial values or IP addresses.
