import assert from 'node:assert/strict';
import { test } from 'node:test';
import { setImmediate } from 'node:timers/promises';
import { createPostcardPngHandler } from '../src/lib/postcard-png.ts';

function snapshot(slug, title = 'A focused little mix') {
  return {
    slug,
    title,
    created_at: '2026-10-11T12:00:00Z',
    allocation: [{ symbol: 'BTC', pct: 100, color: '#ee9250' }],
    profit_loss_pct: null,
    asset_count: 1,
    data_source: 'sample',
    as_of: '2026-10-11T11:00:00Z',
    maker: 'Doruk Gezici',
    maker_url: 'https://github.com/dorukgezici',
    is_demo: true,
  };
}

const existingShare = async (slug) => ({ share: snapshot(slug), status: 200 });
const bytes = (value) => new TextEncoder().encode(value);

function deferred() {
  let resolve;
  const promise = new Promise((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

test('repeated requests reuse pixels but validate the share each time', async () => {
  let lookups = 0;
  let renders = 0;
  const handler = createPostcardPngHandler({
    getShare: async (slug) => {
      lookups += 1;
      return existingShare(slug);
    },
    render: async () => {
      renders += 1;
      return bytes('same pixels');
    },
  });

  for (let i = 0; i < 3; i += 1) {
    const response = await handler('sample-share');
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'image/png');
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
    assert.equal(await response.text(), 'same pixels');
  }
  assert.equal(lookups, 3);
  assert.equal(renders, 1);
});

test('revocation and lookup outages cannot return a cached image', async () => {
  let status = 200;
  let renders = 0;
  const handler = createPostcardPngHandler({
    getShare: async (slug) => ({ share: status === 200 ? snapshot(slug) : null, status }),
    render: async () => {
      renders += 1;
      return bytes('cached');
    },
  });

  assert.equal((await handler('sample-share')).status, 200);
  status = 404;
  const revoked = await handler('sample-share');
  assert.equal(revoked.status, 404);
  assert.equal(revoked.headers.get('cache-control'), 'no-store');
  assert.equal(await revoked.text(), 'Postcard not found');
  status = 503;
  const outage = await handler('sample-share');
  assert.equal(outage.status, 503);
  assert.equal(outage.headers.get('retry-after'), '2');
  assert.equal(outage.headers.get('cache-control'), 'no-store');
  assert.equal(renders, 1);
});

test('changed snapshot content cannot reuse an earlier image for the same slug', async () => {
  let title = 'Original';
  let renders = 0;
  const handler = createPostcardPngHandler({
    getShare: async (slug) => ({ share: snapshot(slug, title), status: 200 }),
    render: async (share) => {
      renders += 1;
      return bytes(share.title);
    },
  });

  assert.equal(await (await handler('sample-share')).text(), 'Original');
  title = 'Updated';
  assert.equal(await (await handler('sample-share')).text(), 'Updated');
  assert.equal(renders, 2);
});

test(
  'requests for the same snapshot coalesce with a bounded caller count',
  { timeout: 5000 },
  async () => {
    const started = deferred();
    const finish = deferred();
    let renders = 0;
    const handler = createPostcardPngHandler({
      getShare: existingShare,
      render: async () => {
        renders += 1;
        started.resolve();
        await finish.promise;
        return bytes('shared result');
      },
      limits: { maxConcurrent: 1, maxCallersPerRender: 2 },
    });

    const first = handler('sample-share');
    await started.promise;
    const second = handler('sample-share');
    await setImmediate();
    const excess = await handler('sample-share');
    assert.equal(excess.status, 503);
    assert.equal(excess.headers.get('retry-after'), '2');
    assert.equal(excess.headers.get('cache-control'), 'no-store');
    assert.equal(renders, 1);
    finish.resolve();
    const responses = await Promise.all([first, second]);
    assert.deepEqual(await Promise.all(responses.map((response) => response.text())), [
      'shared result',
      'shared result',
    ]);
    assert.equal((await handler('sample-share')).status, 200);
    assert.equal(renders, 1);
  },
);

test(
  'different snapshots cannot exceed render concurrency or enter a waiting queue',
  { timeout: 5000 },
  async () => {
    const bothStarted = deferred();
    const finish = deferred();
    let renders = 0;
    let active = 0;
    let peak = 0;
    let released = false;
    const handler = createPostcardPngHandler({
      getShare: existingShare,
      render: async (share) => {
        renders += 1;
        active += 1;
        peak = Math.max(peak, active);
        if (active === 2) bothStarted.resolve();
        if (!released) await finish.promise;
        active -= 1;
        return bytes(share.slug);
      },
      limits: { maxConcurrent: 2 },
    });

    const first = handler('share-one');
    const second = handler('share-two');
    await bothStarted.promise;
    const excess = await handler('share-three');
    assert.equal(excess.status, 503);
    assert.equal(excess.headers.get('retry-after'), '2');
    assert.equal(renders, 2);
    released = true;
    finish.resolve();
    assert.deepEqual(
      (await Promise.all([first, second])).map((response) => response.status),
      [200, 200],
    );
    assert.equal(renders, 2, 'the refused render was not silently queued');
    assert.equal((await handler('share-three')).status, 200);
    assert.equal(renders, 3);
    assert.equal(peak, 2);
  },
);

test('entry eviction keeps recently used images within the cache limit', async () => {
  const rendered = [];
  const handler = createPostcardPngHandler({
    getShare: existingShare,
    render: async (share) => {
      rendered.push(share.slug);
      return bytes('x');
    },
    limits: { maxEntries: 2 },
  });

  for (const slug of ['share-a', 'share-b', 'share-a', 'share-c', 'share-a', 'share-b']) {
    assert.equal((await handler(slug)).status, 200);
  }
  assert.deepEqual(rendered, ['share-a', 'share-b', 'share-c', 'share-b']);
});

test('byte capacity evicts images even when the entry limit has room', async () => {
  let renders = 0;
  const handler = createPostcardPngHandler({
    getShare: existingShare,
    render: async () => {
      renders += 1;
      return bytes('123');
    },
    limits: { maxBytes: 5, maxEntries: 16 },
  });

  for (const slug of ['share-a', 'share-b', 'share-a']) {
    assert.equal((await handler(slug)).status, 200);
  }
  assert.equal(renders, 3);
});

test('an oversized result is served without caching or evicting smaller images', async () => {
  const rendered = [];
  const handler = createPostcardPngHandler({
    getShare: existingShare,
    render: async (share) => {
      rendered.push(share.slug);
      return bytes(share.slug === 'large-share' ? '123456' : '12');
    },
    limits: { maxBytes: 5 },
  });

  for (const slug of ['small-share', 'large-share', 'small-share', 'large-share']) {
    assert.equal((await handler(slug)).status, 200);
  }
  assert.deepEqual(rendered, ['small-share', 'large-share', 'large-share']);
});

test('failed renders release their slot and are not cached', async () => {
  let shouldFail = true;
  let renders = 0;
  const handler = createPostcardPngHandler({
    getShare: existingShare,
    render: async () => {
      renders += 1;
      if (shouldFail) throw new Error('renderer failed');
      return bytes('recovered');
    },
    limits: { maxConcurrent: 1 },
  });

  const failed = await handler('sample-share');
  assert.equal(failed.status, 503);
  assert.equal(failed.headers.get('retry-after'), '2');
  shouldFail = false;
  assert.equal((await handler('sample-share')).status, 200);
  assert.equal((await handler('different-share')).status, 200);
  assert.equal(renders, 3);
});
