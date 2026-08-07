import React from 'react';
import { Scenario, DCFInputs } from '../types';
import { formatCurrency, formatCompactNumber, generateScenarios } from '../utils/dcfCalculator';
import { ShieldAlert, TrendingUp, TrendingDown, ArrowRight, Check } from 'lucide-react';

interface ScenarioComparisonProps {
  baseInputs: DCFInputs;
  onApplyInputs: (inputs: DCFInputs) => void;
  darkMode: boolean;
}

export const ScenarioComparison: React.FC<ScenarioComparisonProps> = ({
  baseInputs,
  onApplyInputs,
  darkMode,
}) => {
  const scenarios = generateScenarios(baseInputs);
  const scenarioList: Scenario[] = [scenarios.bull, scenarios.base, scenarios.bear];

  const cardBg = darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200';

  return (
    <div className={`p-4 sm:p-5 rounded-2xl border ${cardBg} shadow-xs space-y-4 transition-colors duration-200`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 gap-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            10. Scenario Analysis (Bull / Base / Bear)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare model sensitivity across macro environments and growth assumptions
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scenarioList.map((sc) => {
          const isBull = sc.id === 'bull';
          const isBear = sc.id === 'bear';
          const isBase = sc.id === 'base';

          let headerBorder = 'border-slate-200 dark:border-slate-800';
          let headerBg = 'bg-slate-50 dark:bg-slate-950/40';
          let badgeColor = 'bg-slate-500/10 text-slate-600 dark:text-slate-300';
          let icon = <Check className="h-4 w-4 text-slate-500" />;

          if (isBull) {
            headerBorder = 'border-emerald-500/40';
            headerBg = 'bg-emerald-500/5 dark:bg-emerald-500/10';
            badgeColor = 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400';
            icon = <TrendingUp className="h-4 w-4 text-emerald-500" />;
          } else if (isBear) {
            headerBorder = 'border-red-500/40';
            headerBg = 'bg-red-500/5 dark:bg-red-500/10';
            badgeColor = 'bg-red-500/20 text-red-600 dark:text-red-400';
            icon = <TrendingDown className="h-4 w-4 text-red-500" />;
          }

          const intrinsicVal = sc.calculations.intrinsicValuePerShare;
          const ev = sc.calculations.enterpriseValue;
          const eqVal = sc.calculations.equityValue;

          return (
            <div
              key={sc.id}
              className={`rounded-xl border ${headerBorder} p-4 space-y-3 flex flex-col justify-between transition-all hover:shadow-md ${headerBg}`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${badgeColor} flex items-center gap-1.5`}>
                    {icon}
                    {sc.name}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
                    WACC: {sc.inputs.wacc}%
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                  {sc.description}
                </p>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Intrinsic / Share:</span>
                    <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(intrinsicVal, sc.inputs.currency, 2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Enterprise Value:</span>
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                      {formatCompactNumber(ev, sc.inputs.currency)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Equity Value:</span>
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                      {formatCompactNumber(eqVal, sc.inputs.currency)}
                    </span>
                  </div>
                </div>
              </div>

              {!isBase && (
                <button
                  onClick={() => onApplyInputs(sc.inputs)}
                  className="w-full text-xs font-semibold py-2 px-3 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors border border-slate-200 dark:border-slate-700 flex items-center justify-center space-x-1.5 shadow-2xs"
                >
                  <span>Apply {sc.name} Inputs</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
