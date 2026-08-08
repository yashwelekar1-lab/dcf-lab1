import React from "react";
import { X, Sparkles, Target, Brain, BarChart3 } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({
  isOpen,
  onClose,
}: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-700 bg-[#0b1325] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >

        {/* HEADER */}
        <div className="sticky top-0 z-10 border-b border-slate-700 bg-[#0b1325]/95 px-6 py-5 backdrop-blur">

          <button
            onClick={onClose}
            className="absolute right-5 top-5 rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15">
              <Sparkles
                className="text-emerald-400"
                size={22}
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white">
                About{" "}
                <span className="text-emerald-400">
                  DCF Lab
                </span>
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Intelligent Valuation. Structured Analysis. Better Decisions.
              </p>
            </div>

          </div>
        </div>

        {/* CONTENT */}
        <div className="max-h-[calc(88vh-100px)] overflow-y-auto px-6 py-7">

          {/* INTRO */}
          <section>

            <h3 className="mb-3 text-lg font-semibold text-white">
              Intelligent Valuation. Structured Analysis. Better Decisions.
            </h3>

            <p className="leading-7 text-slate-300">
              DCF Lab is a financial valuation platform designed to make
              fundamental analysis and business valuation more accessible,
              structured, and efficient.
            </p>

            <p className="mt-4 leading-7 text-slate-300">
              Built around the principles of{" "}
              <span className="font-medium text-emerald-400">
                financial modeling, valuation, and data-driven analysis
              </span>
              , DCF Lab helps users evaluate businesses through a systematic
              approach to intrinsic value.
            </p>

          </section>


          {/* WHAT WE DO */}
          <section className="mt-8">

            <div className="mb-4 flex items-center gap-3">

              <BarChart3
                size={20}
                className="text-emerald-400"
              />

              <h3 className="text-lg font-semibold text-white">
                What We Do
              </h3>

            </div>

            <p className="leading-7 text-slate-300">
              DCF Lab simplifies the traditional{" "}
              <span className="font-medium text-white">
                Discounted Cash Flow (DCF)
              </span>{" "}
              process by bringing essential valuation components into one
              platform.
            </p>


            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">

              {[
                "FCFF Forecasting",
                "WACC & Cost of Capital",
                "Terminal Value",
                "Enterprise & Equity Value",
                "Intrinsic Value",
                "Valuation Assumptions",
                "Sensitivity Analysis",
              ].map((item) => (

                <div
                  key={item}
                  className="rounded-lg border border-slate-700/70 bg-slate-800/30 px-4 py-3 text-sm text-slate-300"
                >
                  <span className="mr-2 text-emerald-400">
                    ✓
                  </span>

                  {item}
                </div>

              ))}

            </div>


            <p className="mt-5 leading-7 text-slate-300">
              Our objective is to provide a clear and structured environment
              where users can understand not just{" "}
              <span className="italic text-white">
                what
              </span>{" "}
              a company may be worth, but also{" "}
              <span className="italic text-white">
                why
              </span>
              .
            </p>

          </section>


          {/* DCF LAB INTELLIGENCE */}
          <section className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5">

            <div className="mb-4 flex items-center gap-3">

              <Brain
                size={21}
                className="text-emerald-400"
              />

              <h3 className="text-lg font-semibold text-white">
                DCF Lab Intelligence
              </h3>

              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                Coming Soon
              </span>

            </div>


            <p className="leading-7 text-slate-300">
              The next evolution of DCF Lab is{" "}
              <span className="font-semibold text-emerald-400">
                DCF Lab Intelligence
              </span>
              —an AI-powered approach to financial research and valuation.
            </p>


            <p className="mt-4 leading-7 text-slate-300">
              The platform is being designed to transform lengthy financial
              reports into structured financial information and actionable
              insights.
            </p>


            <div className="mt-5 rounded-lg border border-slate-700 bg-[#080f1f] p-4 text-center">

              <p className="text-xs uppercase tracking-wider text-slate-500">
                Intelligent Valuation Workflow
              </p>

              <p className="mt-3 text-sm font-medium leading-7 text-white">

                Financial Data Extraction

                <span className="mx-2 text-emerald-400">
                  →
                </span>

                Financial Analysis

                <span className="mx-2 text-emerald-400">
                  →
                </span>

                Valuation Inputs

                <span className="mx-2 text-emerald-400">
                  →
                </span>

                DCF Modeling

                <span className="mx-2 text-emerald-400">
                  →
                </span>

                Investment Insights

              </p>

            </div>


            <p className="mt-5 leading-7 text-slate-300">
              Users will be able to upload an{" "}
              <span className="font-medium text-white">
                annual report or financial filing
              </span>
              , allowing the system to assist with financial data extraction,
              financial analysis, valuation inputs, DCF modeling, and
              investment insights.
            </p>


            <p className="mt-4 leading-7 text-slate-300">
              By combining artificial intelligence with established financial
              methodologies, DCF Lab aims to reduce repetitive analytical work
              while keeping the underlying valuation process transparent and
              understandable.
            </p>

          </section>


          {/* VISION */}
          <section className="mt-8">

            <div className="mb-4 flex items-center gap-3">

              <Target
                size={20}
                className="text-emerald-400"
              />

              <h3 className="text-lg font-semibold text-white">
                Our Vision
              </h3>

            </div>


            <p className="leading-7 text-slate-300">
              We believe high-quality financial analysis should not be limited
              by complicated tools or fragmented workflows.
            </p>


            <p className="mt-4 leading-7 text-slate-300">
              Our vision is to build a platform where{" "}
              <span className="font-medium text-white">
                financial data, valuation models, and intelligent analysis
              </span>{" "}
              come together in one place.
            </p>


            <div className="mt-5 border-l-2 border-emerald-400 pl-5">

              <p className="text-lg font-medium italic text-white">
                “Turn financial information into meaningful valuation insights.”
              </p>

            </div>

          </section>


          {/* PHILOSOPHY */}
          <section className="mt-8">

            <h3 className="mb-5 text-lg font-semibold text-white">
              Our Philosophy
            </h3>


            <div className="space-y-4">

              <div>

                <h4 className="font-medium text-emerald-400">
                  Clarity Over Complexity
                </h4>

                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Financial models can be sophisticated without being
                  difficult to understand. We focus on presenting complex
                  financial concepts in a clear and structured way.
                </p>

              </div>


              <div>

                <h4 className="font-medium text-emerald-400">
                  Data-Driven Analysis
                </h4>

                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Sound valuation begins with reliable financial information
                  and disciplined assumptions.
                </p>

              </div>


              <div>

                <h4 className="font-medium text-emerald-400">
                  Technology With Financial Discipline
                </h4>

                <p className="mt-1 text-sm leading-6 text-slate-400">
                  AI can accelerate research and analysis, but financial
                  judgment, assumptions, and methodology remain fundamental.
                </p>

              </div>


              <div>

                <h4 className="font-medium text-emerald-400">
                  Built for Continuous Improvement
                </h4>

                <p className="mt-1 text-sm leading-6 text-slate-400">
                  DCF Lab is continuously evolving—from a focused DCF
                  calculator toward a broader platform for financial research,
                  valuation, and intelligent analysis.
                </p>

              </div>

            </div>

          </section>


          {/* FOOTER */}
          <div className="mt-8 border-t border-slate-800 pt-5 text-center">

            <p className="text-xs text-slate-500">
              © 2026 DCF Lab. All Rights Reserved.
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Designed & Developed by Yash Welekar.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}
