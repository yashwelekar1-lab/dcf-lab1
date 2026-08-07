import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { DCFCalculations, DCFInputs } from '../../types';
import { formatCurrency, formatCompactNumber } from '../../utils/dcfCalculator';

interface ChartProps {
  inputs: DCFInputs;
  calculations: DCFCalculations;
  darkMode: boolean;
}

export const TvContributionChart: React.FC<ChartProps> = ({
  inputs,
  calculations,
  darkMode,
}) => {
  const { pvOfForecastCashFlows, pvOfTerminalValue, tvContributionPercent } = calculations;

  const data = [
    {
      name: 'Enterprise Value',
      pvForecast: Math.max(0, pvOfForecastCashFlows),
      pvTerminal: Math.max(0, pvOfTerminalValue),
    },
  ];

  const gridColor = darkMode ? '#1e293b' : '#e2e8f0';
  const textColor = darkMode ? '#94a3b8' : '#64748b';

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2 px-1">
        <div>
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
            7. Terminal Value Contribution Stack
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            PV of Terminal Value contributes <strong className="text-indigo-600 dark:text-indigo-400 font-mono">{tvContributionPercent.toFixed(1)}%</strong> of EV
          </p>
        </div>
      </div>

      <div className="w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="name" stroke={textColor} fontSize={11} tickLine={false} />
            <YAxis
              stroke={textColor}
              fontSize={11}
              tickLine={false}
              tickFormatter={(val) => `${inputs.currency}${formatCompactNumber(val, '')}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#0f172a' : '#ffffff',
                borderColor: darkMode ? '#334155' : '#cbd5e1',
                borderRadius: '0.75rem',
                fontSize: '12px',
                color: darkMode ? '#f8fafc' : '#0f172a',
              }}
              formatter={(value: any, name: any) => [
                formatCurrency(Number(value) || 0, inputs.currency, 2),
                name === 'pvForecast' ? 'PV Forecast FCFF' : 'PV Terminal Value',
              ]}
            />
            <Legend
              formatter={(value) =>
                value === 'pvForecast' ? 'PV Forecast FCFF' : 'PV Terminal Value'
              }
              wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }}
            />
            <Bar dataKey="pvForecast" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
            <Bar dataKey="pvTerminal" stackId="a" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
