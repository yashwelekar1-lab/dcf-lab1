import {
  DCFInputs,
  DCFCalculations,
  DiscountedYear,
  ValidationWarning,
  SensitivityMatrix,
  SensitivityCell,
  PresetCompany,
  Scenario,
} from '../types';

/**
 * Calculates the complete Discounted Cash Flow valuation
 */
export function calculateDCF(inputs: DCFInputs): DCFCalculations {
  const {
    years,
    wacc,
    terminalMethod,
    terminalGrowthRate,
    exitMultiple,
    finalYearEbitda,
    cash,
    debt,
    minorityInterest,
    preferredEquity,
    nonOperatingInvestments,
    sharesOutstanding,
    currentMarketPrice,
  } = inputs;

  const r = wacc / 100;
  const n = years.length;

  // 1. Discounted Cash Flows for forecast years
  const discountedCashFlows: DiscountedYear[] = years.map((item, idx) => {
    const t = item.year || idx + 1;
    const discountFactor = r > -1 ? Math.pow(1 + r, -t) : 0;
    const pvFcff = item.fcff * discountFactor;
    return {
      year: t,
      fcff: item.fcff,
      discountFactor,
      pvFcff,
      ebitda: item.ebitda,
    };
  });

  const pvOfForecastCashFlows = discountedCashFlows.reduce(
    (sum, d) => sum + d.pvFcff,
    0
  );

  // 2. Terminal Value
  const lastYearFcff = years.length > 0 ? years[years.length - 1].fcff : 0;
  const g = terminalGrowthRate / 100;
  let terminalValue = 0;

  if (terminalMethod === 'perpetual') {
    const denominator = r - g;
    if (denominator > 0) {
      terminalValue = (lastYearFcff * (1 + g)) / denominator;
    } else {
      terminalValue = 0; // Invalid condition handled in validation
    }
  } else {
    // Exit Multiple method
    const ebitda = finalYearEbitda || (years.length > 0 && years[years.length - 1].ebitda) || 0;
    terminalValue = ebitda * exitMultiple;
  }

  const tvDiscountFactor = r > -1 ? Math.pow(1 + r, -n) : 0;
  const pvOfTerminalValue = terminalValue * tvDiscountFactor;

  // 3. Enterprise Value
  const enterpriseValue = pvOfForecastCashFlows + pvOfTerminalValue;

  // 4. Equity Value
  const equityValue =
    enterpriseValue +
    cash +
    nonOperatingInvestments -
    debt -
    minorityInterest -
    preferredEquity;

  // 5. Intrinsic Value Per Share
  const intrinsicValuePerShare =
    sharesOutstanding > 0 ? equityValue / sharesOutstanding : 0;

  // 6. Upside / Downside % & Margin of Safety %
  let upsideDownsidePercent: number | null = null;
  let marginOfSafety: number | null = null;

  if (
    currentMarketPrice !== undefined &&
    currentMarketPrice !== null &&
    currentMarketPrice > 0
  ) {
    upsideDownsidePercent =
      ((intrinsicValuePerShare - currentMarketPrice) / currentMarketPrice) * 100;

    marginOfSafety =
      intrinsicValuePerShare > 0
        ? ((intrinsicValuePerShare - currentMarketPrice) / intrinsicValuePerShare) * 100
        : null;
  }

  // 7. Terminal Value Contribution %
  const tvContributionPercent =
    enterpriseValue !== 0 ? (pvOfTerminalValue / enterpriseValue) * 100 : 0;

  // 8. Forecast FCFF CAGR
  let cagr = 0;
  if (years.length > 1 && years[0].fcff > 0 && years[years.length - 1].fcff > 0) {
    const startVal = years[0].fcff;
    const endVal = years[years.length - 1].fcff;
    cagr = (Math.pow(endVal / startVal, 1 / (years.length - 1)) - 1) * 100;
  }

  return {
    discountedCashFlows,
    pvOfForecastCashFlows,
    terminalValue,
    pvOfTerminalValue,
    enterpriseValue,
    equityValue,
    intrinsicValuePerShare,
    upsideDownsidePercent,
    marginOfSafety,
    tvContributionPercent,
    cagr,
  };
}

/**
 * Validates inputs and returns financial warnings and errors
 */
export function validateInputs(inputs: DCFInputs): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];

  // WACC checks
  if (inputs.wacc <= 0) {
    warnings.push({
      field: 'wacc',
      type: 'error',
      message: 'WACC must be strictly greater than 0%.',
    });
  } else if (inputs.wacc < 3) {
    warnings.push({
      field: 'wacc',
      type: 'warning',
      message: 'WACC below 3% is unusually low for corporate valuation models.',
    });
  } else if (inputs.wacc > 25) {
    warnings.push({
      field: 'wacc',
      type: 'warning',
      message: 'WACC above 25% represents an extreme cost of capital.',
    });
  }

  // Perpetual Growth Rate vs WACC
  if (inputs.terminalMethod === 'perpetual') {
    if (inputs.terminalGrowthRate >= inputs.wacc) {
      warnings.push({
        field: 'terminalGrowthRate',
        type: 'error',
        message: 'Terminal Growth Rate must be strictly less than WACC to avoid infinite valuation models.',
      });
    }
    if (inputs.terminalGrowthRate > 5) {
      warnings.push({
        field: 'terminalGrowthRate',
        type: 'warning',
        message: 'Terminal growth rate above 5% exceeds projected long-term GDP growth.',
      });
    }
    if (inputs.terminalGrowthRate < 0) {
      warnings.push({
        field: 'terminalGrowthRate',
        type: 'info',
        message: 'Negative terminal growth assumes permanent economic decay of the business.',
      });
    }
  } else {
    // Exit Multiple method
    if (inputs.exitMultiple <= 0) {
      warnings.push({
        field: 'exitMultiple',
        type: 'error',
        message: 'Exit EBITDA Multiple must be greater than 0x.',
      });
    }
    if (inputs.finalYearEbitda <= 0) {
      warnings.push({
        field: 'finalYearEbitda',
        type: 'warning',
        message: 'Final Year EBITDA is 0 or missing, resulting in 0 Terminal Value.',
      });
    }
  }

  // Shares Outstanding
  if (inputs.sharesOutstanding <= 0) {
    warnings.push({
      field: 'sharesOutstanding',
      type: 'error',
      message: 'Diluted shares outstanding must be greater than 0.',
    });
  }

  // Cash flows
  const negativeYears = inputs.years.filter((y) => y.fcff < 0);
  if (negativeYears.length > 0) {
    warnings.push({
      field: 'fcff',
      type: 'info',
      message: `${negativeYears.length} forecast year(s) have negative FCFF (typical for high-growth or restructuring companies).`,
    });
  }

  return warnings;
}

/**
 * Generates Sensitivity Matrix for WACC vs Terminal Growth Rate or Exit Multiple
 */
export function generateSensitivityMatrix(inputs: DCFInputs): SensitivityMatrix {
  const isPerpetual = inputs.terminalMethod === 'perpetual';
  const currentWacc = inputs.wacc;

  // 5 WACC steps: e.g. -2%, -1%, base, +1%, +2%
  const waccDelta = [ -2.0, -1.0, 0, 1.0, 2.0 ];
  const waccValues = waccDelta.map((d) => Math.max(1, Math.round((currentWacc + d) * 10) / 10));

  let tvParamValues: number[] = [];
  let paramLabel = '';

  if (isPerpetual) {
    paramLabel = 'Terminal Growth Rate (%)';
    const currentG = inputs.terminalGrowthRate;
    const gDeltas = [ -1.0, -0.5, 0, 0.5, 1.0 ];
    tvParamValues = gDeltas.map((d) => Math.round((currentG + d) * 10) / 10);
  } else {
    paramLabel = 'Exit Multiple (x)';
    const currentMult = inputs.exitMultiple;
    const multDeltas = [ -3, -1.5, 0, 1.5, 3 ];
    tvParamValues = multDeltas.map((d) => Math.max(1, Math.round((currentMult + d) * 10) / 10));
  }

  const baseResult = calculateDCF(inputs);
  const basePrice = inputs.currentMarketPrice || baseResult.intrinsicValuePerShare;

  const grid: SensitivityCell[][] = [];

  for (let i = 0; i < waccValues.length; i++) {
    const row: SensitivityCell[] = [];
    const w = waccValues[i];

    for (let j = 0; j < tvParamValues.length; j++) {
      const param = tvParamValues[j];

      const simInputs: DCFInputs = {
        ...inputs,
        wacc: w,
        ...(isPerpetual
          ? { terminalGrowthRate: param }
          : { exitMultiple: param }),
      };

      // Skip invalid simulation (wacc <= g)
      if (isPerpetual && param >= w) {
        row.push({
          wacc: w,
          tvParam: param,
          intrinsicValue: 0,
          upsidePercent: null,
          status: 'red',
        });
        continue;
      }

      const simCalc = calculateDCF(simInputs);
      const val = simCalc.intrinsicValuePerShare;

      let upside: number | null = null;
      if (basePrice > 0) {
        upside = ((val - basePrice) / basePrice) * 100;
      }

      // Determine cell status for visual gradient
      let status: SensitivityCell['status'] = 'yellow';
      const baseVal = baseResult.intrinsicValuePerShare;

      if (val >= baseVal * 1.25) {
        status = 'dark_green';
      } else if (val >= baseVal * 1.05) {
        status = 'light_green';
      } else if (val >= baseVal * 0.95) {
        status = 'yellow';
      } else if (val >= baseVal * 0.75) {
        status = 'orange';
      } else {
        status = 'red';
      }

      row.push({
        wacc: w,
        tvParam: param,
        intrinsicValue: val,
        upsidePercent: upside,
        status,
      });
    }
    grid.push(row);
  }

  return {
    waccValues,
    tvParamValues,
    paramLabel,
    grid,
  };
}

/**
 * Generates Base, Bull, and Bear Scenarios from current inputs
 */
export function generateScenarios(baseInputs: DCFInputs): {
  base: Scenario;
  bull: Scenario;
  bear: Scenario;
} {
  const baseCalc = calculateDCF(baseInputs);

  // Bull Case: +15% higher FCFF, -1.0% WACC, +0.5% terminal growth / +2x multiple
  const bullYears = baseInputs.years.map((y) => ({
    ...y,
    fcff: y.fcff * 1.15,
    ebitda: y.ebitda ? y.ebitda * 1.15 : undefined,
  }));
  const bullInputs: DCFInputs = {
    ...baseInputs,
    years: bullYears,
    wacc: Math.max(3, baseInputs.wacc - 1.0),
    terminalGrowthRate: baseInputs.terminalGrowthRate + 0.5,
    exitMultiple: baseInputs.exitMultiple + 2.0,
    finalYearEbitda: baseInputs.finalYearEbitda * 1.15,
  };
  const bullCalc = calculateDCF(bullInputs);

  // Bear Case: -15% lower FCFF, +1.5% WACC, -0.5% terminal growth / -2x multiple
  const bearYears = baseInputs.years.map((y) => ({
    ...y,
    fcff: y.fcff * 0.85,
    ebitda: y.ebitda ? y.ebitda * 0.85 : undefined,
  }));
  const bearInputs: DCFInputs = {
    ...baseInputs,
    years: bearYears,
    wacc: baseInputs.wacc + 1.5,
    terminalGrowthRate: Math.max(0, baseInputs.terminalGrowthRate - 0.5),
    exitMultiple: Math.max(1, baseInputs.exitMultiple - 2.0),
    finalYearEbitda: baseInputs.finalYearEbitda * 0.85,
  };
  const bearCalc = calculateDCF(bearInputs);

  return {
    base: {
      id: 'base',
      name: 'Base Case',
      description: 'Primary consensus projection and standard cost of capital assumptions.',
      inputs: baseInputs,
      calculations: baseCalc,
    },
    bull: {
      id: 'bull',
      name: 'Bull Case',
      description: '+15% FCFF trajectory, 100 bps lower WACC, and higher terminal expansion.',
      inputs: bullInputs,
      calculations: bullCalc,
    },
    bear: {
      id: 'bear',
      name: 'Bear Case',
      description: '-15% FCFF haircut, 150 bps higher WACC, and conservative terminal exit.',
      inputs: bearInputs,
      calculations: bearCalc,
    },
  };
}

/**
 * Pre-filled realistic company presets for quick exploration
 */
export const PRESET_COMPANIES: PresetCompany[] = [
  {
    id: 'apple_tech',
    name: 'Tech Titan (Mega Cap)',
    ticker: 'TECH',
    industry: 'Consumer Electronics & Software',
    description: 'High free cash flow generation, solid balance sheet cash reserves, moderate perpetual growth.',
    inputs: {
      years: [
        { year: 1, fcff: 108000, ebitda: 132000 },
        { year: 2, fcff: 118000, ebitda: 143000 },
        { year: 3, fcff: 129000, ebitda: 155000 },
        { year: 4, fcff: 140000, ebitda: 168000 },
        { year: 5, fcff: 152000, ebitda: 182000 },
      ],
      wacc: 8.8,
      terminalMethod: 'perpetual',
      terminalGrowthRate: 2.5,
      exitMultiple: 18.0,
      finalYearEbitda: 182000,
      cash: 62000,
      debt: 105000,
      minorityInterest: 0,
      preferredEquity: 0,
      nonOperatingInvestments: 30000,
      sharesOutstanding: 15400,
      currentMarketPrice: 225.0,
      currency: '$',
      unit: 'millions',
    },
  },
  {
    id: 'growth_saas',
    name: 'Cloud SaaS Platform',
    ticker: 'SAAS',
    industry: 'Enterprise Software',
    description: 'Rapid 20%+ cash flow expansion, high valuation exit multiples, low initial debt.',
    inputs: {
      years: [
        { year: 1, fcff: 450, ebitda: 550 },
        { year: 2, fcff: 580, ebitda: 710 },
        { year: 3, fcff: 740, ebitda: 900 },
        { year: 4, fcff: 930, ebitda: 1120 },
        { year: 5, fcff: 1150, ebitda: 1380 },
      ],
      wacc: 9.5,
      terminalMethod: 'exit_multiple',
      terminalGrowthRate: 3.0,
      exitMultiple: 22.0,
      finalYearEbitda: 1380,
      cash: 2100,
      debt: 350,
      minorityInterest: 0,
      preferredEquity: 0,
      nonOperatingInvestments: 150,
      sharesOutstanding: 180,
      currentMarketPrice: 145.0,
      currency: '$',
      unit: 'millions',
    },
  },
  {
    id: 'consumer_staples',
    name: 'Consumer Staples Corp',
    ticker: 'STPL',
    industry: 'Consumer Packaged Goods',
    description: 'Stable cash flow predictability, low discount rate, high debt leverage, modest dividend growth.',
    inputs: {
      years: [
        { year: 1, fcff: 8200, ebitda: 11500 },
        { year: 2, fcff: 8600, ebitda: 12000 },
        { year: 3, fcff: 9000, ebitda: 12500 },
        { year: 4, fcff: 9400, ebitda: 13000 },
        { year: 5, fcff: 9800, ebitda: 13500 },
      ],
      wacc: 6.8,
      terminalMethod: 'perpetual',
      terminalGrowthRate: 2.0,
      exitMultiple: 12.5,
      finalYearEbitda: 13500,
      cash: 3400,
      debt: 32000,
      minorityInterest: 450,
      preferredEquity: 0,
      nonOperatingInvestments: 800,
      sharesOutstanding: 2500,
      currentMarketPrice: 72.0,
      currency: '$',
      unit: 'millions',
    },
  },
];

/**
 * Formatting helpers for clean financial presentation
 */
export function formatCurrency(
  val: number,
  symbol: string = '$',
  decimals: number = 2
): string {
  if (isNaN(val) || !isFinite(val)) return `${symbol}0.00`;
  const formatted = val.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${symbol}${formatted}`;
}

export function formatNumber(val: number, decimals: number = 2): string {
  if (isNaN(val) || !isFinite(val)) return '0.00';
  return val.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatCompactNumber(
  val: number,
  symbol: string = '$'
): string {
  if (isNaN(val) || !isFinite(val)) return `${symbol}0`;
  const abs = Math.abs(val);

  if (abs >= 1e12) {
    return `${symbol}${(val / 1e12).toFixed(2)}T`;
  }
  if (abs >= 1e9) {
    return `${symbol}${(val / 1e9).toFixed(2)}B`;
  }
  if (abs >= 1e6) {
    return `${symbol}${(val / 1e6).toFixed(2)}M`;
  }
  if (abs >= 1e3) {
    return `${symbol}${(val / 1e3).toFixed(1)}K`;
  }
  return `${symbol}${val.toFixed(2)}`;
}

export function formatPercent(val: number, decimals: number = 2): string {
  if (isNaN(val) || !isFinite(val)) return '0.00%';
  const sign = val > 0 ? '+' : '';
  return `${sign}${val.toFixed(decimals)}%`;
}
