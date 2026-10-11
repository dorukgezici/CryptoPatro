import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createRequestFromNodeRequest } from '../node_modules/astro/dist/core/app/node.js';
import { clientAddressSymbol } from '../node_modules/astro/dist/core/constants.js';

process.env.PUBLIC_SITE_URL = 'https://cryptopatro.pub.gezici.me';
const { default: config } = await import('../astro.config.mjs');

function requestFor(host) {
  return createRequestFromNodeRequest(
    {
      method: 'GET',
      url: '/api/health',
      headers: {
        host,
        'x-forwarded-host': host,
        'x-forwarded-proto': 'https',
        'x-forwarded-for': '203.0.113.10',
      },
      socket: { remoteAddress: '10.42.0.7' },
    },
    { allowedDomains: config.security.allowedDomains, port: 4321 },
  );
}

test('the configured production origin preserves the ingress visitor address', () => {
  assert.equal(requestFor('cryptopatro.pub.gezici.me')[clientAddressSymbol], '203.0.113.10');
});

test('an unrelated host cannot opt into forwarded-header trust', () => {
  assert.equal(requestFor('untrusted.example')[clientAddressSymbol], '10.42.0.7');
});

test('a suffix lookalike cannot opt into forwarded-header trust', () => {
  assert.equal(
    requestFor('cryptopatro.pub.gezici.me.untrusted.example')[clientAddressSymbol],
    '10.42.0.7',
  );
});
