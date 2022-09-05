// @ts-check
import { test, expect } from "@playwright/test";

test("header should containe bitcoin", async ({ page }) => {
  await page.goto("https://www.google.com/finance/");

  const searchInput = await page.locator(
    ':nth-match([aria-label="Search for stocks, ETFs & more"], 2)'
  );
  await searchInput.click();
  await searchInput.fill("Bitcoin");

  await searchInput.press("Enter");

  const headerText = await page.innerText("[class='zzDege']");

  expect(headerText).toContain("Bitcoin");
});
