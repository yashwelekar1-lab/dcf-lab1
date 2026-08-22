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
        relative
        z-[90]
        w-full
        max-w-full
        m-0
        shrink-0
        bg-[#0d1628]

        sm:sticky
        sm:top-[72px]
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1450px]
          min-w-0
          px-2
          py-1.5

          sm:px-4
          sm:py-0
        "
      >
        <div
          className="
            grid
            w-full
            min-w-0
            grid-cols-3
            items-stretch
            gap-1
            rounded-[10px]
            border
            border-slate-700/80
            bg-[#101a2b]
            p-1

            sm:flex
            sm:h-[58px]
            sm:items-center
            sm:gap-0
          "
        >

          {/* =====================================================
              DCF CALCULATOR
          ====================================================== */}

          <button
            type="button"
            onClick={() => setActiveTab("calculator")}
            aria-label="DCF Calculator"
            className={`
              flex
              min-w-0
              min-h-[62px]
              flex-1
              flex-col
              items-center
              justify-center
              gap-1
              rounded-[7px]
              px-1
              py-2
              text-[11px]
              font-medium
              leading-tight
              transition-all
              duration-200

              sm:h-full
              sm:min-h-0
              sm:flex-row
              sm:gap-2
              sm:px-3
              sm:py-0
              sm:text-[15px]

              ${
                activeTab === "calculator"
                  ? "bg-[#18263c] text-white"
                  : "text-slate-300 hover:bg-[#152238] hover:text-white"
              }
            `}
          >
            <Calculator
              className="
                h-[19px]
                w-[19px]
                shrink-0
                text-emerald-400
                sm:h-[18px]
                sm:w-[18px]
              "
            />

            <span className="text-center sm:whitespace-nowrap">
              <span className="sm:hidden">
                DCF
                <br />
                Calculator
              </span>

              <span className="hidden sm:inline">
                DCF Calculator
              </span>
            </span>
          </button>

          {/* =====================================================
              DCF LAB INTELLIGENCE
          ====================================================== */}

          <button
            type="button"
            onClick={() => setActiveTab("intelligence")}
            aria-label="DCF Lab Intelligence"
            className={`
              flex
              min-w-0
              min-h-[62px]
              flex-1
              flex-col
              items-center
              justify-center
              gap-1
              rounded-[7px]
              border
              px-1
              py-2
              text-[11px]
              font-medium
              leading-tight
              transition-all
              duration-200

              sm:h-full
              sm:min-h-0
              sm:flex-row
              sm:gap-2
              sm:px-3
              sm:py-0
              sm:text-[15px]

              ${
                activeTab === "intelligence"
                  ? "border-emerald-400 bg-[#1a2940] text-white"
                  : "border-transparent text-slate-300 hover:bg-[#152238] hover:text-white"
              }
            `}
          >
            <Sparkles
              className="
                h-[19px]
                w-[19px]
                shrink-0
                text-emerald-400
                sm:h-[18px]
                sm:w-[18px]
              "
            />

            <span className="min-w-0 text-center sm:whitespace-nowrap">
              <span className="sm:hidden">
                DCF Lab
                <br />
                Intelligence
              </span>

              <span className="hidden sm:inline">
                DCF Lab Intelligence
              </span>
            </span>

            {/* Coming Soon */}
            <span
              className="
                hidden
                shrink-0
                rounded-full
                border
                border-emerald-400
                px-1.5
                py-[2px]
                text-[7px]
                font-bold
                uppercase
                tracking-[0.4px]
                text-emerald-400

                sm:inline-block
                sm:px-2
                sm:text-[9px]
                sm:tracking-[0.5px]
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
            aria-label="Saved Analyses"
            className={`
              flex
              min-w-0
              min-h-[62px]
              flex-1
              flex-col
              items-center
              justify-center
              gap-1
              rounded-[7px]
              px-1
              py-2
              text-[11px]
              font-medium
              leading-tight
              transition-all
              duration-200

              sm:h-full
              sm:min-h-0
              sm:flex-row
              sm:gap-2
              sm:px-3
              sm:py-0
              sm:text-[15px]

              ${
                activeTab === "saved"
                  ? "bg-[#18263c] text-white"
                  : "text-slate-300 hover:bg-[#152238] hover:text-white"
              }
            `}
          >
            <FolderOpen
              className="
                h-[19px]
                w-[19px]
                shrink-0
                text-emerald-400
                sm:h-[18px]
                sm:w-[18px]
              "
            />

            <span className="text-center sm:whitespace-nowrap">
              <span className="sm:hidden">
                Saved
                <br />
                Analyses
              </span>

              <span className="hidden sm:inline">
                Saved Analyses
              </span>
            </span>
          </button>

        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
