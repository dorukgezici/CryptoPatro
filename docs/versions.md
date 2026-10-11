# Verified dependency versions

Verified against public npm and PyPI registries on **11 October 2026**, with official release and migration notes checked for compatibility. Direct application dependencies are pinned; `frontend/package-lock.json` and `backend/uv.lock` pin the resolved trees. Versions are current stable releases on this date, not a promise that they remain the newest indefinitely.

## Frontend

| Component | Version |
| --- | --- |
| Node.js | 26.11.1 |
| Astro | 7.3.8 |
| `@astrojs/react` | 7.0.1 |
| `@astrojs/node` | 11.1.7 |
| React and React DOM | 19.3.0 |
| React and React DOM types | 19.3.0 |
| Node types | 26.6.5 |
| Lucide React | 1.55.0 |
| Sharp | 0.35.5 |
| DM Sans and Manrope variable fonts | 5.3.0 |
| Astro Check | 0.9.10 |
| Playwright | 1.64.0 |
| Prettier | 3.9.10 |
| Prettier Astro plugin | 1.1.1 |
| TypeScript native compiler | 7.0.2 |
| TypeScript 6 compatibility API | 6.0.2 |

Verification used `npm view <package> version engines peerDependencies`, followed by installation and `npm ls --depth=0`. The Node runtime is pinned in `.node-version`, the Docker stages, and CI. See [Node 26.11.1](https://nodejs.org/en/blog/release/v26.11.1) and the [npm registry](https://registry.npmjs.org/).

### Migration decisions

- Astro 7 upgrades its bundler to Vite 8 and uses the Rust compiler. Templates need valid nesting, closed tags, and explicit whitespace where adjacent inline elements need separation. This project uses server output for API forwarding and dynamic share metadata. Sources: [Astro 7 migration](https://docs.astro.build/en/guides/upgrade-to/v7/), [Node adapter](https://docs.astro.build/en/guides/integrations-guide/node/).
- React 19 uses the modern JSX transform. The current Astro React integration uses Oxc and removes its former Babel option. The experimental automatic React compiler is not enabled. Sources: [React 19 upgrade guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide), [React 19.3 release](https://react.dev/blog/2026/09/09/react-19-3), [Astro React integration](https://docs.astro.build/en/guides/integrations-guide/react/).
- TypeScript 7 is native and does not provide the JavaScript compiler API used by Astro Check. Following Microsoft's official side-by-side guidance, `@typescript/native` aliases `typescript@7.0.2`, while `typescript` aliases the current `@typescript/typescript6@6.0.2` compatibility package. `npm run typecheck` runs the native compiler; `astro check` uses the compatibility API. No peer dependency checks are bypassed. Source: [TypeScript 7 release and compatibility guide](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).
- Obsolete Tailwind, shadcn, ESLint, Axios, Nanostores, and chart-library dependencies were removed as part of the rewrite. The current interface uses native CSS, React state, fetch, and SVG charts.

## Backend

| Component | Version |
| --- | --- |
| Python | 3.15.0 |
| uv | 0.13.0 |
| FastAPI | 0.143.0 |
| Pydantic | 2.14.0 |
| Pydantic Settings | 2.15.0 |
| Pydantic AI slim, OpenAI extra | 2.55.0 |
| HTTPX | 0.28.1 |
| Uvicorn, standard extra | 0.54.0 |
| pytest | 9.1.1 |
| pytest-asyncio | 1.4.0 |
| Ruff | 0.17.0 |

The backend replaces Django, Celery, exchange SDKs, and Telegram handlers. SQLite uses Python's standard library. Pydantic AI uses a typed output plan and usage limits; the server renders portfolio facts from calculated data. The slim OpenAI extra installs the one supported provider integration instead of every provider.

Sources: [Python releases](https://www.python.org/downloads/), [PyPI package index](https://pypi.org/), [FastAPI release notes](https://fastapi.tiangolo.com/release-notes/), [Pydantic AI changelog](https://pydantic.dev/docs/ai/project/changelog/).

## CI actions

Official release tags were checked on the same date: [checkout 7.0.1](https://github.com/actions/checkout/releases/tag/v7.0.1), [setup-node 7.1.0](https://github.com/actions/setup-node/releases/tag/v7.1.0), [setup-uv 10.3.0](https://github.com/astral-sh/setup-uv/releases/tag/v10.3.0), and [upload-artifact 7.0.2](https://github.com/actions/upload-artifact/releases/tag/v7.0.2). CI verifies code, builds, and browser behavior without publishing images or deploying to legacy infrastructure.
