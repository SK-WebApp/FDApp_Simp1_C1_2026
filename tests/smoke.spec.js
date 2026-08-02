const { test, expect } = require('@playwright/test');

test('main page loads with essential controls', async ({ page }) => {
//   await page.goto('/');
  await page.goto('index.html');

  await expect(page).toHaveTitle('FoodDrinkApp_Main');
  await expect(
    page.getByRole('heading', {
      name: 'What Can I Drink or Eat?',
    })
  ).toBeVisible();

  await expect(page.locator('#itemname')).toBeVisible();
  await expect(page.locator('#drinkfood')).toBeVisible();
  await expect(page.locator('#submit')).toBeVisible();

  const banner = page.getByAltText(
    'Food Drink App Welcome Banner'
  );

  await expect(banner).toBeVisible();

  const imageLoaded = await banner.evaluate(
    image => image.complete && image.naturalWidth > 0
  );

  expect(imageLoaded).toBe(true);
});

test('drink selection opens the drink pathway', async ({ page }) => {
//   await page.goto('/');
  await page.goto('index.html');

  await page.locator('#itemname').fill('Water');
  await page.locator('#drinkfood').selectOption('dl');

  await expect(page.locator('#drink')).toBeVisible();
  await expect(page.locator('#food')).toBeHidden();

  await page.locator('#drinklevel').selectOption('dl0');
  await page.locator('#submit').click();

  await expect(page).toHaveURL(/index_FD3\.html$/);
  await expect(page).toHaveTitle('FoodDrinkApp_Stickiness');
});

test('food selection opens the food pathway', async ({ page }) => {
//   await page.goto('/');
  await page.goto('index.html');

  await page.locator('#itemname').fill('Banana');
  await page.locator('#drinkfood').selectOption('fl');

  await expect(page.locator('#food')).toBeVisible();
  await expect(page.locator('#drink')).toBeHidden();

  await page.locator('#foodlevel').selectOption('fl6');
  await page.locator('#submit').click();

  await expect(page).toHaveURL(/index_FD2\.html$/);
  await expect(page).toHaveTitle('FoodDrinkApp_ChewBite');
});