export default function AboutPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">About Coinboard</h1>
        <p className="mt-2 text-slate-600">
          Coinboard is a small React project that fetches, displays, searches, and filters live crypto data
          from a public REST API.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-semibold">Data source</h2>
        <p className="mt-2 text-sm text-slate-600">
          Prices, market caps, and price history come from{" "}
          <a
            href="https://www.coingecko.com/en/api"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 underline underline-offset-2"
          >
            CoinGecko's public API
          </a>
          . No API key is needed. The free tier allows roughly 10–30 requests a minute, so responses are
          cached for a minute.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-semibold">How it's built</h2>
        <p className="mt-2 text-sm text-slate-600">
          React handles the UI and routing, Tailwind CSS handles styling, and a custom{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">useFetch</code> hook manages the loading,
          error, and retry states for every request.
        </p>
      </div>

      <p className="text-sm text-slate-500">This is a demo project. Nothing here is financial advice.</p>
    </div>
  );
}
