import { test, expect, type Page } from '@playwright/test';

async function openPortfolio(page: Page, path = '/') {
  await page.goto(path);
  await expect(page.locator('.value-footer-time')).toContainText('As of');
}

async function addHolding(
  page: Page,
  asset = 'bitcoin',
  quantity = '0.31415937',
  cost = '12345.67',
) {
  await page.getByRole('button', { name: 'Add holding', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('combobox', { name: 'Asset', exact: true }).selectOption(asset);
  await dialog.getByLabel('How much do you own?', { exact: false }).fill(quantity);
  await dialog.getByLabel('Average buy price per coin', { exact: false }).fill(cost);
  await dialog.getByRole('button', { name: 'Add to my portfolio', exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole('button', { name: /My workspace/ })).toBeVisible();
}

async function privatePortfolio(page: Page) {
  const token = await page.evaluate(() => localStorage.getItem('cryptopatro.portfolio.v1'));
  expect(token).toBeTruthy();
  const response = await page.request.get('http://127.0.0.1:4322/api/portfolio', {
    headers: { 'X-Portfolio-Token': token! },
  });
  expect(response.ok()).toBeTruthy();
  return response.json();
}

test.beforeEach(async ({ context }) => {
  // The browser and backend both stay offline except for their local connection.
  await context.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (['127.0.0.1', 'localhost'].includes(url.hostname)) await route.continue();
    else await route.abort('blockedbyclient');
  });
});

test('a private holding persists, updates, and can be removed', async ({ page }) => {
  await openPortfolio(page);
  await addHolding(page);
  await page.reload();
  await expect(page.getByRole('button', { name: /My workspace/ })).toBeVisible();
  await page.getByRole('button', { name: 'My holdings', exact: true }).click();
  await expect(page.getByRole('cell', { name: /0\.31415937/ })).toBeVisible();
  await page.getByRole('button', { name: 'Edit Bitcoin holding', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByLabel('How much do you own?', { exact: false }).fill('0.625');
  await dialog.getByLabel('Average buy price per coin', { exact: false }).fill('42000');
  await dialog.getByRole('button', { name: 'Save changes', exact: true }).click();
  await expect(dialog).not.toBeVisible();
  const portfolio = await privatePortfolio(page);
  expect(portfolio.holdings).toHaveLength(1);
  expect(portfolio.holdings[0]).toMatchObject({ quantity: 0.625, avg_cost: 42000 });
  await page.getByRole('button', { name: 'Edit Bitcoin holding', exact: true }).click();
  await dialog.getByRole('button', { name: 'Remove holding', exact: true }).click();
  await dialog.getByRole('button', { name: 'Yes, remove', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Start with what you own.' })).toBeVisible();
  await page.reload();
  expect((await privatePortfolio(page)).holdings).toHaveLength(0);
});

test('separate browsers receive separate private portfolios', async ({ page, browser }) => {
  await openPortfolio(page);
  await addHolding(page, 'bitcoin', '0.2', '50000');
  const other = await browser.newContext();
  try {
    const secondPage = await other.newPage();
    await openPortfolio(secondPage, 'http://127.0.0.1:4322/');
    await expect(secondPage.getByRole('button', { name: /Demo workspace/ })).toBeVisible();
    await addHolding(secondPage, 'ethereum', '2', '2500');
    const firstPortfolio = await privatePortfolio(page);
    const secondPortfolio = await privatePortfolio(secondPage);
    expect(firstPortfolio.holdings.map((h: { asset_id: string }) => h.asset_id)).toEqual([
      'bitcoin',
    ]);
    expect(secondPortfolio.holdings.map((h: { asset_id: string }) => h.asset_id)).toEqual([
      'ethereum',
    ]);
    const token = await secondPage.evaluate(() => localStorage.getItem('cryptopatro.portfolio.v1'));
    const forbidden = await secondPage.request.delete(
      `http://127.0.0.1:4322/api/holdings/${firstPortfolio.holdings[0].id}`,
      {
        headers: { 'X-Portfolio-Token': token! },
      },
    );
    expect(forbidden.status()).toBe(404);
    expect((await privatePortfolio(page)).holdings).toHaveLength(1);
  } finally {
    await other.close();
  }
});

test('in-app alerts persist and sample quotes never trigger them', async ({ page }) => {
  await openPortfolio(page);
  await page.getByRole('button', { name: 'Price alerts', exact: true }).click();
  await page.getByRole('button', { name: 'Create alert', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await dialog
    .getByRole('combobox', { name: 'Watch this asset', exact: true })
    .selectOption('bitcoin');
  await dialog
    .getByRole('combobox', { name: 'When the price goes', exact: true })
    .selectOption('above');
  await dialog.getByLabel('Target price (USD)').fill('1');
  await dialog.getByRole('button', { name: 'Create price alert', exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole('heading', { name: 'BTC goes above $1.00' })).toBeVisible();
  await expect(page.getByText('watching', { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('button', { name: /My workspace/ })).toBeVisible();
  await page.getByRole('button', { name: 'Price alerts', exact: true }).click();
  await page.getByRole('button', { name: 'Check prices', exact: true }).click();
  await expect(page.getByText('watching', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Delete BTC alert', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: 'Make room for a little less checking.' }),
  ).toBeVisible();
});

test('Patro gives a labeled factual local summary without a provider', async ({ page }) => {
  await openPortfolio(page);
  await page
    .getByRole('button', { name: /Ask Patro/ })
    .last()
    .click();
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('button', { name: 'How concentrated is my portfolio?' }).click();
  await expect(dialog.getByText('LOCAL PORTFOLIO SUMMARY', { exact: true })).toBeVisible();
  await expect(dialog.getByText(/These figures use illustrative sample prices/)).toBeVisible();
  await expect(dialog.getByText('Largest holding', { exact: true })).toBeVisible();
  await expect(
    dialog.getByText(/Local portfolio summary\. AI is unavailable or unconfigured/),
  ).toBeVisible();
  await dialog.getByLabel('Ask Patro a question').fill('Should I buy bitcoin tomorrow?');
  await dialog.getByRole('button', { name: 'Send question', exact: true }).click();
  await expect(
    dialog.getByText(/I cannot predict prices, recommend trades or execute orders/),
  ).toBeVisible();
});

test('a shared postcard exposes only opted-in data and can be revoked', async ({
  page,
  browser,
}, testInfo) => {
  await openPortfolio(page);
  await addHolding(page);
  const personal = await privatePortfolio(page);
  await page.getByRole('button', { name: 'Share portfolio', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByLabel('Give your postcard a title').fill('A focused little mix');
  await expect(dialog.getByLabel('Include unrealized return percentage')).not.toBeChecked();
  const shareResponse = page.waitForResponse(
    (r) => r.url().endsWith('/api/shares') && r.request().method() === 'POST',
  );
  await dialog.getByRole('button', { name: 'Create public postcard', exact: true }).click();
  const share = await (await shareResponse).json();
  expect(share.profit_loss_pct).toBeNull();
  for (const key of [
    'quantity',
    'avg_cost',
    'cost',
    'total_value',
    'total_cost',
    'token',
    'portfolio_id',
    'holdings',
  ]) {
    expect(JSON.stringify(share)).not.toContain(`"${key}"`);
  }
  const link = await dialog.getByLabel('Public postcard URL').inputValue();
  const visitor = await browser.newContext();
  try {
    const publicPage = await visitor.newPage();
    const response = await publicPage.goto(link);
    expect(response?.status()).toBe(200);
    await expect(
      publicPage.getByRole('heading', { name: 'A focused little mix', exact: true }).first(),
    ).toBeVisible();
    await expect(publicPage.getByText(/Doruk Gezici/).first()).toBeVisible();
    await expect(publicPage.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, nofollow',
    );
    await expect(publicPage.locator('.postcard-footer')).toContainText('Sample prices');
    const quoteDate = new Date(share.as_of).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    });
    await expect(publicPage.locator('.postcard-footer')).toContainText(quoteDate);
    await expect(publicPage.locator('.postcard-footer')).toContainText('UTC');
    const html = await publicPage.content();
    expect(html).not.toContain('0.31415937');
    expect(html).not.toContain('12345.67');
    expect(html).not.toContain(personal.holdings[0].id);
    expect(html).not.toContain(
      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
        personal.total_value,
      ),
    );
    const imageUrl = await publicPage.locator('meta[property="og:image"]').getAttribute('content');
    expect(imageUrl).toBe(`http://127.0.0.1:4322/share/${share.slug}.png`);
    const image = await publicPage.request.get(imageUrl!);
    expect(image.headers()['content-type']).toContain('image/png');
    expect((await image.body()).subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
    await publicPage.evaluate(() => document.fonts.ready);
    await publicPage.screenshot({
      path: testInfo.outputPath('public-postcard.png'),
      fullPage: true,
      animations: 'disabled',
    });
    await dialog.getByRole('button', { name: 'Close dialog', exact: true }).click();
    await page.reload();
    await expect(page.getByRole('button', { name: /My workspace/ })).toBeVisible();
    await page.getByRole('button', { name: 'Share portfolio', exact: true }).click();
    await expect(dialog.getByRole('heading', { name: 'Your published postcards' })).toBeVisible();
    await dialog
      .getByRole('button', { name: 'Remove postcard A focused little mix', exact: true })
      .click();
    await expect(page.getByRole('status')).toContainText(
      'The public postcard link has been removed.',
    );
    const removed = await publicPage.reload();
    expect(removed?.status()).toBe(404);
  } finally {
    await visitor.close();
  }
});

test('hiding balances also hides holding quantities until restored', async ({ page }) => {
  await openPortfolio(page);
  await addHolding(page);
  const personal = await privatePortfolio(page);
  const value = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    personal.total_value,
  );
  await page.getByRole('button', { name: 'Hide balances', exact: true }).click();
  await expect(page.getByText('Balances are tucked away.')).toBeVisible();
  await expect(page.locator('.holdings-panel')).not.toContainText('0.314159');
  await expect(page.getByRole('main')).not.toContainText(value);
  await page.getByRole('button', { name: 'My holdings', exact: true }).click();
  await expect(page.getByRole('main')).not.toContainText('0.31415937');
  await expect(page.getByRole('main')).not.toContainText(value);
  await page.getByRole('button', { name: 'Overview', exact: true }).click();
  await page.getByRole('button', { name: 'Show balances', exact: true }).click();
  await expect(page.locator('.big-value')).toHaveText(value);
  await page.getByRole('button', { name: 'My holdings', exact: true }).click();
  await expect(page.getByRole('cell', { name: /0\.31415937/ })).toBeVisible();
});

test('a missing postcard gives an honest error and keeps search indexing off', async ({ page }) => {
  const response = await page.goto('/share/not-a-real-postcard');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'This postcard has moved on.' })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  const image = await page.request.get('/share/not-a-real-postcard.png');
  expect(image.status()).toBe(404);
  await page.getByRole('link', { name: /Explore CryptoPatro/ }).click();
  await expect(
    page.getByRole('heading', { name: 'A little clarity. A lot more control.' }),
  ).toBeVisible();
});

test('direct starter and share links work with keyboard-accessible dialogs', async ({ page }) => {
  await openPortfolio(page, '/?start=1');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press('Tab');
    // Native dialogs may move focus to browser chrome at the boundary, represented
    // by body. They must never focus a background page control.
    expect(
      await dialog.evaluate(
        (element) =>
          document.activeElement === document.body || element.contains(document.activeElement),
      ),
    ).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await page.getByRole('button', { name: 'Add holding', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Add holding', exact: true })).toBeFocused();
  await openPortfolio(page, '/?share=1');
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole('button', { name: 'Create public postcard', exact: true }),
  ).toBeEnabled();
});

for (const viewport of [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  test(`${viewport.name} dashboard is usable without horizontal overflow`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize(viewport);
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await openPortfolio(page);
    await page.evaluate(() => document.fonts.ready);
    await expect(
      page.getByRole('heading', { name: 'A little clarity. A lot more control.' }),
    ).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
      true,
    );
    if (viewport.name === 'mobile') {
      await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
      await page.getByRole('button', { name: 'My holdings', exact: true }).click();
      await expect(page.getByRole('heading', { name: 'Your crypto, all together.' })).toBeVisible();
      await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
      await page.getByRole('button', { name: 'Overview', exact: true }).click();
    }
    await page.screenshot({
      path: testInfo.outputPath(`${viewport.name}-dashboard.png`),
      fullPage: true,
      animations: 'disabled',
    });
    await page.getByRole('button', { name: 'Add holding', exact: true }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    expect(await dialog.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(
      true,
    );
    await expect(
      dialog.getByRole('button', { name: 'Close dialog', exact: true }),
    ).toBeInViewport();
    expect(errors).toEqual([]);
  });
}
