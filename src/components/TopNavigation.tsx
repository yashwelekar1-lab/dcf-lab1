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
    <div
      className={`fixed top-[90px] left-0 right-0 z-[99] h-[52px] w-full ${
        activeTab === "intelligence"
          ? "bg-[#101a2b]"
          : "bg-[#0b1220]"
      }`}
    >
      <div className="mx-auto h-full w-full max-w-[1200px] px-2 sm:px-0">
        <div className="grid h-full w-full grid-cols-3 items-center gap-1 rounded-lg border border-slate-700 bg-[#111827] px-1 sm:gap-2 sm:px-1.5">

          {/* DCF CALCULATOR */}
          <button
            type="button"
            onClick={() => setActiveTab("calculator")}
            className={`flex h-[40px] items-center justify-center gap-1.5 rounded-md px-2 transition-all sm:gap-2 sm:px-4 ${
              activeTab === "calculator"
                ? "bg-slate-700 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Calculator
              size={16}
              className="shrink-0 text-emerald-400"
            />

            <span className="text-[11px] sm:text-sm">
              DCF Calculator
            </span>
          </button>

          {/* DCF LAB INTELLIGENCE */}
          <button
            type="button"
            onClick={() => setActiveTab("intelligence")}
            className={`flex h-[40px] items-center justify-center gap-1.5 rounded-md px-2 transition-all sm:gap-2 sm:px-4 ${
              activeTab === "intelligence"
                ? "border border-emerald-400 bg-slate-800 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Sparkles
              size={16}
              className="shrink-0 text-emerald-400"
            />

            <span className="text-[11px] sm:text-sm">
              DCF Lab Intelligence
            </span>

            <span className="whitespace-nowrap rounded-full border border-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 text-[6px] font-bold tracking-wide text-emerald-400 sm:px-2 sm:text-[8px]">
              COMING SOON
            </span>
          </button>

          {/* SAVED ANALYSES */}
          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`flex h-[40px] items-center justify-center gap-1.5 rounded-md px-2 transition-all sm:gap-2 sm:px-4 ${
              activeTab === "saved"
                ? "bg-slate-700 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <FolderOpen
              size={16}
              className="shrink-0 text-emerald-400"
            />

            <span className="text-[11px] sm:text-sm">
              Saved Analyses
            </span>
          </button>

        </div>
      </div>
    </div>
  );
}
