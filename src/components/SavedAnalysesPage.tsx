import { Loader2 } from "lucide-react";

export default function SavedAnalysesPage() {
  return (
    <>
      {/* Non-cancellable "Getting things ready" popup */}
      <div
  className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/50"
  role="dialog"
  aria-modal="true"
>
        <div className="w-[90%] max-w-md rounded-2xl border border-slate-700 bg-slate-900 px-8 py-9 text-center shadow-2xl">

          {/* Loading Icon */}
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-slate-800">
            <Loader2 className="h-7 w-7 animate-spin text-blue-400" />
          </div>

          {/* Heading */}
          <h2 className="text-xl font-semibold text-white">
            Getting things ready…
          </h2>

          {/* Description */}
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Preparing your DCF Lab Intelligence workspace.
          </p>

          {/* Loading Bar */}
          <div className="mx-auto mt-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-blue-400" />
          </div>

          {/* Status */}
          <p className="mt-4 text-xs text-slate-500">
            Feature under development
          </p>

        </div>
      </div>

      {/* Saved Analyses page underneath */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-10">
          <h1 className="text-3xl font-bold text-white">
            Saved Analyses
          </h1>

          <p className="mt-4 text-slate-400">
            Saved analyses will be available here in a future update.
          </p>
        </div>
      </div>
    </>
  );
}
