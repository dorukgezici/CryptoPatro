import { useId, useState } from 'react';
import type { Allocation, Portfolio } from '../lib/api';
import { money } from '../lib/api';

export function Sparkline({ values, positive = true }: { values: number[]; positive?: boolean }) {
  if (values.length < 2) return <span className="muted">No history</span>;
  const min = Math.min(...values),
    span = Math.max(...values) - min || 1;
  const points = values
    .map((v, i) => `${(i / (values.length - 1)) * 90},${27 - ((v - min) / span) * 22}`)
    .join(' ');
  return (
    <svg
      className={`sparkline ${positive ? 'positive' : 'negative'}`}
      viewBox="0 0 90 32"
      role="img"
      aria-label="Seven day price trend"
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PortfolioChart({ portfolio }: { portfolio: Portfolio }) {
  const id = useId().replace(/:/g, '');
  const [hover, setHover] = useState<number | null>(null);
  const [range, setRange] = useState<'24H' | '7D'>('7D');
  const withHistory = portfolio.holdings.filter((h) => h.sparkline.length > 1);
  const complete = withHistory.length === portfolio.holdings.length && withHistory.length > 0;
  if (!complete)
    return (
      <div className="chart-empty">
        <span className="mini-sun">✳</span>
        <p>
          {portfolio.holdings.length
            ? 'A pause in the price history.'
            : 'Your next chapter starts here.'}
        </p>
        <span>
          {portfolio.holdings.length
            ? 'Current values are available. Try refreshing the history later.'
            : 'Add a holding to see its price perspective.'}
        </span>
      </div>
    );
  const length = Math.min(...withHistory.map((h) => h.sparkline.length));
  const all = Array.from({ length }, (_, i) =>
    withHistory.reduce(
      (sum, h) => sum + h.sparkline[h.sparkline.length - length + i] * h.quantity,
      0,
    ),
  );
  const values = range === '24H' ? all.slice(-Math.max(2, Math.round(length / 7))) : all;
  const min = Math.min(...values) * 0.985,
    max = Math.max(...values) * 1.015,
    span = max - min || 1;
  const width = 730,
    height = 190;
  const point = (v: number, i: number) => [
    (i / (values.length - 1)) * width,
    height - ((v - min) / span) * height,
  ];
  const line = values
    .map(
      (v, i) =>
        `${i === 0 ? 'M' : 'L'}${point(v, i)
          .map((p) => p.toFixed(2))
          .join(',')}`,
    )
    .join(' ');
  const active = hover === null ? values.length - 1 : Math.min(hover, values.length - 1);
  const [x, y] = point(values[active], active);
  return (
    <div className="chart-wrap">
      <div className="chart-controls">
        <span>{hover !== null ? money(values[active]) : 'Your holdings, in perspective'}</span>
        <div className="segmented" aria-label="Chart time range">
          {(['24H', '7D'] as const).map((r) => (
            <button
              key={r}
              aria-pressed={range === r}
              onClick={() => {
                setRange(r);
                setHover(null);
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div
        className="chart-canvas"
        onPointerLeave={() => setHover(null)}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setHover(
            Math.max(
              0,
              Math.min(
                values.length - 1,
                Math.round(((e.clientX - r.left) / r.width) * (values.length - 1)),
              ),
            ),
          );
        }}
      >
        <svg
          viewBox={`0 0 ${width} ${height + 12}`}
          preserveAspectRatio="none"
          role="img"
          aria-label={`${range} hypothetical value of current holdings at past prices. Starts at ${money(values[0])}, ends at ${money(values[values.length - 1])}. Not account performance.`}
        >
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ed724e" stopOpacity=".2" />
              <stop offset="100%" stopColor="#ed724e" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[25, 80, 135, 190].map((y) => (
            <line key={y} x1="0" x2={width} y1={y} y2={y} stroke="#efeee7" strokeDasharray="3 5" />
          ))}
          <path d={`${line} L${width},${height + 12} L0,${height + 12} Z`} fill={`url(#${id})`} />
          <path
            d={line}
            fill="none"
            stroke="#ed724e"
            strokeWidth="2.8"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {hover !== null && (
            <line x1={x} x2={x} y1="0" y2={height} stroke="#e2a28b" strokeDasharray="4 4" />
          )}
          <circle cx={x} cy={y} r="4.5" fill="#ed724e" stroke="#fff" strokeWidth="3" />
        </svg>
      </div>
      <div className="chart-dates">
        <span>{range === '7D' ? '7 days ago' : '24 hours ago'}</span>
        <span>{range === '7D' ? '5 days ago' : '18 hours ago'}</span>
        <span>{range === '7D' ? '3 days ago' : '12 hours ago'}</span>
        <span>Latest</span>
      </div>
      <p className="chart-caption">
        {portfolio.market.source === 'sample' ? 'Illustrative sample. ' : ''}Current holdings at
        past prices, not account performance.
      </p>
    </div>
  );
}

export function AllocationRing({
  allocation,
  size = 166,
}: {
  allocation: Allocation[];
  size?: number;
}) {
  let offset = 0;
  return (
    <div className="allocation-ring" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 180 180"
        role="img"
        aria-label={`Allocation: ${allocation.map((a) => `${a.name} ${a.pct.toFixed(1)}%`).join(', ') || 'No holdings yet'}`}
      >
        <circle cx="90" cy="90" r="70" fill="none" stroke="#eeeee7" strokeWidth="23" />
        {allocation.map((a) => {
          const start = offset;
          offset += a.pct;
          return (
            <circle
              key={a.asset_id}
              cx="90"
              cy="90"
              r="70"
              fill="none"
              stroke={a.color}
              strokeWidth="23"
              pathLength="100"
              strokeDasharray={`${Math.max(0, a.pct - 1.5)} ${100 - Math.max(0, a.pct - 1.5)}`}
              strokeDashoffset={-start}
              transform="rotate(-90 90 90)"
            />
          );
        })}
      </svg>
      <div className="ring-label">
        <strong>{allocation.length}</strong>
        <span>assets</span>
      </div>
    </div>
  );
}
