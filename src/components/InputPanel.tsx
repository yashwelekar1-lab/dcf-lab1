import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  AlertTriangle,
  HelpCircle,
  Percent,
  Sliders,
  Sparkles,
  Info,
  DollarSign,
  Briefcase,
  Layers,
} from 'lucide-react';
import { DCFInputs, TerminalMethod, ValidationWarning } from '../types';

interface InputPanelProps {
  inputs: DCFInputs;
  onChange: (newInputs: DCFInputs) => void;
  warnings: ValidationWarning[];
  darkMode: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  inputs,
  onChange,
  warnings,
  darkMode,
}) => {
  const [activeTab, setActiveTab] = useState<'fcff' | 'wacc_tv' | 'balance_sheet'>('fcff');
  const [quickGrowthRate, setQuickGrowthRate] = useState<number>(8.0);

  // Helper updates
  const handleWaccChange = (val: number) => {
    onChange({ ...inputs, wacc: val });
  };

  const handleTerminalMethodChange = (method: TerminalMethod) => {
    onChange({ ...inputs, terminalMethod: method });
  };

  const handleFcffChange = (index: number, fcffVal: number) => {
    const updatedYears = [...inputs.years];
    updatedYears[index] = { ...updatedYears[index], fcff: fcffVal };
    onChange({ ...inputs, years: updatedYears });
  };

  const handleEbitdaChange = (index: number, ebitdaVal: number) => {
    const updatedYears = [...inputs.years];
    updatedYears[index] = { ...updatedYears[index], ebitda: ebitdaVal };
    
    // If it's the last year, automatically keep finalYearEbitda in sync if desired
    const isLastYear = index === updatedYears.length - 1;
    onChange({
      ...inputs,
      years: updatedYears,
      ...(isLastYear ? { finalYearEbitda: ebitdaVal } : {}),
    });
  };

  const handleAddYear = () => {
    const lastYear = inputs.years[inputs.years.length - 1];
    const newYearNum = (lastYear ? lastYear.year : inputs.years.length) + 1;
    const lastFcff = lastYear ? lastYear.fcff : 1000;
    const newFcff = Math.round(lastFcff * (1 + quickGrowthRate / 100));
    const lastEbitda = lastYear?.ebitda || Math.round(lastFcff * 1.2);
    const newEbitda = Math.round(lastEbitda * (1 + quickGrowthRate / 100));

    const updatedYears = [
      ...inputs.years,
      { year: newYearNum, fcff: newFcff, ebitda: newEbitda },
    ];
    onChange({
      ...inputs,
      years: updatedYears,
      finalYearEbitda: newEbitda,
    });
  };

  const handleRemoveYear = (index: number) => {
    if (inputs.years.length <= 2) return; // keep minimum 2 years
    const updatedYears = inputs.years
      .filter((_, i) => i !== index)
      .map((item, i) => ({ ...item, year: i + 1 }));
    
    const lastYear = updatedYears[updatedYears.length - 1];
    onChange({
      ...inputs,
      years: updatedYears,
      finalYearEbitda: lastYear?.ebitda || inputs.finalYearEbitda,
    });
  };

  const applyAutoGrowthToAll = () => {
    if (inputs.years.length === 0) return;
    const updatedYears = [...inputs.years];
    const baseFcff = updatedYears[0].fcff;
    const baseEbitda = updatedYears[0].ebitda || Math.round(baseFcff * 1.25);

    for (let i = 1; i < updatedYears.length; i++) {
      const prevFcff = updatedYears[i - 1].fcff;
      const prevEbitda = updatedYears[i - 1].ebitda || prevFcff * 1.25;
      updatedYears[i] = {
        ...updatedYears[i],
        fcff: Math.round(prevFcff * (1 + quickGrowthRate / 100)),
        ebitda: Math.round(prevEbitda * (1 + quickGrowthRate / 100)),
      };
    }

    const lastEbitda = updatedYears[updatedYears.length - 1].ebitda || 0;
    onChange({
      ...inputs,
      years: updatedYears,
      finalYearEbitda: lastEbitda,
    });
  };

  const cardBg = darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200';
  const labelColor = darkMode ? 'text-slate-300' : 'text-slate-700';
  const inputBg = darkMode
    ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-emerald-500'
    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-600';

  return (
    <div className={`rounded-2xl border ${cardBg} p-4 sm:p-5 shadow-xs transition-colors duration-200`}>
      {/* Panel Title & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800 gap-2">
        <div>
          <h2 className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sliders className="h-4 w-4 text-emerald-500" />
            Valuation Assumptions
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Configure free cash flows, discount rates, and balance sheet bridges.
          </p>
        </div>

{/* Valuation Step Navigation */}
<div className="mt-6 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/70 p-1">
  <div className="grid grid-cols-3 gap-1">

    <button
      type="button"
      onClick={() => setActiveTab('fcff')}
      className={
        activeTab === 'fcff'
          ? 'relative min-h-[64px] rounded-lg px-3 py-3 text-center bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
          : 'relative min-h-[64px] rounded-lg px-3 py-3 text-center text-slate-600 dark:text-slate-400 hover:bg-white/70 dark:hover:bg-slate-700/60'
      }
    >
      <div className="text-sm font-semibold">
        1. FCFF
      </div>
      <div className="mt-1 text-xs">
        {inputs.years.length} Year Forecast
      </div>
    </button>

    <button
      type="button"
      onClick={() => setActiveTab('wacc_tv')}
      className={
        activeTab === 'wacc_tv'
          ? 'relative min-h-[64px] rounded-lg px-3 py-3 text-center bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
          : 'relative min-h-[64px] rounded-lg px-3 py-3 text-center text-slate-600 dark:text-slate-400 hover:bg-white/70 dark:hover:bg-slate-700/60'
      }
    >
      <div className="text-sm font-semibold">
        2. WACC & TV
      </div>
      <div className="mt-1 text-xs">
        Discount Rate
      </div>
    </button>

    <button
      type="button"
      onClick={() => setActiveTab('balance_sheet')}
      className={
        activeTab === 'balance_sheet'
          ? 'relative min-h-[64px] rounded-lg px-3 py-3 text-center bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
          : 'relative min-h-[64px] rounded-lg px-3 py-3 text-center text-slate-600 dark:text-slate-400 hover:bg-white/70 dark:hover:bg-slate-700/60'
      }
    >
      <div className="text-sm font-semibold">
        3. Shares & Debt
      </div>
      <div className="mt-1 text-xs">
        Capital Structure
      </div>
    </button>

  </div>
</div>
        {/* Warnings & Alerts Banner */}
      {warnings.length > 0 && (
        <div className="mb-4 space-y-2">
          {warnings.map((warn, i) => (
            <div
              key={i}
              className={`p-2.5 rounded-xl text-xs flex items-start gap-2 border ${
                warn.type === 'error'
                  ? 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400'
                  : warn.type === 'warning'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400'
                  : 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400'
              }`}
            >
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold capitalize">{warn.type}: </span>
                {warn.message}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 1: FCFF FORECAST */}
      {activeTab === 'fcff' && (
        <div className="space-y-4">
          {/* Apply Tool */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={applyAutoGrowthToAll}
              className="text-xs font-semibold px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer shadow-xs"
            >
              Apply
            </button>
          </div>

          {/* Years Schedule Grid */}
          <div className="space-y-3">
            <div className="grid grid-cols-12 gap-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
              <span className="col-span-2">Year</span>
              <span className="col-span-5">FCFF ({inputs.currency} {inputs.unit})</span>
              <span className="col-span-4">EBITDA (Optional)</span>
              <span className="col-span-1 text-center">Del</span>
            </div>

            {inputs.years.map((y, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-2 items-center bg-slate-50/50 dark:bg-slate-950/40 p-2 rounded-xl border border-slate-200/80 dark:border-slate-800/80"
              >
                <div className="col-span-2 font-mono font-bold text-xs text-slate-800 dark:text-slate-200 pl-1">
                  Year {y.year}
                </div>
                <div className="col-span-5 relative">
                  <span className="absolute left-2.5 top-2 text-xs font-medium text-slate-400">
                    {inputs.currency}
                  </span>
                  <input
                    type="number"
                    value={y.fcff}
                    onChange={(e) => handleFcffChange(idx, parseFloat(e.target.value) || 0)}
                    className={`w-full pl-6 pr-2 py-1.5 rounded-lg text-xs font-mono font-semibold focus:outline-hidden ${inputBg}`}
                  />
                </div>
                <div className="col-span-4 relative">
                  <span className="absolute left-2.5 top-2 text-xs font-medium text-slate-400">
                    {inputs.currency}
                  </span>
                  <input
                    type="number"
                    value={y.ebitda || ''}
                    placeholder="Optional"
                    onChange={(e) => handleEbitdaChange(idx, parseFloat(e.target.value) || 0)}
                    className={`w-full pl-6 pr-2 py-1.5 rounded-lg text-xs font-mono focus:outline-hidden ${inputBg}`}
                  />
                </div>
                <div className="col-span-1 flex justify-center">
                  <button
                    onClick={() => handleRemoveYear(idx)}
                    disabled={inputs.years.length <= 2}
                    className="p-1 rounded-md text-slate-400 hover:text-red-500 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                    title="Remove forecast year"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Year Button */}
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={handleAddYear}
              className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700"
            >
              <Plus className="h-3.5 w-3.5 text-emerald-500" />
              <span>Add Forecast Year (Year {inputs.years.length + 1})</span>
            </button>

            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Total Forecast Horizon: <strong className="font-mono">{inputs.years.length} Years</strong>
            </span>
          </div>
        </div>
      )}

      {/* TAB 2: WACC & TERMINAL VALUE */}
      {activeTab === 'wacc_tv' && (
        <div className="space-y-5">
          {/* WACC Card */}
          <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <label className={`text-xs font-bold ${labelColor} flex items-center gap-1.5`}>
                <Percent className="h-3.5 w-3.5 text-emerald-500" />
                Weighted Average Cost of Capital (WACC)
              </label>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {inputs.wacc}%
              </span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="range"
                min="3.0"
                max="20.0"
                step="0.1"
                value={inputs.wacc}
                onChange={(e) => handleWaccChange(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
              />
              <input
                type="number"
                step="0.1"
                value={inputs.wacc}
                onChange={(e) => handleWaccChange(parseFloat(e.target.value) || 0)}
                className={`w-20 px-2 py-1 rounded-lg text-xs font-mono font-bold text-center focus:outline-hidden ${inputBg}`}
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              The required rate of return used to discount future cash flows back to present value.
            </p>
          </div>

          {/* Terminal Value Method Selector */}
          <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <label className={`text-xs font-bold ${labelColor} flex items-center gap-1.5`}>
                <Briefcase className="h-3.5 w-3.5 text-emerald-500" />
                Terminal Value Calculation Method
              </label>
            </div>

            {/* Method Toggle Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleTerminalMethodChange('perpetual')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  inputs.terminalMethod === 'perpetual'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 shadow-2xs font-semibold'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="text-xs font-bold">Method 1: Perpetual Growth</div>
                <div className="text-[10px] opacity-80 mt-0.5">Gordon Growth Model (FCFF × (1+g) / (WACC - g))</div>
              </button>

              <button
                onClick={() => handleTerminalMethodChange('exit_multiple')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  inputs.terminalMethod === 'exit_multiple'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 shadow-2xs font-semibold'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="text-xs font-bold">Method 2: Exit Multiple</div>
                <div className="text-[10px] opacity-80 mt-0.5">Market Multiple (Final Year EBITDA × Multiple)</div>
              </button>
            </div>

            {/* Method Inputs */}
            {inputs.terminalMethod === 'perpetual' ? (
              <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Terminal Growth Rate (g %)
                  </label>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {inputs.terminalGrowthRate}%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0.0"
                    max="6.0"
                    step="0.1"
                    value={inputs.terminalGrowthRate}
                    onChange={(e) => onChange({ ...inputs, terminalGrowthRate: parseFloat(e.target.value) })}
                    className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
                  />
                  <input
                    type="number"
                    step="0.1"
                    value={inputs.terminalGrowthRate}
                    onChange={(e) => onChange({ ...inputs, terminalGrowthRate: parseFloat(e.target.value) || 0 })}
                    className={`w-20 px-2 py-1 rounded-lg text-xs font-mono font-bold text-center focus:outline-hidden ${inputBg}`}
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Long-term sustainable growth rate into perpetuity (typically bounded by GDP growth rate 2%–3%).
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Exit EBITDA Multiple (x)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={inputs.exitMultiple}
                    onChange={(e) => onChange({ ...inputs, exitMultiple: parseFloat(e.target.value) || 0 })}
                    className={`w-full px-3 py-1.5 rounded-lg text-xs font-mono font-bold focus:outline-hidden ${inputBg}`}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Final Year EBITDA ({inputs.currency} {inputs.unit})
                  </label>
                  <input
                    type="number"
                    value={inputs.finalYearEbitda}
                    onChange={(e) => onChange({ ...inputs, finalYearEbitda: parseFloat(e.target.value) || 0 })}
                    className={`w-full px-3 py-1.5 rounded-lg text-xs font-mono font-bold focus:outline-hidden ${inputBg}`}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: BALANCE SHEET BRIDGES & SHARES */}
      {activeTab === 'balance_sheet' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Cash */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                + Cash & Cash Equivalents ({inputs.currency})
              </label>
              <input
                type="number"
                value={inputs.cash}
                onChange={(e) => onChange({ ...inputs, cash: parseFloat(e.target.value) || 0 })}
                className={`w-full px-3 py-1.5 rounded-lg text-xs font-mono font-semibold focus:outline-hidden ${inputBg}`}
              />
            </div>

            {/* Non-operating Investments */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                + Non-Operating Investments ({inputs.currency})
              </label>
              <input
                type="number"
                value={inputs.nonOperatingInvestments}
                onChange={(e) => onChange({ ...inputs, nonOperatingInvestments: parseFloat(e.target.value) || 0 })}
                className={`w-full px-3 py-1.5 rounded-lg text-xs font-mono font-semibold focus:outline-hidden ${inputBg}`}
              />
            </div>

            {/* Total Debt */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1 text-red-600 dark:text-red-400">
                − Total Debt ({inputs.currency})
              </label>
              <input
                type="number"
                value={inputs.debt}
                onChange={(e) => onChange({ ...inputs, debt: parseFloat(e.target.value) || 0 })}
                className={`w-full px-3 py-1.5 rounded-lg text-xs font-mono font-semibold focus:outline-hidden ${inputBg}`}
              />
            </div>

            {/* Minority Interest */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1 text-red-600 dark:text-red-400">
                − Minority Interest ({inputs.currency})
              </label>
              <input
                type="number"
                value={inputs.minorityInterest}
                onChange={(e) => onChange({ ...inputs, minorityInterest: parseFloat(e.target.value) || 0 })}
                className={`w-full px-3 py-1.5 rounded-lg text-xs font-mono focus:outline-hidden ${inputBg}`}
              />
            </div>

            {/* Preferred Equity */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1 text-red-600 dark:text-red-400">
                − Preferred Equity ({inputs.currency})
              </label>
              <input
                type="number"
                value={inputs.preferredEquity}
                onChange={(e) => onChange({ ...inputs, preferredEquity: parseFloat(e.target.value) || 0 })}
                className={`w-full px-3 py-1.5 rounded-lg text-xs font-mono focus:outline-hidden ${inputBg}`}
              />
            </div>

            {/* Diluted Shares Outstanding */}
            <div>
              <label className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                Diluted Shares Outstanding ({inputs.unit})
              </label>
              <input
                type="number"
                value={inputs.sharesOutstanding}
                onChange={(e) => onChange({ ...inputs, sharesOutstanding: parseFloat(e.target.value) || 0 })}
                className={`w-full px-3 py-1.5 rounded-lg text-xs font-mono font-bold focus:outline-hidden ${inputBg}`}
              />
            </div>
          </div>

          {/* Current Market Price (Optional) */}
          <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
                Current Market Price per Share ({inputs.currency})
              </label>
              <span className="text-[10px] text-slate-400">Optional for Upside / Margin of Safety</span>
            </div>
            <input
              type="number"
              step="0.01"
              value={inputs.currentMarketPrice || ''}
              placeholder="e.g. 150.00"
              onChange={(e) => onChange({ ...inputs, currentMarketPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
              className={`w-full px-3 py-2 rounded-xl text-xs font-mono font-bold focus:outline-hidden ${inputBg}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};
