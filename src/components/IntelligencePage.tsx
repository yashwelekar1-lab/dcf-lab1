export default function IntelligencePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-10">
        <h1 className="text-3xl font-bold text-white">
          DCF Lab Intelligence
        </h1>

        <p className="mt-4 text-slate-400">
          Upload an Annual Report or 10-K and let AI automatically extract
          financial statements, calculate FCFF, WACC, Terminal Value and
          Intrinsic Value.
        </p>

        <button className="mt-8 rounded-lg bg-emerald-500 px-6 py-3 text-white hover:bg-emerald-600">
          Upload Annual Report / 10-K
        </button>
      </div>
    </div>
  );
}
