import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { DCFCalculations, DCFInputs } from '../../types';
import { formatCurrency, formatCompactNumber } from '../../utils/dcfCalculator';

interface ChartProps {
  inputs: DCFInputs;
  calculations: DCFCalculations;
  darkMode: boolean;
}

export const EvCompositionChart: React.FC<ChartProps> = ({
  inputs,
  calculations,
  darkMode,
}) => {
  const { pvOfForecastCashFlows, pvOfTerminalValue, enterpriseValue, tvContributionPercent } = calculations;

  const data = [
    {
      name: 'PV of Forecast FCFF',
      value: Math.max(0, pvOfForecastCashFlows),
      color: '#10b981',
      percent: (100 - tvContributionPercent).toFixed(1),
    },
    {
      name: 'PV of Terminal Value',
      value: Math.max(0, pvOfTerminalValue),
      color: '#6366f1',
      percent: tvContributionPercent.toFixed(1),
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2 px-1">
        <div>
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
            3. Enterprise Value Breakdown
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Relative weight of explicit forecast vs. terminal period value
          </p>
        </div>
      </div>

      <div className="w-full h-[220px] relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#0f172a' : '#ffffff',
                borderColor: darkMode ? '#334155' : '#cbd5e1',
                borderRadius: '0.75rem',
                fontSize: '12px',
                color: darkMode ? '#f8fafc' : '#0f172a',
              }}
              formatter={(value: any, name: any, item: any) => [
                `${formatCurrency(Number(value) || 0, inputs.currency, 2)} (${item.payload.percent}%)`,
                name,
              ]}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text Callout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-5">
          <span className="text-[10px] text-slate-400 font-medium uppercase">Total EV</span>
          <span className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200">
            {formatCompactNumber(enterpriseValue, inputs.currency)}
          </span>
        </div>
      </div>
    </div>
  );
};
