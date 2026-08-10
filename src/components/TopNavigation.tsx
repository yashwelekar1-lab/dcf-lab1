import {
  Calculator,
  Sparkles,
  FolderOpen,
} from "lucide-react";

interface TopNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TopNavigation = ({
  activeTab,
  setActiveTab,
}: TopNavigationProps) => {
  return (
    <nav
      className="
        sticky
        top-[72px]
        z-[90]
        w-full
        h-[58px]
        m-0
        p-0
        shrink-0
        bg-[#0d1628]
      "
    >
      <div
        className="
          w-full
          h-full
          max-w-[1450px]
          mx-auto
          px-4
          flex
          items-center
        "
      >
        <div
          className="
            w-full
            h-[58px]
            flex
            items-center
            rounded-[9px]
            border
            border-slate-700/80
            bg-[#101a2b]
            p-1
            overflow-hidden
          "
        >

          {/* =====================================================
              DCF CALCULATOR
          ====================================================== */}

          <button
            type="button"
            onClick={() => setActiveTab("calculator")}
            className={`
              h-full
              flex-1
              flex
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
                w-[18px]
                h-[18px]
                shrink-0
                text-emerald-400
              "
            />

            <span>DCF Calculator</span>
          </button>


          {/* =====================================================
              DCF LAB INTELLIGENCE
          ====================================================== */}

          <button
            type="button"
            onClick={() => setActiveTab("intelligence")}
            className={`
              h-full
              flex-1
              flex
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
                w-[18px]
                h-[18px]
                shrink-0
                text-emerald-400
              "
            />

            <span>DCF Lab Intelligence</span>

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
              h-full
              flex-1
              flex
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
                w-[18px]
                h-[18px]
                shrink-0
                text-emerald-400
              "
            />

            <span>Saved Analyses</span>
          </button>

        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
