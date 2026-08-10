import {
  DollarSign,
  Layers3,
  BookOpen,
  Info,
  Download,
  FileSpreadsheet,
  RotateCcw,
  Sun,
} from "lucide-react";

export default function Header() {
  return (
    <header
      className="
        sticky
        top-0
        z-[100]
        w-full
        h-[72px]
        shrink-0
        border-b
        border-slate-800/80
        bg-[#0d1628]
        m-0
        p-0
      "
    >
      <div
        className="
          mx-auto
          flex
          h-full
          w-full
          max-w-[1500px]
          items-center
          justify-between
          px-6
          lg:px-8
        "
      >
        {/* =====================================================
            LOGO
        ====================================================== */}
        <div className="flex items-center gap-3">
          {/* Logo circle */}
          <div
            className="
              relative
              flex
              h-[44px]
              w-[44px]
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-full
              bg-gradient-to-br
              from-cyan-400
              via-emerald-400
              to-lime-300
            "
          >
            <div
              className="
                h-[22px]
                w-[22px]
                rounded-full
                bg-[#0d1628]
              "
            />
          </div>

          {/* Brand */}
          <div className="flex flex-col leading-none">
            <div className="flex items-center">
              <span
                className="
                  text-[32px]
                  font-bold
                  tracking-[-1.5px]
                  text-slate-100
                "
              >
                DCF
              </span>

              <span
                className="
                  text-[32px]
                  font-bold
                  tracking-[-1.5px]
                  text-emerald-400
                "
              >
                Lab
              </span>
            </div>

            <span
              className="
                mt-1
                text-[15px]
                font-medium
                tracking-[-0.2px]
                text-slate-400
              "
            >
              Discounted Cash Flow Valuation Engine
            </span>
          </div>
        </div>

        {/* =====================================================
            HEADER CONTROLS
        ====================================================== */}
        <div className="flex items-center gap-2">
          {/* Currency */}
          <button
            type="button"
            className="
              flex
              h-[36px]
              items-center
              gap-2
              rounded-[9px]
              border
              border-slate-700
              bg-[#172238]
              px-3
              text-[14px]
              font-medium
              text-slate-200
              transition
              hover:border-slate-600
              hover:bg-[#1b2941]
            "
          >
            <DollarSign className="h-4 w-4 text-slate-400" />
            <span>USD ($)</span>
            <span className="ml-1 text-xs text-slate-400">⌄</span>
          </button>

          {/* Units */}
          <button
            type="button"
            className="
              flex
              h-[36px]
              items-center
              gap-2
              rounded-[9px]
              border
              border-slate-700
              bg-[#172238]
              px-3
              text-[14px]
              font-medium
              text-slate-200
              transition
              hover:border-slate-600
              hover:bg-[#1b2941]
            "
          >
            <Layers3 className="h-4 w-4 text-slate-400" />
            <span>In Millions</span>
            <span className="ml-1 text-xs text-slate-400">⌄</span>
          </button>

          {/* Guide */}
          <button
            type="button"
            className="
              flex
              h-[36px]
              items-center
              gap-2
              rounded-[9px]
              border
              border-slate-700
              bg-[#172238]
              px-3
              text-[14px]
              font-medium
              text-slate-300
              transition
              hover:border-slate-600
              hover:text-white
            "
          >
            <BookOpen className="h-4 w-4 text-emerald-400" />
            <span>Guide</span>
          </button>

          {/* About */}
          <button
            type="button"
            className="
              flex
              h-[36px]
              items-center
              gap-2
              rounded-[9px]
              border
              border-slate-700
              bg-[#172238]
              px-3
              text-[14px]
              font-medium
              text-slate-300
              transition
              hover:border-slate-600
              hover:text-white
            "
          >
            <Info className="h-4 w-4 text-emerald-400" />
            <span>About</span>
          </button>

          {/* Export */}
          <button
            type="button"
            className="
              flex
              h-[36px]
              items-center
              gap-2
              rounded-[9px]
              bg-emerald-500
              px-4
              text-[14px]
              font-semibold
              text-white
              shadow-[0_0_18px_rgba(16,185,129,0.15)]
              transition
              hover:bg-emerald-400
            "
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>

          {/* CSV */}
          <button
            type="button"
            className="
              flex
              h-[36px]
              items-center
              justify-center
              rounded-[9px]
              border
              border-slate-700
              bg-[#172238]
              px-3
              text-[13px]
              font-semibold
              text-slate-300
              transition
              hover:border-slate-600
              hover:text-white
            "
          >
            <FileSpreadsheet className="mr-1.5 h-4 w-4" />
            CSV
          </button>

          {/* Reset */}
          <button
            type="button"
            aria-label="Reset"
            className="
              flex
              h-[36px]
              w-[36px]
              items-center
              justify-center
              rounded-[9px]
              border
              border-slate-700
              bg-[#172238]
              text-slate-400
              transition
              hover:border-slate-600
              hover:text-white
            "
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          {/* Theme */}
          <button
            type="button"
            aria-label="Toggle theme"
            className="
              flex
              h-[36px]
              w-[36px]
              items-center
              justify-center
              rounded-[9px]
              border
              border-slate-700
              bg-[#172238]
              text-yellow-400
              transition
              hover:border-slate-600
            "
          >
            <Sun className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
