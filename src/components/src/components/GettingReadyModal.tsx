import { Loader2 } from "lucide-react";

interface GettingReadyModalProps {
  open: boolean;
}

export default function GettingReadyModal({
  open,
}: GettingReadyModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="getting-ready-title"
    >
      <div
        className="
          w-[90%] max-w-md
          rounded-2xl
          border border-slate-200
          bg-white
          px-8 py-9
          text-center
          shadow-2xl
        "
      >
        {/* Loader */}
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
          <Loader2 className="h-7 w-7 animate-spin text-slate-800" />
        </div>

        {/* Heading */}
        <h2
          id="getting-ready-title"
          className="text-xl font-semibold text-slate-900"
        >
          Getting things ready…
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Preparing your saved analyses securely.
        </p>

        {/* Progress indicator */}
        <div className="mx-auto mt-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-slate-800" />
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Please wait while we load your workspace.
        </p>
      </div>
    </div>
  );
}
