import { useEffect, useMemo, useState } from "react";
import { CURRENCIES, clearCache } from "../lib/api.js";
import { useFetch } from "../hooks/useFetch.js";
import CoinTable from "../components/CoinTable.jsx";
import { EmptyState, ErrorState, Loading } from "../components/States.jsx";

const SORT_OPTIONS = [
  { value: "rank", label: "Market cap rank" },
  { value: "price", label: "Price (high to low)" },
  { value: "gain", label: "24h change (best first)" },
  { value: "loss", label: "24h change (worst first)" },
];

const FILTER_OPTIONS = [
  { value: "all", label: "All coins" },
  { value: "up", label: "Gainers (24h)" },
  { value: "down", label: "Losers (24h)" },
];

function applyFilters(coins, { query, sort, filter }) {
  const q = query.trim().toLowerCase();
  const change = (c) => c.price_change_percentage_24h ?? 0;

  let list = coins.filter(
    (c) => !q || c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q)
  );
  if (filter === "up") list = list.filter((c) => change(c) >= 0);
  if (filter === "down") list = list.filter((c) => change(c) < 0);

  const sorted = [...list];
  if (sort === "price") sorted.sort((a, b) => (b.current_price ?? 0) - (a.current_price ?? 0));
  if (sort === "gain") sorted.sort((a, b) => change(b) - change(a));
  if (sort === "loss") sorted.sort((a, b) => change(a) - change(b));
  return sorted;
}

const fieldClass =
  "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30";

export default function MarketsPage() {
  const [currency, setCurrency] = useState(() => localStorage.getItem("cb-currency") || "usd");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("rank");
  const [filter, setFilter] = useState("all");

  const path = `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`;
  const { data, error, loading, retry } = useFetch(path);

  useEffect(() => {
    localStorage.setItem("cb-currency", currency);
  }, [currency]);

  const coins = useMemo(
    () => applyFilters(Array.isArray(data) ? data : [], { query, sort, filter }),
    [data, query, sort, filter]
  );

  const refresh = () => {
    clearCache();
    retry();
  };

  let content;
  if (loading) {
    content = <Loading text="Fetching live prices…" />;
  } else if (error) {
    content = <ErrorState message={error.message} onRetry={refresh} />;
  } else if (!Array.isArray(data) || data.length === 0) {
    content = <EmptyState>No coin data was returned.</EmptyState>;
  } else if (coins.length === 0) {
    content = <EmptyState>No coins match these filters.</EmptyState>;
  } else {
    content = <CoinTable coins={coins} currency={currency} />;
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Markets</h1>
          <p className="mt-1 text-sm text-slate-500">Top 50 coins by market cap, live from CoinGecko</p>
        </div>
        <button
          type="button"
          onClick={refresh}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50"
        >
          Refresh
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search coin or symbol…"
          aria-label="Search coins"
          className={`${fieldClass} min-w-[200px] flex-1`}
        />
        <select value={currency} onChange={(e) => setCurrency(e.target.value)} aria-label="Currency" className={fieldClass}>
          {CURRENCIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort" className={fieldClass}>
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter" className={fieldClass}>
          {FILTER_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {content}
      </div>
    </div>
  );
}
