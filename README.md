# React Marketplace App (Vite + Playwright)

A React + Vite web app with an authenticated products flow and Playwright end-to-end tests.

## Tech Stack

- React 19
- Vite 7
- React Router DOM
- react-google-recaptcha
- Playwright (`@playwright/test`)
- ESLint

## App Flow

1. Login page with email/password + reCAPTCHA.
2. Products page with:
   - searchable cricket products
   - quantity selection
   - add to cart / buy now actions
   - cart sidebar with remove + checkout
3. Checkout page with:
   - shipping address form
   - credit card details form
   - order summary
   - place-order success modal

## Project Structure

```text
src/
  App.jsx
  login.jsx
  Products.jsx
  CheckoutPage.jsx
  ProtectedRoute.jsx
  auth.js
tests/
  BasePage.js
  LoginPage.js
  login.spec.js
  products.spec.js
playwright.config.js
```

## Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint
- `npm run test:e2e` - run Playwright tests
- `npm run test:e2e:ui` - run Playwright UI mode

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the app:

```bash
npm run dev
```

3. Open:

```text
http://localhost:5173
```

## E2E Testing (Playwright)

Playwright config is in [`playwright.config.js`](./playwright.config.js):

- `baseURL`: `http://localhost:5173`
- configured browsers: Chromium, Firefox, WebKit
- HTML reporter enabled
- screenshots/videos on failure
- auto-starts app using `npm run dev` via `webServer`

Run tests:

```bash
npm run test:e2e
```

## Demo Login

- Email: `admin@test.com`
- Password: `Swordsman12@`
