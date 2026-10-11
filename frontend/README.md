# CryptoPatro web

Astro 7 server rendering with React 19 interactive views. See the [root README](../README.md) for the complete application setup.

```sh
npm ci
npm run dev
```

The development server runs at `http://localhost:4321`. Start the FastAPI backend on port 8000 first. Browsers request `/api` on the frontend origin. Both development and production use the same Astro proxy endpoint. Set `BACKEND_URL` in the server environment to change the upstream server.

```sh
npm run check
npm run typecheck
npm run build
HOST=0.0.0.0 PORT=4321 npm start
```

`astro check` uses Microsoft's TypeScript 6 compatibility API; `typecheck` uses the latest TypeScript 7 native compiler. This follows the official side-by-side migration while Astro's checker requires the JavaScript compiler API. Package versions and migration notes live in [docs/versions.md](../docs/versions.md).
