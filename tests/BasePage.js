class BasePage {
  constructor(page) {
    this.page = page;
  }

  async clickRecaptcha() {
    const iframeSelectors = [
      'iframe[title="reCAPTCHA"]',
      'iframe[src*="recaptcha"]',
      'iframe[name^="a-"]',
    ];

    for (const sel of iframeSelectors) {
      try {
        const iframe = await this.page.$(sel);
        if (!iframe) continue;

        const frame = await iframe.contentFrame();
        if (!frame) continue;

        const clicked = await frame.evaluate(() => {
          const checkbox = document.querySelector('#recaptcha-anchor');
          if (checkbox) {
            checkbox.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
            checkbox.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
            checkbox.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            return true;
          }
          return false;
        });

        if (clicked) {
          await this.page.waitForTimeout(5000);
          return; // wait for the recaptcha to process
        }
      } catch (e) {
        // continue to next selector
      }
    }
  }
}

export default BasePage;