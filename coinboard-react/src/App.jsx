import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import MarketsPage from "./pages/MarketsPage.jsx";
import CoinPage from "./pages/CoinPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8">
        <Routes>
          <Route path="/" element={<MarketsPage />} />
          <Route path="/coin/:id" element={<CoinPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<p className="text-slate-500">Page not found.</p>} />
        </Routes>
      </main>
      <footer className="border-t border-slate-200 bg-white py-5 text-center text-sm text-slate-500">
        Data from CoinGecko's public API. Prices may be delayed. Not financial advice.
      </footer>
    </div>
  );
}
