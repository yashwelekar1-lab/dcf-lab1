export default function IntelligencePage() {
  return (
    <main className="relative min-h-[calc(100vh-96px)] overflow-hidden bg-[#02070d] text-white">

      {/* Financial background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-[2%] top-[5%] rotate-[-12deg] text-[80px] font-bold text-slate-700/20">
          ↗
        </div>

        <div className="absolute left-[25%] top-[3%] text-[70px] text-slate-700/20">
          %
        </div>

        <div className="absolute left-[8%] top-[30%] text-[85px] text-slate-700/20">
          $
        </div>

        <div className="absolute right-[8%] top-[18%] text-[80px] text-slate-700/20">
          ₹
        </div>

        <div className="absolute right-[24%] top-[7%] text-[65px] text-slate-700/20">
          ◇
        </div>

        <div className="absolute bottom-[10%] left-[18%] text-[65px] text-slate-700/20">
          %
        </div>

        <div className="absolute bottom-[8%] right-[15%] text-[80px] text-slate-700/20">
          AI
        </div>

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(50,100,130,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(50,100,130,.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

      </div>

      {/* Green glow */}
      <div className="pointer-events-none absolute left-1/2 top-[45%] h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.04] blur-3xl" />

      {/* Main content */}
      <section className="relative z-10 flex min-h-[calc(100vh-96px)] flex-col items-center px-5 pt-10">

        {/* Heading */}
        <div className="mb-7 text-center">

          <h1 className="relative text-[32px] font-bold tracking-tight text-white">

            DCF Lab{" "}

            <span className="text-emerald-400 [text-shadow:0_0_18px_rgba(52,211,153,.3)]">
              Intelligence
            </span>

            <span className="absolute -right-6 -top-2 text-[18px] text-emerald-400">
              ✦
            </span>

          </h1>

          <p className="mt-2 max-w-[650px] text-[12px] leading-5 text-slate-400">
            Upload an Annual Report or 10-K and let AI automatically extract
            financial statements,
            <br className="hidden sm:block" />
            calculate FCFF, WACC, Terminal Value and Intrinsic Value.
          </p>

        </div>

        {/* Outer upload card */}
        <div className="w-full max-w-[490px] rounded-[18px] border border-emerald-500/40 bg-[#07151d]/90 p-[18px] shadow-[0_0_35px_rgba(0,220,160,.10)] backdrop-blur-xl">

          {/* Inner upload area */}
          <div className="relative flex min-h-[245px] flex-col items-center justify-center rounded-[15px] border border-dashed border-slate-600/70 bg-[#07111a]/70 px-5">

            {/* Decorative search */}
            <span className="absolute left-[37%] top-7 text-[13px] text-emerald-400">
              ⌕
            </span>

            {/* Decorative stars */}
            <span className="absolute right-[37%] top-6 text-[13px] text-emerald-400">
              ✦
            </span>

            <span className="absolute right-[34%] top-[82px] text-[10px] text-emerald-400">
              ✧
            </span>

            {/* File icon */}
            <div className="relative mb-3 h-[70px] w-[70px]">

              <div className="absolute left-[7px] top-0 flex h-[58px] w-[48px] items-center justify-center rounded-[4px] border border-slate-500 bg-slate-800/70 text-slate-400">

                <svg
                  width="35"
                  height="40"
                  viewBox="0 0 35 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 2H23L31 10V38H5V2Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M23 2V10H31"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>

              </div>

              {/* Green upload badge */}
              <div className="absolute bottom-0 left-0 flex h-[38px] w-[44px] items-center justify-center rounded-[7px] bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_18px_rgba(16,185,129,.3)]">

                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
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

            {/* Upload title */}
            <h2 className="text-[16px] font-semibold text-slate-100">
              Upload Annual Report / 10-K
            </h2>

            {/* Description */}
            <p className="mt-1.5 text-[11px] text-slate-400">
              Drag & drop your PDF here or click to browse
            </p>

            {/* Choose file button */}
            <button
              type="button"
              className="mt-4 flex h-[40px] min-w-[162px] items-center justify-center gap-2 rounded-[7px] border border-emerald-400 bg-emerald-500/[0.08] px-5 text-[13px] font-semibold text-slate-100 transition-all duration-200 hover:bg-emerald-500/[0.18] hover:shadow-[0_0_20px_rgba(16,185,129,.2)]"
            >

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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

            {/* File information */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-[9.5px] text-slate-400">

              <span>Max file size: 50MB</span>

              <span className="text-emerald-400">•</span>

              <span>Supports PDF</span>

              <span className="text-emerald-400">•</span>

              <span>10-K</span>

              <span className="text-emerald-400">•</span>

              <span>Annual Reports</span>

            </div>

          </div>

        </div>

        {/* Bottom financial labels */}
        <div className="pointer-events-none absolute bottom-5 flex items-center justify-center gap-4 opacity-30">

          <span className="rounded border border-slate-600 px-3 py-1 text-[9px] text-slate-500">
            REVENUE ↗
          </span>

          <span className="rounded border border-slate-600 px-3 py-1 text-[9px] text-slate-500">
            MARGINS %
          </span>

          <span className="rounded border border-slate-600 px-3 py-1 text-[9px] text-slate-500">
            FCFF ↗
          </span>

          <span className="rounded border border-slate-600 px-3 py-1 text-[9px] text-slate-500">
            VALUE ◉
          </span>

        </div>

      </section>

    </main>
  );
}
