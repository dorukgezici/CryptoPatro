export interface Asset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change_24h_pct: number;
  color: string;
  sparkline: number[];
}
export interface Market {
  assets: Asset[];
  source: 'coingecko' | 'cached' | 'sample';
  as_of: string;
  notice: string;
}
export interface Allocation {
  asset_id: string;
  symbol: string;
  name: string;
  pct: number;
  color: string;
}
export interface Holding {
  id: string;
  asset_id: string;
  symbol: string;
  name: string;
  quantity: number;
  avg_cost: number;
  price: number;
  value: number;
  cost: number;
  profit_loss: number;
  profit_loss_pct: number | null;
  change_24h_pct: number;
  allocation_pct: number;
  color: string;
  sparkline: number[];
}
export interface Portfolio {
  is_demo: boolean;
  holdings: Holding[];
  total_value: number;
  total_cost: number;
  profit_loss: number;
  profit_loss_pct: number | null;
  change_24h: number;
  change_24h_pct: number;
  allocation: Allocation[];
  insight: { title: string; description: string; tone: string; concentration_pct: number };
  market: Market;
  updated_at: string;
}
export interface PriceAlert {
  id: string;
  asset_id: string;
  symbol: string;
  direction: 'above' | 'below';
  target_price: number;
  status: 'watching' | 'triggered';
  triggered_at: string | null;
}
export interface ChatReply {
  mode: 'ai' | 'local';
  message: string;
  highlights: { label: string; value: string; detail: string }[];
  suggested_questions: string[];
  disclaimer: string;
  data_source: string;
  as_of: string;
}
export interface Share {
  slug: string;
  title: string;
  created_at: string;
  allocation: Allocation[];
  profit_loss_pct: number | null;
  asset_count: number;
  data_source: string;
  as_of: string;
  maker: string;
  maker_url: string;
  is_demo: boolean;
}
const KEY = 'cryptopatro.portfolio.v1';
export function getToken(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}
export function saveToken(token: string) {
  localStorage.setItem(KEY, token);
}
export function clearToken() {
  localStorage.removeItem(KEY);
}
export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
export async function api<T>(
  path: string,
  options: { method?: string; body?: unknown; token?: string | null; signal?: AbortSignal } = {},
): Promise<T> {
  const token = options.token === undefined ? getToken() : options.token;
  const response = await fetch(`/api${path}`, {
    method: options.method || 'GET',
    headers: {
      ...(options.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { 'X-Portfolio-Token': token } : {}),
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    signal: options.signal || AbortSignal.timeout(45_000),
  });
  if (!response.ok) {
    const json = await response.json().catch(() => ({}));
    const message =
      typeof json.detail === 'string'
        ? json.detail
        : Array.isArray(json.detail)
          ? json.detail.map((d: { msg: string }) => d.msg).join('. ')
          : 'Something went wrong. Please try again.';
    throw new ApiError(message, response.status);
  }
  return response.status === 204 ? (undefined as T) : response.json();
}
export function money(n: number, digits = 2) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(n);
}
export function percent(n: number | null, digits = 2) {
  return n === null ? 'Cost basis needed' : `${n >= 0 ? '+' : ''}${n.toFixed(digits)}%`;
}
export function sourceLabel(source: string) {
  return source === 'coingecko'
    ? 'CoinGecko prices'
    : source === 'cached'
      ? 'Cached prices'
      : 'Sample prices';
}
export function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Something went wrong. Please try again.';
}
export function trackEvent(
  name: 'start_clicked' | 'share_copy' | 'share_download',
  referral?: string,
) {
  void api('/events', {
    method: 'POST',
    token: null,
    body: { name, ...(referral ? { referral } : {}) },
  }).catch(() => {});
}
