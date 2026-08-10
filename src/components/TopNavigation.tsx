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
    <>
      {/* =====================================================
          SPACE RESERVED FOR FIXED TOP NAVIGATION
      ====================================================== */}
     <div
  className={`fixed left-0 right-0 top-[90px] z-[90] w-full ${
    activeTab === "intelligence"
      ? "bg-[#101a2b]"
      : "bg-[#0b1220]/95"
  } backdrop-blur-md`}
>
      {/* =====================================================
          FIXED TOP NAVIGATION
      ====================================================== */}
      <div
        className={`fixed left-0 right-0 top-[90px] z-[90] w-full ${
          activeTab === "intelligence"
            ? "bg-[#101a2b]"
            : "bg-[#0b1220]/95"
        } backdrop-blur-md`}
      >
        <div className="mx-auto w-full max-w-[1200px] px-2 py-1 sm:px-0 sm:py-2">
          <div className="grid w-full grid-cols-3 items-stretch gap-1 rounded-xl border border-slate-700 bg-[#111827] p-1 sm:gap-3 sm:p-2">

            {/* =====================================================
                DCF CALCULATOR
            ====================================================== */}

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
                className="shrink-0 text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.8)]"
              />

              <span className="min-w-0 text-[11px] leading-tight sm:text-base">
                DCF Calculator
              </span>
            </button>

            {/* =====================================================
                DCF LAB INTELLIGENCE
            ====================================================== */}

            <button
              onClick={() => setActiveTab("intelligence")}
              className={`flex min-w-0 items-center justify-center gap-1 rounded-lg px-1.5 py-2 text-center transition-all sm:gap-2 sm:px-6 sm:py-3 ${
                activeTab === "intelligence"
                  ? "border-2 border-emerald-400 bg-slate-800 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Sparkles
                size={18}
                className="shrink-0 text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.8)]"
              />

              <div className="flex min-w-0 flex-col items-center justify-center gap-0.5 sm:flex-row sm:gap-2">
                <span className="text-[11px] leading-tight sm:text-base">
                  DCF Lab Intelligence
                </span>

                <span className="whitespace-nowrap rounded-full border border-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 text-[6px] font-bold tracking-wide text-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.45),0_0_14px_rgba(16,185,129,0.2)] sm:px-2.5 sm:py-1 sm:text-[9px]">
                  COMING SOON
                </span>
              </div>
            </button>

            {/* =====================================================
                SAVED ANALYSES
            ====================================================== */}

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
      </div>
    </>
  );
}
