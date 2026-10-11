# Request quotas and service capacity

CryptoPatro works behind ingress that replaces every visitor's source address. Set `CRYPTOPATRO_RATE_LIMIT_MODE=shared_proxy` for that deployment. It does not require a shared ingress change, a new cookie, an arbitrary client identifier, or an account.

## Two explicit modes

`shared_proxy` does not use an IP address as a visitor key. Authenticated actions use the portfolio owner resolved from the existing bearer token. Invalid tokens on chat and share actions are rejected before quota admission. Anonymous actions use the service capacity windows below.

The default `client_ip` mode additionally applies public network address quotas when a valid globally routable peer address is available. With `CRYPTOPATRO_TRUST_PROXY_HEADERS=false`, caller-supplied forwarding headers are ignored. With it enabled, the isolated frontend must overwrite `X-Forwarded-For` with one verified address, and the backend must not be directly exposed. Missing, malformed, multiple, private, or shared-range values supply no IP quota key; service capacity still applies. IPv4-mapped IPv6 addresses are normalized to the same IPv4 key. The frontend's ingress-trust configuration remains a separate boundary.

A public IP is a network quota key, not proof of a unique person. A portfolio key authorizes a portfolio, not a unique human. Users sharing a public address may share its network quota in `client_ip` mode. Neither mode provides strong anonymous abuse prevention. An unauthenticated actor can consume available service capacity and temporarily prevent other anonymous writes. These controls bound admitted work; their defaults are tuning values, not a benchmark or a guarantee of supported load.

## HTTP admission

All applicable windows must admit the request. Checks are atomic across windows and concurrent requests. A refused owner or network request does not consume service capacity. A capacity rejection returns HTTP 429 with a service-capacity message and `Retry-After`; owner or network quota failures use the ordinary too-many-requests message.

| Scope | Default |
| --- | --- |
| Authenticated portfolio chat | 12 requests/minute per owner |
| Authenticated portfolio share creation | 15/hour per owner |
| Public network session creation, `client_ip` only | 30/hour |
| Public network share creation, `client_ip` only | 15/hour |
| Public network chat, `client_ip` only | 60/hour; anonymous chat also 12/minute |
| Public network events, `client_ip` only | 60/minute |

Service-wide settings apply in both modes, including anonymous sample sharing and chat. Every name below has the `CRYPTOPATRO_` prefix.

| Setting suffix | Default | Window |
| --- | --- | --- |
| `SERVICE_SESSIONS_PER_MINUTE` | 120 | trailing minute |
| `SERVICE_SESSIONS_PER_HOUR` | 2000 | trailing hour |
| `SERVICE_SHARES_PER_MINUTE` | 120 | trailing minute |
| `SERVICE_SHARES_PER_HOUR` | 1000 | trailing hour |
| `SERVICE_EVENTS_PER_MINUTE` | 600 | trailing minute |
| `SERVICE_CHAT_PER_MINUTE` | 240 | trailing minute |

Admitted requests that later encounter an application conflict may consume their admission window. These windows bound creation rate, not lifetime database size. Persistent portfolios and cards still require storage monitoring and backups. No address or visitor identity is added to the database for HTTP limiting. In-memory keys are capped at 10,000; active keys are not evicted to admit a new identity.

## Paid AI budget and useful fallback

Configured AI has a separate budget independent of IP, portfolio, and token rotation:

| Setting suffix | Default | Meaning |
| --- | --- | --- |
| `AI_RUNS_PER_HOUR` | 120 | attempted runs in the trailing hour |
| `AI_RUNS_PER_DAY` | 1000 | attempted runs in the trailing 24 hours |
| `AI_MAX_CONCURRENT` | 4 | provider runs in flight in this process |

An AI run is reserved atomically in SQLite before calling the provider. Both time windows must admit it. Failed or canceled provider attempts retain their reservation. Restarting the application or minting another portfolio does not reset this budget. The ledger stores only an integer row ID and timestamp; it records no prompts, addresses, tokens, owners, balances, or referrals. Old reservations are pruned after 24 hours. Schema version 3 adds this table automatically to existing version 1 or 2 databases.

If the AI budget or concurrency capacity is unavailable, or the ledger cannot be checked, chat returns HTTP 200 with the same calculated portfolio explanation in `mode: local`. Its disclaimer states that AI capacity is temporarily unavailable. No provider call is made. Setting either run budget to zero retains this local behavior. An unconfigured model never creates a paid-use reservation.

Each admitted agent run also has a 15-second deadline, at most two agent model requests, an 8000 input-token usage limit, a 512 output-token usage limit, and a provider `max_tokens` setting of 256 per model request. Usage limits and request limits are not a monetary spending guarantee; model prices, token accounting, and provider transport retries vary. Set provider-side billing limits as appropriate.

## Deployment boundary

Use one backend worker for this baseline. HTTP windows and the concurrency semaphore are process-local and reset on restart. The AI run ledger persists on the existing SQLite volume. Multiple workers would multiply HTTP and concurrency capacities; shared distributed admission controls are required before scaling out. Ordinary portfolio reads and edits remain available when creation quotas or AI budgets are full.
