const API_BASE = "https://api.coingecko.com/api/v3";
const CACHE_MS = 60_000;

export const CURRENCIES = [
  { value: "usd", label: "USD" },
  { value: "inr", label: "INR" },
  { value: "eur", label: "EUR" },
  { value: "gbp", label: "GBP" },
];

const cache = new Map();
const inflight = new Map();

export function clearCache() {
  cache.clear();
}

async function request(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  let res;
  try {
    res = await fetch(url, { signal: controller.signal });
  } catch (err) {
    console.error("Request failed:", url, err);
    throw new Error(
      err.name === "AbortError"
        ? "The request timed out. Please try again."
        : "Network error. Check your connection, or turn off ad blockers."
    );
  } finally {
    clearTimeout(timer);
  }

  if (res.status === 429) {
    throw new Error("Rate limit reached (about 10–30 requests a minute). Wait a minute, then try again.");
  }
  if (!res.ok) {
    throw new Error(`CoinGecko responded with status ${res.status}.`);
  }
  return res.json();
}

// Fetches a path under the CoinGecko base URL, with caching and de-duplication.
export function getJson(path) {
  const url = `${API_BASE}${path}`;

  const hit = cache.get(url);
  if (hit && Date.now() - hit.at < CACHE_MS) return Promise.resolve(hit.data);

  if (inflight.has(url)) return inflight.get(url);

  const promise = request(url)
    .then((data) => {
      cache.set(url, { at: Date.now(), data });
      inflight.delete(url);
      return data;
    })
    .catch((err) => {
      inflight.delete(url);
      throw err;
    });

  inflight.set(url, promise);
  return promise;
}

export function formatMoney(value, currency = "usd", compact = false) {
  if (value == null) return "—";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency.toUpperCase(),
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 2 : Math.abs(value) < 1 ? 6 : 2,
  }).format(value);
}

// Accepts an ISO string or a millisecond timestamp.
export function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  return isNaN(d) ? "" : d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}
