import React from 'react';
import { DCFCalculations, DCFInputs } from '../types';
import { formatCurrency, formatNumber } from '../utils/dcfCalculator';
import { Calculator, CheckCircle2, ChevronRight, FileText } from 'lucide-react';

interface ValuationTableProps {
  inputs: DCFInputs;
  calculations: DCFCalculations;
  darkMode: boolean;
}

export const ValuationTable: React.FC<ValuationTableProps> = ({
  inputs,
  calculations,
  darkMode,
}) => {
  const {
    discountedCashFlows,
    pvOfForecastCashFlows,
    terminalValue,
    pvOfTerminalValue,
    enterpriseValue,
    equityValue,
    intrinsicValuePerShare,
  } = calculations;

  const cardBg = darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200';
  const tableHeaderBg = darkMode ? 'bg-slate-950/60' : 'bg-slate-50/80';

  return (
    <div className={`p-4 sm:p-5 rounded-2xl border ${cardBg} shadow-xs space-y-4 transition-colors duration-200`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 gap-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Calculator className="h-4 w-4 text-emerald-500" />
            Detailed Valuation Audit Schedule
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Step-by-step breakdown of discounted cash flows, terminal value, and equity bridge
          </p>
        </div>
      </div>

      {/* 1. Cash Flow Discounting Schedule Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className={`${tableHeaderBg} border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider`}>
              <th className="p-3">Line Item ({inputs.currency} {inputs.unit})</th>
              {discountedCashFlows.map((d) => (
                <th key={d.year} className="p-3 font-mono text-center">
                  Year {d.year}
                </th>
              ))}
              <th className="p-3 font-mono text-center bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                Sum PV
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
            {/* FCFF Row */}
            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-950/30">
              <td className="p-3 font-sans font-semibold text-slate-800 dark:text-slate-200">
                1. Forecast FCFF
              </td>
              {discountedCashFlows.map((d) => (
                <td key={d.year} className="p-3 text-center text-slate-700 dark:text-slate-300">
                  {formatCurrency(d.fcff, inputs.currency, 1)}
                </td>
              ))}
              <td className="p-3 text-center font-bold text-slate-500">
                —
              </td>
            </tr>

            {/* Discount Factor Row */}
            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-950/30">
              <td className="p-3 font-sans font-medium text-slate-600 dark:text-slate-400">
                2. Discount Factor (WACC = {inputs.wacc}%)
              </td>
              {discountedCashFlows.map((d) => (
                <td key={d.year} className="p-3 text-center text-slate-500 dark:text-slate-400">
                  {d.discountFactor.toFixed(4)}
                </td>
              ))}
              <td className="p-3 text-center text-slate-500">
                —
              </td>
            </tr>

            {/* PV of FCFF Row */}
            <tr className="bg-emerald-500/5 dark:bg-emerald-500/10 font-bold text-emerald-600 dark:text-emerald-400">
              <td className="p-3 font-sans">
                3. Present Value (PV of FCFF)
              </td>
              {discountedCashFlows.map((d) => (
                <td key={d.year} className="p-3 text-center">
                  {formatCurrency(d.pvFcff, inputs.currency, 1)}
                </td>
              ))}
              <td className="p-3 text-center bg-emerald-500/20 font-extrabold text-emerald-700 dark:text-emerald-300">
                {formatCurrency(pvOfForecastCashFlows, inputs.currency, 1)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 2. Terminal Value Step Box */}
      <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
          <span className="flex items-center gap-1.5">
            <FileText className="h-4 w-4 text-emerald-500" />
            Terminal Value Derivation ({inputs.terminalMethod === 'perpetual' ? 'Perpetual Growth' : 'Exit Multiple'})
          </span>
          <span className="font-mono text-emerald-600 dark:text-emerald-400">
            TV = {formatCurrency(terminalValue, inputs.currency, 1)}
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-mono">
          {inputs.terminalMethod === 'perpetual' ? (
            <>
              TV = [Last Year FCFF ({inputs.years[inputs.years.length - 1]?.fcff}) × (1 + {inputs.terminalGrowthRate}%)] / ({inputs.wacc}% − {inputs.terminalGrowthRate}%) = {formatCurrency(terminalValue, inputs.currency, 1)}
              <br />
              PV of Terminal Value = {formatCurrency(terminalValue, inputs.currency, 1)} / (1 + {inputs.wacc}%)<sup>{inputs.years.length}</sup> = <strong>{formatCurrency(pvOfTerminalValue, inputs.currency, 1)}</strong>
            </>
          ) : (
            <>
              TV = Final Year EBITDA ({inputs.finalYearEbitda}) × Exit Multiple ({inputs.exitMultiple}x) = {formatCurrency(terminalValue, inputs.currency, 1)}
              <br />
              PV of Terminal Value = {formatCurrency(terminalValue, inputs.currency, 1)} / (1 + {inputs.wacc}%)<sup>{inputs.years.length}</sup> = <strong>{formatCurrency(pvOfTerminalValue, inputs.currency, 1)}</strong>
            </>
          )}
        </p>
      </div>

      {/* 3. Equity Bridge & Intrinsic Value Summary Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-xs text-left border-collapse">
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
            <tr className="bg-slate-50/50 dark:bg-slate-950/40 font-bold">
              <td className="p-3 font-sans text-slate-800 dark:text-slate-200">
                Present Value of Forecast Cash Flows
              </td>
              <td className="p-3 text-right text-slate-800 dark:text-slate-200">
                {formatCurrency(pvOfForecastCashFlows, inputs.currency, 2)}
              </td>
            </tr>
            <tr className="bg-slate-50/50 dark:bg-slate-950/40 font-bold">
              <td className="p-3 font-sans text-slate-800 dark:text-slate-200">
                + Present Value of Terminal Value
              </td>
              <td className="p-3 text-right text-indigo-600 dark:text-indigo-400">
                {formatCurrency(pvOfTerminalValue, inputs.currency, 2)}
              </td>
            </tr>
            <tr className="bg-emerald-500/10 font-bold text-emerald-700 dark:text-emerald-300">
              <td className="p-3 font-sans">
                = Enterprise Value (EV)
              </td>
              <td className="p-3 text-right font-extrabold text-sm">
                {formatCurrency(enterpriseValue, inputs.currency, 2)}
              </td>
            </tr>
            <tr>
              <td className="p-3 font-sans text-slate-600 dark:text-slate-400">+ Cash & Cash Equivalents</td>
              <td className="p-3 text-right text-slate-700 dark:text-slate-300">+{formatCurrency(inputs.cash, inputs.currency, 2)}</td>
            </tr>
            <tr>
              <td className="p-3 font-sans text-slate-600 dark:text-slate-400">+ Non-operating Investments</td>
              <td className="p-3 text-right text-slate-700 dark:text-slate-300">+{formatCurrency(inputs.nonOperatingInvestments, inputs.currency, 2)}</td>
            </tr>
            <tr>
              <td className="p-3 font-sans text-red-600 dark:text-red-400">− Total Debt</td>
              <td className="p-3 text-right text-red-600 dark:text-red-400">−{formatCurrency(inputs.debt, inputs.currency, 2)}</td>
            </tr>
            {inputs.minorityInterest > 0 && (
              <tr>
                <td className="p-3 font-sans text-red-600 dark:text-red-400">− Minority Interest</td>
                <td className="p-3 text-right text-red-600 dark:text-red-400">−{formatCurrency(inputs.minorityInterest, inputs.currency, 2)}</td>
              </tr>
            )}
            {inputs.preferredEquity > 0 && (
              <tr>
                <td className="p-3 font-sans text-red-600 dark:text-red-400">− Preferred Equity</td>
                <td className="p-3 text-right text-red-600 dark:text-red-400">−{formatCurrency(inputs.preferredEquity, inputs.currency, 2)}</td>
              </tr>
            )}
            <tr className="bg-teal-500/10 font-bold text-teal-700 dark:text-teal-300">
              <td className="p-3 font-sans">
                = Equity Value
              </td>
              <td className="p-3 text-right font-extrabold text-sm">
                {formatCurrency(equityValue, inputs.currency, 2)}
              </td>
            </tr>
            <tr>
              <td className="p-3 font-sans text-slate-600 dark:text-slate-400">÷ Diluted Shares Outstanding</td>
              <td className="p-3 text-right text-slate-700 dark:text-slate-300">{formatNumber(inputs.sharesOutstanding, 2)} {inputs.unit}</td>
            </tr>
            <tr className="bg-emerald-600 text-white font-extrabold text-sm">
              <td className="p-3.5 font-sans flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-200" />
                = Intrinsic Value Per Share
              </td>
              <td className="p-3.5 text-right font-mono text-base">
                {formatCurrency(intrinsicValuePerShare, inputs.currency, 2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
