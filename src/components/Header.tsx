import {
  DollarSign,
  Layers3,
  BookOpen,
  Info,
  Download,
  FileText,
  RotateCcw,
  Sun,
} from "lucide-react";

import TopNavigation from "./TopNavigation";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({
  activeTab,
  setActiveTab,
}: HeaderProps) {
  return (
    /*
      ============================================================
      MAIN HEADER WRAPPER

      Header + TopNavigation are intentionally inside the same
      sticky container.

      IMPORTANT:
      - No margin
      - No padding between header and navigation
      - No gap
      - Sticky as one unit
      ============================================================
    */
    <header
      className="
        sticky
        top-0
        z-[100]
        w-full
        m-0
        p-0
        bg-[#0d1729]
      "
    >
      {/* ========================================================
          MAIN HEADER
          ======================================================== */}

      <div
        className="
          w-full
          h-[88px]
          m-0
          p-0
          border-b
          border-[#26354d]
          bg-[#0d1729]
        "
      >
        <div
          className="
            mx-auto
            flex
            h-full
            max-w-[1500px]
            items-center
            justify-between
            px-6
            lg:px-8
          "
        >
          {/* ====================================================
              LEFT — LOGO
              ==================================================== */}

          <div className="flex items-center gap-4 shrink-0">
            {/* CSS LOGO */}
            <div
              className="
                relative
                flex
                h-[52px]
                w-[52px]
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-[#00d4a8]
                via-[#31d5b0]
                to-[#9cff62]
              "
            >
              <div
                className="
                  h-[24px]
                  w-[24px]
                  rounded-full
                  bg-[#0d1729]
                "
              />
            </div>

            {/* BRAND */}
            <div className="flex flex-col leading-none">
              <div className="flex items-baseline">
                <span
                  className="
                    text-[36px]
                    font-bold
                    tracking-[-1.5px]
                    text-white
                  "
                >
                  DCF
                </span>

                <span
                  className="
                    text-[36px]
                    font-bold
                    tracking-[-1.5px]
                    text-[#00d49f]
                  "
                >
                  Lab
                </span>
              </div>

              <span
                className="
                  mt-1
                  text-[16px]
                  font-medium
                  tracking-[-0.2px]
                  text-[#8da0b9]
                "
              >
                Discounted Cash Flow Valuation Engine
              </span>
            </div>
          </div>

          {/* ====================================================
              RIGHT — CONTROLS
              ==================================================== */}

          <div className="flex items-center gap-2">
            {/* CURRENCY */}
            <button
              type="button"
              className="
                flex
                h-[40px]
                items-center
                gap-2
                rounded-xl
                border
                border-[#30415b]
                bg-[#19263b]
                px-3
                text-[14px]
                font-medium
                text-[#dce5f1]
                transition
                hover:border-[#00d4a8]
                hover:bg-[#1c2d45]
              "
            >
              <DollarSign className="h-[18px] w-[18px] text-[#9aabc1]" />

              <span>USD ($)</span>

              <span className="ml-1 text-[#9aabc1]">⌄</span>
            </button>

            {/* UNITS */}
            <button
              type="button"
              className="
                flex
                h-[40px]
                items-center
                gap-2
                rounded-xl
                border
                border-[#30415b]
                bg-[#19263b]
                px-3
                text-[14px]
                font-medium
                text-[#dce5f1]
                transition
                hover:border-[#00d4a8]
                hover:bg-[#1c2d45]
              "
            >
              <Layers3 className="h-[18px] w-[18px] text-[#9aabc1]" />

              <span>In Millions</span>

              <span className="ml-1 text-[#9aabc1]">⌄</span>
            </button>

            {/* GUIDE */}
            <button
              type="button"
              className="
                flex
                h-[40px]
                items-center
                gap-2
                rounded-xl
                border
                border-[#30415b]
                bg-[#19263b]
                px-3
                text-[14px]
                font-medium
                text-[#dce5f1]
                transition
                hover:border-[#00d4a8]
                hover:bg-[#1c2d45]
              "
            >
              <BookOpen className="h-[17px] w-[17px] text-[#00d4a8]" />

              <span>Guide</span>
            </button>

            {/* ABOUT */}
            <button
              type="button"
              className="
                flex
                h-[40px]
                items-center
                gap-2
                rounded-xl
                border
                border-[#30415b]
                bg-[#19263b]
                px-3
                text-[14px]
                font-medium
                text-[#dce5f1]
                transition
                hover:border-[#00d4a8]
                hover:bg-[#1c2d45]
              "
            >
              <Info className="h-[17px] w-[17px] text-[#00d4a8]" />

              <span>About</span>
            </button>

            {/* EXPORT */}
            <button
              type="button"
              className="
                flex
                h-[40px]
                items-center
                gap-2
                rounded-xl
                bg-[#00b986]
                px-4
                text-[14px]
                font-semibold
                text-white
                shadow-[0_0_20px_rgba(0,212,159,0.12)]
                transition
                hover:bg-[#00c995]
              "
            >
              <Download className="h-[17px] w-[17px]" />

              <span>Export</span>
            </button>

            {/* CSV */}
            <button
              type="button"
              className="
                flex
                h-[40px]
                items-center
                justify-center
                rounded-xl
                border
                border-[#30415b]
                bg-[#19263b]
                px-3
                text-[14px]
                font-medium
                text-[#dce5f1]
                transition
                hover:border-[#00d4a8]
                hover:bg-[#1c2d45]
              "
            >
              <FileText className="mr-1 h-[16px] w-[16px]" />

              CSV
            </button>

            {/* RESET */}
            <button
              type="button"
              aria-label="Reset"
              className="
                flex
                h-[40px]
                w-[40px]
                items-center
                justify-center
                rounded-xl
                border
                border-[#30415b]
                bg-[#19263b]
                text-[#9aabc1]
                transition
                hover:border-[#00d4a8]
                hover:text-white
              "
            >
              <RotateCcw className="h-[17px] w-[17px]" />
            </button>

            {/* THEME */}
            <button
              type="button"
              aria-label="Toggle theme"
              className="
                flex
                h-[40px]
                w-[40px]
                items-center
                justify-center
                rounded-xl
                border
                border-[#30415b]
                bg-[#19263b]
                text-[#9aabc1]
                transition
                hover:border-[#00d4a8]
                hover:text-[#00d4a8]
              "
            >
              <Sun className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          TOP NAVIGATION

          VERY IMPORTANT:

          This sits DIRECTLY below the header.

          There is:
          margin-top: 0
          margin-bottom: 0
          padding-top: 0
          padding-bottom: 0

          So there is NO GAP.
          ======================================================== */}

      <TopNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </header>
  );
}
