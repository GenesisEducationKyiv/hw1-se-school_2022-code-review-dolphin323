// @ts-check
import { test, expect } from "@playwright/test";

test("bitcoin to uah", async ({ page }) => {
  await page.goto("https://www.google.com/finance/");

  const searchInput = await page.locator(
    ':nth-match([aria-label="Search for stocks, ETFs & more"], 2)'
  );
  await searchInput.click();
  await searchInput.fill("Bitcoin to UAH");

  await searchInput.press("Enter");

  const headerText = await page.innerText("[class='zzDege']");
  const rate = await page.innerText("[class='YMlKec fxKbKc']");

  expect(headerText).toContain("Bitcoin to Ukrainian hryvnia");
  expect(rate).toBeTruthy();
});
