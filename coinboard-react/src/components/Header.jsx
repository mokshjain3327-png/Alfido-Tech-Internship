import { Link, NavLink } from "react-router-dom";

const navClass = ({ isActive }) =>
  `rounded-full px-3 py-1.5 text-sm font-medium transition ${
    isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
  }`;

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="text-lg font-bold tracking-tight">
          Coin<span className="text-emerald-600">board</span>
        </Link>
        <nav className="flex gap-1">
          <NavLink to="/" end className={navClass}>Markets</NavLink>
          <NavLink to="/about" className={navClass}>About</NavLink>
        </nav>
      </div>
    </header>
  );
}
