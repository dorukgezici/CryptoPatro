import { useEffect, useRef, useState, type SubmitEvent } from 'react';
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  ChartNoAxesCombined,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  Code2,
  LayoutGrid,
  LoaderCircle,
  Menu,
  Plus,
  RefreshCw,
  Search,
  Send,
  Settings2,
  Share2,
  ShieldCheck,
  Sparkles,
  Trash2,
  Wallet,
} from 'lucide-react';
import {
  api,
  ApiError,
  clearToken,
  errorMessage,
  trackEvent,
  getToken,
  saveToken,
  money,
  percent,
  sourceLabel,
  type Asset,
  type ChatReply,
  type Holding,
  type Portfolio,
  type PriceAlert,
  type Share,
} from '../lib/api';
import { demoPortfolio } from '../lib/demo';
import { AllocationRing, PortfolioChart, Sparkline } from './charts';
import Modal from './Modal';
import { downloadPostcard, Postcard } from './Postcard';

type View = 'overview' | 'holdings' | 'markets' | 'alerts';
type Dialog = 'holding' | 'share' | 'alert' | 'privacy' | null;
const nav = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'holdings', label: 'My holdings', icon: Wallet },
  { id: 'markets', label: 'Explore markets', icon: ChartNoAxesCombined },
  { id: 'alerts', label: 'Price alerts', icon: Bell },
] as const;
function CoinIcon({ symbol, size = 'normal' }: { symbol: string; size?: 'small' | 'normal' }) {
  return (
    <span
      className={`coin coin-${symbol.toLowerCase()} ${size === 'small' ? 'coin-small' : ''}`}
      aria-hidden="true"
    >
      {symbol === 'BTC'
        ? '₿'
        : symbol === 'ETH'
          ? '♦'
          : symbol === 'SOL'
            ? '≋'
            : symbol === 'USDC'
              ? '$'
              : symbol === 'AVAX'
                ? '▲'
                : '⬡'}
    </span>
  );
}
function Change({ value, compact = false }: { value: number | null; compact?: boolean }) {
  return (
    <span
      className={`change ${value !== null && value < 0 ? 'negative' : 'positive'} ${compact ? 'compact' : ''}`}
    >
      {value !== null && (value < 0 ? <ArrowDownLeft size={13} /> : <ArrowUpRight size={13} />)}
      {percent(value)}
    </span>
  );
}

export default function App() {
  const [portfolio, setPortfolio] = useState<Portfolio>(demoPortfolio);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [invalidKey, setInvalidKey] = useState(false);
  const [toast, setToast] = useState('');
  const [view, setView] = useState<View>('overview');
  const [dialog, setDialog] = useState<Dialog>(null);
  const [edit, setEdit] = useState<Holding | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<string>('bitcoin');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [query, setQuery] = useState('');
  const [copilot, setCopilot] = useState(false);
  const [initialQuestion, setInitialQuestion] = useState('');
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [alertError, setAlertError] = useState('');
  const [alertLoading, setAlertLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const notify = (message: string) => {
    setToast(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(''), 4500);
  };
  async function refresh() {
    setLoading(true);
    setError('');
    try {
      setPortfolio(await api<Portfolio>('/portfolio'));
      setReady(true);
    } catch (e) {
      setError(errorMessage(e));
      if (e instanceof ApiError && e.status === 401) setInvalidKey(true);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const abort = new AbortController();
    api<Portfolio>('/portfolio', { signal: abort.signal })
      .then((p) => {
        setPortfolio(p);
        setReady(true);
      })
      .catch((e) => {
        if (!abort.signal.aborted) {
          setError(errorMessage(e));
          if (e instanceof ApiError && e.status === 401) setInvalidKey(true);
        }
      });
    const params = new URLSearchParams(window.location.search);
    if (params.has('start')) setDialog('holding');
    else if (params.has('share')) setDialog('share');
    return () => {
      abort.abort();
      clearTimeout(timer.current);
    };
  }, []);
  async function loadAlerts() {
    if (!getToken()) {
      setAlerts([]);
      return;
    }
    setAlertLoading(true);
    setAlertError('');
    try {
      const result = await api<{ alerts: PriceAlert[] }>('/alerts');
      setAlerts(result.alerts);
    } catch (e) {
      setAlertError(errorMessage(e));
    } finally {
      setAlertLoading(false);
    }
  }
  useEffect(() => {
    if (view === 'alerts') void loadAlerts();
  }, [view]);
  function navigate(next: View) {
    setView(next);
    setQuery('');
    setMobileMenu(false);
  }
  function addHolding(assetId = 'bitcoin') {
    if (portfolio.is_demo)
      trackEvent(
        'start_clicked',
        new URLSearchParams(window.location.search).get('ref') || undefined,
      );
    setEdit(null);
    setSelectedAsset(assetId);
    setDialog('holding');
  }
  function ask(question = '') {
    setInitialQuestion(question);
    setCopilot(true);
    setMobileMenu(false);
  }
  const holdings = portfolio.holdings.filter((h) =>
    `${h.name} ${h.symbol}`.toLowerCase().includes(query.toLowerCase()),
  );
  const balance = (v: number, digits = 2) => (hidden ? '••••••' : money(v, digits));
  const heading =
    view === 'overview'
      ? 'A little clarity. A lot more control.'
      : view === 'holdings'
        ? 'Your crypto, all together.'
        : view === 'markets'
          ? 'A wider perspective.'
          : 'Less watching. More living.';
  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? 'sidebar-open' : ''}`}>
        <a className="brand" href="/" aria-label="CryptoPatro home">
          <img src="/favicon.svg" width="34" height="34" alt="" />
          <span>
            cryptopatro<span className="brand-dot">.</span>
          </span>
        </a>
        <button className="workspace-picker" onClick={() => setDialog('privacy')}>
          <span className="workspace-avatar">{portfolio.is_demo ? 'D' : 'P'}</span>
          <span>
            <strong>{portfolio.is_demo ? 'Demo workspace' : 'My workspace'}</strong>
            <small>Personal portfolio</small>
          </span>
          <ChevronDown size={15} />
        </button>
        <div className="nav-label">YOUR SPACE</div>
        <nav aria-label="Main navigation">
          {nav.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${view === item.id ? 'active' : ''}`}
              aria-current={view === item.id ? 'page' : undefined}
              onClick={() => navigate(item.id)}
            >
              <item.icon size={19} strokeWidth={1.6} />
              <span>{item.label}</span>
              {item.id === 'overview' && <span className="nav-dot" />}
            </button>
          ))}
        </nav>
        <button className="nav-item copilot-nav" onClick={() => ask()}>
          <Sparkles size={19} strokeWidth={1.6} />
          <span>Ask Patro</span>
          <span className="tag-new">NEW</span>
        </button>
        <div className="sidebar-bottom">
          <div className="sidebar-card">
            <div className="little-orbit" aria-hidden="true">
              ✳
            </div>
            <h3>A portfolio worth sharing.</h3>
            <p>Your perspective, without your balance.</p>
            <button onClick={() => setDialog('share')}>
              Make a postcard <ArrowUpRight size={16} />
            </button>
          </div>
          <a className="nav-item sidebar-about" href="/about">
            <ShieldCheck size={18} strokeWidth={1.6} />
            <span>Open by design</span>
            <ExternalLink size={13} />
          </a>
          <a
            className="maker"
            href="https://github.com/dorukgezici"
            target="_blank"
            rel="noreferrer"
          >
            <span className="maker-avatar">dg</span>
            <span>
              Made with intention by
              <strong>
                Doruk Gezici <ArrowUpRight size={12} />
              </strong>
            </span>
          </a>
        </div>
      </aside>
      {mobileMenu && (
        <button
          className="mobile-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobileMenu(false)}
        />
      )}
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">
            <button
              className="icon-button mobile-menu"
              aria-label="Open navigation"
              onClick={() => setMobileMenu(true)}
            >
              <Menu size={21} />
            </button>
            <span>Workspace</span>
            <ChevronRight size={13} />
            <strong>{nav.find((n) => n.id === view)?.label}</strong>
          </div>
          <div className="topbar-actions">
            <a
              className="github-link"
              href="https://github.com/dorukgezici/CryptoPatro"
              target="_blank"
              rel="noreferrer"
            >
              <Code2 size={15} />
              <span>Open source</span>
              <ArrowUpRight size={12} />
            </a>
            <span className="topbar-divider" />
            <button
              className="icon-button"
              aria-label="Open price alerts"
              onClick={() => navigate('alerts')}
            >
              <Bell size={19} />
            </button>
            <button
              className="profile-avatar"
              aria-label="Portfolio privacy and browser storage"
              onClick={() => setDialog('privacy')}
            >
              You
            </button>
          </div>
        </header>
        <main id="main" className="dashboard">
          <section className="welcome">
            <div>
              <div className="eyebrow">
                <span className="status-dot" /> YOUR PERSONAL CRYPTO COMPANION
              </div>
              <h1>{heading}</h1>
              <p>
                {view === 'overview'
                  ? 'Less noise. A clearer picture of what you own.'
                  : view === 'holdings'
                    ? 'Every holding, every little detail. All in one calm place.'
                    : view === 'markets'
                      ? 'Six assets. The prices and context that matter.'
                      : 'Set a price, then check in on your own terms.'}
              </p>
            </div>
            <div className="welcome-actions">
              <button className="button secondary" onClick={() => setDialog('share')}>
                <Share2 size={15} />
                <span>Share portfolio</span>
              </button>
              <button
                className="button primary"
                onClick={() => (view === 'alerts' ? setDialog('alert') : addHolding())}
              >
                <Plus size={17} />
                {view === 'alerts' ? 'Create alert' : 'Add holding'}
              </button>
            </div>
          </section>
          {error && (
            <div className="error-banner" role="alert">
              <span>
                {error}{' '}
                {portfolio.is_demo
                  ? 'Showing the read-only sample.'
                  : 'Your saved portfolio is unchanged.'}
              </span>
              <button
                onClick={
                  invalidKey
                    ? () => {
                        clearToken();
                        setInvalidKey(false);
                        setError('');
                        setPortfolio(demoPortfolio);
                        addHolding();
                      }
                    : refresh
                }
              >
                {invalidKey ? 'Start a new portfolio' : 'Try again'}
              </button>
            </div>
          )}
          {portfolio.is_demo && (
            <div className="demo-banner">
              <span className="demo-badge">TAKE A LOOK AROUND</span>
              <p>You’re exploring a sample portfolio. Your own starts with one holding.</p>
              <button onClick={() => addHolding()}>
                Make it yours <ArrowRight size={15} />
              </button>
            </div>
          )}
          {view === 'overview' && (
            <>
              <div className="overview-grid">
                <section className="panel value-panel">
                  <div className="panel-top">
                    <span className="label">
                      Total portfolio value{' '}
                      <button
                        className="inline-icon"
                        aria-label={hidden ? 'Show balances' : 'Hide balances'}
                        onClick={() => setHidden(!hidden)}
                      >
                        {hidden ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </span>
                    <button
                      className={`icon-button refresh-button ${loading ? 'spinning' : ''}`}
                      onClick={refresh}
                      disabled={loading}
                      aria-label="Refresh prices"
                    >
                      <RefreshCw size={15} />
                    </button>
                  </div>
                  <div className="value-line">
                    <div className="big-value">
                      {balance(portfolio.total_value).split('.')[0]}
                      {!hidden && <span>.{balance(portfolio.total_value).split('.')[1]}</span>}
                    </div>
                    <span className="currency-tag">USD</span>
                  </div>
                  <div className="value-subline">
                    <Change value={portfolio.change_24h_pct} />
                    <span>
                      {hidden
                        ? '••••'
                        : `${portfolio.change_24h >= 0 ? '+' : '-'}${money(Math.abs(portfolio.change_24h))}`}{' '}
                      <span className="muted">estimated 24h move</span>
                    </span>
                  </div>
                  {hidden ? (
                    <div className="chart-empty">
                      <EyeOff size={27} />
                      <p>Balances are tucked away.</p>
                      <span>Allocation is still visible.</span>
                    </div>
                  ) : (
                    <PortfolioChart portfolio={portfolio} />
                  )}
                  <div className="value-footer">
                    <span
                      className={`source-dot ${portfolio.market.source === 'sample' ? 'sample' : ''}`}
                    />
                    {sourceLabel(portfolio.market.source)}
                    <span className="value-footer-time">
                      {ready
                        ? `As of ${new Date(portfolio.market.as_of).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`
                        : 'Illustrative preview'}
                    </span>
                  </div>
                </section>
                <div className="overview-right">
                  <section className="panel pnl-panel">
                    <div className="panel-top">
                      <span className="label">Unrealized profit & loss</span>
                      <ArrowUpRight size={18} className="muted" />
                    </div>
                    <div className="pnl-number">
                      {portfolio.profit_loss_pct === null ? (
                        'Cost basis needed'
                      ) : (
                        <>
                          {portfolio.profit_loss >= 0 && !hidden ? '+' : ''}
                          {balance(portfolio.profit_loss)}
                        </>
                      )}
                    </div>
                    <div className="pnl-bottom">
                      <Change value={portfolio.profit_loss_pct} compact />
                      <span>vs. entered cost</span>
                    </div>
                    <div className="cost-line">
                      <span>
                        {portfolio.profit_loss_pct === null
                          ? 'Recorded cost basis'
                          : 'Total cost basis'}
                      </span>
                      <strong>{balance(portfolio.total_cost)}</strong>
                    </div>
                  </section>
                  <section className="insight-panel">
                    <div className="insight-title">
                      <span className="sun-mark">✳</span>
                      <span>A LITTLE PERSPECTIVE</span>
                      <span className="insight-pill">PATRO</span>
                    </div>
                    <h2>{portfolio.insight.title}</h2>
                    <p>{portfolio.insight.description}</p>
                    <button
                      onClick={() => ask('Explain my portfolio concentration.')}
                      className="text-link"
                    >
                      Let’s unpack that <ArrowUpRight size={16} />
                    </button>
                    <div className="insight-decoration" aria-hidden="true">
                      ✳
                    </div>
                  </section>
                </div>
              </div>
              <div className="lower-grid">
                <HoldingsTable
                  holdings={holdings}
                  portfolio={portfolio}
                  balance={balance}
                  hidden={hidden}
                  onAdd={addHolding}
                  onEdit={(h) => {
                    if (portfolio.is_demo) addHolding(h.asset_id);
                    else {
                      setEdit(h);
                      setDialog('holding');
                    }
                  }}
                  onViewAll={() => navigate('holdings')}
                  compact
                />
                <section className="panel allocation-panel">
                  <div className="section-heading">
                    <h2>Your mix</h2>
                    <span className="small-muted">Allocation</span>
                  </div>
                  <AllocationRing allocation={portfolio.allocation} />
                  <div className="allocation-legend">
                    {portfolio.allocation.map((a) => (
                      <div key={a.asset_id}>
                        <span>
                          <i style={{ background: a.color }} />
                          {a.name}
                        </span>
                        <strong>
                          {a.pct.toFixed(1)}
                          <small>%</small>
                        </strong>
                      </div>
                    ))}
                  </div>
                  <button className="allocation-share" onClick={() => setDialog('share')}>
                    <Share2 size={14} /> Turn your mix into a postcard <ArrowRight size={14} />
                  </button>
                </section>
              </div>
              <section className="market-section">
                <div className="section-heading">
                  <div>
                    <h2>
                      Around the market{' '}
                      <span className="small-muted">{sourceLabel(portfolio.market.source)}</span>
                    </h2>
                  </div>
                  <button className="text-link" onClick={() => navigate('markets')}>
                    Explore markets <ArrowUpRight size={15} />
                  </button>
                </div>
                <div className="market-strip">
                  {portfolio.market.assets.slice(0, 4).map((asset) => (
                    <button
                      className="market-tile"
                      key={asset.id}
                      onClick={() => {
                        setSelectedAsset(asset.id);
                        navigate('markets');
                      }}
                    >
                      <div className="market-tile-top">
                        <CoinIcon symbol={asset.symbol} size="small" />
                        <strong>{asset.symbol}</strong>
                        <span>{asset.name}</span>
                      </div>
                      <div className="market-tile-bottom">
                        <strong>{money(asset.price)}</strong>
                        <Change value={asset.change_24h_pct} compact />
                      </div>
                      <Sparkline values={asset.sparkline} positive={asset.change_24h_pct >= 0} />
                    </button>
                  ))}
                </div>
              </section>
            </>
          )}
          {view === 'holdings' && (
            <>
              <div className="view-toolbar">
                <label className="search-input">
                  <Search size={17} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Find a holding..."
                    aria-label="Search holdings"
                  />
                </label>
                <span>
                  {portfolio.holdings.length} assets · {balance(portfolio.total_value)}
                </span>
              </div>
              <HoldingsTable
                holdings={holdings}
                portfolio={portfolio}
                balance={balance}
                hidden={hidden}
                onAdd={addHolding}
                onEdit={(h) => {
                  if (portfolio.is_demo) addHolding(h.asset_id);
                  else {
                    setEdit(h);
                    setDialog('holding');
                  }
                }}
              />
              <div className="method-note">
                <ShieldCheck size={18} />
                <p>
                  Holdings are entered by you. Profit and loss compares the latest quote with your
                  average buy price. Fees, sells, taxes, and realized returns are not included.
                </p>
              </div>
            </>
          )}
          {view === 'markets' && (
            <>
              <div className="view-toolbar">
                <label className="search-input">
                  <Search size={17} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Find an asset..."
                    aria-label="Search markets"
                  />
                </label>
                <button className="button secondary" disabled={loading} onClick={refresh}>
                  <RefreshCw size={15} />
                  Refresh
                </button>
              </div>
              <div className="market-grid">
                {portfolio.market.assets
                  .filter((a) =>
                    `${a.name} ${a.symbol}`.toLowerCase().includes(query.toLowerCase()),
                  )
                  .map((asset) => (
                    <article
                      className={`panel asset-card ${selectedAsset === asset.id ? 'asset-selected' : ''}`}
                      key={asset.id}
                    >
                      <div className="asset-card-top">
                        <CoinIcon symbol={asset.symbol} />
                        <div>
                          <h2>{asset.name}</h2>
                          <span>{asset.symbol}</span>
                        </div>
                        <Change value={asset.change_24h_pct} />
                      </div>
                      <div className="asset-price">{money(asset.price)}</div>
                      <Sparkline values={asset.sparkline} positive={asset.change_24h_pct >= 0} />
                      <div className="asset-card-foot">
                        <span>7 day price trend</span>
                        <button className="text-link" onClick={() => addHolding(asset.id)}>
                          Add holding <Plus size={15} />
                        </button>
                      </div>
                    </article>
                  ))}
              </div>
              <div className="method-note">
                <ChartNoAxesCombined size={19} />
                <p>
                  {portfolio.market.notice} Source: {sourceLabel(portfolio.market.source)}. Quotes
                  as of {new Date(portfolio.market.as_of).toLocaleString()}. Prices are indicative,
                  not execution quotes.
                </p>
              </div>
            </>
          )}
          {view === 'alerts' && (
            <>
              <div className="view-toolbar">
                <span>
                  {alerts.length} price {alerts.length === 1 ? 'alert' : 'alerts'}
                </span>
                <button className="button secondary" disabled={alertLoading} onClick={loadAlerts}>
                  <RefreshCw size={15} />
                  Check prices
                </button>
              </div>
              {alertError && (
                <p role="alert" className="form-error">
                  {alertError}
                </p>
              )}
              {alerts.length ? (
                <div className="alerts-list">
                  {alerts.map((alert) => (
                    <article className="panel alert-row" key={alert.id}>
                      <CoinIcon symbol={alert.symbol} />
                      <div>
                        <h2>
                          {alert.symbol} goes {alert.direction} {money(alert.target_price)}
                        </h2>
                        <span>
                          {alert.status === 'triggered'
                            ? 'Target was reached'
                            : 'Waiting for your price'}
                        </span>
                      </div>
                      <span className={`alert-status ${alert.status}`}>
                        {alert.status === 'triggered' ? (
                          <CheckCheck size={14} />
                        ) : (
                          <span className="status-dot" />
                        )}
                        {alert.status}
                      </span>
                      <button
                        className="icon-button"
                        aria-label={`Delete ${alert.symbol} alert`}
                        onClick={async () => {
                          try {
                            await api(`/alerts/${alert.id}`, { method: 'DELETE' });
                            await loadAlerts();
                            notify('Alert removed.');
                          } catch (e) {
                            setAlertError(errorMessage(e));
                          }
                        }}
                      >
                        <Trash2 size={17} />
                      </button>
                    </article>
                  ))}
                </div>
              ) : (
                <section className="panel empty-state">
                  <div className="empty-illustration">
                    <Bell size={34} strokeWidth={1.2} />
                    <span>✳</span>
                  </div>
                  <h2>Make room for a little less checking.</h2>
                  <p>
                    Pick an asset and a target price. We’ll check whether it’s been reached whenever
                    you open your alerts.
                  </p>
                  <button className="button primary" onClick={() => setDialog('alert')}>
                    <Plus size={17} />
                    Create your first alert
                  </button>
                </section>
              )}
              <div className="method-note">
                <Bell size={18} />
                <p>
                  These are in-app alerts, evaluated when you visit this page or select “Check
                  prices.” Background, email, and push notifications are not enabled. Sample prices
                  never trigger an alert.
                </p>
              </div>
            </>
          )}
          <footer className="dashboard-footer">
            <span>
              <span className="footer-logo">✳</span> A calmer corner of crypto.
            </span>
            <div>
              <a href="/about">How it works</a>
              <span>·</span>
              <a href="https://github.com/dorukgezici" target="_blank" rel="noreferrer">
                Built by Doruk Gezici <ArrowUpRight size={12} />
              </a>
            </div>
          </footer>
        </main>
        <button className="floating-copilot" onClick={() => ask()}>
          <Sparkles size={18} />
          Ask Patro<span className="keyboard-hint">↗</span>
        </button>
      </div>
      {toast && (
        <div className="toast" role="status">
          <Check size={17} />
          {toast}
        </div>
      )}
      {dialog === 'holding' && (
        <HoldingModal
          holding={edit}
          assetId={selectedAsset}
          portfolio={portfolio}
          onClose={() => {
            setDialog(null);
            setEdit(null);
          }}
          onSaved={async (message) => {
            setDialog(null);
            setEdit(null);
            await refresh();
            notify(message);
          }}
        />
      )}
      {dialog === 'alert' && (
        <AlertModal
          assets={portfolio.market.assets}
          onClose={() => setDialog(null)}
          onSaved={async () => {
            setDialog(null);
            navigate('alerts');
            await Promise.all([loadAlerts(), refresh()]);
            notify('Your price alert is ready.');
          }}
        />
      )}
      {dialog === 'share' && (
        <ShareModal portfolio={portfolio} onClose={() => setDialog(null)} notify={notify} />
      )}
      {dialog === 'privacy' && (
        <Modal title="Your space, your perspective." onClose={() => setDialog(null)}>
          <div className="privacy-content">
            <ShieldCheck size={35} className="accent" />
            <p>
              {portfolio.is_demo
                ? 'You’re in a read-only sample workspace. Add your first holding to create a private portfolio.'
                : 'Your holdings are saved on this server. A secret key in this browser gives you access.'}
            </p>
            <div className="privacy-fact">
              <Check size={17} />
              <span>No wallet connection. No exchange keys.</span>
            </div>
            <div className="privacy-fact">
              <Check size={17} />
              <span>Postcards only include the allocation you preview.</span>
            </div>
            <div className="privacy-fact">
              <Check size={17} />
              <span>Free and open source.</span>
            </div>
            <p className="small-muted">
              This release uses browser-based access. Clearing browser storage loses access to your
              portfolio. There is no account recovery or sync across devices.
            </p>
            <a className="button secondary" href="/about">
              Read the methodology <ArrowUpRight size={16} />
            </a>
          </div>
        </Modal>
      )}
      {copilot && (
        <CopilotPanel
          initialQuestion={initialQuestion}
          onClose={() => setCopilot(false)}
          portfolio={portfolio}
        />
      )}
    </div>
  );
}

function HoldingsTable({
  holdings,
  portfolio,
  balance,
  hidden,
  onAdd,
  onEdit,
  onViewAll,
  compact = false,
}: {
  holdings: Holding[];
  portfolio: Portfolio;
  balance: (n: number, digits?: number) => string;
  hidden: boolean;
  onAdd: (id?: string) => void;
  onEdit: (h: Holding) => void;
  onViewAll?: () => void;
  compact?: boolean;
}) {
  return (
    <section className="panel holdings-panel">
      <div className="section-heading">
        <h2>
          Your holdings <span className="count-badge">{portfolio.holdings.length}</span>
        </h2>
        {compact ? (
          <button className="text-link" onClick={onViewAll}>
            View all <ArrowUpRight size={14} />
          </button>
        ) : (
          <span className="small-muted">
            Tap an asset to {portfolio.is_demo ? 'add your own' : 'edit'}
          </span>
        )}
      </div>
      {holdings.length ? (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Asset</th>
                <th>Price / 24h</th>
                {!compact && <th>Quantity</th>}
                <th>Holdings</th>
                <th>{compact ? '7D price' : 'Unrealized P&L'}</th>
                <th>
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((h) => (
                <tr key={h.id}>
                  <td>
                    <button className="asset-name" onClick={() => onEdit(h)}>
                      <CoinIcon symbol={h.symbol} />
                      <span>
                        <strong>{h.name}</strong>
                        <small>{h.symbol}</small>
                      </span>
                    </button>
                  </td>
                  <td>
                    <strong>{money(h.price)}</strong>
                    <Change value={h.change_24h_pct} compact />
                  </td>
                  {!compact && (
                    <td>
                      <strong>
                        {hidden
                          ? '••••'
                          : h.quantity.toLocaleString('en-US', { maximumFractionDigits: 8 })}
                      </strong>
                      <small>{h.symbol}</small>
                    </td>
                  )}
                  <td>
                    <strong>{balance(h.value)}</strong>
                    <small>
                      {compact
                        ? hidden
                          ? `•••• ${h.symbol}`
                          : `${h.quantity.toLocaleString('en-US', { maximumFractionDigits: 6 })} ${h.symbol}`
                        : `${h.allocation_pct.toFixed(1)}% of portfolio`}
                    </small>
                  </td>
                  <td>
                    {compact ? (
                      <Sparkline values={h.sparkline} positive={h.change_24h_pct >= 0} />
                    ) : (
                      <>
                        <strong>
                          {h.profit_loss_pct === null
                            ? 'Cost basis needed'
                            : balance(h.profit_loss)}
                        </strong>
                        <Change value={h.profit_loss_pct} compact />
                      </>
                    )}
                  </td>
                  <td>
                    <button
                      className="icon-button row-action"
                      aria-label={`${portfolio.is_demo ? 'Add' : 'Edit'} ${h.name} holding`}
                      onClick={() => onEdit(h)}
                    >
                      {portfolio.is_demo ? <Plus size={16} /> : <Settings2 size={16} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="holdings-empty">
          <Wallet size={26} />
          <h3>{portfolio.holdings.length ? 'No holdings match.' : 'Start with what you own.'}</h3>
          <p>
            {portfolio.holdings.length
              ? 'Try another name or symbol.'
              : 'One asset is all it takes to see the bigger picture.'}
          </p>
        </div>
      )}
      <button className="add-holding-row" onClick={() => onAdd()}>
        <Plus size={15} />
        Add a holding <span>No exchange connection needed</span>
      </button>
    </section>
  );
}

async function ensureSession() {
  const existing = getToken();
  if (existing) return existing;
  // Check storage before creating a portfolio, so a blocked browser cannot silently lose access.
  localStorage.setItem('cryptopatro.storage-test', '1');
  localStorage.removeItem('cryptopatro.storage-test');
  const referral = new URLSearchParams(window.location.search).get('ref');
  const session = await api<{ token: string }>('/session', {
    method: 'POST',
    body: { seed_demo: false, ...(referral ? { referral } : {}) },
    token: null,
  });
  saveToken(session.token);
  return session.token;
}

function HoldingModal({
  holding,
  assetId,
  portfolio,
  onClose,
  onSaved,
}: {
  holding: Holding | null;
  assetId: string;
  portfolio: Portfolio;
  onClose: () => void;
  onSaved: (message: string) => Promise<void>;
}) {
  const [selected, setSelected] = useState(holding?.asset_id || assetId);
  const [quantity, setQuantity] = useState(holding?.quantity.toString() || '');
  const [cost, setCost] = useState(holding?.avg_cost.toString() || '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
  const asset = portfolio.market.assets.find((a) => a.id === selected)!;
  async function submit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setError('');
    setBusy(true);
    try {
      const token = await ensureSession();
      await api(holding ? `/holdings/${holding.id}` : '/holdings', {
        method: holding ? 'PATCH' : 'POST',
        token,
        body: {
          ...(holding ? {} : { asset_id: selected }),
          quantity: Number(quantity),
          avg_cost: Number(cost),
        },
      });
      await onSaved(holding ? 'Holding updated.' : 'Your holding is in. A little more clarity.');
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  async function remove() {
    setBusy(true);
    setError('');
    try {
      await api(`/holdings/${holding!.id}`, { method: 'DELETE' });
      await onSaved('Holding removed.');
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <Modal
      title={
        holding
          ? `Edit ${holding.name}`
          : portfolio.is_demo
            ? 'Make a little space for your crypto.'
            : 'Add a holding'
      }
      onClose={onClose}
    >
      <form className="modal-form" onSubmit={submit}>
        <p className="form-intro">
          {holding
            ? 'Update your quantity or average purchase price.'
            : 'No account, no wallet connection. Just what you own.'}
        </p>
        <label>
          Asset
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            disabled={!!holding}
          >
            {portfolio.market.assets.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} ({a.symbol})
              </option>
            ))}
          </select>
        </label>
        <div className="selected-quote">
          <CoinIcon symbol={asset.symbol} size="small" />
          <span>{asset.name}</span>
          <strong>{money(asset.price)}</strong>
          <small>{sourceLabel(portfolio.market.source)}</small>
        </div>
        <label>
          How much do you own?
          <div className="input-with-suffix">
            <input
              type="number"
              min="0.00000001"
              max="1000000000000"
              step="any"
              placeholder="0.00"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              autoFocus
            />
            <span>{asset.symbol}</span>
          </div>
        </label>
        <label>
          Average buy price per coin
          <div className="input-with-suffix">
            <input
              type="number"
              min="0"
              max="1000000000"
              step="any"
              placeholder="0.00"
              required
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
            <span>USD</span>
          </div>
          <small>Enter 0 if you don’t know it. Returns need an accurate cost basis.</small>
        </label>
        {quantity && Number(quantity) > 0 && (
          <div className="estimate-row">
            <span>Estimated current value</span>
            <strong>{money(Number(quantity) * asset.price)}</strong>
          </div>
        )}
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button className="button primary full-width" disabled={busy} type="submit">
          {busy ? <LoaderCircle className="spinning" size={17} /> : <Plus size={17} />}
          {holding ? 'Save changes' : 'Add to my portfolio'}
        </button>
        {portfolio.is_demo && (
          <p className="form-footnote">
            <ShieldCheck size={14} />
            Saved to a private portfolio accessible from this browser.
          </p>
        )}
        {holding && (
          <div className="delete-zone">
            {deleting ? (
              <>
                <span>Remove this holding?</span>
                <button type="button" className="danger-link" disabled={busy} onClick={remove}>
                  Yes, remove
                </button>
                <button type="button" className="text-link" onClick={() => setDeleting(false)}>
                  Keep it
                </button>
              </>
            ) : (
              <button type="button" className="danger-link" onClick={() => setDeleting(true)}>
                <Trash2 size={14} />
                Remove holding
              </button>
            )}
          </div>
        )}
      </form>
    </Modal>
  );
}

function AlertModal({
  assets,
  onClose,
  onSaved,
}: {
  assets: Asset[];
  onClose: () => void;
  onSaved: () => Promise<void>;
}) {
  const [assetId, setAssetId] = useState(assets[0].id);
  const [direction, setDirection] = useState('above');
  const [target, setTarget] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function submit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      const token = await ensureSession();
      await api('/alerts', {
        method: 'POST',
        token,
        body: { asset_id: assetId, direction, target_price: Number(target) },
      });
      await onSaved();
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <Modal title="A heads-up, on your terms." onClose={onClose}>
      <form onSubmit={submit} className="modal-form">
        <p className="form-intro">Choose a target. Check it here whenever you drop by.</p>
        <label>
          Watch this asset
          <select value={assetId} onChange={(e) => setAssetId(e.target.value)}>
            {assets.map((a) => (
              <option value={a.id} key={a.id}>
                {a.name} ({a.symbol})
              </option>
            ))}
          </select>
        </label>
        <label>
          When the price goes
          <select value={direction} onChange={(e) => setDirection(e.target.value)}>
            <option value="above">Above</option>
            <option value="below">Below</option>
          </select>
        </label>
        <label>
          Target price (USD)
          <input
            required
            autoFocus
            min="0.00000001"
            max="1000000000"
            type="number"
            step="any"
            placeholder="e.g. 75000"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />
        </label>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button className="button primary full-width" disabled={busy}>
          {busy ? <LoaderCircle size={17} className="spinning" /> : <Bell size={17} />}Create price
          alert
        </button>
        <p className="form-footnote">
          Checked in-app when you visit. No push or email notifications.
        </p>
      </form>
    </Modal>
  );
}

function ShareModal({
  portfolio,
  onClose,
  notify,
}: {
  portfolio: Portfolio;
  onClose: () => void;
  notify: (s: string) => void;
}) {
  const [title, setTitle] = useState('A little crypto perspective.');
  const [showReturn, setShowReturn] = useState(false);
  const [share, setShare] = useState<Share | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [previous, setPrevious] = useState<Share[]>([]);
  useEffect(() => {
    if (!portfolio.is_demo)
      api<{ shares: Share[] }>('/shares')
        .then((result) => setPrevious(result.shares))
        .catch((e) => setError(errorMessage(e)));
  }, [portfolio.is_demo]);
  async function create() {
    setBusy(true);
    setError('');
    try {
      const created = await api<Share>('/shares', {
        method: 'POST',
        body: { title, include_performance: showReturn },
        token: portfolio.is_demo ? null : undefined,
      });
      setShare(created);
      if (!created.is_demo) setPrevious((p) => [created, ...p]);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/share/${share!.slug}`);
      notify('Postcard link copied.');
      trackEvent('share_copy', share!.slug);
    } catch {
      setError('Copy the link below to share your postcard.');
    }
  }
  async function revoke(slug = share!.slug) {
    setBusy(true);
    setError('');
    try {
      await api(`/shares/${slug}`, { method: 'DELETE' });
      if (share?.slug === slug) setShare(null);
      setPrevious((p) => p.filter((s) => s.slug !== slug));
      notify('The public postcard link has been removed.');
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <Modal title="A perspective worth passing on." onClose={onClose} wide>
      <div className="share-modal-content">
        <p className="form-intro">Share your mix. Keep your balance to yourself.</p>
        <Postcard
          title={share?.title || title}
          allocation={share?.allocation || portfolio.allocation}
          performance={
            share ? share.profit_loss_pct : showReturn ? portfolio.profit_loss_pct : null
          }
          isDemo={share ? share.is_demo : portfolio.is_demo}
          source={share?.data_source || portfolio.market.source}
          asOf={share?.as_of || portfolio.market.as_of}
        />
        {!share ? (
          <>
            <label className="share-title-field">
              Give your postcard a title
              <input
                maxLength={60}
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={showReturn}
                onChange={(e) => setShowReturn(e.target.checked)}
              />
              Include unrealized return percentage
            </label>
            <div className="share-privacy">
              <ShieldCheck size={17} />
              <span>
                Public: asset names and allocation. Hidden: balances, quantities, and cost basis.
                {portfolio.is_demo
                  ? ' This sample postcard is public and cannot be revoked.'
                  : ' You can remove your public links here anytime.'}
              </span>
            </div>
            <button
              className="button primary full-width"
              disabled={busy || !title.trim() || !portfolio.allocation.length}
              onClick={create}
            >
              {busy ? <LoaderCircle size={17} className="spinning" /> : <Share2 size={17} />}Create
              public postcard
            </button>
          </>
        ) : (
          <>
            <div className="share-success">
              <Check size={17} />
              Your postcard has its own little corner of the internet.
            </div>
            <input
              className="share-url"
              aria-label="Public postcard URL"
              readOnly
              value={`${window.location.origin}/share/${share.slug}`}
              onFocus={(e) => e.target.select()}
            />
            <div className="share-actions">
              <button className="button primary" onClick={copy}>
                <Copy size={16} />
                Copy link
              </button>
              <button
                className="button secondary"
                onClick={async () => {
                  try {
                    await downloadPostcard(share);
                    trackEvent('share_download', share.slug);
                  } catch (e) {
                    setError(errorMessage(e));
                  }
                }}
              >
                <Download size={16} />
                Save image
              </button>
              <a
                className="button secondary icon-button"
                href={`/share/${share.slug}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Open public postcard"
              >
                <ExternalLink size={16} />
              </a>
            </div>
            {!share.is_demo && (
              <button className="danger-link revoke-link" disabled={busy} onClick={() => revoke()}>
                Remove this public link
              </button>
            )}
          </>
        )}
        {previous.length > 0 && !share && (
          <section className="previous-shares">
            <h3>Your published postcards</h3>
            <p>Removing a link makes the postcard and its image unavailable.</p>
            {previous.map((s) => (
              <div key={s.slug}>
                <a href={`/share/${s.slug}`} target="_blank" rel="noreferrer">
                  {s.title}
                  <ExternalLink size={12} />
                </a>
                <button
                  className="icon-button"
                  aria-label={`Remove postcard ${s.title}`}
                  disabled={busy}
                  onClick={() => revoke(s.slug)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </section>
        )}
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
      </div>
    </Modal>
  );
}

function CopilotPanel({
  initialQuestion,
  onClose,
  portfolio,
}: {
  initialQuestion: string;
  onClose: () => void;
  portfolio: Portfolio;
}) {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<
    { question: string; reply?: ChatReply; error?: string }[]
  >([]);
  const [busy, setBusy] = useState(false);
  const initialized = useRef(false);
  const end = useRef<HTMLDivElement>(null);
  async function send(text: string) {
    if (!text.trim() || busy) return;
    setBusy(true);
    setQuestion('');
    setMessages((m) => [...m, { question: text }]);
    try {
      const reply = await api<ChatReply>('/chat', {
        method: 'POST',
        body: { message: text },
        token: portfolio.is_demo ? null : undefined,
      });
      setMessages((m) => [...m.slice(0, -1), { question: text, reply }]);
    } catch (e) {
      setMessages((m) => [...m.slice(0, -1), { question: text, error: errorMessage(e) }]);
    } finally {
      setBusy(false);
    }
  }
  useEffect(() => {
    if (initialQuestion && !initialized.current) {
      initialized.current = true;
      void send(initialQuestion);
    }
  }, []);
  useEffect(() => {
    end.current?.scrollIntoView({ behavior: 'auto' });
  }, [messages, busy]);
  return (
    <Modal title="A little help from Patro." onClose={onClose} wide>
      <div className="copilot-content">
        <div className="copilot-context">
          <Sparkles size={16} />
          <span>
            Grounded in {portfolio.is_demo ? 'the sample' : 'your'} portfolio ·{' '}
            {sourceLabel(portfolio.market.source)}
          </span>
        </div>
        <div className="chat-scroll" aria-live="polite">
          {!messages.length && (
            <div className="copilot-welcome">
              <div className="copilot-symbol">✳</div>
              <h3>Less jargon. More understanding.</h3>
              <p>
                Ask about your mix, your cost basis, or what’s driving your portfolio. Patro works
                with the numbers you see here.
              </p>
              <div className="suggested-questions">
                {[
                  'How concentrated is my portfolio?',
                  'Explain my profit and loss.',
                  'What is driving my daily move?',
                ].map((q) => (
                  <button key={q} onClick={() => send(q)}>
                    {q}
                    <ArrowUpRight size={14} />
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <div className="chat-exchange" key={i}>
              <div className="chat-question">{m.question}</div>
              {m.reply ? (
                <div className="chat-reply">
                  <div className="chat-mode">
                    <Sparkles size={14} />
                    {m.reply.mode === 'ai' ? 'PATRO AI' : 'LOCAL PORTFOLIO SUMMARY'}
                  </div>
                  <p>{m.reply.message}</p>
                  {m.reply.highlights.length > 0 && (
                    <div className="chat-highlights">
                      {m.reply.highlights.map((h) => (
                        <div key={h.label}>
                          <span>{h.label}</span>
                          <strong>{h.value}</strong>
                          <small>{h.detail}</small>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="chat-disclaimer">{m.reply.disclaimer}</p>
                </div>
              ) : m.error ? (
                <p className="form-error" role="alert">
                  {m.error}
                </p>
              ) : (
                <div className="chat-thinking">
                  <LoaderCircle size={16} className="spinning" />
                  Getting a little perspective...
                </div>
              )}
            </div>
          ))}
          <div ref={end} />
        </div>
        <form
          className="chat-input"
          onSubmit={(e) => {
            e.preventDefault();
            void send(question);
          }}
        >
          <input
            aria-label="Ask Patro a question"
            placeholder="What would you like to understand?"
            value={question}
            maxLength={1000}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={busy}
          />
          <button
            className="icon-button"
            aria-label="Send question"
            disabled={busy || !question.trim()}
          >
            <Send size={18} />
          </button>
        </form>
        <p className="form-footnote">
          Portfolio context, not investment advice. Without an AI key, Patro provides a labeled
          local summary. Each question is independent.
        </p>
      </div>
    </Modal>
  );
}
