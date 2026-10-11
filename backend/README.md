# CryptoPatro API

FastAPI + Pydantic AI on Python 3.15.0. The API owns portfolio calculations, private data, public quote retrieval, in-app alerts and immutable allocation cards. Dependencies are pinned to verified stable registry versions and `uv.lock` makes installs repeatable.

```sh
uv sync --frozen
uv run uvicorn cryptopatro.main:app --reload --port 8000
```

No credentials or environment file are required. Open `/docs` for the generated API explorer. The full wire contract lives in `../docs/api-contract.md`.

```sh
uv run pytest -q
uv run ruff check cryptopatro tests
uv run ruff format --check cryptopatro tests
```

## Private portfolios

`POST /api/session` creates a random bearer key returned once to the browser. Send it as `X-Portfolio-Token`. Only its SHA-256 hash is stored. Private database queries always include the verified portfolio owner. No-token portfolio reads use an in-memory sample. They never create shared mutable holdings.

The browser key is the only access mechanism. Clearing browser storage loses access unless the key has been saved. This is a private anonymous workspace, not an account system. Keep backups of the SQLite database and use HTTPS in any internet deployment.

SQLite uses WAL mode and foreign keys. The default file is `data/cryptopatro.sqlite3`; override with `CRYPTOPATRO_DATABASE_PATH`. Schema version 2 initializes automatically and upgrades the previous schema in place. Existing portfolios with holdings are marked activated without fabricating historical events. Legacy Django databases are not migrated or interpreted. The old Django, Celery, exchange connection and Telegram runtimes were removed. Existing secret environment files are untouched and not loaded implicitly.

## Quotes and calculations

CoinGecko's public market endpoint supplies six supported assets and their seven-day price series. Successful quotes are cached for 90 seconds. A failed refresh can reuse quotes younger than 15 minutes with source `cached`. Missing, stale or unavailable data falls back to explicitly labeled illustrative samples dated 2026-01-01. No sample is presented as a live quote.

Holdings accept quantity and average purchase cost. Valuation and unrealized profit use Decimal arithmetic before presentation rounding. Zero cost means unknown basis: the holding return percentage is null, and its profit is omitted. Aggregate dollar profit covers only holdings with known basis; the aggregate percentage is null when any holding is missing basis. The 24h estimate compares today's quantities against inferred prior-day prices; it is not realized or transaction-adjusted performance. Fees, trades, taxes and cash flows are not tracked.

Alerts persist and are checked when the alert list is requested. Fresh-source quotes can trigger them. Sample or failed-refresh cached quotes never trigger an alert. There is no background worker, email or push delivery.

## Copilot

By default, the copilot provides clearly labeled local explanations. To enable Pydantic AI routing, export `CRYPTOPATRO_AI_MODEL` as an OpenAI provider-prefixed model ID and set `OPENAI_API_KEY` on the server. Other providers need their matching `pydantic-ai-slim` extra installed.

The AI classifies the question into a structured, validated explanation plan. Only a short context containing holding count, concentration and data provenance goes to the model. Verified amounts and factual answers are rendered by the API. The model has no write tools, trade execution, unverified price predictions or arbitrary web access. Requests have a deadline and usage limit. Provider errors fall back to the local explanation without logging private data or error payloads. Tests use `TestModel` with external model requests disabled.

## Sharing and acquisition

Cards expose allocation percentages, an optional unrealized return percentage, provenance and maker attribution. Amounts, quantity, cost basis, portfolio identifiers and tokens are absent. Performance is hidden by default. Demo cards explicitly identify themselves as sample portfolios. `GET /api/shares` lists the owner's newest 100 cards across reloads. Owners can revoke private cards via `DELETE /api/shares/{slug}`; anonymous demo cards contain no private data.

Server events are `session_created`, `share_created`, `portfolio_activated`, and `referral_activated`. Activation is recorded once on the first manually added holding, in the same transaction as the holding. The persistent activation flag survives edits, deletion, re-adding assets and restarts. Seeded demo holdings do not count as activation. Referral activation requires a stored referral validated against an existing share at session creation. Public interaction events are `share_view`, `share_download`, `share_copy`, `start_clicked`, and `maker_clicked`. These interaction counts are unverified, not unique visitors. Events and public referral slugs are stored locally. Referrals must identify an existing card. Event names are allowlisted and input is bounded. No IP addresses or raw browser identifiers are persisted. Event data has a 90-day retention policy and is intended for acquisition analysis, not authoritative unique visitor counts.

Read aggregate acquisition totals without modifying the database:

```sh
uv run python -m cryptopatro.growth
# Optional explicit database path:
uv run python -m cryptopatro.growth --database /app/data/cryptopatro.sqlite3
```

The report returns both trailing 7-day and 30-day UTC event counts, plus currently valid share totals split by demo and portfolio cards. Revoked cards are excluded from valid share counts. It opens SQLite read-only and fails on a missing database instead of creating one. It outputs no individual referral slugs, portfolio identifiers, tokens, financial values or IP addresses. Counts are not cohort conversion rates.

## Deployment

The repository's root Docker Compose stack proxies `/api` from Astro to this service and persists `/app/data`. The backend container runs as a non-root user. Python 3.15.0 is installed through uv on Debian because the official Python Docker tag was not yet published when checked. No old runtime is shipped.

Use one backend worker for this baseline: SQLite persists across restarts, while market caches and abuse-control windows are process-local. Put HTTPS at the frontend edge and back up the persistent volume. Horizontal scaling needs shared rate limiting and a client/server database.

`CRYPTOPATRO_CORS_ORIGINS` accepts a JSON array of exact origins. `CRYPTOPATRO_TRUST_PROXY_HEADERS` is false by default. Enable it only for an isolated backend behind a trusted proxy that overwrites `X-Forwarded-For` with the actual remote address. Never expose that backend directly to the internet. Request bodies are capped at 16 KiB. Creation, events and copilot calls are rate limited. Health is available at `/api/health`.
