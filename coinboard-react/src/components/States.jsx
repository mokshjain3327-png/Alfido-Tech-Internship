export function Loading({ text = "Loading…", className = "min-h-[320px]" }) {
  return (
    <div role="status" className={`flex flex-col items-center justify-center gap-3 p-6 text-slate-500 ${className}`}>
      <span className="h-7 w-7 animate-spin rounded-full border-[3px] border-slate-200 border-t-emerald-600" />
      <p className="text-sm">{text}</p>
    </div>
  );
}

export function ErrorState({ message, onRetry, className = "min-h-[320px]" }) {
  return (
    <div role="alert" className={`flex flex-col items-center justify-center gap-3 p-6 text-center ${className}`}>
      <p className="max-w-md text-sm text-rose-600">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900/40"
      >
        Try again
      </button>
    </div>
  );
}

export function EmptyState({ children, className = "min-h-[200px]" }) {
  return (
    <div className={`flex items-center justify-center p-6 text-center text-sm text-slate-500 ${className}`}>
      {children}
    </div>
  );
}
