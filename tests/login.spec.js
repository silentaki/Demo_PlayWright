// ...existing code...
import { test } from "@playwright/test";
import LoginPage from "./LoginPage.js";

test('user can login (clicks reCAPTCHA before submit)', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('admin@test.com', 'Swordsman12@');
});