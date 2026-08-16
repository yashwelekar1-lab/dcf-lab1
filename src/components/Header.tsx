import { useEffect, useState } from "react";
import {
  DollarSign,
  Layers3,
  BookOpen,
  Info,
  Download,
  FileSpreadsheet,
  RotateCcw,
  Sun,
  Moon,
  X,
  Check,
} from "lucide-react";

type Currency = {
  label: string;
  code: string;
  symbol: string;
};

const currencies: Currency[] = [
  {
    label: "USD ($)",
    code: "USD",
    symbol: "$",
  },
  {
    label: "INR (₹)",
    code: "INR",
    symbol: "₹",
  },
  {
    label: "EUR (€)",
    code: "EUR",
    symbol: "€",
  },
  {
    label: "GBP (£)",
    code: "GBP",
    symbol: "£",
  },
];

const units = [
  "Units",
  "In Thousands",
  "In Millions",
  "In Billions",
];

export function Header() {
  /* -------------------------------------------------------
     STATE
  ------------------------------------------------------- */

  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [unitsOpen, setUnitsOpen] = useState(false);

  const [currency, setCurrency] = useState<Currency>(currencies[0]);
  const [unit, setUnit] = useState("In Millions");

  const [guideOpen, setGuideOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const [isDark, setIsDark] = useState(true);

  /* -------------------------------------------------------
     LOAD SAVED SETTINGS
  ------------------------------------------------------- */

  useEffect(() => {
    const savedCurrency = localStorage.getItem("dcflab-currency");
    const savedUnit = localStorage.getItem("dcflab-unit");
    const savedTheme = localStorage.getItem("dcflab-theme");

    if (savedCurrency) {
      const foundCurrency = currencies.find(
        (item) => item.code === savedCurrency
      );

      if (foundCurrency) {
        setCurrency(foundCurrency);
      }
    }

    if (savedUnit && units.includes(savedUnit)) {
      setUnit(savedUnit);
    }

    if (savedTheme === "light") {
      setIsDark(false);
    }
  }, []);

  /* -------------------------------------------------------
     THEME
  ------------------------------------------------------- */

  useEffect(() => {
    document.documentElement.dataset.theme = isDark
      ? "dark"
      : "light";

    localStorage.setItem(
      "dcflab-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  /* -------------------------------------------------------
     CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
  ------------------------------------------------------- */

  useEffect(() => {
    const handleClickOutside = () => {
      setCurrencyOpen(false);
      setUnitsOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCurrencyOpen(false);
        setUnitsOpen(false);
        setGuideOpen(false);
        setAboutOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  /* -------------------------------------------------------
     CURRENCY
  ------------------------------------------------------- */

  const handleCurrencyChange = (selected: Currency) => {
    setCurrency(selected);

    localStorage.setItem(
      "dcflab-currency",
      selected.code
    );

    setCurrencyOpen(false);

    // Allows the rest of DCF Lab to listen for the change.
    window.dispatchEvent(
      new CustomEvent("dcflab:currency-change", {
        detail: selected,
      })
    );
  };

  /* -------------------------------------------------------
     UNITS
  ------------------------------------------------------- */

  const handleUnitChange = (selectedUnit: string) => {
    setUnit(selectedUnit);

    localStorage.setItem(
      "dcflab-unit",
      selectedUnit
    );

    setUnitsOpen(false);

    // Allows the DCF model to listen for unit changes.
    window.dispatchEvent(
      new CustomEvent("dcflab:unit-change", {
        detail: {
          unit: selectedUnit,
        },
      })
    );
  };

  /* -------------------------------------------------------
     RESET
  ------------------------------------------------------- */

  const handleReset = () => {
    const confirmed = window.confirm(
      "Reset DCF Lab settings to their defaults?"
    );

    if (!confirmed) return;

    const defaultCurrency = currencies[0];
    const defaultUnit = "In Millions";

    setCurrency(defaultCurrency);
    setUnit(defaultUnit);

    localStorage.setItem(
      "dcflab-currency",
      defaultCurrency.code
    );

    localStorage.setItem(
      "dcflab-unit",
      defaultUnit
    );

    window.dispatchEvent(
      new CustomEvent("dcflab:reset")
    );
  };

  /* -------------------------------------------------------
     EXPORT JSON
  ------------------------------------------------------- */

  const handleExport = () => {
    const exportData = {
      application: "DCF Lab",
      description:
        "Discounted Cash Flow Valuation Engine",
      exportedAt: new Date().toISOString(),
      settings: {
        currency: {
          code: currency.code,
          symbol: currency.symbol,
        },
        unit,
        theme: isDark ? "dark" : "light",
      },
    };

    const blob = new Blob(
      [JSON.stringify(exportData, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "dcflab-export.json";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    window.dispatchEvent(
      new CustomEvent("dcflab:export")
    );
  };

  /* -------------------------------------------------------
     EXPORT CSV
  ------------------------------------------------------- */

  const handleCSVExport = () => {
    const rows = [
      ["DCF Lab Export"],
      [],
      ["Setting", "Value"],
      ["Currency", currency.code],
      ["Currency Symbol", currency.symbol],
      ["Display Unit", unit],
      ["Theme", isDark ? "Dark" : "Light"],
      ["Exported At", new Date().toISOString()],
    ];

    const csv = rows
      .map((row) =>
        row
          .map((value) => {
            const stringValue = String(value ?? "");

            if (
              stringValue.includes(",") ||
              stringValue.includes('"') ||
              stringValue.includes("\n")
            ) {
              return `"${stringValue.replace(
                /"/g,
                '""'
              )}"`;
            }

            return stringValue;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "dcflab-export.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    window.dispatchEvent(
      new CustomEvent("dcflab:csv-export")
    );
  };

  /* -------------------------------------------------------
     THEME
  ------------------------------------------------------- */

  const handleThemeToggle = () => {
    setIsDark((previous) => !previous);

    window.dispatchEvent(
      new CustomEvent("dcflab:theme-change", {
        detail: {
          theme: isDark ? "light" : "dark",
        },
      })
    );
  };

  /* -------------------------------------------------------
     RENDER
  ------------------------------------------------------- */

  return (
    <>
      <header
        className="
          sticky
          top-0
          z-[100]
          m-0
          h-[72px]
          w-full
          shrink-0
          border-b
          border-slate-800
          bg-[#0d1628]
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
          {/* =================================================
              LEFT — LOGO
          ================================================= */}

          <div className="flex items-center gap-3">
            <div
              className="
                relative
                flex
                h-11
                w-11
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
                  text-slate-400
                "
              >
                Discounted Cash Flow Valuation Engine
              </span>
            </div>
          </div>

          {/* =================================================
              RIGHT — CONTROLS
          ================================================= */}

          <div className="flex items-center gap-2">
            {/* =================================================
                CURRENCY
            ================================================= */}

            <div
              className="relative"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <button
                type="button"
                onClick={() => {
                  setCurrencyOpen(
                    (previous) => !previous
                  );
                  setUnitsOpen(false);
                }}
                className="
                  flex
                  h-9
                  items-center
                  gap-2
                  rounded-[9px]
                  border
                  border-slate-700
                  bg-[#172238]
                  px-3
                  text-sm
                  font-medium
                  text-slate-200
                  transition
                  hover:bg-[#1b2941]
                "
              >
                <DollarSign className="h-4 w-4 text-slate-400" />

                <span>
                  {currency.label}
                </span>

                <span
                  className={`
                    text-xs
                    text-slate-400
                    transition-transform
                    ${
                      currencyOpen
                        ? "rotate-180"
                        : ""
                    }
                  `}
                >
                  ⌄
                </span>
              </button>

              {currencyOpen && (
                <div
                  className="
                    absolute
                    right-0
                    top-11
                    z-[300]
                    min-w-[160px]
                    overflow-hidden
                    rounded-lg
                    border
                    border-slate-700
                    bg-[#172238]
                    p-1
                    shadow-2xl
                  "
                >
                  {currencies.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() =>
                        handleCurrencyChange(item)
                      }
                      className="
                        flex
                        w-full
                        items-center
                        justify-between
                        rounded-md
                        px-3
                        py-2
                        text-left
                        text-sm
                        text-slate-300
                        transition
                        hover:bg-[#1b2941]
                        hover:text-white
                      "
                    >
                      <span>
                        {item.label}
                      </span>

                      {currency.code ===
                        item.code && (
                        <Check className="h-4 w-4 text-emerald-400" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* =================================================
                UNITS
            ================================================= */}

            <div
              className="relative"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <button
                type="button"
                onClick={() => {
                  setUnitsOpen(
                    (previous) => !previous
                  );
                  setCurrencyOpen(false);
                }}
                className="
                  flex
                  h-9
                  items-center
                  gap-2
                  rounded-[9px]
                  border
                  border-slate-700
                  bg-[#172238]
                  px-3
                  text-sm
                  font-medium
                  text-slate-200
                  transition
                  hover:bg-[#1b2941]
                "
              >
                <Layers3 className="h-4 w-4 text-slate-400" />

                <span>{unit}</span>

                <span
                  className={`
                    text-xs
                    text-slate-400
                    transition-transform
                    ${
                      unitsOpen
                        ? "rotate-180"
                        : ""
                    }
                  `}
                >
                  ⌄
                </span>
              </button>

              {unitsOpen && (
                <div
                  className="
                    absolute
                    right-0
                    top-11
                    z-[300]
                    min-w-[160px]
                    overflow-hidden
                    rounded-lg
                    border
                    border-slate-700
                    bg-[#172238]
                    p-1
                    shadow-2xl
                  "
                >
                  {units.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        handleUnitChange(item)
                      }
                      className="
                        flex
                        w-full
                        items-center
                        justify-between
                        rounded-md
                        px-3
                        py-2
                        text-left
                        text-sm
                        text-slate-300
                        transition
                        hover:bg-[#1b2941]
                        hover:text-white
                      "
                    >
                      <span>{item}</span>

                      {unit === item && (
                        <Check className="h-4 w-4 text-emerald-400" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* =================================================
                GUIDE
            ================================================= */}

            <button
              type="button"
              onClick={() => setGuideOpen(true)}
              className="
                flex
                h-9
                items-center
                gap-2
                rounded-[9px]
                border
                border-slate-700
                bg-[#172238]
                px-3
                text-sm
                font-medium
                text-slate-300
                transition
                hover:bg-[#1b2941]
                hover:text-white
              "
            >
              <BookOpen className="h-4 w-4 text-emerald-400" />

              <span>Guide</span>
            </button>

            {/* =================================================
                ABOUT
            ================================================= */}

            <button
              type="button"
              onClick={() => setAboutOpen(true)}
              className="
                flex
                h-9
                items-center
                gap-2
                rounded-[9px]
                border
                border-slate-700
                bg-[#172238]
                px-3
                text-sm
                font-medium
                text-slate-300
                transition
                hover:bg-[#1b2941]
                hover:text-white
              "
            >
              <Info className="h-4 w-4 text-emerald-400" />

              <span>About</span>
            </button>

            {/* =================================================
                EXPORT
            ================================================= */}

            <button
              type="button"
              onClick={handleExport}
              className="
                flex
                h-9
                items-center
                gap-2
                rounded-[9px]
                bg-emerald-500
                px-4
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-emerald-400
                active:scale-[0.98]
              "
            >
              <Download className="h-4 w-4" />

              <span>Export</span>
            </button>

            {/* =================================================
                CSV
            ================================================= */}

            <button
              type="button"
              onClick={handleCSVExport}
              className="
                flex
                h-9
                items-center
                rounded-[9px]
                border
                border-slate-700
                bg-[#172238]
                px-3
                text-[13px]
                font-semibold
                text-slate-300
                transition
                hover:bg-[#1b2941]
                hover:text-white
                active:scale-[0.98]
              "
            >
              <FileSpreadsheet className="mr-1.5 h-4 w-4" />

              CSV
            </button>

            {/* =================================================
                RESET
            ================================================= */}

            <button
              type="button"
              aria-label="Reset"
              title="Reset DCF Lab settings"
              onClick={handleReset}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-[9px]
                border
                border-slate-700
                bg-[#172238]
                text-slate-400
                transition
                hover:bg-[#1b2941]
                hover:text-white
                active:scale-[0.95]
              "
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            {/* =================================================
                THEME
            ================================================= */}

            <button
              type="button"
              aria-label="Toggle theme"
              title={
                isDark
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              onClick={handleThemeToggle}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-[9px]
                border
                border-slate-700
                bg-[#172238]
                text-yellow-400
                transition
                hover:bg-[#1b2941]
                hover:text-yellow-300
                active:scale-[0.95]
              "
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          GUIDE MODAL
      ===================================================== */}

      {guideOpen && (
        <div
          className="
            fixed
            inset-0
            z-[500]
            flex
            items-center
            justify-center
            bg-black/70
            p-6
            backdrop-blur-sm
          "
          onClick={() => setGuideOpen(false)}
        >
          <div
            className="
              w-full
              max-w-2xl
              overflow-hidden
              rounded-2xl
              border
              border-slate-700
              bg-[#101a2d]
              shadow-2xl
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* Header */}
            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-slate-700
                px-6
                py-4
              "
            >
              <div>
                <h2 className="text-lg font-semibold text-white">
                  DCF Lab Guide
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Discounted Cash Flow Valuation Workflow
                </p>
              </div>

              <button
                type="button"
                onClick={() => setGuideOpen(false)}
                className="
                  rounded-lg
                  p-2
                  text-slate-400
                  transition
                  hover:bg-slate-800
                  hover:text-white
                "
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-5 px-6 py-6">
              <GuideStep
                number="01"
                title="Company & Financials"
                description="Enter or import historical financial statements and operating assumptions."
              />

              <GuideStep
                number="02"
                title="Forecast"
                description="Build revenue, margins, tax, working capital and capital expenditure forecasts."
              />

              <GuideStep
                number="03"
                title="Free Cash Flow"
                description="Calculate projected unlevered free cash flow using the operating assumptions."
              />

              <GuideStep
                number="04"
                title="WACC"
                description="Estimate cost of equity, cost of debt and weighted average cost of capital."
              />

              <GuideStep
                number="05"
                title="Terminal Value"
                description="Calculate terminal value using the perpetual growth or exit multiple approach."
              />

              <GuideStep
                number="06"
                title="Valuation"
                description="Discount projected cash flows and terminal value to determine enterprise and equity value."
              />
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          ABOUT MODAL
      ===================================================== */}

      {aboutOpen && (
        <div
          className="
            fixed
            inset-0
            z-[500]
            flex
            items-center
            justify-center
            bg-black/70
            p-6
            backdrop-blur-sm
          "
          onClick={() => setAboutOpen(false)}
        >
          <div
            className="
              w-full
              max-w-lg
              overflow-hidden
              rounded-2xl
              border
              border-slate-700
              bg-[#101a2d]
              shadow-2xl
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-slate-700
                px-6
                py-4
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-cyan-400
                    via-emerald-400
                    to-lime-300
                  "
                >
                  <div className="h-5 w-5 rounded-full bg-[#101a2d]" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white">
                    DCF Lab
                  </h2>

                  <p className="text-xs text-slate-400">
                    Valuation Engine
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setAboutOpen(false)}
                className="
                  rounded-lg
                  p-2
                  text-slate-400
                  transition
                  hover:bg-slate-800
                  hover:text-white
                "
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 px-6 py-6">
              <p className="text-sm leading-6 text-slate-300">
                DCF Lab is a financial valuation engine
                designed to structure the complete
                discounted cash flow analysis workflow.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <AboutItem
                  title="Financial Modeling"
                  description="Forecasting & FCF"
                />

                <AboutItem
                  title="Valuation"
                  description="DCF & Terminal Value"
                />

                <AboutItem
                  title="Sensitivity"
                  description="Scenario Analysis"
                />

                <AboutItem
                  title="Research"
                  description="Investment Analysis"
                />
              </div>

              <div
                className="
                  rounded-xl
                  border
                  border-emerald-500/20
                  bg-emerald-500/5
                  p-4
                "
              >
                <p className="text-xs leading-5 text-slate-400">
                  Current display
                </p>

                <div className="mt-2 flex gap-4">
                  <div>
                    <p className="text-xs text-slate-500">
                      Currency
                    </p>

                    <p className="text-sm font-medium text-white">
                      {currency.label}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Units
                    </p>

                    <p className="text-sm font-medium text-white">
                      {unit}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ===========================================================
   GUIDE STEP
=========================================================== */

function GuideStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          border
          border-emerald-500/30
          bg-emerald-500/10
          text-xs
          font-semibold
          text-emerald-400
        "
      >
        {number}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-5 text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ===========================================================
   ABOUT ITEM
=========================================================== */

function AboutItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-slate-700
        bg-[#172238]
        p-4
      "
    >
      <p className="text-sm font-medium text-white">
        {title}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}
