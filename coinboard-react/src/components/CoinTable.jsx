import { Link } from "react-router-dom";
import { formatMoney } from "../lib/api.js";

export function Change({ value }) {
  if (value == null) return <span className="text-slate-400">—</span>;
  const up = value >= 0;
  return (
    <span className={`tabular-nums ${up ? "text-emerald-600" : "text-rose-600"}`}>
      {up ? "+" : ""}
      {value.toFixed(2)}%
    </span>
  );
}

export default function CoinTable({ coins, currency }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">#</th>
            <th className="px-4 py-3 text-left font-semibold">Coin</th>
            <th className="px-4 py-3 text-right font-semibold">Price</th>
            <th className="px-4 py-3 text-right font-semibold">24h</th>
            <th className="px-4 py-3 text-right font-semibold">Market cap</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {coins.map((c) => (
            <tr key={c.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 text-slate-400">{c.market_cap_rank ?? "—"}</td>
              <td className="px-4 py-3">
                <Link
                  to={`/coin/${encodeURIComponent(c.id)}?cur=${currency}`}
                  className="flex items-center gap-3 font-medium hover:text-emerald-700"
                >
                  {c.image && <img src={c.image} alt="" className="h-6 w-6" loading="lazy" />}
                  <span>{c.name}</span>
                  <span className="text-xs font-normal text-slate-400">{c.symbol.toUpperCase()}</span>
                </Link>
              </td>
              <td className="px-4 py-3 text-right tabular-nums">{formatMoney(c.current_price, currency)}</td>
              <td className="px-4 py-3 text-right">
                <Change value={c.price_change_percentage_24h} />
              </td>
              <td className="px-4 py-3 text-right tabular-nums">{formatMoney(c.market_cap, currency, true)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
