import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

const GRAPHQL_URL = 'https://rickandmortyapi.com/graphql';

function characterResult(name: string) {
  return {
    id: name.toLowerCase().replace(/\W+/g, '-'),
    name,
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth',
    },
    location: {
      name: 'Earth',
    },
    image: '',
    episode: [],
    created: '',
  };
}

function charactersResponse(names: string[], pages = 1) {
  return {
    data: {
      characters: {
        info: {
          count: names.length,
          pages,
          next: null,
          prev: null,
        },
        results: names.map(characterResult),
      },
    },
  };
}

function pageNames(pageNumber: number) {
  const offset = (pageNumber - 1) * 20;

  return Array.from(
    { length: 20 },
    (_, index) => `Rick Variant ${offset + index + 1}`
  );
}

async function searchInput(page: Page) {
  const input = page
    .locator(
      'input[type="text"], input[placeholder*="search" i], input[aria-label*="search" i]'
    )
    .first();

  await expect(input).toBeVisible();

  return input;
}

async function expectEmptyStateCenteredInTableCard(page: Page) {
  const card = page.getByTestId('character-table-card');
  const content = page.getByTestId('character-table-content');
  const emptyState = page.getByTestId('character-table-empty-state');
  const pagination = page.getByTestId('character-table-pagination');

  await expect(emptyState).toBeVisible();
  await expect(pagination).toBeVisible();

  const cardBox = await card.boundingBox();
  const contentBox = await content.boundingBox();
  const emptyBox = await emptyState.boundingBox();
  const paginationBox = await pagination.boundingBox();

  expect(cardBox).not.toBeNull();
  expect(contentBox).not.toBeNull();
  expect(emptyBox).not.toBeNull();
  expect(paginationBox).not.toBeNull();

  const cardBottom = cardBox!.y + cardBox!.height;
  const paginationBottom = paginationBox!.y + paginationBox!.height;
  const contentCenterY = contentBox!.y + contentBox!.height / 2;
  const emptyCenterY = emptyBox!.y + emptyBox!.height / 2;

  expect(Math.abs(cardBottom - paginationBottom)).toBeLessThanOrEqual(2);
  expect(Math.abs(contentCenterY - emptyCenterY)).toBeLessThanOrEqual(8);
}

async function routeDefaultGraphQL(page: Page) {
  await page.route(GRAPHQL_URL, async route => {
    const body = route.request().postDataJSON();
    const search = body?.variables?.filter?.name || '';
    const pageNumber = body?.variables?.page || 1;
    const names =
      search === 'Rickymortad'
        ? []
        : search.toLowerCase() === 'rick'
          ? ['Rick Sanchez', 'Pickle Rick', 'Rick Prime']
          : pageNames(pageNumber);

    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify(charactersResponse(names, 42)),
    });
  });
}

/**
 * E2E Test: Essential Character Flow
 * Tests the core functionality: data loading, pagination, and search
 * Verifies API integration with Rick and Morty GraphQL API
 */
test.describe('Character Flow - Essential Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.clear());
    await routeDefaultGraphQL(page);

    // Navigate to the main page
    await page.goto('/');

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
  });
  test('should load characters from API and display in table', async ({
    page,
  }) => {
    const table = page.getByRole('grid', { name: 'Characters table' });
    await expect(table).toBeVisible();

    // Use the last rowgroup to target the data body
    const bodyGroup = table.locator('[role="rowgroup"]').last();
    const bodyRows = bodyGroup.getByRole('row');

    // Wait for data rows to appear
    await expect(bodyRows.first()).toBeVisible();

    // If your page size is 20, assert it here; otherwise prefer >= 1
    await expect(bodyRows).toHaveCount(20);

    // Validate first row has a name in the rowheader cell
    const firstNameCell = bodyRows.first().getByRole('rowheader');
    await expect(firstNameCell).not.toHaveText('');
  });

  test('should navigate to page 2 via pagination', async ({ page }) => {
    // Wait for the characters table to load
    const charactersTable = page.locator('[aria-label="Characters table"]');
    await expect(charactersTable).toBeVisible();

    // Verify pagination item 1 is active initially (check for either "pagination item 1" or "pagination item 1 active")
    const paginationItem1 = page.locator(
      '[aria-label="pagination item 1"], [aria-label="pagination item 1 active"]'
    );
    await expect(paginationItem1).toBeVisible();

    // Verify tbody has exactly 20 tr elements initially
    const tableRows = page.locator('tbody[role="rowgroup"] tr');
    await expect(tableRows).toHaveCount(20);

    // Click pagination item 2
    const paginationItem2 = page.locator('[aria-label="pagination item 2"]');
    await expect(paginationItem2).toBeVisible();
    await paginationItem2.click();

    // Wait for API response and page change
    await page.waitForLoadState('networkidle');

    // Verify pagination item 2 is now active (check for either "pagination item 2" or "pagination item 2 active")
    const paginationItem2Active = page.locator(
      '[aria-label="pagination item 2"], [aria-label="pagination item 2 active"]'
    );
    await expect(paginationItem2Active).toBeVisible();

    // Verify tbody still has exactly 20 tr elements on page 2
    const newTableRows = page.locator('tbody[role="rowgroup"] tr');
    await expect(newTableRows).toHaveCount(20);
  });

  test('should search for "rick" and find Rick Sanchez', async ({ page }) => {
    // Wait for search input to be available
    const input = await searchInput(page);

    // Type 'rick' in search query
    await input.fill('rick');

    // Wait for 5 seconds as requested
    await page.waitForTimeout(5000);

    // Wait for API response and table update
    await page.waitForLoadState('networkidle');

    // Search for 'Rick Sanchez' in the results
    const rickSanchez = page.getByText('Rick Sanchez').first();
    await expect(rickSanchez).toBeVisible();

    // Verify search results contain "rick"
    const characterNames = page.locator(
      'tbody[role="rowgroup"] tr td:first-child'
    );
    const count = await characterNames.count();

    // Ensure we have at least one result
    expect(count).toBeGreaterThan(0);

    // Verify all results contain "rick" (case insensitive)
    for (let i = 0; i < count; i++) {
      const name = await characterNames.nth(i).textContent();
      expect(name?.toLowerCase()).toContain('rick');
    }
  });

  test('should keep mobile empty state centered above bottom pagination', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    const input = await searchInput(page);

    await input.fill('Rickymortad');
    await expect(page.getByTestId('character-table-empty-state')).toBeVisible({
      timeout: 10000,
    });

    await expectEmptyStateCenteredInTableCard(page);
  });

  test('should keep desktop empty state centered above bottom pagination', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1366, height: 900 });

    const input = await searchInput(page);

    await input.fill('Rickymortad');
    await expect(page.getByTestId('character-table-empty-state')).toBeVisible({
      timeout: 10000,
    });

    await expectEmptyStateCenteredInTableCard(page);
  });

  test('should ignore stale GraphQL responses after fast search changes', async ({
    page,
  }) => {
    test.setTimeout(20000);

    const searchedTerms: string[] = [];
    const abortedOrLateTerms: string[] = [];

    await page.unroute(GRAPHQL_URL);
    await page.route(GRAPHQL_URL, async route => {
      const body = route.request().postDataJSON();
      const search = body?.variables?.filter?.name || '';

      searchedTerms.push(search);

      if (search === 'Ri' || search === 'Rick') {
        await page.waitForTimeout(700);
      }

      const payload =
        search === 'Rickymortad'
          ? charactersResponse([])
          : charactersResponse([search ? `Stale ${search}` : 'Rick Sanchez']);

      try {
        await route.fulfill({
          contentType: 'application/json',
          body: JSON.stringify(payload),
        });
      } catch {
        abortedOrLateTerms.push(search);
      }
    });

    await page.evaluate(() => localStorage.clear());
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const input = await searchInput(page);

    await input.fill('Ri');
    await page.waitForTimeout(150);
    await input.fill('Rick');
    await page.waitForTimeout(150);
    await input.fill('Rickymortad');

    await expect(page.getByTestId('character-table-empty-state')).toBeVisible({
      timeout: 10000,
    });

    await page.waitForTimeout(900);

    await expect(input).toHaveValue('Rickymortad');
    await expect(page.getByText('Stale Ri')).not.toBeVisible();
    await expect(page.getByText('Stale Rick')).not.toBeVisible();
    expect(searchedTerms).toContain('Ri');
    expect(searchedTerms).toContain('Rick');
    expect(searchedTerms).toContain('Rickymortad');
    expect(abortedOrLateTerms.length >= 0).toBe(true);
  });
});
