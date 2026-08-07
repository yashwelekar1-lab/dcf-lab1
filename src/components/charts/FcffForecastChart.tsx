import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { DCFCalculations, DCFInputs } from '../../types';
import { formatCurrency, formatPercent } from '../../utils/dcfCalculator';

interface ChartProps {
  inputs: DCFInputs;
  calculations: DCFCalculations;
  darkMode: boolean;
}

export const FcffForecastChart: React.FC<ChartProps> = ({
  inputs,
  calculations,
  darkMode,
}) => {
  const data = calculations.discountedCashFlows.map((item) => ({
    year: `Year ${item.year}`,
    fcff: item.fcff,
    pvFcff: item.pvFcff,
  }));

  const gridColor = darkMode ? '#1e293b' : '#e2e8f0';
  const textColor = darkMode ? '#94a3b8' : '#64748b';

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2 px-1">
        <div>
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
            1. FCFF Forecast Trajectory
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Unlevered Free Cash Flows across the forecast horizon ({inputs.currency} {inputs.unit})
          </p>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
            CAGR: {formatPercent(calculations.cagr, 1)}
          </span>
        </div>
      </div>

      <div className="w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 15, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="year"
              stroke={textColor}
              fontSize={11}
              tickLine={false}
            />
            <YAxis
              stroke={textColor}
              fontSize={11}
              tickLine={false}
              tickFormatter={(val) => `${inputs.currency}${val}`}
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
                'FCFF',
              ]}
            />
            <Line
              type="monotone"
              dataKey="fcff"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
