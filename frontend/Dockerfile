FROM node:26.11.1-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG PUBLIC_SITE_URL
ENV PUBLIC_SITE_URL=${PUBLIC_SITE_URL}
RUN npm run build
RUN npm prune --omit=dev

FROM node:26.11.1-slim AS runtime
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends fonts-dejavu-core && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production HOST=0.0.0.0 PORT=4321
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/package.json ./package.json
USER node
EXPOSE 4321
CMD ["node", "dist/server/entry.mjs"]
