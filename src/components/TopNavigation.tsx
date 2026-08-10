import {
  Calculator,
  Sparkles,
  FolderOpen,
} from "lucide-react";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TopNavigation({
  activeTab,
  setActiveTab,
}: Props) {
  return (
    /*
      ============================================================
      TOP NAVIGATION

      This is intentionally NOT given its own sticky position.

      Header.tsx makes the entire Header + TopNavigation block
      sticky together.

      This prevents the gap/jump that happens when both elements
      have independent sticky positioning.
      ============================================================
    */

    <div
      className="
        relative
        z-[90]
        w-full
        m-0
        p-0
        bg-[#0d1729]
      "
    >
      {/* ========================================================
          NAVIGATION CONTAINER
          ======================================================== */}

      <div
        className="
          mx-auto
          w-[calc(100%-40px)]
          max-w-[1470px]
          h-[64px]
          m-0
          mt-0
          mb-0
          p-0
          rounded-b-xl
          border-l
          border-r
          border-b
          border-[#30415b]
          bg-[#101a2b]
        "
      >
        <div
          className="
            flex
            h-full
            w-full
            items-center
          "
        >
          {/* ====================================================
              DCF CALCULATOR
              ==================================================== */}

          <button
            type="button"
            onClick={() => setActiveTab("calculator")}
            className={`
              flex
              h-full
              flex-1
              items-center
              justify-center
              gap-3
              rounded-l-xl
              border
              border-transparent
              px-5
              text-[16px]
              font-medium
              transition-all
              duration-200
              ${
                activeTab === "calculator"
                  ? "text-white"
                  : "text-[#c5d0df] hover:text-white"
              }
            `}
          >
            <Calculator
              className={`
                h-[19px]
                w-[19px]
                ${
                  activeTab === "calculator"
                    ? "text-[#00d4a8]"
                    : "text-[#00cfa4]"
                }
              `}
            />

            <span>DCF Calculator</span>
          </button>

          {/* ====================================================
              INTELLIGENCE
              ==================================================== */}

          <button
            type="button"
            onClick={() => setActiveTab("intelligence")}
            className={`
              relative
              flex
              h-[48px]
              flex-1
              items-center
              justify-center
              gap-3
              rounded-lg
              border
              px-5
              text-[16px]
              font-medium
              transition-all
              duration-200
              ${
                activeTab === "intelligence"
                  ? "border-[#00d4a8] bg-[#17263d] text-white"
                  : "border-transparent text-[#c5d0df] hover:border-[#00b990] hover:bg-[#17263d] hover:text-white"
              }
            `}
          >
            {/* ICON */}

            <Sparkles
              className="
                h-[19px]
                w-[19px]
                text-[#00d4a8]
              "
            />

            {/* TITLE */}

            <span>
              DCF Lab Intelligence
            </span>

            {/* COMING SOON */}

            <span
              className="
                rounded-full
                border
                border-[#00d4a8]
                bg-[#08382f]
                px-2.5
                py-0.5
                text-[10px]
                font-bold
                uppercase
                tracking-wide
                text-[#00e0aa]
              "
            >
              Coming Soon
            </span>
          </button>

          {/* ====================================================
              SAVED ANALYSES
              ==================================================== */}

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`
              flex
              h-full
              flex-1
              items-center
              justify-center
              gap-3
              rounded-r-xl
              border
              border-transparent
              px-5
              text-[16px]
              font-medium
              transition-all
              duration-200
              ${
                activeTab === "saved"
                  ? "text-white"
                  : "text-[#c5d0df] hover:text-white"
              }
            `}
          >
            <FolderOpen
              className="
                h-[19px]
                w-[19px]
                text-[#00d4a8]
              "
            />

            <span>Saved Analyses</span>
          </button>
        </div>
      </div>
    </div>
  );
}
