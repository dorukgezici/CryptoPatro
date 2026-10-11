import node from '@astrojs/node';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

// Production images sit behind an ingress that removes untrusted forwarded headers.
// Restrict forwarded host and client-address handling to this exact public hostname.
const publicOrigin = process.env.PUBLIC_SITE_URL ? new URL(process.env.PUBLIC_SITE_URL) : null;
if (
  publicOrigin &&
  (!['http:', 'https:'].includes(publicOrigin.protocol) ||
    publicOrigin.username ||
    publicOrigin.password ||
    publicOrigin.pathname !== '/' ||
    publicOrigin.search ||
    publicOrigin.hash)
) {
  throw new Error('PUBLIC_SITE_URL must be an HTTP or HTTPS origin without credentials or a path.');
}

export default defineConfig({
  output: 'server',
  session: false,
  security: {
    allowedDomains: publicOrigin
      ? [
          {
            protocol: publicOrigin.protocol.slice(0, -1),
            hostname: publicOrigin.hostname,
            port: publicOrigin.port,
          },
        ]
      : [],
  },
  adapter: node({ mode: 'standalone', bodySizeLimit: 1_048_576 }),
  integrations: [react()],
  devToolbar: { enabled: false },
});
