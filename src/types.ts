export type CurrencySymbol = '$' | '€' | '£' | '¥' | '₹' | 'C$' | 'A$';

export type DisplayUnit = 'units' | 'thousands' | 'millions' | 'billions';

export type TerminalMethod = 'perpetual' | 'exit_multiple';

export interface ForecastYearInput {
  year: number;
  fcff: number;
  ebitda?: number;
}

export interface DCFInputs {
  years: ForecastYearInput[];
  wacc: number; // percentage e.g. 8.5
  terminalMethod: TerminalMethod;
  terminalGrowthRate: number; // percentage e.g. 2.5
  exitMultiple: number; // e.g. 12.0
  finalYearEbitda: number; // e.g. 5000
  cash: number;
  debt: number;
  minorityInterest: number;
  preferredEquity: number;
  nonOperatingInvestments: number;
  sharesOutstanding: number; // in chosen units
  currentMarketPrice?: number; // per share
  currency: CurrencySymbol;
  unit: DisplayUnit;
}

export interface DiscountedYear {
  year: number;
  fcff: number;
  discountFactor: number;
  pvFcff: number;
  ebitda?: number;
}

export interface DCFCalculations {
  discountedCashFlows: DiscountedYear[];
  pvOfForecastCashFlows: number;
  terminalValue: number;
  pvOfTerminalValue: number;
  enterpriseValue: number;
  equityValue: number;
  intrinsicValuePerShare: number;
  upsideDownsidePercent: number | null;
  marginOfSafety: number | null;
  tvContributionPercent: number;
  cagr: number;
}

export interface ValidationWarning {
  field: string;
  type: 'error' | 'warning' | 'info';
  message: string;
}

export interface SensitivityCell {
  wacc: number;
  tvParam: number; // growth rate or exit multiple
  intrinsicValue: number;
  upsidePercent: number | null;
  status: 'dark_green' | 'light_green' | 'yellow' | 'orange' | 'red';
}

export interface SensitivityMatrix {
  waccValues: number[];
  tvParamValues: number[];
  paramLabel: string;
  grid: SensitivityCell[][];
}

export type ScenarioId = 'base' | 'bull' | 'bear';

export interface Scenario {
  id: ScenarioId;
  name: string;
  description: string;
  inputs: DCFInputs;
  calculations: DCFCalculations;
}

export interface PresetCompany {
  id: string;
  name: string;
  ticker: string;
  industry: string;
  description: string;
  inputs: DCFInputs;
}
