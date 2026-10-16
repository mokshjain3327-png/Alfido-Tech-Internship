import { Link, useParams, useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch.js";
import { formatDate, formatMoney } from "../lib/api.js";
import { Change } from "../components/CoinTable.jsx";
import PriceChart from "../components/PriceChart.jsx";
import { EmptyState, ErrorState, Loading } from "../components/States.jsx";

function CoinSummary({ coin, currency }) {
  const stats = [
    ["Market cap rank", coin.market_cap_rank ?? "—"],
    ["Market cap", formatMoney(coin.market_cap, currency, true)],
    ["24h volume", formatMoney(coin.total_volume, currency, true)],
    ["24h high", formatMoney(coin.high_24h, currency)],
    ["24h low", formatMoney(coin.low_24h, currency)],
    [
      "Circulating supply",
      coin.circulating_supply != null ? Number(coin.circulating_supply).toLocaleString() : "—",
    ],
    ["All-time high", formatMoney(coin.ath, currency), formatDate(coin.ath_date)],
    ["All-time low", formatMoney(coin.atl, currency), formatDate(coin.atl_date)],
  ];

  return (
    <>
      <div className="flex items-center gap-3">
        {coin.image && <img src={coin.image} alt="" className="h-11 w-11" />}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{coin.name}</h1>
          <p className="text-sm text-slate-400">{coin.symbol.toUpperCase()}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-baseline gap-4">
        <span className="text-4xl font-bold tabular-nums">{formatMoney(coin.current_price, currency)}</span>
        <Change value={coin.price_change_percentage_24h} />
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map(([label, value, sub]) => (
          <div key={label} className="rounded-lg border border-slate-200 p-4">
            <dt className="text-xs uppercase tracking-wide text-slate-500">{label}</dt>
            <dd className="mt-1 font-semibold tabular-nums">{value}</dd>
            {sub && <dd className="text-xs text-slate-400">{sub}</dd>}
          </div>
        ))}
      </dl>
    </>
  );
}

export default function CoinPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const currency = (searchParams.get("cur") || localStorage.getItem("cb-currency") || "usd").toLowerCase();
  const encodedId = encodeURIComponent(id);

  const info = useFetch(
    `/coins/markets?vs_currency=${currency}&ids=${encodedId}&sparkline=false&price_change_percentage=24h`
  );
  const history = useFetch(`/coins/${encodedId}/market_chart?vs_currency=${currency}&days=7`);

  const coin = Array.isArray(info.data) ? info.data[0] : null;
  const prices = history.data?.prices ?? [];

  return (
    <div>
      <Link to="/" className="text-sm text-slate-500 hover:text-slate-900">← Back to markets</Link>

      <section className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        {info.loading && <Loading text="Loading coin…" className="min-h-[200px]" />}
        {info.error && <ErrorState message={info.error.message} onRetry={info.retry} className="min-h-[200px]" />}
        {!info.loading && !info.error && !coin && (
          <EmptyState>We couldn't find that coin. Go back and pick another one.</EmptyState>
        )}
        {coin && <CoinSummary coin={coin} currency={currency} />}
      </section>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-semibold">Price, last 7 days</h2>
        {history.loading && <Loading text="Loading price history…" className="min-h-[200px]" />}
        {history.error && (
          <ErrorState message={history.error.message} onRetry={history.retry} className="min-h-[200px]" />
        )}
        {!history.loading && !history.error && prices.length < 2 && (
          <EmptyState>No price history is available for this coin.</EmptyState>
        )}
        {prices.length >= 2 && <PriceChart prices={prices} currency={currency} />}
      </section>
    </div>
  );
}
