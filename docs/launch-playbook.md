# CryptoPatro launch playbook

Prepared 11 October 2026. These are launch instructions and copy drafts. Nothing in this document has been published, and no traffic or conversion result is claimed.

## What this launch is trying to achieve

Give someone a useful portfolio view immediately, let them make a good-looking allocation postcard, and give the next person a reason to try the product. Credit Doruk Gezici on the artifact and its destination page so the useful thing leads back to its maker.

The release is a free, open-source manual crypto portfolio tracker with a FastAPI and Pydantic AI backend, an Astro and React frontend, a working sample, six supported assets, portfolio explanations, and privacy-aware public snapshots. It is not an exchange, an execution bot, or a verified investment track record.

## Before sharing the public link

Use this as a completion checklist against the deployed application. A working local preview does not check these boxes by itself.

- [ ] Set `PUBLIC_SITE_URL` to the real HTTPS origin, deploy the frontend and backend, and open the public homepage from a fresh browser session.
- [ ] Confirm the database lives on persistent storage, survives a restart, and has a working backup procedure. Keep the backend isolated behind the frontend proxy and configure its trusted address handling correctly.
- [ ] Check that sample, cached, and CoinGecko prices are labelled accurately with their quote time. Confirm that sample prices cannot trigger real-looking alerts.
- [ ] Add a holding, edit its amount, reload, and remove it. Confirm that a different private portfolio cannot read or modify it.
- [ ] Confirm an unknown buy price hides return percentages instead of implying a profit. Confirm that chart text describes current holdings revalued at past prices, not actual account performance.
- [ ] Open Ask Patro. If a provider is enabled, verify the answer and source labels. If it is not enabled, keep the explicit local-summary label. Do not record a local summary and describe it as a live model response.
- [ ] Create a postcard using synthetic holdings. Check the preview, public page, PNG download, quote timestamp, optional return setting, and maker credit. The public result must exclude quantities, balances, buy prices, and private tokens.
- [ ] Revoke the personal test postcard, including after closing and reopening the share dialog. Confirm the old page and image stop resolving.
- [ ] Open a second test postcard in a fresh browser session, select its start action, add a first holding, and confirm referral activation appears in the local report. Use test data and do not present these checks as adoption.
- [ ] Check both `/?start=1` and `/?share=1` directly. Confirm title, description, canonical URL, PNG social metadata, and share-page indexing settings on the public origin.
- [ ] Review narrow mobile and desktop screenshots at ordinary browser zoom. Confirm that secondary text is readable, controls are usable, and hiding balances also hides quantities and chart amounts.
- [ ] Follow the maker and repository links. Verify that the actual destination is the intended public profile or project before publishing.
- [ ] Run the growth report and note that any existing development events are test traffic. Use a separate production database or a clear launch-window boundary rather than deleting data casually.

## The first release package

Prepare these concrete assets before posting:

1. A working public homepage link and repository link. Use the actual deployment URL, never the local address.
2. A 30-second product recording following the storyboard below. Use sample or deliberately synthetic holdings throughout.
3. A clean desktop screenshot, a narrow mobile screenshot, and one downloadable postcard. The sample labels stay visible.
4. One short maker story and one more technical version below. Select the version appropriate to the channel and adjust it to the actual deployed state.
5. One specific feedback prompt: **What would make this useful enough for you to open again next week?**

Do not imply that posting is already done. The author decides where and when to publish. There is no automatic messaging, contact scraping, bulk outreach, or paid promotion in this plan.

## 30-second product recording

| Time | On-screen action | Caption or optional narration |
| --- | --- | --- |
| 0-4 seconds | Open the dashboard with the sample badge visible. Hold long enough to read the portfolio value and allocation. | “I rebuilt an old project: a calmer place to understand your crypto.” |
| 4-10 seconds | Select Add holding. Enter one synthetic asset quantity and average buy price, then save. | “Start with a holding. No exchange keys or wallet connection.” |
| 10-15 seconds | Show the updated allocation and the clear source label. | “See your mix, your entered cost, and what the prices mean.” |
| 15-21 seconds | Ask “How concentrated is my portfolio?” Show the response mode and one numeric fact. | “Ask for a little perspective, grounded in your portfolio.” |
| 21-26 seconds | Open sharing, show the public fields notice, and create the postcard. Keep performance sharing off. | “Share the mix while keeping the amounts private.” |
| 26-30 seconds | Open the public postcard with its maker credit and Build my portfolio action visible. | “CryptoPatro. Built by Doruk Gezici. Try the sample.” |

Pre-open any menus needed to avoid dead time, but do not fake saving, answers, or network success. If the AI response takes longer than the recording window, make a clear cut after the action instead of implying instantaneous output. Use captions, readable type, and no strobing transitions. The artifact and the maker credit should be visible in the final frame.

## Maker story drafts

These drafts use the stated project history. Add the actual public link and verify all claims against the deployed release before posting.

### Short version

> I had an old crypto project with a good idea behind it, but I never really built it.
>
> I rebuilt CryptoPatro with FastAPI, Pydantic AI, Astro, and React.
>
> Add your holdings, understand your allocation, and make a portfolio postcard without exposing your balance. No exchange keys or wallet connection.
>
> It is free and open source. You can try the sample before adding anything.
>
> What would make you come back to a portfolio tracker next week?

Attach the real homepage link and the product recording. Do not add an invented launch count, success statistic, or testimonial.

### Technical build story

> CryptoPatro was one of my old projects: a personal crypto tracker and assistant that never became the product I wanted.
>
> I kept the idea and rebuilt the implementation with FastAPI, Pydantic AI, Astro, and React.
>
> The main decision was to make the first useful moment much simpler. You land on a working sample, add a holding, and see the allocation. There is no exchange setup before you can understand the product.
>
> I also wanted something people could share without sharing their balance. The portfolio postcard includes the asset mix, while quantities and buy prices stay private.
>
> A few boundaries are deliberate: prices have visible sources, sample data is labelled, the chart is not presented as actual account history, and Patro explains the portfolio without executing trades. If no AI provider is configured, the local summary says so.
>
> The code is open source. I would like feedback on the product and especially the first-use experience.

Attach the actual homepage, repository, and before/after screenshots if the original interface is available. Do not call the sample or synthetic holdings the author's real investments.

### Compact community introduction

> I rebuilt an old personal project into CryptoPatro, an open-source crypto portfolio tracker. The sample works without signing up. You can add holdings manually, get an allocation explanation, and share a postcard that hides the amounts.
>
> I am looking for feedback on the first-use experience: is it clear what the numbers mean, and where would you get stuck?

Use only in a relevant community where project feedback is welcome. Adapt the introduction to the community's format and include the link only where its rules allow. Participate in the resulting discussion; do not copy the same post indiscriminately across communities.

## Measurement that matches the implementation

The release records aggregate events in its own SQLite database. It does not identify unique visitors, follow people across browsers, measure social impressions, or verify that a copied link was posted.

| Question | Available signal | What it cannot establish |
| --- | --- | --- |
| Did portfolios become useful enough to start? | `portfolio_activated` count | Unique people, retention, or genuine investment ownership |
| Did the postcard leave the app? | `share_copy` and `share_download` counts | Whether it was actually posted or seen elsewhere |
| Did public postcards get opened? | `share_view` count | Unique visitors or all bot/crawler views |
| Did postcards lead to a new saved portfolio? | `referral_activated` count | Cross-browser attribution or conversions after losing the referral query |
| Did the work create maker visibility? | `maker_clicked` count | Unique clickers, profile visits that completed, follows, leads, or customers |
| How many public artifacts were created? | `share_created` count | Distinct creators or current active links after revocation |

`session_created` and `start_clicked` give additional context. A workspace creation or click is not the same as a saved first holding. The backend records activation once on the first manual holding save, in the same transaction; edit, delete, and re-add do not count again. Existing portfolios with holdings are marked active during migration without inventing historical events. Browser events are best effort and can be missed or repeated. Report raw counts and the date window together. Do not call their ratios unique conversion rates.

The referral is read from `/?start=1&ref={slug}` when the initial private portfolio is created. The backend validates that the slug exists and stores it with that portfolio. There is no referral cookie, visitor identifier, cross-browser matching, or attribution time-to-live. If someone removes the query before creating the portfolio, that source is not recovered later.

### Run the read-only report

From the repository root against the configured local database:

```sh
cd backend
uv run python -m cryptopatro.growth
```

Against the running production Compose service from the repository root:

```sh
docker compose exec -T backend python -m cryptopatro.growth
```

The command returns JSON containing trailing 7-day and 30-day UTC event counts and current valid snapshot totals split into demo and personal portfolios. Each window includes `from`, `to`, `events`, and `valid_shares_created`; top-level `valid_share_totals` excludes revoked postcards. `share_created` remains a historical event even if the link is later revoked, so those totals can differ. Use the reported window boundaries when comparing release periods; the CLI does not offer arbitrary date-window options. It uses `CRYPTOPATRO_DATABASE_PATH` or the normal application default. To inspect a different existing database, pass `--database /absolute/path/to/cryptopatro.sqlite3`.

The database connection is strictly read-only. The report does not create or migrate a database and returns no tokens, balances, IP addresses, or individual share slugs. It does not publish anything. Do not expose the database or this report through a public HTTP endpoint.

### Review cadence

- **At launch:** verify the public funnel and report, note the actual release time, and keep test traffic separate from adoption discussion.
- **After the first real feedback:** inspect the reported sticking point and reproduce it. Fix broken or confusing interactions before increasing promotion.
- **After a week with usable traffic:** compare event counts with the recorded window and read the feedback. Sparse counts support qualitative investigation, not sweeping conversion claims.
- **After each experiment:** record the changed interface, the observation window, aggregate counts, and qualitative observations. Note posting or traffic changes that could explain the result.

## Follow-up experiments

These are small possible next iterations, not features or results claimed by the launch. Ship one at a time once the relevant problem appears.

| Observed question | Concrete experiment | Evidence to examine |
| --- | --- | --- |
| Public postcards get views, but few referred portfolios activate. | Shorten the public-page introduction and make the first-holding action more explicit. Keep the product and traffic source otherwise stable when practical. | `share_view`, `start_clicked`, `referral_activated`, and feedback from people trying the flow |
| People save holdings but show little interest in sharing. | Test a second postcard title/layout and a clearer preview of exactly what remains private. Keep sharing optional. | `portfolio_activated`, `share_created`, `share_copy`, `share_download`, and comments about the artifact |
| The product is used, but the maker story is missed. | Move one concise maker sentence beside the postcard's start action. Keep attribution unobtrusive and the action primary. | `maker_clicked` counts and qualitative feedback; current events do not prove which placement caused a click |
| First-use questions keep repeating. | Add a small explanation at the confusing control or field. Demonstrate the same task with a fresh tester. | Fewer repeated questions and successful completion; do not infer this from pageviews |
| Users want another way to show their thinking. | Prototype an allocation explainer card with a short user-written note, keeping quantities and balances private. | Whether willing testers prefer it and choose to share it |
| Users want reasons to return. | Explore an optional periodic summary after confirming demand and implementing real scheduling, consent, and delivery. | User requests first; retention measurement would require additional disclosed instrumentation |

No lottery, referral reward, fake scarcity, or trading urgency is needed for this loop. The working product, useful artifact, clear credit, and responsive maker are the growth strategy.
