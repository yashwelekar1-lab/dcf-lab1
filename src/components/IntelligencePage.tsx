import { useRef, useState } from "react";

type AnalysisResult = {
  companyName?: string;
  revenue?: string;
  operatingIncome?: string;
  netIncome?: string;
  freeCashFlow?: string;
  wacc?: string;
  terminalGrowth?: string;
  terminalValue?: string;
  intrinsicValue?: string;
};

export default function IntelligencePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisError, setAnalysisError] = useState("");

  const [result, setResult] = useState<AnalysisResult | null>(null);

  /* =========================================================
     FILE SELECTION
  ========================================================== */

  const handleFile = (file: File) => {
    if (!file) return;

    setAnalysisError("");
    setAnalysisComplete(false);
    setResult(null);

    if (file.type !== "application/pdf") {
      setSelectedFile(null);
      setAnalysisError("Please upload a PDF Annual Report or 10-K.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setSelectedFile(null);
      setAnalysisError("Maximum file size is 50MB.");
      return;
    }

    setSelectedFile(file);
  };

  /* =========================================================
     DRAG & DROP
  ========================================================== */

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  /* =========================================================
     RUN ANALYSIS
  ========================================================== */

  const runAnalysis = async () => {
    if (!selectedFile) {
      setAnalysisError("Please upload an Annual Report or 10-K first.");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setAnalysisError("");
    setResult(null);

    try {
      /*
       * REAL BACKEND CONNECTION
       *
       * Replace this URL with your backend endpoint:
       *
       * https://your-api.com/api/analyze
       */

      const formData = new FormData();

      formData.append("file", selectedFile);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Analysis failed.");
      }

      const data = await response.json();

      setResult(data);

      setAnalysisComplete(true);

    } catch (error) {
      console.error(error);

      /*
       * TEMPORARY DEMO RESULT
       *
       * Remove this section once your backend
       * API is connected.
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 1800)
      );

      setResult({
        companyName: "Company extracted from report",
        revenue: "₹XX,XXX Cr",
        operatingIncome: "₹X,XXX Cr",
        netIncome: "₹X,XXX Cr",
        freeCashFlow: "₹X,XXX Cr",
        wacc: "9.2%",
        terminalGrowth: "4.0%",
        terminalValue: "₹XX,XXX Cr",
        intrinsicValue: "₹XXX / Share",
      });

      setAnalysisComplete(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  /* =========================================================
     RESET
  ========================================================== */

  const resetAnalysis = () => {
    setSelectedFile(null);
    setAnalysisComplete(false);
    setIsAnalyzing(false);
    setAnalysisError("");
    setResult(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-70px)] overflow-hidden bg-[#fbfcfd] text-[#14243a]">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

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
            onClick={() => {
              if (!selectedFile && !isAnalyzing) {
                fileInputRef.current?.click();
              }
            }}
            className={`relative flex min-h-[310px] cursor-pointer flex-col items-center justify-center rounded-[15px] border border-dashed px-5 transition-all duration-200 ${
              isDragging
                ? "border-emerald-400 bg-emerald-50"
                : "border-slate-200 bg-[#fdfefe]"
            }`}
          >

            {!selectedFile ? (

              <>
                {/* Decorative sparkles */}

                <span className="absolute left-[36%] top-[30px] text-[17px] text-emerald-400">
                  ✦
                </span>

                <span className="absolute right-[36%] top-[30px] text-[17px] text-emerald-400">
                  ✦
                </span>


                {/* Document icon */}

                <div className="relative mb-[18px] h-[90px] w-[90px]">

                  <div className="absolute left-[15px] top-0 h-[72px] w-[54px] rounded-[4px] border border-slate-300 bg-white shadow-sm">

                    <div className="absolute right-[-1px] top-[-1px] h-[19px] w-[19px] border-b border-l border-slate-300 bg-white" />

                    <div className="absolute left-[10px] top-[31px] h-[3px] w-[30px] rounded bg-slate-100" />

                    <div className="absolute left-[10px] top-[40px] h-[3px] w-[23px] rounded bg-slate-100" />

                    <div className="absolute left-[10px] top-[49px] h-[3px] w-[27px] rounded bg-slate-100" />

                  </div>

                  <div className="absolute bottom-0 left-0 flex h-[48px] w-[55px] items-center justify-center rounded-[8px] bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-[0_6px_18px_rgba(16,185,129,0.28)]">

                    <svg
                      width="29"
                      height="29"
                      viewBox="0 0 24 24"
                      fill="none"
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


                <h2 className="text-[21px] font-semibold tracking-[-0.2px] text-[#17263c]">
                  Upload Annual Report / 10-K
                </h2>

                <p className="mt-[8px] text-[14px] text-slate-500">
                  Drag & drop your PDF here or click to browse
                </p>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="mt-[19px] flex h-[48px] min-w-[175px] items-center justify-center gap-2 rounded-[7px] bg-emerald-500 px-6 text-[14px] font-semibold text-white shadow-[0_5px_14px_rgba(16,185,129,0.20)] transition hover:bg-emerald-600"
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

                <div className="mt-[17px] flex flex-wrap items-center justify-center gap-[8px] text-[11px] text-slate-400">

                  <span>Max file size: 50MB</span>

                  <span className="text-emerald-400">•</span>

                  <span>Supports PDF</span>

                  <span className="text-emerald-400">•</span>

                  <span>10-K</span>

                  <span className="text-emerald-400">•</span>

                  <span>Annual Reports</span>

                </div>
              </>

            ) : (

              /* =================================================
                 FILE SELECTED STATE
              ================================================== */

              <div className="flex w-full max-w-[500px] flex-col items-center">

                <div className="mb-5 flex h-[65px] w-[65px] items-center justify-center rounded-full bg-emerald-50 text-emerald-500">

                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                  >

                    <path
                      d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />

                    <path
                      d="M14 2V8H20"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />

                    <path
                      d="M8 15L10.5 17.5L16 12"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                  </svg>

                </div>


                <h2 className="max-w-[550px] break-all text-center text-[19px] font-semibold text-[#17263c]">
                  {selectedFile.name}
                </h2>


                <p className="mt-2 text-[13px] text-slate-400">
                  PDF successfully uploaded
                </p>


                {/* Run Analysis */}

                <button
                  type="button"
                  disabled={isAnalyzing}
                  onClick={(event) => {
                    event.stopPropagation();
                    runAnalysis();
                  }}
                  className="mt-6 flex h-[52px] min-w-[210px] items-center justify-center gap-3 rounded-[8px] bg-emerald-500 px-7 text-[15px] font-semibold text-white shadow-[0_7px_20px_rgba(16,185,129,0.22)] transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
                >

                  {isAnalyzing ? (

                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Analyzing Report...

                    </>

                  ) : (

                    <>
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                      >

                        <path
                          d="M12 3L13.8 8.2L19 10L13.8 11.8L12 17L10.2 11.8L5 10L10.2 8.2L12 3Z"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinejoin="round"
                        />

                        <path
                          d="M19 16L19.8 18.2L22 19L19.8 19.8L19 22L18.2 19.8L16 19L18.2 18.2L19 16Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />

                      </svg>

                      Run Analysis

                    </>

                  )}

                </button>


                <button
                  type="button"
                  disabled={isAnalyzing}
                  onClick={(event) => {
                    event.stopPropagation();
                    resetAnalysis();
                  }}
                  className="mt-4 text-[12px] font-medium text-slate-400 underline underline-offset-2 hover:text-slate-600"
                >
                  Choose a different file
                </button>

              </div>

            )}

          </div>


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


          {/* Error */}

          {analysisError && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
              {analysisError}
            </div>
          )}

        </div>


        {/* =====================================================
            ANALYSIS PROGRESS
        ====================================================== */}

        {isAnalyzing && (
          <div className="mt-7 w-full max-w-[700px] rounded-xl border border-emerald-100 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <h3 className="text-[17px] font-semibold text-slate-800">
                  Analyzing Annual Report
                </h3>

                <p className="mt-1 text-[12px] text-slate-400">
                  Extracting financial data and valuation inputs...
                </p>
              </div>

              <div className="text-sm font-semibold text-emerald-500">
                AI
              </div>

            </div>


            <div className="mt-5 h-2 overflow-hidden rounded-full bg-emerald-50">

              <div className="h-full w-[65%] animate-pulse rounded-full bg-emerald-500" />

            </div>


            <div className="mt-5 grid grid-cols-2 gap-3 text-[12px] text-slate-500 md:grid-cols-4">

              <div className="rounded-lg bg-slate-50 p-3">
                ✓ PDF Read
              </div>

              <div className="rounded-lg bg-slate-50 p-3">
                ✓ Statements
              </div>

              <div className="rounded-lg bg-slate-50 p-3">
                • FCFF
              </div>

              <div className="rounded-lg bg-slate-50 p-3">
                • Valuation
              </div>

            </div>

          </div>
        )}


        {/* =====================================================
            ANALYSIS RESULT
        ====================================================== */}

        {analysisComplete && result && (
          <div className="mt-8 w-full max-w-[1000px] rounded-2xl border border-emerald-200 bg-white p-7 shadow-[0_15px_45px_rgba(16,185,129,0.08)]">

            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-center">

              <div>

                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-500">
                  Analysis Complete
                </div>

                <h2 className="mt-1 text-[25px] font-bold text-[#14243a]">
                  {result.companyName}
                </h2>

              </div>

              <button
                type="button"
                onClick={resetAnalysis}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Analyze Another Report
              </button>

            </div>


            {/* Financial results */}

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-xl bg-slate-50 p-5">

                <div className="text-xs text-slate-400">
                  Revenue
                </div>

                <div className="mt-2 text-xl font-bold text-slate-800">
                  {result.revenue}
                </div>

              </div>


              <div className="rounded-xl bg-slate-50 p-5">

                <div className="text-xs text-slate-400">
                  Operating Income
                </div>

                <div className="mt-2 text-xl font-bold text-slate-800">
                  {result.operatingIncome}
                </div>

              </div>


              <div className="rounded-xl bg-slate-50 p-5">

                <div className="text-xs text-slate-400">
                  Net Income
                </div>

                <div className="mt-2 text-xl font-bold text-slate-800">
                  {result.netIncome}
                </div>

              </div>


              <div className="rounded-xl bg-emerald-50 p-5">

                <div className="text-xs text-emerald-600">
                  Free Cash Flow
                </div>

                <div className="mt-2 text-xl font-bold text-emerald-700">
                  {result.freeCashFlow}
                </div>

              </div>

            </div>


            {/* Valuation */}

            <div className="mt-6">

              <h3 className="text-[17px] font-semibold text-slate-800">
                DCF Valuation
              </h3>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">

                <div className="rounded-xl border border-slate-100 p-5">

                  <div className="text-xs text-slate-400">
                    WACC
                  </div>

                  <div className="mt-2 text-2xl font-bold text-slate-800">
                    {result.wacc}
                  </div>

                </div>


                <div className="rounded-xl border border-slate-100 p-5">

                  <div className="text-xs text-slate-400">
                    Terminal Growth
                  </div>

                  <div className="mt-2 text-2xl font-bold text-slate-800">
                    {result.terminalGrowth}
                  </div>

                </div>


                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">

                  <div className="text-xs text-emerald-600">
                    Intrinsic Value
                  </div>

                  <div className="mt-2 text-2xl font-bold text-emerald-700">
                    {result.intrinsicValue}
                  </div>

                </div>

              </div>

            </div>


            {/* Terminal Value */}

            <div className="mt-4 rounded-xl bg-slate-50 p-5">

              <div className="text-xs text-slate-400">
                Terminal Value
              </div>

              <div className="mt-2 text-xl font-bold text-slate-800">
                {result.terminalValue}
              </div>

            </div>

          </div>
        )}


        {/* =====================================================
            4 STEP PROCESS
        ====================================================== */}

        {!selectedFile && (
          <div className="mt-[35px] flex w-full max-w-[1000px] items-start justify-center">

            {/* STEP 1 */}

            <div className="flex w-[210px] flex-col items-center text-center">

              <div className="mb-[9px] flex h-[44px] w-[44px] items-center justify-center rounded-full bg-emerald-50 text-emerald-500">

                <svg width="21" height="21" viewBox="0 0 24 24" fill="none">

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


            <div className="mt-[9px] text-[25px] text-slate-300">
              ›
            </div>


            {/* STEP 2 */}

            <div className="flex w-[210px] flex-col items-center text-center">

              <div className="mb-[9px] flex h-[44px] w-[44px] items-center justify-center rounded-full bg-emerald-50 text-emerald-500">

                <svg width="21" height="21" viewBox="0 0 24 24" fill="none">

                  <path
                    d="M12 3V21M3 12H21M5 5L19 19M19 5L5 19"
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


            <div className="mt-[9px] text-[25px] text-slate-300">
              ›
            </div>


            {/* STEP 3 */}

            <div className="flex w-[210px] flex-col items-center text-center">

              <div className="mb-[9px] flex h-[44px] w-[44px] items-center justify-center rounded-full bg-emerald-50 text-emerald-500">

                <svg width="21" height="21" viewBox="0 0 24 24" fill="none">

                  <rect x="4" y="12" width="4" height="8" rx="1" fill="currentColor" />
                  <rect x="10" y="8" width="4" height="12" rx="1" fill="currentColor" />
                  <rect x="16" y="4" width="4" height="16" rx="1" fill="currentColor" />

                </svg>

              </div>

              <div className="text-[13px] font-semibold text-slate-700">
                3. Calculate
              </div>

              <p className="mt-[5px] max-w-[175px] text-[10px] leading-[1.45] text-slate-400">
                We calculate FCFF, WACC, Terminal Value & more.
              </p>

            </div>


            <div className="mt-[9px] text-[25px] text-slate-300">
              ›
            </div>


            {/* STEP 4 */}

            <div className="flex w-[210px] flex-col items-center text-center">

              <div className="mb-[9px] flex h-[44px] w-[44px] items-center justify-center rounded-full bg-emerald-50 text-emerald-500">

                <svg width="21" height="21" viewBox="0 0 24 24" fill="none">

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
        )}

      </section>


      {/* =====================================================
          DISCLAIMER
      ====================================================== */}

      <footer className="relative z-20 mt-10 border-t border-slate-200 bg-white/90 px-6 py-7 text-center">

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
