import { useRef, useState } from "react";

export default function IntelligencePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF Annual Report or 10-K.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert("Maximum file size is 50MB.");
      return;
    }

    console.log("Selected file:", file);

    // Your backend/upload processing can be connected here later.
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-70px)] overflow-hidden bg-[#fbfcfd] text-slate-900">

      {/* =====================================================
          SOFT BACKGROUND GLOW
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-[220px] h-[430px] w-[650px] -translate-x-1/2 rounded-full bg-emerald-100/30 blur-3xl" />

        <div className="absolute left-[5%] top-[48%] h-[250px] w-[400px] rounded-full bg-emerald-50/60 blur-3xl" />

        <div className="absolute right-[3%] top-[52%] h-[250px] w-[400px] rounded-full bg-emerald-50/60 blur-3xl" />

      </div>


      {/* =====================================================
          GREEN WAVE BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[48%] overflow-hidden opacity-[0.55]">

        <svg
          className="absolute bottom-[-40px] left-[-5%] h-[320px] w-[65%]"
          viewBox="0 0 700 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M-20 235C100 145 180 145 275 185C365 222 430 265 525 210C585 175 635 125 720 115"
            stroke="#b8f0dc"
            strokeWidth="1.3"
          />

          <path
            d="M-20 242C100 152 180 152 275 192C365 229 430 272 525 217C585 182 635 132 720 122"
            stroke="#c7f3e3"
            strokeWidth="1.3"
          />

          <path
            d="M-20 249C100 159 180 159 275 199C365 236 430 279 525 224C585 189 635 139 720 129"
            stroke="#d0f5e7"
            strokeWidth="1.3"
          />

          <path
            d="M-20 256C100 166 180 166 275 206C365 243 430 286 525 231C585 196 635 146 720 136"
            stroke="#d9f7eb"
            strokeWidth="1.3"
          />

          <path
            d="M-20 263C100 173 180 173 275 213C365 250 430 293 525 238C585 203 635 153 720 143"
            stroke="#e0f9ef"
            strokeWidth="1.3"
          />

          <path
            d="M-20 270C100 180 180 180 275 220C365 257 430 300 525 245C585 210 635 160 720 150"
            stroke="#e6faf2"
            strokeWidth="1.3"
          />
        </svg>


        <svg
          className="absolute bottom-[-45px] right-[-5%] h-[320px] w-[55%]"
          viewBox="0 0 650 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M-20 240C85 160 155 145 250 185C340 222 390 270 485 220C550 185 590 140 680 125"
            stroke="#b8f0dc"
            strokeWidth="1.3"
          />

          <path
            d="M-20 247C85 167 155 152 250 192C340 229 390 277 485 227C550 192 590 147 680 132"
            stroke="#c7f3e3"
            strokeWidth="1.3"
          />

          <path
            d="M-20 254C85 174 155 159 250 199C340 236 390 284 485 234C550 199 590 154 680 139"
            stroke="#d0f5e7"
            strokeWidth="1.3"
          />

          <path
            d="M-20 261C85 181 155 166 250 206C340 243 390 291 485 241C550 206 590 161 680 146"
            stroke="#d9f7eb"
            strokeWidth="1.3"
          />

          <path
            d="M-20 268C85 188 155 173 250 213C340 250 390 298 485 248C550 213 590 168 680 153"
            stroke="#e0f9ef"
            strokeWidth="1.3"
          />

        </svg>

      </div>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-70px)] max-w-[1180px] flex-col items-center px-6 pt-[32px]">

        {/* =================================================
            TITLE
        ================================================== */}

        <div className="text-center">

          <h1 className="relative text-[30px] font-bold tracking-[-0.8px] text-[#14243a] sm:text-[32px]">

            DCF Lab{" "}

            <span className="text-emerald-500">
              Intelligence
            </span>

            <span className="absolute -right-6 -top-2 text-[17px] text-emerald-400">
              ✦
            </span>

          </h1>

          <p className="mx-auto mt-[7px] max-w-[680px] text-[11px] leading-[1.55] text-slate-500 sm:text-[12px]">

            Upload an Annual Report or 10-K and let AI automatically extract
            financial statements,

            <br />

            calculate FCFF, WACC, Terminal Value and Intrinsic Value.

          </p>

        </div>


        {/* =================================================
            UPLOAD CARD
        ================================================== */}

        <div className="mt-[19px] w-full max-w-[500px] rounded-[18px] border border-emerald-200 bg-white p-[18px] shadow-[0_12px_35px_rgba(16,185,129,0.08)]">

          {/* INNER DROP ZONE */}

          <div
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative flex h-[220px] cursor-pointer flex-col items-center justify-center rounded-[13px] border border-dashed px-4 transition-all duration-200 ${
              isDragging
                ? "border-emerald-400 bg-emerald-50"
                : "border-slate-200 bg-[#fcfdfd]"
            }`}
          >

            {/* Small decorative sparkle */}

            <span className="absolute left-[38%] top-[22px] text-[12px] text-emerald-400">
              ✦
            </span>

            <span className="absolute right-[37%] top-[22px] text-[12px] text-emerald-400">
              ✦
            </span>


            {/* =============================================
                DOCUMENT ICON
            ============================================== */}

            <div className="relative mb-[9px] h-[66px] w-[68px]">

              {/* document */}

              <div className="absolute left-[12px] top-0 h-[57px] w-[42px] rounded-[3px] border border-slate-300 bg-gradient-to-br from-white to-slate-100 shadow-sm">

                {/* folded corner */}

                <div className="absolute right-[-1px] top-[-1px] h-[15px] w-[15px] border-b border-l border-slate-300 bg-white" />

                {/* document lines */}

                <div className="absolute left-[8px] top-[24px] h-[2px] w-[24px] rounded bg-slate-200" />

                <div className="absolute left-[8px] top-[31px] h-[2px] w-[18px] rounded bg-slate-200" />

                <div className="absolute left-[8px] top-[38px] h-[2px] w-[21px] rounded bg-slate-200" />

              </div>


              {/* green upload badge */}

              <div className="absolute bottom-0 left-0 flex h-[36px] w-[43px] items-center justify-center rounded-[7px] bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-[0_5px_14px_rgba(16,185,129,0.28)]">

                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >

                  <path
                    d="M12 16V4"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  <path
                    d="M7 9L12 4L17 9"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                </svg>

              </div>

            </div>


            {/* =============================================
                TITLE
            ============================================== */}

            <h2 className="text-[15px] font-semibold text-[#17263c]">
              Upload Annual Report / 10-K
            </h2>


            {/* =============================================
                DESCRIPTION
            ============================================== */}

            <p className="mt-[5px] text-[10.5px] text-slate-500">
              Drag & drop your PDF here or click to browse
            </p>


            {/* =============================================
                BUTTON
            ============================================== */}

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="mt-[13px] flex h-[35px] min-w-[127px] items-center justify-center gap-2 rounded-[6px] bg-emerald-500 px-4 text-[11px] font-semibold text-white shadow-[0_4px_10px_rgba(16,185,129,0.18)] transition-all duration-200 hover:bg-emerald-600 hover:shadow-[0_5px_15px_rgba(16,185,129,0.25)]"
            >

              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
              >

                <path
                  d="M12 16V5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                <path
                  d="M8 9L12 5L16 9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M6 19H18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

              </svg>

              Choose File

            </button>


            {/* Hidden input */}

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (file) {
                  handleFile(file);
                }
              }}
            />


            {/* =============================================
                FILE INFO
            ============================================== */}

            <div className="mt-[13px] flex flex-wrap items-center justify-center gap-[6px] text-[8.5px] text-slate-400">

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


        {/* =================================================
            4 STEP PROCESS
        ================================================== */}

        <div className="mt-[20px] flex w-full max-w-[550px] items-start justify-center">

          {/* STEP 1 */}

          <div className="relative flex w-[125px] flex-col items-center text-center">

            <div className="mb-[5px] flex h-[27px] w-[27px] items-center justify-center rounded-full bg-emerald-50 text-emerald-500">

              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="M14 2V8H20"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
              </svg>

            </div>

            <div className="text-[9px] font-semibold text-slate-700">
              1. Upload
            </div>

            <p className="mt-[3px] max-w-[105px] text-[7.5px] leading-[1.35] text-slate-400">
              Upload your annual report or 10-K in PDF format.
            </p>

          </div>


          {/* ARROW */}

          <div className="mt-[7px] text-[18px] font-light text-slate-300">
            ›
          </div>


          {/* STEP 2 */}

          <div className="relative flex w-[125px] flex-col items-center text-center">

            <div className="mb-[5px] flex h-[27px] w-[27px] items-center justify-center rounded-full bg-emerald-50 text-emerald-500">

              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 3V21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M3 12H21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M5 5L19 19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M19 5L5 19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>

            </div>

            <div className="text-[9px] font-semibold text-slate-700">
              2. AI Extracts
            </div>

            <p className="mt-[3px] max-w-[105px] text-[7.5px] leading-[1.35] text-slate-400">
              AI extracts financial data and key metrics instantly.
            </p>

          </div>


          {/* ARROW */}

          <div className="mt-[7px] text-[18px] font-light text-slate-300">
            ›
          </div>


          {/* STEP 3 */}

          <div className="relative flex w-[125px] flex-col items-center text-center">

            <div className="mb-[5px] flex h-[27px] w-[27px] items-center justify-center rounded-full bg-emerald-50 text-emerald-500">

              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
              >

                <rect
                  x="4"
                  y="12"
                  width="4"
                  height="8"
                  rx="1"
                  fill="currentColor"
                />

                <rect
                  x="10"
                  y="8"
                  width="4"
                  height="12"
                  rx="1"
                  fill="currentColor"
                />

                <rect
                  x="16"
                  y="4"
                  width="4"
                  height="16"
                  rx="1"
                  fill="currentColor"
                />

              </svg>

            </div>

            <div className="text-[9px] font-semibold text-slate-700">
              3. Calculate
            </div>

            <p className="mt-[3px] max-w-[105px] text-[7.5px] leading-[1.35] text-slate-400">
              We calculate FCFF, WACC, Terminal Value & more.
            </p>

          </div>


          {/* ARROW */}

          <div className="mt-[7px] text-[18px] font-light text-slate-300">
            ›
          </div>


          {/* STEP 4 */}

          <div className="relative flex w-[125px] flex-col items-center text-center">

            <div className="mb-[5px] flex h-[27px] w-[27px] items-center justify-center rounded-full bg-emerald-50 text-emerald-500">

              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
              >

                <circle
                  cx="12"
                  cy="12"
                  r="8"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />

                <circle
                  cx="12"
                  cy="12"
                  r="2"
                  fill="currentColor"
                />

                <path
                  d="M12 4V2M20 12H22M12 20V22M4 12H2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

              </svg>

            </div>

            <div className="text-[9px] font-semibold text-slate-700">
              4. Insights
            </div>

            <p className="mt-[3px] max-w-[105px] text-[7.5px] leading-[1.35] text-slate-400">
              Get intrinsic value and actionable insights.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}
