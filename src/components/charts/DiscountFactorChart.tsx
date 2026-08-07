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

interface ChartProps {
  inputs: DCFInputs;
  calculations: DCFCalculations;
  darkMode: boolean;
}

export const DiscountFactorChart: React.FC<ChartProps> = ({
  inputs,
  calculations,
  darkMode,
}) => {
  const data = calculations.discountedCashFlows.map((item) => ({
    year: `Year ${item.year}`,
    factor: Number(item.discountFactor.toFixed(4)),
  }));

  const gridColor = darkMode ? '#1e293b' : '#e2e8f0';
  const textColor = darkMode ? '#94a3b8' : '#64748b';

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2 px-1">
        <div>
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
            8. Discount Factor Decay Curve
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            PV factor = 1 / (1 + {inputs.wacc}%)<sup>t</sup> over forecast years
          </p>
        </div>
      </div>

      <div className="w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 15, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="year" stroke={textColor} fontSize={11} tickLine={false} />
            <YAxis
              stroke={textColor}
              fontSize={11}
              tickLine={false}
              domain={[0, 1]}
              tickFormatter={(val) => val.toFixed(2)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#0f172a' : '#ffffff',
                borderColor: darkMode ? '#334155' : '#cbd5e1',
                borderRadius: '0.75rem',
                fontSize: '12px',
                color: darkMode ? '#f8fafc' : '#0f172a',
              }}
              formatter={(value: any) => [Number(value).toFixed(4), 'Discount Factor']}
            />
            <Line
              type="monotone"
              dataKey="factor"
              stroke="#0284c7"
              strokeWidth={3}
              dot={{ fill: '#0284c7', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
