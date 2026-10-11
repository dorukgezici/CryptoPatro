# CryptoPatro: product, design, and growth strategy

Research date: 11 October 2026. This document records the product decision behind the rebuild. Strategy is a testable hypothesis, not a promise of virality. Final feature availability is documented in the README.

## 1. Product brief

- **Audience:** independent crypto holders who want a useful portfolio view without a trading terminal or an exchange integration project.
- **Original vision:** a personal cryptoasset portfolio tracker and assistant. The original README describes Binance portfolio and coin P/L, Telegram reporting, and a future signal assistant.
- **Current promise:** understand what you own, what changed, and where your portfolio is concentrated, in one calm screen.
- **Primary action:** start a personal portfolio by adding a holding at `/?start=1`. The dashboard opens this flow directly; no exchange credentials are required.
- **Secondary action:** open the share composer at `/?share=1` and create an allocation snapshot from the sample or personal portfolio. Preview the public fields before creating it.
- **Growth destination:** every snapshot returns visitors to the portfolio starter and credits [Doruk Gezici](https://github.com/dorukgezici).
- **Available proof:** working sample dashboard, visible calculations, transparent data freshness, source code, and a named maker. There are no verified customer counts, testimonials, returns, or endorsements to publish.
- **Tone:** editorial, warm, concise, and numerically precise. Avoid hype, trading urgency, forecasts, and suggestions that tracking creates returns.
- **Commercial position:** a useful free public project for maker visibility. No pricing fiction, payment flow, or waitlist that blocks trying the product.
- **Visual memory:** warm paper, ink numerals, and one vivid orange line. The screenshot should look like CryptoPatro before the viewer reads its logo.

## 2. Existing product and scope gaps

The following findings came from the original checkout before replacement, not a claim about the rebuilt implementation.

| Evidence | Product implication | Rebuild decision |
| --- | --- | --- |
| README promises portfolio, per-asset P/L, Telegram reporting, and future signals. | The central job is understanding holdings. Trade execution is a future idea. | Deliver tracking and explanation before external execution. |
| The auth component sets the entered email string as the token. Its GitHub button has no action. | The old onboarding looks complete but does not establish a usable account flow. | Provide an honest working local portfolio first, with any account scope stated clearly. |
| The original analytics component contains a heading only. | Navigation overstates the product. | Every visible navigation item needs a useful implemented view or must be removed. |
| The original `BinanceAuth` model uses plain character fields for API secrets; encryption is commented out. | Reusing exchange setup would introduce needless risk and user hesitation. | Launch without exchange secrets or custody. |
| Portfolio refresh requires a Telegram user and a Celery task. | Useful tracking is blocked by unrelated integration setup. | Manual holdings must work immediately and persist across reloads. |
| Asset models store current values but there is no portfolio valuation history model. | A historical chart cannot honestly represent the user's actual holdings through time. | Name chart methodology explicitly. Current holdings revalued using older prices is hypothetical history. |
| P/L logic aggregates buys and sells, truncates trade retrieval at 1,000 per pair, and infers BTC conversion from a nearby trade. | Those figures cannot be silently presented as complete accounting or tax reporting. | Define current cost basis and unrealized P/L. Do not imply realized returns, tax accuracy, or complete transaction accounting. |
| A balances dictionary is initialized outside the per-user synchronization loop. | The legacy synchronizer can retain assets between users. | Retire the legacy synchronization path instead of reusing its business logic. |
| The frontend contained a wide multi-column holdings table and a mobile auth placeholder image. | The mobile journey was not designed as a real primary experience. | Mobile gets full onboarding, useful holdings rows, accessible dialogs, and the same actions as desktop. |

### Smallest complete product

1. An immediately visible, clearly labeled sample portfolio demonstrates the core experience.
2. A person can start their own portfolio, add/edit/remove an asset and quantity, supply average buy price, and return after reloading without losing the data.
3. The dashboard calculates total value, current allocation, current market change, and unrealized P/L using disclosed formulas and timestamps.
4. A portfolio assistant explains concentration, contributions, and limitations using actual portfolio data. A deterministic summary remains useful when an AI provider is unavailable and is labeled accordingly.
5. Sharing creates a real immutable public allocation snapshot and an attractive downloadable card. It excludes quantities, cost basis, balances, account identifiers, and private prompts.
6. A visitor can open that snapshot, understand exactly what is public, and create their own portfolio from the same page.
7. The maker link and referral events close the growth loop without requiring an email address or social account.

### Confirmed release behavior and README limitations

- Backend: FastAPI and Pydantic AI. Frontend: Astro with React interactions. Package versions and migration notes belong in the implementation documentation after registry verification.
- Manual holding CRUD is the actual onboarding path. There is no claim that Binance synchronization or Telegram integration remains available after the rewrite.
- Valuation is a current snapshot computed from stored holdings. It is not a transaction ledger or a verified historical portfolio performance record.
- Market quotes come from CoinGecko when available. A clearly identified sample-price fallback keeps the demonstration usable when the provider cannot be reached. Sample prices must never appear with a live status label.
- Price alerts are checked when the user views the application. Copy must say **In-app alerts** and explain that they do not run in the background or send push, email, or Telegram notifications.
- The portfolio assistant uses the configured model only when the provider is available. Without a provider key it returns an explicitly labeled local summary. The README must explain how to enable AI without making the app unusable without it.
- Public shares are saved allocation snapshots, not continuously updated public portfolios.
- Launch and publishing still require a real deployed origin, configured provider credentials where needed, persistent storage, and the actual production routing configuration. A local demo is not a public launch.

Full transaction accounting, tax reports, exchange synchronization, wallet signatures, order execution, price targets, and automated trading are separate future products. They are not necessary to make this tracking product complete.

## 3. Reference research

These four live official sites were inspected as page content and in a browser. The observations below are design analysis, not endorsements or claims about CryptoPatro.

### Copilot Money

Source: [copilot.money](https://www.copilot.money/).

The hero places a very large outcome statement at center stage, with a single action directly below it. The product sections show specific transactions, balances, allocation, and small interactions instead of relying on a generic feature list. Its trial section explicitly offers exploration before connecting an account. Borrow the sequence from immediate benefit to working demonstration to commitment. Use a real sample portfolio in our first screen and make the transition to personal data one small step. Do not import its decorative floating tags or dark canvas: the dashboard needs immediate numerical focus.

### Monarch

Source: [monarch.com](https://www.monarch.com/).

The visible hero uses a warm cream field, near-black type, a serif contrast within the headline, and a confident orange action. A slim pale navigation bar leaves the page visually calm. The narrative groups capabilities around practical money questions rather than internal product names. Borrow the warmth, restrained type contrast, and outcome-oriented labels. CryptoPatro should use dark tabular numerals for the data and reserve editorial type for section introductions. Avoid the reference's expansive empty hero space in the application: the product should occupy the first viewport.

### Zerion

Source: [zerion.io](https://zerion.io/).

The hero places one concrete wallet preview beside a short promise and two clear levels of action. The preview makes the portfolio model understandable without asking a newcomer to interpret infrastructure language. The page separates portfolio tracking, trading, and market discovery into clear jobs. Borrow that hierarchy and the prominent visible product. CryptoPatro's preview should show a real interactive portfolio instead of a rendered phone. Keep tracking and explanation as the launch story, with no trading affordances. Do not reuse Zerion's numbers, trust badges, or ecosystem claims.

### Linear

Source: [linear.app](https://linear.app/).

The current hero pairs a tightly controlled large headline with a detailed working-looking product scene. A thin ruled navigation, modest utility text, and restrained color establish hierarchy before the viewer encounters dense data. Product chapters use named workflows and concrete states. Borrow fine separators, consistent spacing, quiet navigation, and the discipline of one primary story per view. Use these structural moves in a warm visual system rather than copying the black background. The first screenshot initially showed only navigation while content appeared later, reinforcing why our sample and essential copy must render before optional animation.

## 4. Design directions and decision

| Direction | Ingredients | Strength | Decision |
| --- | --- | --- | --- |
| **The portfolio journal** | Monarch warmth, Linear structure, ink type, warm paper, orange chart, editorial display face | Legible, recognizable in a social feed, human, and appropriate for a calm daily check-in | Selected |
| **The precise instrument** | Graphite canvas, cool gray dividers, monospace labels, neon positive data, tightly packed rows | Familiar to active traders and powerful for dense monitoring | Rejected because it encourages terminal complexity and looks interchangeable with trading dashboards |
| **The collectible postcard** | Large colored allocation blocks, playful typography, vibrant card variants, minimal data | Highly shareable and accessible to newcomers | Use as a contained sharing moment, not as the entire dashboard |

### Selected system

- **Canvas:** paper `#F7F5EE`; secondary panels `#FFFEF9`; deep ink `#22251F`; orange accent `#F15A24`; quiet rules `#DFE1D7`; subdued olive-gray metadata. Validate final contrast in implementation.
- **Typography:** one expressive display face for page headlines paired with a precise sans-serif for controls and figures. Numerals use tabular spacing. Main portfolio value has a visibly different scale from labels.
- **Shape:** mostly flat surfaces, 1px separators, restrained 12 to 20px corner radii. Avoid making every content group a floating rounded card.
- **Composition:** desktop uses a compact navigation rail or top bar, a dominant value-and-chart area, a narrower intelligence/allocation area, and a full-width holdings table. Mobile presents value, chart, summary, then holdings in reading order.
- **Color discipline:** orange means product action and featured data. Positive/negative movement also has signs and text, never color alone.
- **One signature interaction:** the allocation preview visibly becomes a share postcard. It connects the main product to the growth artifact, rather than adding decorative motion.
- **Motion:** a short chart entrance and responsive hover/focus states. No ticker shouting, confetti, perpetual pulse, or animated profit counters. Reduced motion retains all content and state.
- **Legibility:** visible focus rings, meaningful empty states, 44px touch controls where practical, labelled chart summaries, and a mobile menu with desktop navigation parity.

## 5. UI and marketing copy contract

Copy describes actual behavior. Select the wording that matches the implemented state rather than publishing all alternatives.

### Global and dashboard

| Location | Copy |
| --- | --- |
| Brand | CryptoPatro |
| Short promise | Your crypto, in perspective. |
| Dashboard heading | Your portfolio. A clearer picture. |
| Dashboard intro | See what you own, what moved, and what deserves a closer look. |
| Main navigation | Overview · Markets · Insights |
| Sample state | Sample portfolio |
| Sample explanation | Explore with example holdings, then make it yours. |
| Primary action | Start my portfolio |
| Returning user action | Add holding |
| Secondary action | Share snapshot |
| Value label | Portfolio value |
| Cost basis label | Total cost |
| Current P/L label | Unrealized return |
| Current change label | Market change · 24h |
| Allocation label | Your allocation |
| Holdings heading | What you own |
| Holdings columns | Asset · Price · 24h · Holdings · Value · Return |
| Data timestamp | Prices updated {time} |
| Sample market badge | Sample prices |
| Stale market badge | Last available prices |
| Source footnote | Prices from {provider}. Updated {time}. |
| Hypothetical history caption | Current holdings at past prices. Deposits, withdrawals, and trades are not included. |
| True snapshot history caption | Recorded portfolio values since {date}. Changes can include deposits and withdrawals. |
| Balance visibility action | Hide balances / Show balances |
| Maker attribution | Built by Doruk Gezici |

### In-app price alerts

- Heading: **A price worth watching.**
- Inputs: **Asset**, **Above / Below**, **Target price (USD)**.
- Save action: **Create alert**.
- Explanation: **Checked when you open CryptoPatro. No background notifications.**
- Triggered state: **{symbol} is {above/below} your ${target} target.**
- Empty state: **Set a price to watch. You'll see a notice here when it is reached.**
- Unavailable-price state: **Waiting for a current market price.** Sample prices must not trigger an alert that appears to describe a real market event.

### First holding and management

- Heading: **Make it your portfolio.**
- Body: **Add your first holding. No exchange connection needed.**
- Inputs: **Asset**, **Quantity**, **Average buy price (USD)**.
- Asset search: **Search name or symbol**.
- Quantity helper: **The amount you currently hold.**
- Average price helper: **Your average cost per coin. Used to estimate unrealized return.**
- Save action: **Add to portfolio**.
- Edit action: **Save changes**.
- Optional unknown cost state: **I don't know my average price.** Only expose this option if calculations and UI support unknown cost without inventing returns.
- Validation: **Enter a quantity greater than zero.** / **Enter a valid average price.** / **Choose an asset from the list.**
- Error: **We couldn't save that holding. Your other holdings are unchanged. Try again.**
- Success: **{symbol} added to your portfolio.**
- Empty dashboard: **A clearer picture starts with one holding.**
- Remove action: **Remove {symbol}**.
- Remove explanation: **This removes the holding from your tracker. It does not sell or move any crypto.**
- Persistence note must name the real storage behavior. For browser storage: **Saved in this browser. Clearing site data removes your portfolio.** For a server-backed capability session: **Saved for this browser session. Keep your recovery link private.** Do not promise cross-device sync without an implemented account or recovery flow.

### Portfolio assistant

- Heading: **A little perspective.**
- Intro: **Ask about your allocation, changes, or concentration.**
- Suggested questions: **What is driving my portfolio?** / **Where am I most concentrated?** / **Explain my return.**
- Input: **Ask about your portfolio...**
- Button: **Ask Patro**.
- Working state: **Looking at your portfolio...**
- Provider-offline state: **Portfolio summary** with **A calculated overview of your holdings. AI answers are unavailable right now.**
- Error: **That answer didn't arrive. Your portfolio is still available. Try again.**
- Boundary note: **Information about your holdings, not a prediction or a trading instruction.**
- Answer format: one conclusion, two or three numeric supporting facts, one clearly stated limitation. No invented market news, future prices, or unqualified buy/sell orders.

### Share composer and public page

- Composer heading: **Your portfolio, without the balance.**
- Intro: **Share the mix. Keep the amounts to yourself.**
- Preview badge: **Public snapshot preview**.
- Privacy copy: **Includes asset names and allocation percentages. Balances, quantities, and buy prices stay private.**
- Data notice: **Anyone with the link can view this snapshot.**
- Main action: **Create share link**.
- Follow-up actions: **Copy link** and **Download card**.
- Success: **Link copied. Ready when you are.**
- Error: **We couldn't create the snapshot. Nothing was shared. Please try again.**
- Read-only public heading: **A portfolio in perspective.**
- Public timestamp: **Allocation snapshot · {date}**.
- Public sample badge: **Sample portfolio** whenever the source is the demo.
- Public clarification: **A saved view of an allocation, not a live portfolio.**
- Public CTA: **Build my portfolio**.
- Public CTA helper: **Start with one holding. No exchange connection needed.**
- Card footer: **Made with CryptoPatro · Built by Doruk Gezici**.
- Avoid adding performance percentages unless the period and methodology are truly defined and the person explicitly includes them.

### About and trust narrative

1. **Your crypto, in perspective.** Track holdings, understand your allocation, and get clear explanations in one place.
2. **Start with what you own.** Add coins and quantities yourself. You don't need to connect an exchange or share a key.
3. **Understand the numbers.** Portfolio value is quantity times price. Unrealized return compares current value with the cost you entered. Price sources and update times stay visible.
4. **A useful assistant, grounded in your portfolio.** Ask about concentration and the numbers on your screen. The assistant explains; it does not place trades.
5. **Share the mix. Keep the amounts.** Make an allocation snapshot that can travel without your balance.
6. **Built in the open by Doruk Gezici.** A personal project for making crypto portfolios easier to understand. Explore the source and follow the work through the maker's verified GitHub profile.

Closing paths: **Make it yours** opens holding onboarding; **Explore first** returns to the sample dashboard. Do not add a repeated wall of identical signup buttons.

### SEO copy

- Title: **CryptoPatro | Your crypto, in perspective**.
- Description: **Track your crypto holdings, understand your allocation, and share a portfolio snapshot without exposing your balance. Built by Doruk Gezici.**
- Shared page title: **A portfolio in perspective | CryptoPatro**.
- Shared page description: **Explore this saved crypto allocation, then build your own portfolio. Asset percentages only. Balances stay private.**
- Public share metadata must be server-rendered so crawlers can preview it. Use absolute canonical and OG URLs derived from the deployed origin, never a guessed production domain.
- Public share pages should be unlisted with `noindex` unless deliberate public discovery is implemented. Search indexing is different from link sharing.

## 6. Growth loop that can actually ship

### The loop

`Useful sample dashboard -> first personal holding -> clear allocation -> attractive snapshot -> visitor understands snapshot -> visitor creates portfolio -> another snapshot`

The artifact is the distribution channel. The maker credit lives on the card, on the public page, and in the app footer. It links to the verified GitHub profile, with any additional social links added only after verification. People share because the artifact represents their thinking clearly, not because a reward makes them recruit friends.

### Implementation contract

1. The user explicitly opens the composer. The preview renders exactly the fields that will become public.
2. A snapshot stores a rounded allocation, its creation time, a source indicator such as sample or personal, and a human-readable optional title. Server schemas accept only the intended public fields and reject accidental balances or quantities.
3. The snapshot uses an unguessable public ID and never reuses the private portfolio access token. It is immutable; later portfolio edits cannot leak through the old link.
4. Copying produces the public page URL. Native share can be an enhancement; clipboard and download work independently. No tool posts to a social network automatically.
5. The public page includes a portrait-quality or landscape card, a real preview image, a maker link, and a working start action. PNG previews are preferable for broad social crawler support; SVG is a useful downloadable format but should not be assumed to unfurl everywhere.
6. The public CTA includes a bounded referral identifier. The first portfolio creation request reads it from the current URL; the backend accepts it only if it identifies an existing snapshot. It is stored on that portfolio and used for its activation event. This release has no attribution cookie, visitor identifier, cross-browser matching, or attribution expiry window. Returning later without that query loses the source before portfolio creation. Do not put private portfolio data in URLs or analytics.
7. Add per-origin rate limits and output limits to public creation, AI, and analytics endpoints. Rate limits protect the first successful traffic spike from overwhelming external providers.

Confirmed route contract:

| Journey | Target |
| --- | --- |
| Dashboard and sample | `/` |
| Start onboarding | `/?start=1` |
| Open snapshot composer | `/?share=1` |
| Public snapshot | `/share/{slug}` |
| Referred onboarding | `/?start=1&ref={slug}` |
| Methodology and maker story | `/about` |
| Maker profile | `https://github.com/dorukgezici` |

The two query actions must work on a direct page load as well as from a button inside the app. Slugs are public snapshot identifiers, not private portfolio access tokens. Verify these targets against the deployed routing in the integration pass.

### Shipped event contract

The event table stores an allowlisted name, an optional validated public snapshot slug, and a timestamp. It has no anonymous visitor ID, browser fingerprint, device class, IP address, email address, prompt, or portfolio amounts. Existing portfolio access tokens are authorization credentials and are not analytics identifiers. Retention is 90 days. Browser events are best-effort reports and can be missed or repeated; counts are not unique people.

| Event | Recorded by | Meaning |
| --- | --- | --- |
| `session_created` | Backend | A new private portfolio workspace was created. This can happen before a holding is saved. |
| `portfolio_activated` | Backend | A portfolio first received a manually saved holding. Recorded once per portfolio, in the same transaction as the save. Edit, delete, and re-add do not create another activation. |
| `referral_activated` | Backend | That first manual holding belonged to a portfolio whose initial creation had a valid snapshot referral. Recorded with its one-time activation. |
| `share_created` | Backend | A public snapshot was successfully persisted. Its slug is attached to the event. |
| `share_view` | Browser | A public snapshot page loaded and sent its view event. Reloads can count again; this is not unique visitors. |
| `share_copy` | Browser | A public snapshot link was copied successfully. This does not prove publication or a resulting visit. |
| `share_download` | Browser | A postcard image was downloaded. This does not prove it was posted. |
| `start_clicked` | Browser | A start action was selected. A click alone is not activation. |
| `maker_clicked` | Browser | A maker-profile link was selected. This measures visibility actions, not unique people, profile loads, follows, or business outcomes. |

Primary product signal: count of `portfolio_activated` events in the reporting window. Primary maker visibility signal: count of `maker_clicked` events. Distribution signals: `share_created`, `share_view`, and `referral_activated`. Report the raw counts together and explain their different meanings.

The shipped read-only report is `python -m cryptopatro.growth`, run from `backend` with the same database configuration as the app. It returns aggregate counts for trailing 7-day and 30-day UTC windows plus current saved snapshot totals split between demo and personal portfolios. [The launch playbook](launch-playbook.md) gives the runnable commands and review cadence. The report returns no tokens, balances, IP addresses, or individual slugs and does not contact a third-party analytics service. Existing portfolios with holdings are marked active during migration without fabricating earlier activation events.

Counts from the same date window are not necessarily one cohort. A visitor can arrive before the window and activate during it; the same person can create multiple portfolios; one snapshot can generate multiple view events. Ratios such as activations divided by share views can help generate questions but must not be presented as verified person-level conversion rates. Neither weekly active users nor unique maker clickers is measured by this release.

There are no launch targets or traffic claims yet. Establish a baseline after real traffic exists. Do not add private access tokens, asset quantities, balances, prompts, email addresses, full IP addresses, or external referrer URLs to analytics payloads.

### Later measurement experiments, not shipped instrumentation

- A minimal `demo_viewed` event could distinguish sample impressions from public postcard views if that distinction becomes necessary.
- A bounded source field could compare maker-link placement. Current `maker_clicked` totals do not attribute every click to a specific surface.
- A holding-success funnel could distinguish input errors from completed portfolio creation. The launch already records first activation; it does not record every field interaction or every later holding edit.
- Retention or unique-visitor measurement would require a deliberate privacy decision and additional instrumentation. Do not infer it from current event counts.
- Any future referral persistence or expiry policy must be implemented and disclosed before claiming cross-visit or cross-browser attribution.

### Launch and follow-through

- **Launch artifact:** a short screen recording that starts on the sample, adds a holding, asks one grounded question, and produces the card. The product does the explaining.
- **Maker narrative:** publish a concrete before/after build story with the original repository context, design decisions, and working link. The maker can choose to post it; this strategy does not authorize automated messages or publishing.
- **Audience fit:** submit to communities where portfolio tracking, open-source finance tools, and independent product development are relevant. Follow each community's rules and answer concrete feedback.
- **Return value:** useful updated valuation and a clear portfolio summary. Do not depend on urgency notifications, artificial streaks, or aggressive trading prompts.
- **Iteration:** use aggregate counts to locate a question, then inspect the journey and ask willing testers what happened. Many share views with few referred activations suggest reviewing the public start flow, but the counts alone do not prove where individuals dropped off. If maker-click events are sparse, improve the maker story and placement before making attribution more intrusive.
- **Later experiments:** a shareable allocation explainer, a factual weekly portfolio review with opt-in delivery, and thoughtful educational pages that answer real user questions. These are experiments, not launch promises.

## 7. Acceptance criteria

- The first screen is useful, distinctive, and explicitly labeled when it contains sample data.
- Every visible button, navigation item, and market filter has a working result.
- First personal holding works on mobile and desktop; edit, remove, validation, persistence, and network errors are handled.
- Every chart and return figure has a defensible basis. Sample, cached, and live prices are distinguishable.
- The assistant uses portfolio facts and handles provider unavailability without presenting a rule-based fallback as AI.
- Public shares do not expose balances, quantities, cost basis, private tokens, or prompts through visible content, markup, metadata, API response, or URL.
- A complete share-to-new-portfolio loop works in a second browser session.
- The maker attribution links to a verified profile and events distinguish real success from attempts.
- Desktop and narrow mobile screenshots pass a visual review for hierarchy, clipping, contrast, and touch controls.
- Keyboard, reduced-motion, empty, loading, stale, offline, and no-JavaScript informational states remain legible.
- Headings, canonical URLs, metadata, social previews, and useful legal/methodology pages are real and internally consistent.
- No fabricated customers, inflated performance claims, placeholder links, or viral-growth guarantees appear in the product.
