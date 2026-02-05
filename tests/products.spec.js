import { test, expect } from "@playwright/test";
import LoginPage from "./LoginPage.js";

test("Search products and change condition", async ({ page }) => {
  // Login first
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("admin@test.com", "Swordsman12@");
  // Search
  await page.getByTestId("search-input").fill("Laptop");
  const products = page.getByTestId("product-card");
  await expect(products).toHaveCount(1);

  // Change dropdown
  const dropdown = page.getByTestId("condition-dropdown").first();
  await dropdown.selectOption("Used");
  await expect(dropdown).toHaveValue("Used");
});
