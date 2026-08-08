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

    // Connect your backend/upload API here later.
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
    <main className="relative min-h-[calc(100vh-70px)] overflow-hidden bg-[#fbfcfd] text-[#14243a]">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Main soft green glow */}

        <div className="absolute left-1/2 top-[250px] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-100/30 blur-3xl" />

        <div className="absolute left-[-150px] top-[420px] h-[400px] w-[500px] rounded-full bg-emerald-50/60 blur-3xl" />

        <div className="absolute right-[-150px] top-[430px] h-[400px] w-[500px] rounded-full bg-emerald-50/60 blur-3xl" />

        {/* LEFT WAVE */}

        <svg
          className="absolute bottom-[-20px] left-[-2%] h-[310px] w-[58%]"
          viewBox="0 0 900 310"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M-30 230C90 130 190 140 290 185C400 235 475 285 600 205C690 148 750 90 930 105"
            stroke="#bcefdc"
            strokeWidth="1.5"
          />

          <path
            d="M-30 238C90 138 190 148 290 193C400 243 475 293 600 213C690 156 750 98 930 113"
            stroke="#c8f2e3"
            strokeWidth="1.5"
          />

          <path
            d="M-30 246C90 146 190 156 290 201C400 251 475 301 600 221C690 164 750 106 930 121"
            stroke="#d1f5e7"
            strokeWidth="1.5"
          />

          <path
            d="M-30 254C90 154 190 164 290 209C400 259 475 309 600 229C690 172 750 114 930 129"
            stroke="#daf7ec"
            strokeWidth="1.5"
          />

          <path
            d="M-30 262C90 162 190 172 290 217C400 267 475 317 600 237C690 180 750 122 930 137"
            stroke="#e2f9f0"
            strokeWidth="1.5"
          />

          <path
            d="M-30 270C90 170 190 180 290 225C400 275 475 325 600 245C690 188 750 130 930 145"
            stroke="#e8faf3"
            strokeWidth="1.5"
          />
        </svg>


        {/* RIGHT WAVE */}

        <svg
          className="absolute bottom-[-20px] right-[-2%] h-[310px] w-[55%]"
          viewBox="0 0 850 310"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M-20 250C100 155 190 145 300 190C405 232 470 280 590 205C680 150 750 100 880 110"
            stroke="#bcefdc"
            strokeWidth="1.5"
          />

          <path
            d="M-20 258C100 163 190 153 300 198C405 240 470 288 590 213C680 158 750 108 880 118"
            stroke="#c8f2e3"
            strokeWidth="1.5"
          />

          <path
            d="M-20 266C100 171 190 161 300 206C405 248 470 296 590 221C680 166 750 116 880 126"
            stroke="#d1f5e7"
            strokeWidth="1.5"
          />

          <path
            d="M-20 274C100 179 190 169 300 214C405 256 470 304 590 229C680 174 750 124 880 134"
            stroke="#daf7ec"
            strokeWidth="1.5"
          />

          <path
            d="M-20 282C100 187 190 177 300 222C405 264 470 312 590 237C680 182 750 132 880 142"
            stroke="#e2f9f0"
            strokeWidth="1.5"
          />
        </svg>

      </div>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-70px)] w-full max-w-[1250px] flex-col items-center px-6 pt-[38px]">

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="text-center">

          <h1 className="relative text-[42px] font-bold leading-[1.1] tracking-[-1.2px] text-[#14243a] md:text-[46px]">

            DCF Lab{" "}

            <span className="text-emerald-500">
              Intelligence
            </span>

            <span className="absolute -right-7 -top-3 text-[21px] font-normal text-emerald-400">
              ✦
            </span>

          </h1>

          <p className="mx-auto mt-[12px] max-w-[850px] text-[14px] leading-[1.65] text-slate-500 md:text-[15px]">

            Upload an Annual Report or 10-K and let AI automatically extract
            financial statements,

            <br />

            calculate FCFF, WACC, Terminal Value and Intrinsic Value.

          </p>

        </div>


        {/* =================================================
            UPLOAD CARD
        ================================================== */}

        <div className="mt-[32px] w-full max-w-[700px] rounded-[22px] border border-emerald-200 bg-white p-[20px] shadow-[0_18px_55px_rgba(16,185,129,0.10)]">

          <div
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => {
              setIsDragging(false);
            }}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative flex h-[310px] cursor-pointer flex-col items-center justify-center rounded-[15px] border border-dashed px-5 transition-all duration-200 ${
              isDragging
                ? "border-emerald-400 bg-emerald-50"
                : "border-slate-200 bg-[#fdfefe]"
            }`}
          >

            {/* Decorative sparkle - left */}

            <span className="absolute left-[36%] top-[30px] text-[17px] text-emerald-400">
              ✦
            </span>


            {/* Decorative sparkle - right */}

            <span className="absolute right-[36%] top-[30px] text-[17px] text-emerald-400">
              ✦
            </span>


            {/* =================================================
                DOCUMENT ICON
            ================================================== */}

            <div className="relative mb-[18px] h-[90px] w-[90px]">

              {/* Document */}

              <div className="absolute left-[15px] top-0 h-[72px] w-[54px] rounded-[4px] border border-slate-300 bg-white shadow-sm">

                {/* folded corner */}

                <div className="absolute right-[-1px] top-[-1px] h-[19px] w-[19px] border-b border-l border-slate-300 bg-white" />

                {/* document lines */}

                <div className="absolute left-[10px] top-[31px] h-[3px] w-[30px] rounded bg-slate-100" />

                <div className="absolute left-[10px] top-[40px] h-[3px] w-[23px] rounded bg-slate-100" />

                <div className="absolute left-[10px] top-[49px] h-[3px] w-[27px] rounded bg-slate-100" />

              </div>


              {/* Green upload badge */}

              <div className="absolute bottom-0 left-0 flex h-[48px] w-[55px] items-center justify-center rounded-[8px] bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-[0_6px_18px_rgba(16,185,129,0.28)]">

                <svg
                  width="29"
                  height="29"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >

                  <path
                    d="M12 17V4"
                    stroke="white"
                    strokeWidth="2.7"
                    strokeLinecap="round"
                  />

                  <path
                    d="M7 9L12 4L17 9"
                    stroke="white"
                    strokeWidth="2.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                </svg>

              </div>

            </div>


            {/* =================================================
                UPLOAD TITLE
            ================================================== */}

            <h2 className="text-[21px] font-semibold tracking-[-0.2px] text-[#17263c]">
              Upload Annual Report / 10-K
            </h2>


            {/* Description */}

            <p className="mt-[8px] text-[14px] text-slate-500">
              Drag & drop your PDF here or click to browse
            </p>


            {/* =================================================
                CHOOSE FILE
            ================================================== */}

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="mt-[19px] flex h-[48px] min-w-[175px] items-center justify-center gap-2 rounded-[7px] bg-emerald-500 px-6 text-[14px] font-semibold text-white shadow-[0_5px_14px_rgba(16,185,129,0.20)] transition-all duration-200 hover:bg-emerald-600 hover:shadow-[0_7px_20px_rgba(16,185,129,0.28)]"
            >

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >

                <path
                  d="M12 16V5"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                />

                <path
                  d="M8 9L12 5L16 9"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M6 19H18"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                />

              </svg>

              Choose File

            </button>


            {/* Hidden file input */}

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


            {/* =================================================
                FILE INFO
            ================================================== */}

            <div className="mt-[17px] flex flex-wrap items-center justify-center gap-[8px] text-[11px] text-slate-400">

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


        {/* =====================================================
            PROCESS STEPS
        ====================================================== */}

        <div className="mt-[35px] flex w-full max-w-[1000px] items-start justify-center">

          {/* =================================================
              STEP 1
          ================================================== */}

          <div className="flex w-[210px] flex-col items-center text-center">

            <div className="mb-[9px] flex h-[44px] w-[44px] items-center justify-center rounded-full bg-emerald-50 text-emerald-500">

              <svg
                width="21"
                height="21"
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

            <div className="text-[13px] font-semibold text-slate-700">
              1. Upload
            </div>

            <p className="mt-[5px] max-w-[175px] text-[10px] leading-[1.45] text-slate-400">
              Upload your annual report or 10-K in PDF format.
            </p>

          </div>


          {/* ARROW */}

          <div className="mt-[9px] text-[25px] font-light text-slate-300">
            ›
          </div>


          {/* =================================================
              STEP 2
          ================================================== */}

          <div className="flex w-[210px] flex-col items-center text-center">

            <div className="mb-[9px] flex h-[44px] w-[44px] items-center justify-center rounded-full bg-emerald-50 text-emerald-500">

              <svg
                width="21"
                height="21"
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

            <div className="text-[13px] font-semibold text-slate-700">
              2. AI Extracts
            </div>

            <p className="mt-[5px] max-w-[175px] text-[10px] leading-[1.45] text-slate-400">
              AI extracts financial data and key metrics instantly.
            </p>

          </div>


          {/* ARROW */}

          <div className="mt-[9px] text-[25px] font-light text-slate-300">
            ›
          </div>


          {/* =================================================
              STEP 3
          ================================================== */}

          <div className="flex w-[210px] flex-col items-center text-center">

            <div className="mb-[9px] flex h-[44px] w-[44px] items-center justify-center rounded-full bg-emerald-50 text-emerald-500">

              <svg
                width="21"
                height="21"
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

            <div className="text-[13px] font-semibold text-slate-700">
              3. Calculate
            </div>

            <p className="mt-[5px] max-w-[175px] text-[10px] leading-[1.45] text-slate-400">
              We calculate FCFF, WACC, Terminal Value & more.
            </p>

          </div>


          {/* ARROW */}

          <div className="mt-[9px] text-[25px] font-light text-slate-300">
            ›
          </div>


          {/* =================================================
              STEP 4
          ================================================== */}

          <div className="flex w-[210px] flex-col items-center text-center">

            <div className="mb-[9px] flex h-[44px] w-[44px] items-center justify-center rounded-full bg-emerald-50 text-emerald-500">

              <svg
                width="21"
                height="21"
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

            <div className="text-[13px] font-semibold text-slate-700">
              4. Insights
            </div>

            <p className="mt-[5px] max-w-[175px] text-[10px] leading-[1.45] text-slate-400">
              Get intrinsic value and actionable insights.
            </p>

          </div>

        </div>


        {/* =====================================================
            MOBILE RESPONSIVE
        ====================================================== */}

               <div className="h-[30px]" />

      </section>


      {/* =====================================================
          DISCLAIMER & COPYRIGHT
      ====================================================== */}

      <footer className="relative z-20 border-t border-slate-200 bg-white px-6 py-7 text-center">

        <p className="mx-auto max-w-[1000px] text-[11px] leading-[1.7] text-slate-400">

          <span className="font-semibold text-slate-500">
            Disclaimer:
          </span>{" "}

          The valuations generated by DCF Lab are estimates based on
          user-provided assumptions and inputs. They are intended for
          informational and educational purposes only and should not be
          considered investment advice. Please conduct your own research
          and consult a qualified financial advisor before making
          investment decisions.

        </p>

        <p className="mt-3 text-[11px] font-medium text-slate-400">

          © 2026 DCF Lab. Designed &amp; Developed by Yash Welekar.
          All Rights Reserved.

        </p>

      </footer>


    </main>
  );
}
