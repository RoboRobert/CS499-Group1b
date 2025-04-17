import { test, expect } from '@playwright/test';

test('can add a new team', async ({ page }) => {
  // Removed incorrect usage of page.context()
  await page.goto('http://localhost:5173/rosters');
  await page.waitForLoadState('networkidle');

  // Screenshot to debug what Playwright sees
  await page.screenshot({ path: 'before-click.png', fullPage: true });

  await page.getByRole('button', { name: 'Add Teams' }).click();

  await page.fill('input[name="team-name"]', 'Test Team');
  await page.fill('input[name="hometown"]', 'Testville');
  await page.selectOption('select[name="state"]', 'TX');
  await page.fill('input[name="coach-name"]', 'Coach Smith');

  await page.click('button:has-text("Add Changes")');

  const teamBar = page.locator('.team-bar', { hasText: 'Test Team' });
  await expect(teamBar.locator('.team-name')).toHaveText('Test Team');
});


function recordVideo(arg0: { dir: string; size: { width: number; height: number; }; }) {
  throw new Error('Function not implemented.');
}
///test works, but team-bar is not correctly read as correct.