import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  ShieldAlert,
  PieChart,
  DollarSign,
  Activity,
  Layers,
  Percent,
  CheckCircle2,
} from 'lucide-react';
import { DCFCalculations, DCFInputs } from '../types';
import {
  formatCurrency,
  formatPercent,
  formatCompactNumber,
  formatNumber,
} from '../utils/dcfCalculator';

interface KpiDashboardProps {
  inputs: DCFInputs;
  calculations: DCFCalculations;
  darkMode: boolean;
}

export const KpiDashboard: React.FC<KpiDashboardProps> = ({
  inputs,
  calculations,
  darkMode,
}) => {
  const {
    enterpriseValue,
    equityValue,
    intrinsicValuePerShare,
    pvOfForecastCashFlows,
    pvOfTerminalValue,
    terminalValue,
    upsideDownsidePercent,
    marginOfSafety,
    tvContributionPercent,
    cagr,
  } = calculations;

  const cardBg = darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200';
  const marketPrice = inputs.currentMarketPrice;

  // Valuation Status
  let statusText = 'Fair Value';
  let statusBadgeClass = 'bg-slate-500/10 text-slate-600 dark:text-slate-300 border-slate-500/20';

  if (upsideDownsidePercent !== null && upsideDownsidePercent !== undefined) {
    if (upsideDownsidePercent > 10) {
      statusText = 'Undervalued';
      statusBadgeClass = 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
    } else if (upsideDownsidePercent < -10) {
      statusText = 'Overvalued';
      statusBadgeClass = 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
    }
  }

  return (
    <div className="w-full min-w-0 space-y-4">
      {/* Primary Hero Intrinsic Value Banner */}
      <div className={`w-full min-w-0 p-5 rounded-2xl border ${cardBg} shadow-xs relative overflow-hidden transition-colors duration-200`}>
        <div className="absolute -right-8 -bottom-8 opacity-5 dark:opacity-10 pointer-events-none">
          <TrendingUp className="w-48 h-48 text-emerald-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Intrinsic Value Highlight */}
          <div className="md:col-span-5 space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Intrinsic Value per Share
              </span>
              <span className={`px-2 py-0.5 text-[11px] font-bold rounded-full border ${statusBadgeClass}`}>
                {statusText}
              </span>
            </div>

            <div className="flex items-baseline space-x-2">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 tracking-tight">
                {formatCurrency(intrinsicValuePerShare, inputs.currency, 2)}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                per share
              </span>
            </div>

            {marketPrice ? (
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-2 pt-1">
                <span>Current Market: <strong className="font-mono text-slate-700 dark:text-slate-200">{formatCurrency(marketPrice, inputs.currency, 2)}</strong></span>
                <span>•</span>
                <span className={upsideDownsidePercent && upsideDownsidePercent >= 0 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-red-600 dark:text-red-400 font-bold'}>
                  {upsideDownsidePercent && upsideDownsidePercent >= 0 ? '▲' : '▼'} {formatPercent(upsideDownsidePercent || 0)} upside
                </span>
              </div>
            ) : (
              <p className="text-[11px] text-slate-400">
                Enter Current Market Price in inputs to measure Margin of Safety.
              </p>
            )}
          </div>

          {/* Upside & Margin of Safety Indicators */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 pt-3 md:pt-0 md:pl-5">
            {/* Upside/Downside % */}
            <div className="space-y-1">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
                Upside / Downside
              </span>
              <div className="flex items-center space-x-1">
                {upsideDownsidePercent !== null && upsideDownsidePercent >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-emerald-500 shrink-0" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 shrink-0" />
                )}
                <span className={`text-base font-bold font-mono ${
                  upsideDownsidePercent !== null && upsideDownsidePercent >= 0
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {upsideDownsidePercent !== null ? formatPercent(upsideDownsidePercent) : 'N/A'}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block">vs Market Price</span>
            </div>

            {/* Margin of Safety */}
            <div className="space-y-1">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
                Margin of Safety
              </span>
              <div className="flex items-center space-x-1">
                {marginOfSafety !== null && marginOfSafety >= 20 ? (
                  <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                ) : (
                  <ShieldAlert className="h-4 w-4 text-amber-500 shrink-0" />
                )}
                <span className="text-base font-bold font-mono text-slate-800 dark:text-slate-200">
                  {marginOfSafety !== null ? `${marginOfSafety.toFixed(1)}%` : 'N/A'}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block">Discount to Intrinsic</span>
            </div>

            {/* FCFF CAGR */}
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
                FCFF Forecast CAGR
              </span>
              <div className="flex items-center space-x-1">
                <Activity className="h-4 w-4 text-teal-500 shrink-0" />
                <span className="text-base font-bold font-mono text-slate-800 dark:text-slate-200">
                  {formatPercent(cagr, 1)}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block">Year 1 to {inputs.years.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Secondary Key Metric Cards */}
      <div className="grid w-full min-w-0 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Enterprise Value */}
        <div className={`p-3.5 rounded-xl border ${cardBg} shadow-2xs space-y-1 transition-all hover:border-emerald-500/30`}>
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Enterprise Value</span>
            <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
          </div>
          <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100 tracking-tight">
            {formatCompactNumber(enterpriseValue, inputs.currency)}
          </div>
          <div className="text-[10px] text-slate-400 truncate">
            {formatCurrency(enterpriseValue, inputs.currency, 0)} {inputs.unit}
          </div>
        </div>

        {/* Equity Value */}
        <div className={`p-3.5 rounded-xl border ${cardBg} shadow-2xs space-y-1 transition-all hover:border-emerald-500/30`}>
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Equity Value</span>
            <Layers className="h-3.5 w-3.5 text-teal-500" />
          </div>
          <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100 tracking-tight">
            {formatCompactNumber(equityValue, inputs.currency)}
          </div>
          <div className="text-[10px] text-slate-400 truncate">
            EV + Cash − Debt
          </div>
        </div>

        {/* Forecast PV */}
        <div className={`p-3.5 rounded-xl border ${cardBg} shadow-2xs space-y-1 transition-all hover:border-emerald-500/30`}>
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>PV Forecast FCFF</span>
            <Activity className="h-3.5 w-3.5 text-emerald-500" />
          </div>
          <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100 tracking-tight">
            {formatCompactNumber(pvOfForecastCashFlows, inputs.currency)}
          </div>
          <div className="text-[10px] text-slate-400">
            {(100 - tvContributionPercent).toFixed(1)}% of EV
          </div>
        </div>

        {/* PV of Terminal Value */}
        <div className={`p-3.5 rounded-xl border ${cardBg} shadow-2xs space-y-1 transition-all hover:border-emerald-500/30`}>
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>PV Terminal Value</span>
            <PieChart className="h-3.5 w-3.5 text-indigo-500" />
          </div>
          <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100 tracking-tight">
            {formatCompactNumber(pvOfTerminalValue, inputs.currency)}
          </div>
          <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
            {tvContributionPercent.toFixed(1)}% of EV
          </div>
        </div>

        {/* Undiscounted TV */}
        <div className={`p-3.5 rounded-xl border ${cardBg} shadow-2xs space-y-1 transition-all hover:border-emerald-500/30`}>
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Undiscounted TV</span>
            <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
          </div>
          <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100 tracking-tight">
            {formatCompactNumber(terminalValue, inputs.currency)}
          </div>
          <div className="text-[10px] text-slate-400">
            At Year {inputs.years.length}
          </div>
        </div>

        {/* Discount Rate & TV Assumption */}
        <div className={`p-3.5 rounded-xl border ${cardBg} shadow-2xs space-y-1 transition-all hover:border-emerald-500/30`}>
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Discount / TV</span>
            <Percent className="h-3.5 w-3.5 text-emerald-500" />
          </div>
          <div className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">
            WACC {inputs.wacc}%
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
            {inputs.terminalMethod === 'perpetual'
              ? `g = ${inputs.terminalGrowthRate}%`
              : `Exit = ${inputs.exitMultiple}x`}
          </div>
        </div>
      </div>
    </div>
  );
};
