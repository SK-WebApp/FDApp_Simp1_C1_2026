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


const accessibleControls = [
  {
    page: 'index.html',
    role: 'textbox',
    name: 'Enter Item Name:',
  },
  {
    page: 'index.html',
    role: 'combobox',
    name: 'Is it a drink or food?',
  },
  {
    page: 'index_FD2.html',
    role: 'combobox',
    name: 'Need Chewing and/or Biting?',
  },
  {
    page: 'index_FD3.html',
    role: 'combobox',
    name: 'On or Off the Fork?',
  },
  {
    page: 'index_FD4.html',
    role: 'combobox',
    name: 'Match Consistency:',
  },
  {
    page: 'index_FD5.html',
    role: 'combobox',
    name: 'Match Thickness:',
  },
  {
    page: 'index_FD6.html',
    role: 'combobox',
    name: 'Match Thickness:',
  },
  {
    page: 'index_FD7.html',
    role: 'combobox',
    name: 'Match Bite Size:',
  },
  {
    page: 'index_FD8.html',
    role: 'combobox',
    name: 'Match Chew Difficulty Level:',
  },
];

for (const control of accessibleControls) {
  test(`${control.page} names its ${control.name} control`, async ({
    page,
  }) => {
    await page.goto(control.page);

    await expect(
      page.getByRole(control.role, {
        name: control.name,
        exact: true,
      })
    ).toBeVisible();
  });
}

test('index.html names its drink-level control', async ({
  page,
}) => {
  await page.goto('index.html');

  await page.locator('#drinkfood').selectOption('dl');

  await expect(
    page.getByRole('combobox', {
      name: 'Select Recommended Drink Level:',
      exact: true,
    })
  ).toBeVisible();
});

test('index.html names its food-level control', async ({
  page,
}) => {
  await page.goto('index.html');

  await page.locator('#drinkfood').selectOption('fl');

  await expect(
    page.getByRole('combobox', {
      name: 'Select Recommended Food Level:',
      exact: true,
    })
  ).toBeVisible();
});

const videoPages = [
  'index_FD90.html',
  'index_FD91.html',
  'index_FD92.html',
  'index_FD93.html',
  'index_FD94.html',
  'index_FD95.html',
  'index_FD96.html',
  'index_FD97e.html',
  'index_FD97r.html',
];

for (const videoPage of videoPages) {
  test(`${videoPage} names its demonstration iframe`, async ({
    page,
  }) => {
    await page.goto(videoPage);

    await expect(page.locator('#videoFrame')).toHaveAttribute(
      'title',
      'Demonstration video for the selected IDDSI level'
    );
  });
}

const level7VideoCases = [
  {
    chewLevel: 'c1',
    resultPage: 'index_FD97e.html',
    start: '16',
    end: null,
  },
  {
    chewLevel: 'c2',
    resultPage: 'index_FD97r.html',
    start: '0',
    end: '16',
  },
];

for (const videoCase of level7VideoCases) {
  test(`${videoCase.resultPage} configures its video time range`, async ({
    page,
  }) => {
    await page.goto('index.html');
    await page.locator('#itemname').fill('Banana');
    await page.locator('#drinkfood').selectOption('fl');
    await page.locator('#foodlevel').selectOption('fl6');
    await page.locator('#submit').click();

    await page.locator('#chewbite').selectOption('cb1');
    await page.locator('#submit').click();
    await page.locator('#consistency').selectOption('c2');
    await page.locator('#submit').click();
    await page.locator('#chew').selectOption(videoCase.chewLevel);
    await page.locator('#submit').click();

    await expect(page).toHaveURL(new RegExp(`${videoCase.resultPage}$`));
    await page.locator('#videoDemo').click();

    const videoParameters = await page.locator('#videoFrame').evaluate(frame => {
      const videoUrl = new URL(frame.src);
      return {
        start: videoUrl.searchParams.get('start'),
        end: videoUrl.searchParams.get('end'),
        malformedStart: videoUrl.searchParams.get('amp;start'),
      };
    });

    expect(videoParameters).toEqual({
      start: videoCase.start,
      end: videoCase.end,
      malformedStart: null,
    });
  });
}

test('starting a workflow preserves unrelated local storage', async ({
  page,
}) => {
  await page.goto('index.html');

// Test-only cleanup after establishing the application origin.
  await page.evaluate(() => localStorage.clear());

  await page.evaluate(() => {
    localStorage.setItem(
      'anotherApp:test',
      'preserve-me'
    );
  });

  await page.locator('#itemname').fill('Water');
  await page.locator('#drinkfood').selectOption('dl');
  await page.locator('#drinklevel').selectOption('dl0');
  await page.locator('#submit').click();

  await expect(page).toHaveURL(/index_FD3\.html$/);

  const unrelatedValue = await page.evaluate(() =>
    localStorage.getItem('anotherApp:test')
  );

  expect(unrelatedValue).toBe('preserve-me');
});


test('workflow stores only namespaced FoodDrinkApp keys', async ({
  page,
}) => {
  await page.goto('index.html');

  // Test-only cleanup after establishing the application origin.
  await page.evaluate(() => localStorage.clear());

  await page.locator('#itemname').fill('Water');
  await page.locator('#drinkfood').selectOption('dl');
  await page.locator('#drinklevel').selectOption('dl0');
  await page.locator('#submit').click();

  await expect(page).toHaveURL(/index_FD3\.html$/);

  const storageKeys = await page.evaluate(() =>
    Object.keys(localStorage)
  );

  const appKeys = storageKeys.filter(key =>
    key.startsWith('foodDrinkApp:v1:')
  );

  expect(appKeys.length).toBeGreaterThan(0);
  expect(storageKeys).not.toContain('input1');
  expect(storageKeys).not.toContain('drink-food');
  expect(storageKeys).not.toContain('input2');
  expect(storageKeys).not.toContain('input2T');
});
