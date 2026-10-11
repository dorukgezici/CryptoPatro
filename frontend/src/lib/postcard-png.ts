import { createHash } from 'node:crypto';
import type { Share } from './api';

interface RenderLimits {
  maxEntries: number;
  maxBytes: number;
  maxConcurrent: number;
  maxCallersPerRender: number;
}

interface PostcardPngOptions {
  getShare: (slug: string) => Promise<{ share: Share | null; status: number }>;
  render: (share: Share) => Promise<Uint8Array>;
  limits?: Partial<RenderLimits>;
}

const DEFAULT_LIMITS: RenderLimits = {
  maxEntries: 16,
  maxBytes: 8 * 1024 * 1024,
  maxConcurrent: 2,
  maxCallersPerRender: 32,
};

const RESPONSE_HEADERS = {
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
};

function unavailable(): Response {
  return new Response('Postcard temporarily unavailable', {
    status: 503,
    headers: { ...RESPONSE_HEADERS, 'Retry-After': '2' },
  });
}

/** One bounded cache and render pool for the lifetime of this server process. */
export function createPostcardPngHandler({ getShare, render, limits }: PostcardPngOptions) {
  const capacity = { ...DEFAULT_LIMITS, ...limits };
  for (const value of Object.values(capacity)) {
    if (!Number.isSafeInteger(value) || value < 1) {
      throw new Error('Postcard rendering limits must be positive integers');
    }
  }

  const cached = new Map<string, Uint8Array>();
  const active = new Map<string, { promise: Promise<Uint8Array>; callers: number }>();
  let cachedBytes = 0;

  function remember(key: string, png: Uint8Array) {
    if (png.byteLength > capacity.maxBytes) return;
    while (cached.size >= capacity.maxEntries || cachedBytes + png.byteLength > capacity.maxBytes) {
      const oldest = cached.keys().next().value;
      if (oldest === undefined) break;
      cachedBytes -= cached.get(oldest)!.byteLength;
      cached.delete(oldest);
    }
    cached.set(key, png);
    cachedBytes += png.byteLength;
  }

  async function imageFor(share: Share): Promise<Uint8Array | null> {
    // Include all snapshot content, so a changed snapshot never reuses stale pixels.
    const key = createHash('sha256').update(JSON.stringify(share)).digest('hex');
    const hit = cached.get(key);
    if (hit) {
      cached.delete(key);
      cached.set(key, hit);
      return hit;
    }

    let entry = active.get(key);
    if (entry) {
      if (entry.callers >= capacity.maxCallersPerRender) return null;
    } else {
      // Different snapshots never enter a waiting queue when both render slots are busy.
      if (active.size >= capacity.maxConcurrent) return null;
      entry = {
        callers: 0,
        promise: Promise.resolve()
          .then(() => render(share))
          .then((png) => {
            remember(key, png);
            return png;
          })
          .finally(() => active.delete(key)),
      };
      active.set(key, entry);
    }

    entry.callers += 1;
    try {
      return await entry.promise;
    } finally {
      entry.callers -= 1;
    }
  }

  return async function postcardPng(slug: string): Promise<Response> {
    try {
      // Validate every request before consulting the cache or joining an active render.
      // Public share revocation must remain effective even while its pixels are cached.
      const { share, status } = await getShare(slug);
      if (!share) {
        return status === 404
          ? new Response('Postcard not found', { status: 404, headers: RESPONSE_HEADERS })
          : unavailable();
      }
      const png = await imageFor(share);
      if (!png) return unavailable();
      return new Response(new Uint8Array(png), {
        headers: {
          ...RESPONSE_HEADERS,
          'Content-Type': 'image/png',
          'Content-Disposition': 'inline; filename="cryptopatro-postcard.png"',
        },
      });
    } catch {
      return unavailable();
    }
  };
}
