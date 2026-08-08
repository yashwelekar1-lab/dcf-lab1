import {
  Download,
  RotateCcw,
  BookOpen,
  Info,
  Sun,
  Moon,
  DollarSign,
  Layers,
} from 'lucide-react';
import { CurrencySymbol, DisplayUnit } from '../types';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  currency: CurrencySymbol;
  setCurrency: (val: CurrencySymbol) => void;
  unit: DisplayUnit;
  setUnit: (val: DisplayUnit) => void;
  onSelectPreset: (presetId: string) => void;
  onReset: () => void;
  onExportPDF: () => void;
  onExportCSV: () => void;
  onOpenGlossary: () => void;
  onOpenAbout: () => void;
  selectedPresetId?: string;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  currency,
  setCurrency,
  unit,
  setUnit,
  onSelectPreset,
  onReset,
  onExportPDF,
  onExportCSV,
  onOpenGlossary,
  onOpenAbout,
  selectedPresetId,
}) => {
  return (
    <header
      className={`border-b ${
        darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      } sticky top-0 z-30 shadow-xs transition-colors duration-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 gap-3">
          {/* Logo & Brand Title */}
          <div className="flex items-center space-x-3">
           <div className="h-11 w-11 flex items-center justify-center">
  <img
    src="/DCF Logo.png"
    alt="DCF Lab"
    className="h-11 w-11 object-contain"
  />
</div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-x1 font-bold tracking-tight font-mono">
                  DCF<span className="text-emerald-500">Lab</span>
                </h1>
              </div>
             <p className="mt-1 text-xs text-slate-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.35)]">
  Discounted Cash Flow Valuation Engine
</p>
            </div>
          </div>

          {/* Quick Controls & Controls Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Currency Switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
              <DollarSign className="h-4 w-4 ml-1 mr-1 text-slate-500 dark:text-slate-400" />
              <select
                aria-label="Select Currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencySymbol)}
                className="bg-transparent text-xs font-semibold focus:outline-hidden text-slate-700 dark:text-slate-200 cursor-pointer pr-1"
              >
                <option value="$" className="dark:bg-slate-900">USD ($)</option>
                <option value="€" className="dark:bg-slate-900">EUR (€)</option>
                <option value="£" className="dark:bg-slate-900">GBP (£)</option>
                <option value="¥" className="dark:bg-slate-900">JPY (¥)</option>
                <option value="₹" className="dark:bg-slate-900">INR (₹)</option>
                <option value="C$" className="dark:bg-slate-900">CAD (C$)</option>
                <option value="A$" className="dark:bg-slate-900">AUD (A$)</option>
              </select>
            </div>

            {/* Unit Scale Selector */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
              <Layers className="h-4 w-4 ml-1.5 mr-1 text-slate-500 dark:text-slate-400" />
              <select
                aria-label="Select Financial Display Units"
                value={unit}
                onChange={(e) => setUnit(e.target.value as DisplayUnit)}
                className="bg-transparent text-xs font-medium focus:outline-hidden text-slate-700 dark:text-slate-200 cursor-pointer pr-1"
              >
                <option value="millions" className="dark:bg-slate-900">In Millions</option>
                <option value="billions" className="dark:bg-slate-900">In Billions</option>
                <option value="thousands" className="dark:bg-slate-900">In Thousands</option>
                <option value="units" className="dark:bg-slate-900">Exact Units</option>
              </select>
            </div>

            {/* Glossary Button */}
            <button
              onClick={onOpenGlossary}
              className="flex items-center space-x-1 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700"
              title="View DCF Formulas & Glossary"
            >
              <BookOpen className="h-3.5 w-3.5 text-emerald-500" />
              <span className="hidden sm:inline">Guide</span>
            </button>

            {/* About Button */}
<button
  onClick={onOpenAbout}
  className="flex items-center space-x-1 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500/10 dark:hover:bg-emerald-500/10 text-slate-700 dark:text-slate-300 hover:text-emerald-500 transition-colors border border-slate-200 dark:border-slate-700"
  title="About DCF Lab"
>
  <Info className="h-3.5 w-3.5 text-emerald-500" />
  <span className="hidden sm:inline">About</span>
</button>

            {/* Export Menu */}
            <div className="flex items-center space-x-1">
              <button
                onClick={onExportPDF}
                className="flex items-center space-x-1 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-xs"
                title="Print / Save Valuation Memorandum"
              >
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button
                onClick={onExportCSV}
                className="text-xs font-medium px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700"
                title="Download CSV Model Data"
              >
                CSV
              </button>
            </div>

            {/* Reset Model */}
            <button
              onClick={onReset}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-red-500/10 hover:text-red-500 text-slate-500 dark:text-slate-400 transition-colors border border-slate-200 dark:border-slate-700"
              title="Reset Model to Default Inputs"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700"
              title="Toggle Dark/Light Mode"
            >
              {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
