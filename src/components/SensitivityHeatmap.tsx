import React from 'react';
import { SensitivityMatrix, SensitivityCell, DCFInputs } from '../types';
import { formatCurrency } from '../utils/dcfCalculator';
import { Grid, Info } from 'lucide-react';

interface SensitivityHeatmapProps {
  matrix: SensitivityMatrix;
  inputs: DCFInputs;
  onApplyCell: (wacc: number, tvParam: number) => void;
  darkMode: boolean;
}

export const SensitivityHeatmap: React.FC<SensitivityHeatmapProps> = ({
  matrix,
  inputs,
  onApplyCell,
  darkMode,
}) => {
  const getCellColor = (cell: SensitivityCell) => {
    if (cell.wacc <= cell.tvParam && inputs.terminalMethod === 'perpetual') {
      return darkMode
        ? 'bg-red-950/60 text-red-400 border-red-900/50'
        : 'bg-red-100 text-red-700 border-red-200';
    }

    switch (cell.status) {
      case 'dark_green':
        return darkMode
          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
          : 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'light_green':
        return darkMode
          ? 'bg-emerald-900/50 text-emerald-200 border-emerald-700/50'
          : 'bg-emerald-50/80 text-emerald-800 border-emerald-200';
      case 'yellow':
        return darkMode
          ? 'bg-amber-950/50 text-amber-200 border-amber-800/50'
          : 'bg-amber-50 text-amber-900 border-amber-200';
      case 'orange':
        return darkMode
          ? 'bg-orange-950/50 text-orange-200 border-orange-800/50'
          : 'bg-orange-50 text-orange-900 border-orange-200';
      case 'red':
      default:
        return darkMode
          ? 'bg-red-900/40 text-red-200 border-red-800/50'
          : 'bg-red-50 text-red-900 border-red-200';
    }
  };

  const isBaseCell = (wacc: number, param: number) => {
    const isWaccMatch = Math.abs(wacc - inputs.wacc) < 0.1;
    const isParamMatch =
      inputs.terminalMethod === 'perpetual'
        ? Math.abs(param - inputs.terminalGrowthRate) < 0.1
        : Math.abs(param - inputs.exitMultiple) < 0.1;
    return isWaccMatch && isParamMatch;
  };

  const cardBg = darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200';

  return (
    <div className={`p-4 sm:p-5 rounded-2xl border ${cardBg} shadow-xs space-y-3 transition-colors duration-200`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Grid className="h-4 w-4 text-emerald-500" />
            6. Sensitivity Analysis Heatmap
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Intrinsic Value per share under varying WACC and {matrix.paramLabel} assumptions
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-1.5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
          <span>Scale:</span>
          <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
            High Val
          </span>
          <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-600 dark:text-amber-400">
            Base
          </span>
          <span className="px-1.5 py-0.5 rounded-md bg-red-500/20 text-red-600 dark:text-red-400">
            Low Val
          </span>
        </div>
      </div>

      {/* Grid Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr>
              <th className="p-2 text-left text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                WACC \ {matrix.paramLabel}
              </th>
              {matrix.tvParamValues.map((paramVal, colIdx) => (
                <th
                  key={colIdx}
                  className="p-2 text-xs font-mono font-bold text-slate-700 dark:text-slate-300"
                >
                  {paramVal}
                  {inputs.terminalMethod === 'perpetual' ? '%' : 'x'}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.grid.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {/* Row Header WACC */}
                <td className="p-2 text-left text-xs font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-l-lg">
                  {matrix.waccValues[rowIdx]}%
                </td>

                {/* Heatmap Cells */}
                {row.map((cell, colIdx) => {
                  const isBase = isBaseCell(cell.wacc, cell.tvParam);
                  const isInvalid = cell.wacc <= cell.tvParam && inputs.terminalMethod === 'perpetual';

                  return (
                    <td key={colIdx} className="p-1">
                      <button
                        onClick={() => !isInvalid && onApplyCell(cell.wacc, cell.tvParam)}
                        disabled={isInvalid}
                        className={`w-full py-2.5 px-2 rounded-xl border text-xs font-mono font-bold transition-all relative group cursor-pointer ${getCellColor(
                          cell
                        )} ${
                          isBase
                            ? 'ring-2 ring-emerald-500 shadow-md font-extrabold z-10'
                            : 'hover:opacity-90 hover:scale-[1.02]'
                        }`}
                      >
                        {isBase && (
                          <span className="absolute -top-1.5 -right-1 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                          </span>
                        )}

                        <div>
                          {isInvalid ? (
                            <span className="text-[10px] opacity-60">N/A (wacc≤g)</span>
                          ) : (
                            formatCurrency(cell.intrinsicValue, inputs.currency, 2)
                          )}
                        </div>

                        {/* Hover Tooltip overlay */}
                        {!isInvalid && cell.upsidePercent !== null && (
                          <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-slate-900 text-white text-[10px] rounded-lg whitespace-nowrap shadow-lg z-20 pointer-events-none">
                            WACC: {cell.wacc}% | TV: {cell.tvParam}
                            {inputs.terminalMethod === 'perpetual' ? '%' : 'x'}
                            <br />
                            Upside: {cell.upsidePercent.toFixed(1)}%
                          </div>
                        )}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center space-x-1 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
        <Info className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
        <span>Click any cell to immediately set WACC and Terminal assumptions in your model. Highlighted box indicates your current base model.</span>
      </div>
    </div>
  );
};
