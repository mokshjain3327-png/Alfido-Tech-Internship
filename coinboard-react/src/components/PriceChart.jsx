import { useMemo } from "react";
import { formatDate, formatMoney } from "../lib/api.js";

const W = 800;
const H = 260;
const P = 28;

export default function PriceChart({ prices, currency }) {
  const chart = useMemo(() => {
    // Keep at most ~300 points so the SVG stays light.
    const step = Math.max(1, Math.floor(prices.length / 300));
    const pts = prices.filter((_, i) => i % step === 0);
    const values = pts.map((p) => p[1]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || 1;

    const x = (i) => P + (i / (pts.length - 1)) * (W - 2 * P);
    const y = (v) => H - P - ((v - min) / span) * (H - 2 * P);
    const path = pts
      .map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(p[1]).toFixed(1)}`)
      .join(" ");

    return {
      path,
      min,
      max,
      up: values[values.length - 1] >= values[0],
      start: pts[0][0],
      end: pts[pts.length - 1][0],
    };
  }, [prices]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Seven day price chart">
      <line x1={P} y1={P} x2={W - P} y2={P} className="stroke-slate-200" />
      <line x1={P} y1={H - P} x2={W - P} y2={H - P} className="stroke-slate-200" />
      <text x={P} y={P - 8} className="fill-slate-400 text-[13px]">{formatMoney(chart.max, currency)}</text>
      <text x={P} y={H - P - 6} className="fill-slate-400 text-[13px]">{formatMoney(chart.min, currency)}</text>
      <text x={P} y={H - 6} className="fill-slate-400 text-[13px]">{formatDate(chart.start)}</text>
      <text x={W - P} y={H - 6} textAnchor="end" className="fill-slate-400 text-[13px]">
        {formatDate(chart.end)}
      </text>
      <path
        d={chart.path}
        fill="none"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        className={chart.up ? "stroke-emerald-600" : "stroke-rose-600"}
      />
    </svg>
  );
}
