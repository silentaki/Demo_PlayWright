import BasePage from "./BasePage.js";
export default class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = page.getByTestId("email-input");
    this.passwordInput = page.getByTestId("password-input");
    this.submitBtn = page.getByTestId("login-button")
    this.waitFor = page.waitForTimeout(5000);
  }

  async goto() {
    await this.page.goto("/");
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.waitFor;
    await this.clickRecaptcha();
    await this.submitBtn.click();
  }
}
