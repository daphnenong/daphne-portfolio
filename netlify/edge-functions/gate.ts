import { gate, config } from 'sitepass/netlify'
import { escapeHtml } from 'sitepass'

const loginPage = ({
  loginPath,
  next,
  error,
  brand,
}: {
  loginPath: string
  next: string
  error: boolean
  brand: { title: string; subtitle: string; accent: string }
}) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  <title>Private — Daphne Nong</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500&family=Geist+Mono:wght@400;500&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; }
    body {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background: #f8f8f7;
      color: #17171a;
      font-family: "Archivo", "Helvetica Neue", Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    header, footer {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      padding: 22px clamp(22px, 4.5vw, 64px);
    }
    header { border-bottom: 1px solid #e3e2dd; }
    .wordmark {
      font-family: "Space Grotesk", Arial, sans-serif;
      font-size: 19px;
      font-weight: 600;
      letter-spacing: -0.01em;
      text-decoration: none;
      color: inherit;
    }
    .label {
      font-family: "Geist Mono", monospace;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.13em;
      text-transform: uppercase;
      color: #73737a;
    }
    main {
      flex: 1;
      display: grid;
      place-items: center;
      padding: 24px;
    }
    .gate {
      width: min(100%, 420px);
    }
    h1 {
      font-family: "Space Grotesk", Arial, sans-serif;
      font-size: clamp(26px, 3.4vw, 34px);
      font-weight: 600;
      line-height: 1.15;
      letter-spacing: -0.02em;
      margin-bottom: 34px;
    }
    form {
      display: flex;
      align-items: flex-end;
      gap: 16px;
      border-bottom: 1px solid #17171a;
      padding-bottom: 10px;
    }
    input {
      flex: 1;
      min-width: 0;
      border: 0;
      background: transparent;
      color: inherit;
      font-family: "Geist Mono", monospace;
      font-size: 15px;
      letter-spacing: 0.04em;
      outline: none;
      caret-color: ${escapeHtml(brand.accent)};
    }
    input::placeholder { color: #a9a8a1; }
    button {
      border: 0;
      background: none;
      padding: 0 2px;
      color: ${escapeHtml(brand.accent)};
      font-family: "Geist Mono", monospace;
      font-size: 18px;
      cursor: pointer;
      transition: transform 160ms ease;
    }
    button:hover { transform: translateX(3px); }
    .error {
      margin-top: 14px;
      font-family: "Geist Mono", monospace;
      font-size: 11.5px;
      letter-spacing: 0.06em;
      color: #b4232f;
      display: ${error ? 'block' : 'none'};
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
    .shake { animation: shake 0.24s ease 2; }
  </style>
</head>
<body>
  <header>
    <span class="wordmark">daphne nong</span>
  </header>
  <main>
    <div class="gate${error ? ' shake' : ''}">
      <h1>This portfolio is password protected.</h1>
      <form action="${escapeHtml(loginPath)}" method="post">
        <input type="hidden" name="next" value="${escapeHtml(next)}" />
        <input
          type="password"
          name="password"
          placeholder="password"
          autocomplete="current-password"
          required
          autofocus
        />
        <button type="submit" aria-label="Continue">&rarr;</button>
      </form>
      <p class="error">wrong password — try again</p>
    </div>
  </main>
</body>
</html>`

export default gate({
  brand: {
    title: 'daphne nong',
    subtitle: 'Enter the password to continue.',
    accent: '#1e40af',
  },
  renderLoginPage: loginPage,
})

export { config }
