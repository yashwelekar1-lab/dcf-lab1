import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from 'recharts';
import { DCFCalculations, DCFInputs } from '../../types';
import { formatCurrency, formatPercent } from '../../utils/dcfCalculator';

interface ChartProps {
  inputs: DCFInputs;
  calculations: DCFCalculations;
  darkMode: boolean;
}

export const IntrinsicVsMarketChart: React.FC<ChartProps> = ({
  inputs,
  calculations,
  darkMode,
}) => {
  const intrinsicVal = calculations.intrinsicValuePerShare;
  const marketPrice = inputs.currentMarketPrice || 0;
  const upside = calculations.upsideDownsidePercent;

  let intrinsicColor = '#10b981'; // green default
  if (upside !== null && upside !== undefined) {
    if (upside < -10) intrinsicColor = '#ef4444'; // overvalued red
    else if (upside < 0) intrinsicColor = '#f59e0b'; // slightly overvalued amber
  }

  const comparisonData = [
    { name: 'Intrinsic Value', price: intrinsicVal, color: intrinsicColor },
    { name: 'Market Price', price: marketPrice, color: '#64748b' },
  ].filter((item) => item.price > 0);

  const gridColor = darkMode ? '#1e293b' : '#e2e8f0';
  const textColor = darkMode ? '#94a3b8' : '#64748b';

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2 px-1">
        <div>
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
            5. Intrinsic Value vs Market Price
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Per share valuation gap vs current market trading price
          </p>
        </div>
        {upside !== null && (
          <div className="text-right">
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full border ${
                upside >= 0
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                  : 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
              }`}
            >
              {upside >= 0 ? 'Undervalued' : 'Overvalued'} ({formatPercent(upside)})
            </span>
          </div>
        )}
      </div>

      <div className="w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={comparisonData}
            margin={{ top: 10, right: 30, left: 30, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              type="number"
              stroke={textColor}
              fontSize={11}
              tickLine={false}
              tickFormatter={(val) => `${inputs.currency}${val}`}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke={textColor}
              fontSize={11}
              tickLine={false}
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#0f172a' : '#ffffff',
                borderColor: darkMode ? '#334155' : '#cbd5e1',
                borderRadius: '0.75rem',
                fontSize: '12px',
                color: darkMode ? '#f8fafc' : '#0f172a',
              }}
              formatter={(value: any) => [
                formatCurrency(Number(value) || 0, inputs.currency, 2),
                'Per Share',
              ]}
            />
            <Bar dataKey="price" radius={[0, 6, 6, 0]}>
              {comparisonData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
