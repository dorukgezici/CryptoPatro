import type { Share } from './api';
export async function getPublicShare(
  slug: string,
): Promise<{ share: Share | null; status: number }> {
  if (!/^[a-zA-Z0-9_-]{6,64}$/.test(slug)) return { share: null, status: 404 };
  try {
    const response = await fetch(
      `${(process.env.BACKEND_URL || 'http://127.0.0.1:8000').replace(/\/$/, '')}/api/shares/${encodeURIComponent(slug)}`,
      { signal: AbortSignal.timeout(8_000), redirect: 'error' },
    );
    if (!response.ok) return { share: null, status: response.status === 404 ? 404 : 503 };
    return { share: (await response.json()) as Share, status: 200 };
  } catch {
    return { share: null, status: 503 };
  }
}
export function escapeXml(text: string) {
  return text.replace(
    /[<>&'"\u0000-\u001f]/g,
    (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c] || '',
  );
}
export function postcardSvg(share: Share): string {
  const words = share.title.split(/\s+/).flatMap((word) => word.match(/.{1,26}/gu) || []);
  const lines: string[] = [''];
  for (const word of words) {
    const i = lines.length - 1;
    if ((lines[i] + ' ' + word).trim().length > 26 && lines[i]) lines.push(word);
    else lines[i] = (lines[i] + ' ' + word).trim();
  }
  let offset = 70;
  const colors = ['#ee9250', '#9894cf', '#a1b9a6', '#9bbacf', '#dfbcb5', '#aac4db'];
  const bars = share.allocation
    .map((a, i) => {
      const width = (1050 * a.pct) / 100;
      const svg = `<rect x="${offset.toFixed(2)}" y="330" width="${Math.max(width - 5, 0).toFixed(2)}" height="80" rx="5" fill="${/^#[a-fA-F0-9]{6}$/.test(a.color) ? a.color : colors[i % colors.length]}"/>`;
      offset += width;
      return svg;
    })
    .join('');
  const labels = share.allocation
    .map(
      (a, i) =>
        `<text x="${70 + i * 175}" y="449" font-size="17" fill="#7c896b">${escapeXml(a.symbol)}</text><text x="${70 + i * 175}" y="492" font-size="35" fill="#293c26">${a.pct.toFixed(1)}%</text>`,
    )
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#f1edda"/><g font-family="DejaVu Sans,Arial,sans-serif"><rect x="70" y="48" width="36" height="36" rx="10" fill="#e36b45"/><path d="M88 53v26M75 66h26M78 56l20 20M78 76l20-20" stroke="#fff9ee" stroke-width="3"/><text x="117" y="76" font-size="25" font-weight="700" fill="#293c26">cryptopatro.</text><text x="1130" y="75" text-anchor="end" font-size="14" letter-spacing="3" fill="#8b9375">PORTFOLIO POSTCARD</text>${lines
    .slice(0, 3)
    .map(
      (line, i) =>
        `<text x="70" y="${170 + i * 59}" font-size="${line.length > 30 ? 39 : 53}" fill="#293c26" font-weight="500">${escapeXml(line)}</text>`,
    )
    .join(
      '',
    )}<g stroke="#e36b45" stroke-width="18" transform="translate(1035 220)"><path d="M0-75V75M-75 0H75M-53-53L53 53M-53 53L53-53"/></g>${bars}${labels}<line x1="70" x2="1130" y1="530" y2="530" stroke="#d9dec6"/><text x="70" y="567" font-size="14" fill="#8a9878">${share.is_demo ? 'Sample portfolio' : 'Self-reported portfolio'}${share.data_source === 'sample' ? ' · Sample prices' : share.data_source === 'cached' ? ' · Cached prices' : ' · CoinGecko'}${share.profit_loss_pct !== null ? ` · Unrealized return ${share.profit_loss_pct >= 0 ? '+' : ''}${share.profit_loss_pct.toFixed(1)}%` : ''}</text><text x="70" y="591" font-size="13" fill="#9aa387">Quotes: ${escapeXml(new Date(share.as_of).toISOString().replace('T', ' ').slice(0, 16))} UTC. Not a recommendation.</text><text x="1130" y="568" text-anchor="end" font-size="17" fill="#728561">Built by Doruk Gezici</text><text x="1130" y="591" text-anchor="end" font-size="13" fill="#8a9878">github.com/dorukgezici</text></g></svg>`;
}
