// ...existing code...
import { test } from "@playwright/test";
import BasePage from "./BasePage.js";

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = page.getByTestId("email-input");
    this.passwordInput = page.getByTestId("password-input");
    this.submitBtn = page.getByTestId("login-button")
    this.waitFor = page.waitForTimeout(5000);
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.waitFor;
    // solve/click reCAPTCHA (from BasePage) before submitting
    await this.clickRecaptcha();
    await this.submitBtn.click();
  }
}

test('user can login (clicks reCAPTCHA before submit)', async ({ page }) => {
  await page.goto("/");
  const login = new LoginPage(page);
  await login.login('admin@test.com', 'Swordsman12@');
  // Add assertions for your app (e.g. check navigation or success message)
});