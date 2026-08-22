import React, { useState, useMemo, useEffect } from 'react';

import {
  DCFInputs,
  CurrencySymbol,
  DisplayUnit,
  Scenario,
} from './types';

import {
  calculateDCF,
  validateInputs,
  generateSensitivityMatrix,
  PRESET_COMPANIES,
  formatCurrency,
} from './utils/dcfCalculator';

// Layout & Component Imports
import { Header } from './components/Header';
import { AboutModal } from './components/AboutModal';
import { InputPanel } from './components/InputPanel';
import { KpiDashboard } from './components/KpiDashboard';
import { ValuationTable } from './components/ValuationTable';
import { SensitivityHeatmap } from './components/SensitivityHeatmap';
import { ScenarioComparison } from './components/ScenarioComparison';
import { FinancialGlossaryModal } from './components/FinancialGlossaryModal';
import TopNavigation from './components/TopNavigation';
import IntelligencePage from './components/IntelligencePage';
import SavedAnalysesPage from './components/SavedAnalysesPage';

// Charts
import { FcffForecastChart } from './components/charts/FcffForecastChart';
import { DcfComparisonChart } from './components/charts/DcfComparisonChart';
import { EvCompositionChart } from './components/charts/EvCompositionChart';
import { EquityBridgeChart } from './components/charts/EquityBridgeChart';
import { IntrinsicVsMarketChart } from './components/charts/IntrinsicVsMarketChart';
import { DiscountFactorChart } from './components/charts/DiscountFactorChart';
import { TvContributionChart } from './components/charts/TvContributionChart';

export default function App() {
  const [showAbout, setShowAbout] = useState(true);

  // Theme & Unit State
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [currency, setCurrency] = useState<CurrencySymbol>('$');
  const [unit, setUnit] = useState<DisplayUnit>('millions');

  const [activeTab, setActiveTab] = useState("calculator");

  const [selectedPresetId, setSelectedPresetId] =
    useState<string>('apple_tech');

  const [isGlossaryOpen, setIsGlossaryOpen] =
    useState<boolean>(false);

  // Initial Inputs state from Tech Titan preset
  const defaultInputs = PRESET_COMPANIES[0].inputs;

  const [inputs, setInputs] = useState<DCFInputs>({
    ...defaultInputs,
    currency,
    unit,
  });

  // Sync inputs when currency or unit is selected globally
  const handleCurrencyChange = (newCurr: CurrencySymbol) => {
    setCurrency(newCurr);

    setInputs((prev) => ({
      ...prev,
      currency: newCurr,
    }));
  };

  const handleUnitChange = (newUnit: DisplayUnit) => {
    setUnit(newUnit);

    setInputs((prev) => ({
      ...prev,
      unit: newUnit,
    }));
  };

  // Load Preset
  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);

    const found = PRESET_COMPANIES.find(
      (p) => p.id === presetId
    );

    if (found) {
      setInputs({
        ...found.inputs,
        currency,
        unit,
      });
    }
  };

  // Reset Model
  const handleReset = () => {
    setSelectedPresetId('apple_tech');

    setInputs({
      ...PRESET_COMPANIES[0].inputs,
      currency: '$',
      unit: 'millions',
    });
  };

  // Perform DCF Calculations
  const calculations = useMemo(
    () => calculateDCF(inputs),
    [inputs]
  );

  // Perform Validation
  const warnings = useMemo(
    () => validateInputs(inputs),
    [inputs]
  );

  // Perform Sensitivity Analysis Matrix
  const sensitivityMatrix = useMemo(
    () => generateSensitivityMatrix(inputs),
    [inputs]
  );

  // Apply Sensitivity Matrix Cell
  const handleApplySensitivityCell = (
    wacc: number,
    tvParam: number
  ) => {
    if (inputs.terminalMethod === 'perpetual') {
      setInputs((prev) => ({
        ...prev,
        wacc,
        terminalGrowthRate: tvParam,
      }));
    } else {
      setInputs((prev) => ({
        ...prev,
        wacc,
        exitMultiple: tvParam,
      }));
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const csvRows = [
      ['DCF Lab Valuation Summary Report'],
      [`Company/Model:`, selectedPresetId],
      [`Currency:`, inputs.currency],
      [`Units:`, inputs.unit],
      [''],
      ['Key Metrics', 'Value'],
      [
        'Intrinsic Value Per Share',
        calculations.intrinsicValuePerShare.toFixed(2),
      ],
      [
        'Enterprise Value',
        calculations.enterpriseValue.toFixed(2),
      ],
      [
        'Equity Value',
        calculations.equityValue.toFixed(2),
      ],
      [
        'PV Forecast Cash Flows',
        calculations.pvOfForecastCashFlows.toFixed(2),
      ],
      [
        'PV Terminal Value',
        calculations.pvOfTerminalValue.toFixed(2),
      ],
      [
        'Terminal Value % of EV',
        `${calculations.tvContributionPercent.toFixed(1)}%`,
      ],
      ['WACC', `${inputs.wacc}%`],
      ['Terminal Method', inputs.terminalMethod],
      [
        'Terminal Growth Rate',
        `${inputs.terminalGrowthRate}%`,
      ],
      [''],
      ['Forecast Cash Flows Schedule'],
      ['Year', 'FCFF', 'Discount Factor', 'PV FCFF'],

      ...calculations.discountedCashFlows.map((d) => [
        `Year ${d.year}`,
        d.fcff.toFixed(2),
        d.discountFactor.toFixed(4),
        d.pvFcff.toFixed(2),
      ]),
    ];

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      csvRows.map((e) => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement('a');

    link.setAttribute('href', encodedUri);

    link.setAttribute(
      'download',
      `DCF_Lab_Valuation_${Date.now()}.csv`
    );

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  // Export PDF / Print
  const handleExportPDF = () => {
    window.print();
  };

  /*
   * ============================================================
   * INTELLIGENCE PAGE
   * ============================================================
   */

  if (activeTab === "intelligence") {
    return (
      <>
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          currency={currency}
          setCurrency={handleCurrencyChange}
          unit={unit}
          setUnit={handleUnitChange}
          onSelectPreset={handleSelectPreset}
          onReset={handleReset}
          onExportPDF={handleExportPDF}
          onExportCSV={handleExportCSV}
          onOpenGlossary={() =>
            setIsGlossaryOpen(true)
          }
          onOpenAbout={() =>
            setShowAbout(true)
          }
          selectedPresetId={selectedPresetId}
        />

        <TopNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <IntelligencePage />

        <AboutModal
          isOpen={showAbout}
          onClose={() => setShowAbout(false)}
        />
      </>
    );
  }

  /*
   * ============================================================
   * SAVED ANALYSES
   * ============================================================
   */

  if (activeTab === "saved") {
    return (
      <>
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          currency={currency}
          setCurrency={handleCurrencyChange}
          unit={unit}
          setUnit={handleUnitChange}
          onSelectPreset={handleSelectPreset}
          onReset={handleReset}
          onExportPDF={handleExportPDF}
          onExportCSV={handleExportCSV}
          onOpenGlossary={() =>
            setIsGlossaryOpen(true)
          }
          onOpenAbout={() =>
            setShowAbout(true)
          }
          selectedPresetId={selectedPresetId}
        />

        <TopNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <SavedAnalysesPage />

        <AboutModal
          isOpen={showAbout}
          onClose={() => setShowAbout(false)}
        />
      </>
    );
  }

  /*
   * ============================================================
   * DCF CALCULATOR
   * ============================================================
   */

  return (
    <div
      className={`min-h-screen font-sans ${
        darkMode
          ? 'bg-slate-950 text-slate-100'
          : 'bg-slate-50 text-slate-900'
      } transition-colors duration-200 pb-12`}
    >

      {/* Navigation Header */}

      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currency={currency}
        setCurrency={handleCurrencyChange}
        unit={unit}
        setUnit={handleUnitChange}
        onSelectPreset={handleSelectPreset}
        onReset={handleReset}
        onExportPDF={handleExportPDF}
        onExportCSV={handleExportCSV}
        onOpenGlossary={() =>
          setIsGlossaryOpen(true)
        }
        onOpenAbout={() =>
          setShowAbout(true)
        }
        selectedPresetId={selectedPresetId}
      />

      <TopNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Workspace Layout */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Left Column: Valuation Input Panel */}

          <section className="lg:col-span-4 space-y-6 print:hidden">

            <InputPanel
              inputs={inputs}
              onChange={setInputs}
              warnings={warnings}
              darkMode={darkMode}
            />

          </section>

          {/* Right Column: Dashboard & Interactive Visualizations */}

          <section className="lg:col-span-8 space-y-6">

            {/* Top Summary KPI Cards */}

            <KpiDashboard
              inputs={inputs}
              calculations={calculations}
              darkMode={darkMode}
            />

            {/* Interactive Charts Grid */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Chart 1: FCFF Forecast */}

              <div
                className={`p-4 rounded-2xl border ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-slate-200'
                } shadow-xs min-h-[280px]`}
              >
                <FcffForecastChart
                  inputs={inputs}
                  calculations={calculations}
                  darkMode={darkMode}
                />
              </div>

              {/* Chart 2: DCF Comparison */}

              <div
                className={`p-4 rounded-2xl border ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-slate-200'
                } shadow-xs min-h-[280px]`}
              >
                <DcfComparisonChart
                  inputs={inputs}
                  calculations={calculations}
                  darkMode={darkMode}
                />
              </div>

              {/* Chart 3: EV Composition */}

              <div
                className={`p-4 rounded-2xl border ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-slate-200'
                } shadow-xs min-h-[280px]`}
              >
                <EvCompositionChart
                  inputs={inputs}
                  calculations={calculations}
                  darkMode={darkMode}
                />
              </div>

              {/* Chart 4: Equity Value Bridge */}

              <div
                className={`p-4 rounded-2xl border ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-slate-200'
                } shadow-xs min-h-[280px]`}
              >
                <EquityBridgeChart
                  inputs={inputs}
                  calculations={calculations}
                  darkMode={darkMode}
                />
              </div>

              {/* Chart 5: Intrinsic Value vs Market */}

              <div
                className={`p-4 rounded-2xl border ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-slate-200'
                } shadow-xs min-h-[280px]`}
              >
                <IntrinsicVsMarketChart
                  inputs={inputs}
                  calculations={calculations}
                  darkMode={darkMode}
                />
              </div>

              {/* Chart 7: Terminal Value Stack */}

              <div
                className={`p-4 rounded-2xl border ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-slate-200'
                } shadow-xs min-h-[280px]`}
              >
                <TvContributionChart
                  inputs={inputs}
                  calculations={calculations}
                  darkMode={darkMode}
                />
              </div>

              {/* Chart 8: Discount Factor Curve */}

              <div
                className={`p-4 rounded-2xl border ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-slate-200'
                } shadow-xs min-h-[280px] md:col-span-2`}
              >
                <DiscountFactorChart
                  inputs={inputs}
                  calculations={calculations}
                  darkMode={darkMode}
                />
              </div>

            </div>

            {/* Sensitivity Heatmap Matrix */}

            <SensitivityHeatmap
              matrix={sensitivityMatrix}
              inputs={inputs}
              onApplyCell={handleApplySensitivityCell}
              darkMode={darkMode}
            />

            {/* Scenario Analysis */}

            <ScenarioComparison
              baseInputs={inputs}
              onApplyInputs={setInputs}
              darkMode={darkMode}
            />

            {/* Detailed Valuation Table */}

            <ValuationTable
              inputs={inputs}
              calculations={calculations}
              darkMode={darkMode}
            />

            {/* Footer Disclaimer & Copyright */}

            <footer
              className={`mt-12 pt-8 pb-12 border-t ${
                darkMode
                  ? 'border-slate-800/80 text-slate-400'
                  : 'border-slate-200 text-slate-600'
              } text-xs leading-relaxed space-y-4 text-center max-w-4xl mx-auto px-4`}
            >

              <p>
                <strong
                  className={
                    darkMode
                      ? 'text-slate-300'
                      : 'text-slate-700'
                  }
                >
                  Disclaimer:
                </strong>{' '}

                The valuations generated by DCF Lab are
                estimates based on user-provided assumptions
                and inputs. They are intended for informational
                and educational purposes only and should not be
                considered investment advice. Please conduct
                your own research and consult a qualified
                financial advisor before making investment
                decisions.
              </p>

              <p
                className={`font-medium ${
                  darkMode
                    ? 'text-slate-300'
                    : 'text-slate-700'
                }`}
              >
                © 2026 DCF Lab. Designed &amp; Developed by
                Yash Welekar. All Rights Reserved.
              </p>

            </footer>

          </section>

        </div>

      </main>

      {/* Financial Glossary & Formula Guide Modal */}

      <FinancialGlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() =>
          setIsGlossaryOpen(false)
        }
        darkMode={darkMode}
      />

      {/* About DCF Lab Modal */}

      <AboutModal
        isOpen={showAbout}
        onClose={() =>
          setShowAbout(false)
        }
      />

    </div>
  );
}
