# Coinboard (React + Tailwind)

Live crypto markets from CoinGecko's public API. No API key needed.

## Run it

Requires Node.js 18+.

    npm install
    npm run dev

Open the address Vite prints (usually http://localhost:5173).

## Build for production

    npm run build
    npm run preview

## Project structure

    src/
      main.jsx            entry point, router setup
      App.jsx             layout and routes
      index.css           Tailwind import
      lib/api.js          fetch wrapper, cache, formatters
      hooks/useFetch.js   loading / error / retry logic
      components/         Header, States (loading/error/empty), CoinTable, PriceChart
      pages/              MarketsPage, CoinPage, AboutPage

## Notes

- The free CoinGecko tier allows about 10–30 requests a minute. Responses are cached for 60 seconds.
- If you deploy to a static host, configure it to serve index.html for unknown routes (for example Netlify's `_redirects` or Vercel's rewrites), so /coin/bitcoin works on refresh.
