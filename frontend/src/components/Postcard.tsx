import type { Allocation, Share } from '../lib/api';
import { percent } from '../lib/api';
export function Postcard({
  title = 'A little crypto perspective.',
  allocation,
  performance,
  isDemo,
  source,
  asOf,
}: {
  title?: string;
  allocation: Allocation[];
  performance?: number | null;
  isDemo: boolean;
  source: string;
  asOf?: string;
}) {
  return (
    <div className="postcard">
      <div className="postcard-top">
        <span className="postcard-brand">
          <img src="/favicon.svg" width="24" height="24" alt="" /> cryptopatro
        </span>
        <span>PORTFOLIO POSTCARD</span>
      </div>
      <div className="postcard-heading">
        <h3>{title}</h3>
        <span className="postcard-star" aria-hidden="true">
          ✳
        </span>
      </div>
      <div className="postcard-bars">
        {allocation.map((a) => (
          <div
            key={a.asset_id}
            style={{ flex: Math.max(a.pct, 0.5), background: a.color }}
            title={`${a.symbol} ${a.pct.toFixed(1)}%`}
          />
        ))}
      </div>
      <div className="postcard-allocation">
        {allocation.map((a) => (
          <div key={a.asset_id}>
            <span>
              <i style={{ background: a.color }} />
              {a.symbol}
            </span>
            <strong>
              {a.pct.toFixed(1)}
              <small>%</small>
            </strong>
          </div>
        ))}
      </div>
      {performance !== null && performance !== undefined && (
        <div className="postcard-performance">
          Unrealized return <strong>{percent(performance)}</strong>
          <small>Based on entered cost. Self-reported.</small>
        </div>
      )}
      <div className="postcard-footer">
        <span>
          {isDemo ? 'Sample portfolio' : 'Self-reported portfolio'}
          {source === 'sample'
            ? ' · Sample prices'
            : source === 'cached'
              ? ' · Cached prices'
              : ' · CoinGecko'}
          {asOf && (
            <>
              <br />
              Quotes:{' '}
              {new Date(asOf).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'UTC',
              })}{' '}
              UTC
            </>
          )}
          <br />A perspective. Not a recommendation.
        </span>
        <span>
          Built by
          <br />
          <b>Doruk Gezici ↗</b>
        </span>
      </div>
    </div>
  );
}
export async function downloadPostcard(share: Share) {
  const response = await fetch(`/share/${encodeURIComponent(share.slug)}.png`);
  if (!response.ok) throw new Error('The postcard could not be downloaded. Please try again.');
  const url = URL.createObjectURL(await response.blob());
  const a = document.createElement('a');
  a.href = url;
  a.download = 'my-cryptopatro-postcard.png';
  a.click();
  URL.revokeObjectURL(url);
}
