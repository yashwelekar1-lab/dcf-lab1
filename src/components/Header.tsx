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
    <header className="sticky top-0 z-[100] w-full m-0 p-0 bg-[#0d1729]">
      {/* =====================================================
          MAIN HEADER
          ===================================================== */}
      <div className="w-full h-[88px] m-0 p-0 border-b border-[#26354d] bg-[#0d1729]">
        <div className="mx-auto flex h-full max-w-[1500px] items-center justify-between px-6 lg:px-8">

          {/* ================= LEFT / LOGO ================= */}

          <div className="flex items-center gap-4 shrink-0">
            {/* Logo */}
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
              <div className="h-[24px] w-[24px] rounded-full bg-[#0d1729]" />
            </div>

            {/* Brand */}
            <div className="flex flex-col leading-none">
              <div className="flex items-baseline">
                <span className="text-[36px] font-bold tracking-[-1.5px] text-white">
                  DCF
                </span>

                <span className="text-[36px] font-bold tracking-[-1.5px] text-[#00d49f]">
                  Lab
                </span>
              </div>

              <span className="mt-1 text-[16px] font-medium text-[#8da0b9]">
                Discounted Cash Flow Valuation Engine
              </span>
            </div>
          </div>

          {/* ================= RIGHT CONTROLS ================= */}

          <div className="flex items-center gap-2">

            {/* Currency */}
            <button
              type="button"
              className="
                flex h-[40px] items-center gap-2
                rounded-xl border border-[#30415b]
                bg-[#19263b] px-3
                text-[14px] font-medium text-[#dce5f1]
                transition hover:border-[#00d4a8]
              "
            >
              <DollarSign className="h-[18px] w-[18px] text-[#9aabc1]" />
              <span>USD ($)</span>
              <span className="ml-1 text-[#9aabc1]">⌄</span>
            </button>

            {/* Units */}
            <button
              type="button"
              className="
                flex h-[40px] items-center gap-2
                rounded-xl border border-[#30415b]
                bg-[#19263b] px-3
                text-[14px] font-medium text-[#dce5f1]
                transition hover:border-[#00d4a8]
              "
            >
              <Layers3 className="h-[18px] w-[18px] text-[#9aabc1]" />
              <span>In Millions</span>
              <span className="ml-1 text-[#9aabc1]">⌄</span>
            </button>

            {/* Guide */}
            <button
              type="button"
              className="
                flex h-[40px] items-center gap-2
                rounded-xl border border-[#30415b]
                bg-[#19263b] px-3
                text-[14px] font-medium text-[#dce5f1]
                transition hover:border-[#00d4a8]
              "
            >
              <BookOpen className="h-[17px] w-[17px] text-[#00d4a8]" />
              <span>Guide</span>
            </button>

            {/* About */}
            <button
              type="button"
              className="
                flex h-[40px] items-center gap-2
                rounded-xl border border-[#30415b]
                bg-[#19263b] px-3
                text-[14px] font-medium text-[#dce5f1]
                transition hover:border-[#00d4a8]
              "
            >
              <Info className="h-[17px] w-[17px] text-[#00d4a8]" />
              <span>About</span>
            </button>

            {/* Export */}
            <button
              type="button"
              className="
                flex h-[40px] items-center gap-2
                rounded-xl bg-[#00b986] px-4
                text-[14px] font-semibold text-white
                transition hover:bg-[#00c995]
              "
            >
              <Download className="h-[17px] w-[17px]" />
              <span>Export</span>
            </button>

            {/* CSV */}
            <button
              type="button"
              className="
                flex h-[40px] items-center justify-center
                rounded-xl border border-[#30415b]
                bg-[#19263b] px-3
                text-[14px] font-medium text-[#dce5f1]
                transition hover:border-[#00d4a8]
              "
            >
              <FileText className="mr-1 h-[16px] w-[16px]" />
              CSV
            </button>

            {/* Reset */}
            <button
              type="button"
              aria-label="Reset"
              className="
                flex h-[40px] w-[40px]
                items-center justify-center
                rounded-xl border border-[#30415b]
                bg-[#19263b] text-[#9aabc1]
                transition hover:border-[#00d4a8]
              "
            >
              <RotateCcw className="h-[17px] w-[17px]" />
            </button>

            {/* Theme */}
            <button
              type="button"
              aria-label="Toggle theme"
              className="
                flex h-[40px] w-[40px]
                items-center justify-center
                rounded-xl border border-[#30415b]
                bg-[#19263b] text-[#9aabc1]
                transition hover:border-[#00d4a8]
              "
            >
              <Sun className="h-[18px] w-[18px]" />
            </button>

          </div>
        </div>
      </div>

      {/* =====================================================
          TOP NAVIGATION

          DIRECTLY TOUCHES HEADER
          NO MARGIN
          NO PADDING
          ===================================================== */}

      <TopNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </header>
  );
}
