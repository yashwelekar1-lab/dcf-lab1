import { useEffect, useState } from "react";

export default function IntelligenceStoryIntro() {
  const [progress, setProgress] = useState(0);

  /* ============================================================
     SCROLL ENGINE
     ============================================================ */

  useEffect(() => {
    let animationFrame = 0;

    const updateProgress = () => {
      const section =
        document.getElementById(
          "intelligence-story"
        );

      if (!section) return;

      const rect =
        section.getBoundingClientRect();

      const scrollDistance =
        section.offsetHeight -
        window.innerHeight;

      if (scrollDistance <= 0) {
        setProgress(0);
        return;
      }

      const scrolled =
        Math.max(0, -rect.top);

      const value =
        scrolled / scrollDistance;

      setProgress(
        Math.min(
          Math.max(value, 0),
          1
        )
      );
    };

    const handleScroll = () => {
      cancelAnimationFrame(
        animationFrame
      );

      animationFrame =
        requestAnimationFrame(
          updateProgress
        );
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      updateProgress
    );

    updateProgress();

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        updateProgress
      );
    };
  }, []);


  /* ============================================================
     HELPERS
     ============================================================ */

  const clamp = (
    value: number,
    min = 0,
    max = 1
  ) => {
    return Math.min(
      Math.max(value, min),
      max
    );
  };


  const ease = (
    value: number
  ) => {
    const x = clamp(value);

    return (
      x *
      x *
      (3 - 2 * x)
    );
  };


  const phase = (
    start: number,
    end: number
  ) => {
    if (progress <= start) {
      return 0;
    }

    if (progress >= end) {
      return 1;
    }

    return ease(
      (progress - start) /
        (end - start)
    );
  };


  /* ============================================================
     STORY TIMELINE

     0.00 - 0.14
       Circle holds

     0.14 - 0.42
       Circle slowly wipes

     0.42 - 0.50
       Circle disappears / pause

     0.50 - 0.62
       AI message appears

     0.62 - 0.77
       AI message stays

     0.77 - 0.94
       Background slowly turns white

     0.94 - 0.96
       White pause

     0.96 - 0.975
       Analysis title

     0.975 - 0.988
       Analysis upload panel

     0.988 - 1.00
       Analysis process steps

     NOTHING SLIDES UP.
     ============================================================ */


  /* ============================================================
     CIRCLE WIPE
     ============================================================ */

  const circleProgress =
    phase(
      0.14,
      0.42
    );

  const visibleAngle =
    360 -
    circleProgress * 360;


  /* ============================================================
     CIRCLE INNER TEXT
     ============================================================ */

  const circleTextOpacity =
    1 -
    phase(
      0.20,
      0.37
    );


  /* ============================================================
     CIRCLE EXIT
     ============================================================ */

  const circleOpacity =
    progress < 0.42
      ? 1
      : 1 -
          phase(
            0.42,
            0.50
          );


  /* ============================================================
     CIRCLE GLOW
     ============================================================ */

  const glowWave =
    Math.sin(
      progress *
        Math.PI *
        4
    );

  const circleGlowStrength =
    0.70 +
    glowWave * 0.06;


  const circleGlow = `
    drop-shadow(
      0 0 18px
      rgba(
        0,
        220,
        170,
        ${circleGlowStrength}
      )
    )

    drop-shadow(
      0 0 45px
      rgba(
        0,
        220,
        170,
        ${circleGlowStrength * 0.60}
      )
    )

    drop-shadow(
      0 0 90px
      rgba(
        0,
        220,
        170,
        ${circleGlowStrength * 0.28}
      )
    )
  `;


  /* ============================================================
     AI MESSAGE

     Once it appears, it DOES NOT disappear.

     It remains visible while the background
     slowly changes to white.
     ============================================================ */

  let aiOpacity = 0;

  if (progress < 0.50) {
    aiOpacity = 0;
  } else if (progress < 0.62) {
    aiOpacity =
      phase(
        0.50,
        0.62
      );
  } else {
    aiOpacity = 1;
  }


  /* ============================================================
     AI GLOW
     ============================================================ */

  const aiGlowProgress =
    phase(
      0.68,
      0.94
    );

  const aiGlow =
    0.72 *
    (
      1 -
      aiGlowProgress
    );


  const aiTextGlow = `
    drop-shadow(
      0 0 18px
      rgba(
        0,
        220,
        170,
        ${aiGlow}
      )
    )

    drop-shadow(
      0 0 48px
      rgba(
        0,
        220,
        170,
        ${aiGlow * 0.40}
      )
    )
  `;


  /* ============================================================
     BACKGROUND COLOR
     ============================================================ */

  type ColorStop = {
    position: number;
    r: number;
    g: number;
    b: number;
  };


  const colors: ColorStop[] = [
    {
      position: 0.00,
      r: 14,
      g: 24,
      b: 40,
    },

    {
      position: 0.18,
      r: 12,
      g: 30,
      b: 46,
    },

    {
      position: 0.36,
      r: 9,
      g: 47,
      b: 56,
    },

    {
      position: 0.54,
      r: 7,
      g: 65,
      b: 65,
    },

    {
      position: 0.70,
      r: 12,
      g: 79,
      b: 76,
    },

    {
      position: 0.78,
      r: 52,
      g: 100,
      b: 105,
    },

    {
      position: 0.86,
      r: 125,
      g: 157,
      b: 160,
    },

    {
      position: 0.94,
      r: 225,
      g: 232,
      b: 233,
    },

    {
      position: 1.00,
      r: 255,
      g: 255,
      b: 255,
    },
  ];


  const getBackgroundColor = (
    value: number
  ) => {
    const p = clamp(value);

    for (
      let i = 0;
      i <
      colors.length - 1;
      i++
    ) {
      const current =
        colors[i];

      const next =
        colors[i + 1];

      if (
        p >= current.position &&
        p <= next.position
      ) {
        const local =
          (
            p -
            current.position
          ) /
          (
            next.position -
            current.position
          );

        const e =
          ease(local);

        const r =
          Math.round(
            current.r +
              (
                next.r -
                current.r
              ) *
                e
          );

        const g =
          Math.round(
            current.g +
              (
                next.g -
                current.g
              ) *
                e
          );

        const b =
          Math.round(
            current.b +
              (
                next.b -
                current.b
              ) *
                e
          );

        return `rgb(${r}, ${g}, ${b})`;
      }
    }

    return "rgb(255,255,255)";
  };


  const backgroundColor =
    getBackgroundColor(
      progress
    );


  /* ============================================================
     BACKGROUND GLOW
     ============================================================ */

  const backgroundGlow =
    1 -
    phase(
      0.68,
      0.94
    );


  /* ============================================================
     AI TEXT COLOR

     During white transition:
     white/light → dark navy
     ============================================================ */

  const textTransition =
    phase(
      0.77,
      0.94
    );


  const headingColor =
    `rgb(
      ${Math.round(
        255 -
          224 *
            textTransition
      )},
      ${Math.round(
        255 -
          224 *
            textTransition
      )},
      ${Math.round(
        255 -
          205 *
            textTransition
      )}
    )`;


  const descriptionColor =
    `rgb(
      ${Math.round(
        215 -
          105 *
            textTransition
      )},
      ${Math.round(
        225 -
          105 *
            textTransition
      )},
      ${Math.round(
        235 -
          100 *
            textTransition
      )}
    )`;


  /* ============================================================
     WHITE TRANSITION

     STARTS AFTER AI MESSAGE HAS BEEN VISIBLE
     FOR A LONG TIME.

     FINISHES BEFORE ANALYSIS.
     ============================================================ */

  const whiteOpacity =
    phase(
      0.77,
      0.94
    );


  /* ============================================================
     REAL ANALYSIS PAGE

     WHITE IS COMPLETELY FINISHED FIRST.

     THEN ANALYSIS APPEARS.
     ============================================================ */

  const analysisOpacity =
    phase(
      0.96,
      0.975
    );


  const analysisBlur =
    12 -
    analysisOpacity * 12;


  /* ============================================================
     ANALYSIS SUCCESSION

     No movement.
     Opacity only.
     ============================================================ */

  const analysisHeaderOpacity =
    phase(
      0.96,
      0.972
    );


  const analysisMainOpacity =
    phase(
      0.972,
      0.988
    );


  const analysisCardsOpacity =
    phase(
      0.988,
      1.00
    );


  /* ============================================================
     RENDER
     ============================================================ */

  return (
    <section
      id="intelligence-story"
      className="
        relative
        w-full
        h-[1000vh]
        m-0
        p-0
      "
    >

      {/* ======================================================
          FIXED STORY VIEWPORT
         ====================================================== */}

      <div
        className="
          sticky
          top-0
          h-screen
          w-full
          overflow-hidden
        "
        style={{
          backgroundColor,
        }}
      >

        {/* ====================================================
            BACKGROUND GLOW
           ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-0
          "
          style={{
            background:
              `
              radial-gradient(
                circle at 50% 50%,
                rgba(
                  0,
                  220,
                  170,
                  0.16
                ),
                transparent 50%
              )
              `,

            opacity:
              backgroundGlow,
          }}
        />


        {/* ====================================================
            LARGE SOFT GLOW
           ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            z-[1]
            h-[800px]
            w-[800px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            blur-[150px]
          "
          style={{
            background:
              `
              radial-gradient(
                circle,
                rgba(
                  0,
                  220,
                  170,
                  0.18
                ),
                transparent 68%
              )
              `,

            opacity:
              backgroundGlow,
          }}
        />


        {/* ====================================================
            CIRCLE

            FIXED SCREEN POSITION.

            NO UP/DOWN MOVEMENT.
           ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[54%]
            z-20
          "
          style={{
            width:
              "clamp(340px, min(58vw, 58vh), 520px)",

            height:
              "clamp(340px, min(58vw, 58vh), 520px)",

            transform:
              "translate(-50%, -50%)",

            filter:
              circleGlow,

            opacity:
              circleOpacity,
          }}
        >

          {/* ==================================================
              CIRCLE WIPE
             ================================================== */}

          <div
            className="
              absolute
              inset-0
              overflow-hidden
              rounded-full
            "
            style={{
              WebkitMaskImage:
                `
                conic-gradient(
                  from -90deg,
                  black
                  0deg
                  ${visibleAngle}deg,
                  transparent
                  ${visibleAngle}deg
                  360deg
                )
                `,

              maskImage:
                `
                conic-gradient(
                  from -90deg,
                  black
                  0deg
                  ${visibleAngle}deg,
                  transparent
                  ${visibleAngle}deg
                  360deg
                )
                `,
            }}
          >

            <img
              src="/DCF Logo.png"
              alt="DCF Lab Intelligence"
              className="
                block
                h-full
                w-full
                object-contain
              "
            />

          </div>


          {/* ==================================================
              INNER CIRCLE
             ================================================== */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              flex
              aspect-square
              w-[48%]
              -translate-x-1/2
              -translate-y-1/2
              flex-col
              items-center
              justify-center
              rounded-full
              bg-[#101a2b]
              px-4
              text-center
            "
            style={{
              opacity:
                circleTextOpacity,

              boxShadow:
                `
                0 0 25px
                rgba(
                  0,
                  220,
                  170,
                  0.20
                ),

                0 0 65px
                rgba(
                  0,
                  220,
                  170,
                  0.12
                )
                `,
            }}
          >

            <div
              className="
                mb-3
                text-[26px]
                leading-none
                text-emerald-400
              "
            >
              ✦
            </div>


            <div
              className="
                flex
                flex-col
                items-center
                leading-none
                tracking-[-0.045em]
              "
            >

              <span
                className="
                  text-[clamp(25px,3.8vw,48px)]
                  font-bold
                  text-white
                "
              >
                DCF Lab
              </span>

              <span
                className="
                  text-[clamp(25px,3.8vw,48px)]
                  font-bold
                  text-emerald-400
                "
              >
                Intelligence
              </span>

            </div>


            <div
              className="
                mt-4
                text-[clamp(9px,1vw,14px)]
                leading-[1.4]
                text-slate-300
              "
            >
              AI-Powered Financial Research
              <br />
              &amp; Valuation Platform
            </div>

          </div>

        </div>


        {/* ====================================================
            AI MESSAGE

            IMPORTANT:
            z-110 > white z-100

            Therefore the text remains visible
            while the background becomes white.
           ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[110]
            flex
            items-center
            justify-center
            px-6
          "
          style={{
            opacity:
              aiOpacity,

            filter:
              aiTextGlow,
          }}
        >

          <div
            className="
              w-full
              max-w-[1050px]
              text-center
            "
          >

            <h1
              className="
                m-0
                text-[clamp(44px,6vw,84px)]
                font-semibold
                leading-[1]
                tracking-[-0.055em]
              "
              style={{
                color:
                  headingColor,
              }}
            >
              AI reads.{" "}

              <span
                className="
                  text-emerald-400
                "
              >
                You decide.
              </span>

            </h1>


            <p
              className="
                mx-auto
                mt-8
                max-w-[820px]
                text-[clamp(18px,2vw,25px)]
                leading-[1.65]
              "
              style={{
                color:
                  descriptionColor,
              }}
            >
              DCF Lab Intelligence uncovers
              the hidden insights behind
              financial data—while keeping
              you in complete control of
              your valuation assumptions.
            </p>

          </div>

        </div>


        {/* ====================================================
            WHITE BACKGROUND

            z-100
            AI text is z-110
           ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[100]
            bg-white
          "
          style={{
            opacity:
              whiteOpacity,
          }}
        />


        {/* ====================================================
            REAL ANALYSIS PAGE

            THIS IS THE IMPORTANT FIX.

            absolute
            inset-0
            overflow-hidden

            NO overflow-y-auto.
            NO normal page scrolling.
           ==================================================== */}

        <div
          className="
            absolute
            inset-0
            z-[120]
            overflow-hidden
            bg-white
          "
          style={{
            opacity:
              analysisOpacity,

            filter:
              `blur(${analysisBlur}px)`,

            pointerEvents:
              analysisOpacity > 0.98
                ? "auto"
                : "none",
          }}
        >

          {/* ==================================================
              ANALYSIS BACKGROUND
             ================================================== */}

          <div
            className="
              absolute
              inset-0
              bg-white
            "
          >

            {/* ==================================================
                SOFT GREEN GLOW
               ================================================== */}

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-[55%]
                h-[600px]
                w-[850px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                blur-[120px]
              "
              style={{
                background:
                  `
                  radial-gradient(
                    circle,
                    rgba(
                      0,
                      210,
                      160,
                      0.10
                    ),
                    transparent 68%
                  )
                  `,
              }}
            />


            {/* ==================================================
                ANALYSIS HEADER

                FIXED POSITION.
                NO MOVEMENT.
               ================================================== */}

            <div
              className="
                absolute
                inset-x-0
                top-[6%]
                z-10
                px-6
                text-center
              "
              style={{
                opacity:
                  analysisHeaderOpacity,
              }}
            >

              <div
                className="
                  mx-auto
                  max-w-5xl
                "
              >

                <div
                  className="
                    text-sm
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-emerald-500
                  "
                >
                  DCF Lab Intelligence
                </div>


                <h2
                  className="
                    mt-4
                    text-[clamp(38px,5vw,72px)]
                    font-semibold
                    leading-[1.05]
                    tracking-[-0.05em]
                    text-slate-900
                  "
                >
                  Financial analysis,
                  <br />

                  <span
                    className="
                      text-emerald-500
                    "
                  >
                    without the noise.
                  </span>
                </h2>


                <p
                  className="
                    mx-auto
                    mt-5
                    max-w-2xl
                    text-[clamp(15px,1.4vw,19px)]
                    leading-7
                    text-slate-600
                  "
                >
                  Transform financial data into
                  structured insights while
                  maintaining complete control
                  over your valuation assumptions.
                </p>

              </div>

            </div>


            {/* ==================================================
                MAIN ANALYSIS WORKSPACE

                FIXED POSITION.

                NO:
                  translate-y
                  margin-top
                  normal flow
               ================================================== */}

            <div
              className="
                absolute
                left-1/2
                top-[39%]
                z-10
                w-[min(1100px,calc(100%-48px))]
                -translate-x-1/2
              "
              style={{
                opacity:
                  analysisMainOpacity,
              }}
            >

              <div
                className="
                  grid
                  gap-6
                  lg:grid-cols-[1.4fr_0.6fr]
                "
              >

                {/* =================================================
                    MAIN UPLOAD PANEL
                   ================================================= */}

                <div
                  className="
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    p-6
                    shadow-[0_20px_60px_rgba(15,23,42,0.06)]
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <div>

                      <div
                        className="
                          text-sm
                          font-medium
                          text-slate-500
                        "
                      >
                        Financial Intelligence
                      </div>

                      <h3
                        className="
                          mt-2
                          text-2xl
                          font-semibold
                          text-slate-900
                        "
                      >
                        Start your analysis
                      </h3>

                    </div>


                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-emerald-50
                        text-xl
                        text-emerald-500
                      "
                    >
                      ✦
                    </div>

                  </div>


                  <div
                    className="
                      mt-6
                      rounded-2xl
                      border-2
                      border-dashed
                      border-slate-200
                      p-7
                      text-center
                    "
                  >

                    <div
                      className="
                        mx-auto
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-slate-100
                        text-2xl
                        text-slate-500
                      "
                    >
                      ↑
                    </div>


                    <h4
                      className="
                        mt-4
                        text-lg
                        font-semibold
                        text-slate-900
                      "
                    >
                      Upload Annual Report
                    </h4>


                    <p
                      className="
                        mx-auto
                        mt-2
                        max-w-md
                        text-sm
                        leading-6
                        text-slate-500
                      "
                    >
                      Upload a company annual report
                      and let DCF Lab Intelligence
                      extract the financial information.
                    </p>


                    <button
                      className="
                        mt-5
                        rounded-xl
                        bg-slate-900
                        px-6
                        py-3
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      Upload Report
                    </button>

                  </div>

                </div>


                {/* =================================================
                    AI PANEL
                   ================================================= */}

                <div
                  className="
                    rounded-3xl
                    bg-slate-900
                    p-7
                    text-white
                  "
                >

                  <div
                    className="
                      text-sm
                      font-medium
                      text-emerald-400
                    "
                  >
                    AI Intelligence
                  </div>


                  <h3
                    className="
                      mt-3
                      text-2xl
                      font-semibold
                    "
                  >
                    From numbers
                    <br />
                    to insights.
                  </h3>


                  <p
                    className="
                      mt-5
                      text-sm
                      leading-7
                      text-slate-300
                    "
                  >
                    Understand financial statements,
                    management commentary, KPIs,
                    valuation drivers and hidden
                    signals in one structured workflow.
                  </p>


                  <div
                    className="
                      mt-7
                      space-y-3
                    "
                  >

                    <div
                      className="
                        rounded-xl
                        bg-white/5
                        px-4
                        py-3
                        text-sm
                        text-slate-200
                      "
                    >
                      Financial Statements
                    </div>


                    <div
                      className="
                        rounded-xl
                        bg-white/5
                        px-4
                        py-3
                        text-sm
                        text-slate-200
                      "
                    >
                      Management Commentary
                    </div>


                    <div
                      className="
                        rounded-xl
                        bg-white/5
                        px-4
                        py-3
                        text-sm
                        text-slate-200
                      "
                    >
                      Valuation Drivers
                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* ==================================================
                PROCESS STEPS

                FIXED AT BOTTOM.

                THEY FADE IN.
                THEY DO NOT COME FROM BELOW.
               ================================================== */}

            <div
              className="
                absolute
                bottom-[6%]
                left-1/2
                z-10
                w-[min(1000px,calc(100%-48px))]
                -translate-x-1/2
              "
              style={{
                opacity:
                  analysisCardsOpacity,
              }}
            >

              <div
                className="
                  grid
                  grid-cols-4
                  gap-5
                "
              >

                <AnalysisStep
                  number="1"
                  title="Upload"
                  description="Upload your annual report or 10-K in PDF format."
                  icon="▱"
                />


                <AnalysisStep
                  number="2"
                  title="AI Extracts"
                  description="AI extracts financial data and key metrics instantly."
                  icon="✳"
                />


                <AnalysisStep
                  number="3"
                  title="Calculate"
                  description="Calculate FCFF, WACC, Terminal Value and more."
                  icon="▥"
                />


                <AnalysisStep
                  number="4"
                  title="Insights"
                  description="Get intrinsic value and actionable insights."
                  icon="⊙"
                />

              </div>

            </div>

          </div>

        </div>


        {/* ====================================================
            SCROLL INDICATOR
           ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-10
            left-1/2
            z-[70]
            -translate-x-1/2
            text-center
          "
          style={{
            opacity:
              progress < 0.08
                ? 1
                : 0,
          }}
        >

          <div
            className="
              whitespace-nowrap
              text-[11px]
              font-medium
              uppercase
              tracking-[0.30em]
              text-white/70
            "
          >
            Scroll to explore
          </div>


          <div
            className="
              mx-auto
              mt-3
              h-8
              w-[2px]
              bg-gradient-to-b
              from-emerald-400
              to-transparent
            "
          />

        </div>

      </div>

    </section>
  );
}


/* ================================================================
   ANALYSIS STEP
   ================================================================ */

function AnalysisStep({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div
      className="
        relative
        text-center
      "
    >

      <div
        className="
          mx-auto
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-emerald-50
          text-xl
          text-emerald-500
        "
      >
        {icon}
      </div>


      <div
        className="
          mt-3
          text-[13px]
          font-semibold
          text-slate-900
        "
      >
        {number}. {title}
      </div>


      <div
        className="
          mx-auto
          mt-2
          max-w-[190px]
          text-[10px]
          leading-4
          text-slate-400
        "
      >
        {description}
      </div>

    </div>
  );
}
