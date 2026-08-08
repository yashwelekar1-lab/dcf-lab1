import { Sparkles, Calculator, FolderOpen } from "lucide-react";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TopNavigation({
  activeTab,
  setActiveTab,
}: Props) {
  return (
  <div className="mb-6 w-full overflow-hidden">
    <div className="mx-auto grid w-full max-w-[1200px] grid-cols-3 items-stretch gap-1 rounded-xl border border-slate-700 bg-[#111827] p-1 sm:flex sm:items-center sm:gap-3 sm:p-2">
        <button
          onClick={() => setActiveTab("calculator")}
          className={`flex min-w-0 items-center justify-center gap-1 rounded-lg px-1.5 py-2 text-center transition-all sm:gap-2 sm:px-6 sm:py-3 ${
            activeTab === "calculator"
              ? "bg-slate-700 text-white"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
<Calculator
  size={18}
  className="text-neon green-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.8)]"
/>
          <span className="min-w-0 text-[11px] leading-tight sm:text-base">
  DCF Calculator
</span>
        </button>

        <button
        className={`flex min-w-0 items-center justify-center gap-1 rounded-lg px-1.5 py-2 text-center transition-all sm:gap-2 sm:px-6 sm:py-3 ${
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
            activeTab === "intelligence"
              ? "border-2 border-emerald-400 text-white bg-slate-800"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
      <Sparkles
  size={18}
  className="text-neon green-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.8)]"
/>
<div className="flex items-center gap-2">
  <span>DCF Lab Intelligence</span>

  <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-semibold tracking-wider text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.35)]">
    COMING SOON
  </span>
</div>
        </button>

        <button
          onClick={() => setActiveTab("saved")}
          className={`flex min-w-0 items-center justify-center gap-1 rounded-lg px-1.5 py-2 text-center transition-all sm:gap-2 sm:px-6 sm:py-3 ${
            activeTab === "saved"
              ? "bg-slate-700 text-white"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
      <FolderOpen
  size={18}
  className="shrink-0 text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.8)]"
/>
     <span className="min-w-0 text-[11px] leading-tight sm:text-base">
  Saved Analyses
</span>
        </button>

      </div>
    </div>
  );
}
