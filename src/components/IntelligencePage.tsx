export default function IntelligencePage() {
  return (
    <main className="relative -mt-6 min-h-[calc(100vh-70px)] overflow-hidden bg-[#02070d] text-white">

      {/* =========================================================
          FINANCIAL BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.075]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(73,111,137,.45) 1px, transparent 1px), linear-gradient(90deg, rgba(73,111,137,.45) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* top left chart */}
        <div className="absolute left-[2%] top-[1%] h-[105px] w-[150px] rotate-[-9deg] rounded-lg border border-slate-600/30">
          <div className="absolute bottom-4 left-5 h-[35px] w-[2px] rotate-[-25deg] bg-slate-600/30" />
          <div className="absolute bottom-4 left-12 h-[55px] w-[2px] rotate-[15deg] bg-slate-600/30" />
          <div className="absolute bottom-4 left-[88px] h-[72px] w-[2px] rotate-[32deg] bg-slate-600/30" />
          <div className="absolute left-7 top-[62px] h-[2px] w-[95px] rotate-[-18deg] bg-slate-600/30" />
          <span className="absolute right-3 top-2 text-2xl text-slate-600/30">
            ↗
          </span>
        </div>

        {/* pie chart */}
        <div className="absolute left-[17%] top-[0%] h-[85px] w-[85px] rounded-full border border-slate-600/25">
          <div className="absolute left-1/2 top-1/2 h-[42px] w-[1px] origin-bottom rotate-[25deg] bg-slate-600/25" />
          <div className="absolute left-1/2 top-1/2 h-[42px] w-[1px] origin-bottom rotate-[125deg] bg-slate-600/25" />
          <div className="absolute left-1/2 top-1/2 h-[42px] w-[1px] origin-bottom rotate-[220deg] bg-slate-600/25" />
        </div>

        {/* percentage */}
        <div className="absolute left-[28%] top-[3%] text-[55px] text-slate-700/25">
          %
        </div>

        {/* dollar */}
        <div className="absolute left-[7%] top-[35%] text-[76px] font-light text-slate-700/25">
          $
        </div>

        {/* rupee */}
        <div className="absolute right-[7%] top-[32%] text-[68px] font-light text-slate-700/25">
          ₹
        </div>

        {/* growth chart */}
        <div className="absolute right-[22%] top-[0%]">
          <div className="h-[85px] w-[115px] border-b border-slate-600/25">
            <div className="absolute bottom-0 left-3 h-[30px] w-[2px] bg-slate-600/25" />
            <div className="absolute bottom-0 left-9 h-[48px] w-[2px] bg-slate-600/25" />
            <div className="absolute bottom-0 left-[66px] h-[65px] w-[2px] bg-slate-600/25" />
            <div className="absolute bottom-0 left-[92px] h-[78px] w-[2px] bg-slate-600/25" />
          </div>
          <span className="absolute -right-3 -top-4 text-3xl text-slate-600/25">
            ↗
          </span>
        </div>

        {/* calculator */}
        <div className="absolute right-[8%] top-[8%] h-[100px] w-[75px] rotate-[7deg] rounded-lg border border-slate-600/25">
          <div className="grid grid-cols-3 gap-1 p-3 pt-9">
            <i className="h-2 rounded bg-slate-600/20" />
            <i className="h-2 rounded bg-slate-600/20" />
            <i className="h-2 rounded bg-slate-600/20" />
            <i className="h-2 rounded bg-slate-600/20" />
            <i className="h-2 rounded bg-slate-600/20" />
            <i className="h-2 rounded bg-slate-600/20" />
            <i className="h-2 rounded bg-slate-600/20" />
            <i className="h-2 rounded bg-slate-600/20" />
            <i className="h-2 rounded bg-slate-600/20" />
          </div>
        </div>

        {/* target */}
        <div className="absolute left-[2%] top-[49%] h-[82px] w-[82px] rounded-full border border-slate-600/25">
          <div className="absolute inset-[18px] rounded-full border border-slate-600/20" />
          <div className="absolute inset-[35px] rounded-full border border-slate-600/20" />
          <div className="absolute left-1/2 top-1/2 h-[1px] w-[40px] -translate-y-1/2 rotate-[-25deg] bg-slate-600/25" />
        </div>

        {/* annual report */}
        <div className="absolute right-[2%] top-[35%] h-[115px] w-[92px] rotate-[8deg] rounded border border-slate-600/25">
          <div className="p-3 text-[8px] text-slate-600/30">
            ANNUAL
            <br />
            REPORT
          </div>
          <div className="absolute bottom-4 left-3 h-[35px] w-[4px] bg-slate-600/20" />
          <div className="absolute bottom-4 left-5 h-[22px] w-[4px] bg-slate-600/20" />
          <div className="absolute bottom-4 left-7 h-[45px] w-[4px] bg-slate-600/20" />
        </div>

        {/* lightbulb */}
        <div className="absolute left-[11%] top-[20%] text-[60px] text-slate-700/20">
          ♧
        </div>

        {/* AI */}
        <div className="absolute bottom-[4%] right-[8%] text-[70px] font-bold text-slate-700/20">
          AI
        </div>

        {/* bottom finance cards */}
        <div className="absolute bottom-[12px] left-[18%] flex gap-3 opacity-25">
          <span className="rounded border border-slate-500 px-4 py-2 text-[9px] text-slate-400">
            REVENUE ↗
          </span>

          <span className="rounded border border-slate-500 px-4 py-2 text-[9px] text-slate-400">
            MARGINS %
          </span>

          <span className="rounded border border-slate-500 px-4 py-2 text-[9px] text-slate-400">
            FCFF ↗
          </span>

          <span className="rounded border border-slate-500 px-4 py-2 text-[9px] text-slate-400">
            VALUE ◉
          </span>
        </div>

      </div>


      {/* =========================================================
          CENTER CONTENT
      ========================================================== */}

      <section className="relative z-10 flex min-h-[calc(100vh-70px)] flex-col items-center px-5 pt-[28px]">

        {/* TITLE */}

        <div className="mb-[25px] text-center">

          <h1 className="relative text-[32px] font-bold leading-tight tracking-[-0.8px]">

            <span className="text-white">
              DCF Lab{" "}
            </span>

            <span className="text-emerald-400 [text-shadow:0_0_16px_rgba(16,185,129,.35)]">
              Intelligence
            </span>

            <span className="absolute -right-7 -top-2 text-[18px] text-emerald-400">
              ✦
            </span>

          </h1>

          <p className="mt-2 text-[12px] leading-[1.65] text-slate-400">
            Upload an Annual Report or 10-K and let AI automatically extract
            financial statements,
            <br />
            calculate FCFF, WACC, Terminal Value and Intrinsic Value.
          </p>

        </div>


        {/* =====================================================
            OUTER UPLOAD CARD
        ====================================================== */}

        <div className="w-[490px] max-w-[92vw] rounded-[18px] border border-emerald-500/40 bg-[#07151d]/95 p-[18px] shadow-[0_0_35px_rgba(0,220,160,.12)]">

          {/* INNER DROP ZONE */}

          <div className="relative flex h-[250px] flex-col items-center justify-center rounded-[15px] border border-dashed border-slate-600/80 bg-[#07111a]/80">

            {/* small search icon */}
            <span className="absolute left-[37%] top-[29px] text-[13px] text-emerald-400">
              ⌕
            </span>

            {/* sparkles */}
            <span className="absolute right-[37%] top-[26px] text-[13px] text-emerald-400">
              ✦
            </span>

            <span className="absolute right-[34%] top-[80px] text-[10px] text-emerald-400">
              ✧
            </span>


            {/* FILE ICON */}

            <div className="relative mb-[10px] h-[70px] w-[70px]">

              <div className="absolute left-[8px] top-0 h-[59px] w-[46px] rounded-[4px] border border-slate-500/80 bg-slate-800/30">

                <div className="absolute right-0 top-0 h-[15px] w-[15px] border-b border-l border-slate-500/70" />

              </div>

              {/* green upload block */}

              <div className="absolute bottom-0 left-0 flex h-[37px] w-[44px] items-center justify-center rounded-[7px] bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_18px_rgba(16,185,129,.35)]">

                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 16V4"
                    stroke="white"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />

                  <path
                    d="M7 9L12 4L17 9"
                    stroke="white"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

              </div>

            </div>


            {/* TITLE */}

            <h2 className="text-[16px] font-semibold text-slate-100">
              Upload Annual Report / 10-K
            </h2>


            {/* DESCRIPTION */}

            <p className="mt-[7px] text-[11px] text-slate-400">
              Drag & drop your PDF here or click to browse
            </p>


            {/* BUTTON */}

            <button
              type="button"
              className="mt-[15px] flex h-[40px] min-w-[162px] items-center justify-center gap-2 rounded-[7px] border border-emerald-400 bg-transparent px-5 text-[13px] font-semibold text-slate-100 transition-all duration-200 hover:bg-emerald-500/10 hover:shadow-[0_0_18px_rgba(16,185,129,.2)]"
            >

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 16V4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                <path
                  d="M7 9L12 4L17 9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M5 20H19"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>

              Choose File

            </button>


            {/* FOOTER */}

            <div className="mt-[14px] flex items-center justify-center gap-[7px] text-[9.5px] text-slate-400">

              <span>
                Max file size: 50MB
              </span>

              <span className="text-emerald-400">
                •
              </span>

              <span>
                Supports PDF
              </span>

              <span className="text-emerald-400">
                •
              </span>

              <span>
                10-K
              </span>

              <span className="text-emerald-400">
                •
              </span>

              <span>
                Annual Reports
              </span>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
