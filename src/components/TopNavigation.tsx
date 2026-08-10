import {
  Calculator,
  Sparkles,
  FolderOpen,
} from "lucide-react";

interface TopNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function TopNavigation({
  activeTab,
  setActiveTab,
}: TopNavigationProps) {
  return (
    <nav
      className="
        sticky
        top-[72px]
        z-[90]
        m-0
        w-full
        h-[58px]
        shrink-0
        bg-[#0d1628]
        p-0
      "
    >
      <div
        className="
          mx-auto
          flex
          h-full
          w-full
          max-w-[1450px]
          items-center
          px-4
        "
      >
        <div
          className="
            flex
            h-[58px]
            w-full
            items-center
            overflow-hidden
            rounded-[9px]
            border
            border-slate-700/80
            bg-[#101a2b]
            p-1
          "
        >
          {/* =====================================================
              DCF CALCULATOR
          ====================================================== */}
          <button
            type="button"
            onClick={() => setActiveTab("calculator")}
            className={`
              flex
              h-full
              flex-1
              items-center
              justify-center
              gap-2
              rounded-[7px]
              px-3
              text-[15px]
              font-medium
              transition-all
              duration-200
              ${
                activeTab === "calculator"
                  ? "bg-[#18263c] text-white"
                  : "text-slate-300 hover:bg-[#152238] hover:text-white"
              }
            `}
          >
            <Calculator
              className="
                h-[18px]
                w-[18px]
                shrink-0
                text-emerald-400
              "
            />

            <span>
              DCF Calculator
            </span>
          </button>

          {/* =====================================================
              DCF LAB INTELLIGENCE
          ====================================================== */}
          <button
            type="button"
            onClick={() => setActiveTab("intelligence")}
            className={`
              flex
              h-full
              flex-1
              items-center
              justify-center
              gap-2
              rounded-[7px]
              border
              px-3
              text-[15px]
              font-medium
              transition-all
              duration-200
              ${
                activeTab === "intelligence"
                  ? "border-emerald-400 bg-[#1a2940] text-white"
                  : "border-transparent text-slate-300 hover:bg-[#152238] hover:text-white"
              }
            `}
          >
            <Sparkles
              className="
                h-[18px]
                w-[18px]
                shrink-0
                text-emerald-400
              "
            />

            <span>
              DCF Lab Intelligence
            </span>

            <span
              className="
                ml-1
                shrink-0
                rounded-full
                border
                border-emerald-400
                px-2
                py-[2px]
                text-[9px]
                font-bold
                uppercase
                tracking-[0.5px]
                text-emerald-400
              "
            >
              Coming Soon
            </span>
          </button>

          {/* =====================================================
              SAVED ANALYSES
          ====================================================== */}
          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`
              flex
              h-full
              flex-1
              items-center
              justify-center
              gap-2
              rounded-[7px]
              px-3
              text-[15px]
              font-medium
              transition-all
              duration-200
              ${
                activeTab === "saved"
                  ? "bg-[#18263c] text-white"
                  : "text-slate-300 hover:bg-[#152238] hover:text-white"
              }
            `}
          >
            <FolderOpen
              className="
                h-[18px]
                w-[18px]
                shrink-0
                text-emerald-400
              "
            />

            <span>
              Saved Analyses
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
