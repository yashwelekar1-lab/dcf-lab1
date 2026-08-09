import { useState } from "react";
import { X, Upload, FileText, Play } from "lucide-react";

interface BeginAnalysisModalProps {
  open: boolean;
  onClose: () => void;
  onRunAnalysis: (
    file: File,
    terminalGrowthRate: number,
    forecastYears: number
  ) => void;
}

export default function BeginAnalysisModal({
  open,
  onClose,
  onRunAnalysis,
}: BeginAnalysisModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [terminalGrowthRate, setTerminalGrowthRate] = useState("");
  const [forecastYears, setForecastYears] = useState("");

  if (!open) return null;

  const forecastYearsNumber = Number(forecastYears);
  const terminalGrowthNumber = Number(terminalGrowthRate);

  const isValid =
    file !== null &&
    terminalGrowthRate !== "" &&
    forecastYears !== "" &&
    Number.isFinite(terminalGrowthNumber) &&
    Number.isFinite(forecastYearsNumber) &&
    forecastYearsNumber > 0 &&
    Number.isInteger(forecastYearsNumber);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Please upload a PDF annual report.");
      return;
    }

    setFile(selectedFile);
  };

  const handleRunAnalysis = () => {
    if (!isValid || !file) return;

    onRunAnalysis(
      file,
      terminalGrowthNumber,
      forecastYearsNumber
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-2xl">

        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Begin Analysis
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Upload your report and provide the DCF assumptions.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Upload Report */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-gray-200">
            Annual Report
          </label>

          <label className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-gray-600 bg-gray-900/60 px-4 py-5 transition hover:border-gray-400 hover:bg-gray-900">
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="flex flex-col items-center text-center">
              {file ? (
                <>
                  <FileText className="mb-2 h-7 w-7 text-white" />

                  <span className="max-w-[350px] truncate text-sm font-medium text-white">
                    {file.name}
                  </span>

                  <span className="mt-1 text-xs text-gray-400">
                    PDF selected
                  </span>
                </>
              ) : (
                <>
                  <Upload className="mb-2 h-7 w-7 text-gray-400" />

                  <span className="text-sm font-medium text-white">
                    Upload Annual Report
                  </span>

                  <span className="mt-1 text-xs text-gray-400">
                    PDF files only
                  </span>
                </>
              )}
            </div>
          </label>
        </div>

        {/* Terminal Growth Rate */}
        <div className="mb-5">
          <label
            htmlFor="terminal-growth"
            className="mb-2 block text-sm font-medium text-gray-200"
          >
            Terminal Growth Rate
          </label>

          <div className="relative">
            <input
              id="terminal-growth"
              type="number"
              step="0.1"
              value={terminalGrowthRate}
              onChange={(e) =>
                setTerminalGrowthRate(e.target.value)
              }
              placeholder="Enter terminal growth rate"
              className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 pr-10 text-white outline-none transition placeholder:text-gray-500 focus:border-gray-400"
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              %
            </span>
          </div>
        </div>

        {/* Forecast Years */}
        <div className="mb-7">
          <label
            htmlFor="forecast-years"
            className="mb-2 block text-sm font-medium text-gray-200"
          >
            FCFF Forecast Period
          </label>

          <input
            id="forecast-years"
            type="number"
            min="1"
            step="1"
            value={forecastYears}
            onChange={(e) =>
              setForecastYears(e.target.value)
            }
            placeholder="Enter number of forecast years"
            className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-gray-400"
          />

          <p className="mt-1.5 text-xs text-gray-500">
            Enter the number of years for the FCFF forecast.
          </p>
        </div>

        {/* Run Analysis */}
        <button
          onClick={handleRunAnalysis}
          disabled={!isValid}
          className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium transition ${
            isValid
              ? "bg-white text-black hover:bg-gray-200"
              : "cursor-not-allowed bg-gray-700 text-gray-500"
          }`}
        >
          <Play size={17} />
          Run Analysis
        </button>
      </div>
    </div>
  );
}
