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
    <div className="w-full mb-6">
      <div className="flex items-center gap-3 bg-[#111827] rounded-xl p-2 border border-slate-700">

        <button
          onClick={() => setActiveTab("calculator")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
            activeTab === "calculator"
              ? "bg-slate-700 text-white"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
<Calculator
  size={18}
  className="text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.8)]"
/>
          DCF Calculator
        </button>

        <button
          onClick={() => setActiveTab("intelligence")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
            activeTab === "intelligence"
              ? "border-2 border-emerald-400 text-white bg-slate-800"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
      <Sparkles
  size={18}
  className="text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.8)]"
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
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
            activeTab === "saved"
              ? "bg-slate-700 text-white"
              : "text-slate-300 hover:bg-slate-800"
          }`}
        >
         <FolderOpen
  size={18}
  className="text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.8)]"
/>
          Saved Analyses
        </button>

      </div>
    </div>
  );
}
