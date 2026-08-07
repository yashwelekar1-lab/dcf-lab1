import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';
import { DCFCalculations, DCFInputs } from '../../types';
import { formatCurrency, formatCompactNumber } from '../../utils/dcfCalculator';

interface ChartProps {
  inputs: DCFInputs;
  calculations: DCFCalculations;
  darkMode: boolean;
}

export const EquityBridgeChart: React.FC<ChartProps> = ({
  inputs,
  calculations,
  darkMode,
}) => {
  const { enterpriseValue, equityValue } = calculations;
  const { cash, nonOperatingInvestments, debt, minorityInterest, preferredEquity } = inputs;

  const bridgeSteps = [
    { name: 'Enterprise Value', value: enterpriseValue, type: 'total', color: '#10b981' },
    { name: '+ Cash', value: cash, type: 'add', color: '#3b82f6' },
    { name: '+ Investments', value: nonOperatingInvestments, type: 'add', color: '#0ea5e9' },
    { name: '− Debt', value: -debt, type: 'subtract', color: '#ef4444' },
    { name: '− Minority Int.', value: -minorityInterest, type: 'subtract', color: '#f97316' },
    { name: '− Preferred Eq.', value: -preferredEquity, type: 'subtract', color: '#eab308' },
    { name: 'Equity Value', value: equityValue, type: 'total', color: '#14b8a6' },
  ].filter((item) => item.type === 'total' || item.value !== 0);

  const gridColor = darkMode ? '#1e293b' : '#e2e8f0';
  const textColor = darkMode ? '#94a3b8' : '#64748b';

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2 px-1">
        <div>
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
            4. Enterprise Value to Equity Value Bridge
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Bridge from operating Enterprise Value to Equity Value
          </p>
        </div>
      </div>

      <div className="w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bridgeSteps} margin={{ top: 10, right: 15, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="name" stroke={textColor} fontSize={10} tickLine={false} interval={0} />
            <YAxis
              stroke={textColor}
              fontSize={10}
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
              formatter={(value: any) => [
                formatCurrency(Number(value) || 0, inputs.currency, 2),
                'Amount',
              ]}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {bridgeSteps.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
