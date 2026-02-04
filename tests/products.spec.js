import { test, expect } from "@playwright/test";

test("Search products and change condition", async ({ page }) => {
  // Login first
  await page.goto("/");
  await page.getByTestId("email-input").fill("admin@test.com");
  await page.getByTestId("password-input").fill("Swordsman12@");
  await page.getByTestId("login-button").click();
  // Search
  await page.getByTestId("search-input").fill("Laptop");
  const products = page.getByTestId("product-card");
  await expect(products).toHaveCount(1);

  // Change dropdown
  const dropdown = page.getByTestId("condition-dropdown").first();
  await dropdown.selectOption("Used");
  await expect(dropdown).toHaveValue("Used");
});
