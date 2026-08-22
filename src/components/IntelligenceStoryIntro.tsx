import { useEffect, useState } from "react";

export default function IntelligenceStoryIntro() {
  const [progress, setProgress] = useState(0);

  /* ============================================================
     SCROLL ENGINE
     ============================================================ */

  useEffect(() => {
    let frame = 0;

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
        scrolled /
        scrollDistance;

      setProgress(
        Math.min(
          Math.max(value, 0),
          1
        )
      );
    };

    const handleScroll = () => {
      cancelAnimationFrame(frame);

      frame =
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
      cancelAnimationFrame(frame);

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
    return ease(
      clamp(
        (progress - start) /
          (end - start)
      )
    );
  };


  /* ============================================================
     STORY TIMELINE

     0.00 - 0.12
     Circle holds + glows

     0.12 - 0.50
     Circle wipes

     0.50 - 0.58
     Pause

     0.58 - 0.68
     AI message appears

     0.68 - 0.80
     AI message holds

     0.80 - 0.88
     Background becomes white

     0.88 - 0.93
     Analysis page fades in

     0.93 - 0.96
     Analysis heading appears

     0.96 - 0.98
     Analysis cards appear

     0.98 - 1.00
     Analysis content completes

     NOTHING MOVES UP.
     ============================================================ */


  /* ============================================================
     CIRCLE WIPE
     ============================================================ */

  const circleProgress =
    phase(
      0.12,
      0.50
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
      0.18,
      0.40
    );


  /* ============================================================
     CIRCLE EXIT
     ============================================================ */

  const circleOpacity =
    progress < 0.47
      ? 1
      : 1 -
          phase(
            0.47,
            0.53
          );


  /* ============================================================
     CIRCLE GLOW
     ============================================================ */

  const pulse =
    0.68 +
    Math.sin(
      progress *
        Math.PI *
        6
    ) *
      0.08;


  const circleGlow = `
    drop-shadow(
      0 0 18px
      rgba(
        0,
        220,
        170,
        ${pulse}
      )
    )

    drop-shadow(
      0 0 42px
      rgba(
        0,
        220,
        170,
        ${pulse * 0.65}
      )
    )

    drop-shadow(
      0 0 90px
      rgba(
        0,
        220,
        170,
        ${pulse * 0.28}
      )
    )
  `;


  /* ============================================================
     AI MESSAGE
     ============================================================ */

  let aiOpacity = 0;

  if (progress < 0.58) {
    aiOpacity = 0;
  }

  else if (progress < 0.68) {
    aiOpacity =
      phase(
        0.58,
        0.68
      );
  }

  else {
    aiOpacity = 1;
  }


  /* ============================================================
     AI TEXT GLOW
     ============================================================ */

  const aiGlow =
    progress < 0.72
      ? 0.75
      : 0.75 *
          (
            1 -
            phase(
              0.72,
              0.88
            )
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
      0 0 45px
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
    p: number;
    r: number;
    g: number;
    b: number;
  };


  const colors: ColorStop[] = [
    {
      p: 0.00,
      r: 14,
      g: 24,
      b: 40,
    },

    {
      p: 0.18,
      r: 12,
      g: 30,
      b: 46,
    },

    {
      p: 0.38,
      r: 8,
      g: 48,
      b: 57,
    },

    {
      p: 0.55,
      r: 7,
      g: 66,
      b: 65,
    },

    {
      p: 0.70,
      r: 12,
      g: 80,
      b: 77,
    },

    {
      p: 0.82,
      r: 74,
      g: 116,
      b: 120,
    },

    {
      p: 0.90,
      r: 185,
      g: 205,
      b: 207,
    },

    {
      p: 1.00,
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
      i < colors.length - 1;
      i++
    ) {
      const current =
        colors[i];

      const next =
        colors[i + 1];

      if (
        p >= current.p &&
        p <= next.p
      ) {
        const local =
          (p - current.p) /
          (next.p - current.p);

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
    progress < 0.72
      ? 1
      : 1 -
          phase(
            0.72,
            0.90
          );


  /* ============================================================
     AI TEXT COLOR
     ============================================================ */

  const textTransition =
    phase(
      0.72,
      0.90
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
     WHITE BACKGROUND TRANSITION
     ============================================================ */

  const whiteOpacity =
    phase(
      0.80,
      0.90
    );


  /* ============================================================
     ANALYSIS PAGE

     THIS IS THE IMPORTANT PART.

     The complete analysis page does NOT slide upward.

     It appears using:

       opacity
       blur

     only.
     ============================================================ */

  const analysisOpacity =
    phase(
      0.88,
      0.93
    );


  const analysisBlur =
    14 -
    analysisOpacity * 14;


  /* ============================================================
     ANALYSIS INTERNAL SEQUENCE

     These are optional stages that let the actual
     analysis interface reveal progressively.
     ============================================================ */

  const analysisHeaderOpacity =
    phase(
      0.90,
      0.935
    );


  const analysisMainOpacity =
    phase(
      0.925,
      0.965
    );


  const analysisCardsOpacity =
    phase(
      0.95,
      0.985
    );


  const analysisBottomOpacity =
    phase(
      0.975,
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
        h-[400vh]
        m-0
        p-0
      "
    >

      {/* ======================================================
          STICKY STORY VIEWPORT
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
                  0.15
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

            FIXED POSITION.

            NO MOVEMENT.

            Only:
              - wipe
              - opacity
              - glow
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
              WIPE MASK
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

                0 0 60px
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

            NO MOVEMENT.

            ONLY OPACITY + GLOW.
           ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[60]
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
                max-w-[760px]
                text-[clamp(18px,2vw,24px)]
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
            WHITE TRANSITION

            AI text remains above this layer.
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

            IMPORTANT:

            This is ABOVE the white layer.

            It does NOT move.

            It simply becomes visible.
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
              ANALYSIS CONTENT

              Replace this section with your existing
              real analysis UI.

              Each stage uses opacity only.
             ================================================== */}

          <div
            className="
              min-h-full
              w-full
              bg-white
            "
          >

            {/* =================================================
                ANALYSIS HEADER
               ================================================= */}

            <div
              className="
                px-6
                pb-8
                pt-20
                md:px-12
                lg:px-20
              "
              style={{
                opacity:
                  analysisHeaderOpacity,
              }}
            >

              <div
                className="
                  mx-auto
                  max-w-7xl
                "
              >

                <div
                  className="
                    mb-3
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
                    text-[clamp(36px,5vw,72px)]
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
                    mt-6
                    max-w-2xl
                    text-lg
                    leading-8
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


            {/* =================================================
                MAIN ANALYSIS AREA
               ================================================= */}

            <div
              className="
                px-6
                py-8
                md:px-12
                lg:px-20
              "
              style={{
                opacity:
                  analysisMainOpacity,
              }}
            >

              <div
                className="
                  mx-auto
                  grid
                  max-w-7xl
                  gap-6
                  lg:grid-cols-[1.4fr_0.6fr]
                "
              >

                {/* =============================================
                    UPLOAD / ANALYSIS PANEL
                   ============================================= */}

                <div
                  className="
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    p-8
                    shadow-sm
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
                      mt-8
                      rounded-2xl
                      border-2
                      border-dashed
                      border-slate-200
                      p-10
                      text-center
                    "
                  >

                    <div
                      className="
                        mx-auto
                        flex
                        h-16
                        w-16
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
                        mt-5
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
                        mt-6
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


                {/* =============================================
                    INSIGHT PANEL
                   ============================================= */}

                <div
                  className="
                    rounded-3xl
                    bg-slate-900
                    p-8
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
                      mt-8
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


            {/* =================================================
                ANALYSIS CARDS
               ================================================= */}

            <div
              className="
                px-6
                py-8
                md:px-12
                lg:px-20
              "
              style={{
                opacity:
                  analysisCardsOpacity,
              }}
            >

              <div
                className="
                  mx-auto
                  grid
                  max-w-7xl
                  gap-5
                  md:grid-cols-3
                "
              >

                <div
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-6
                  "
                >

                  <div
                    className="
                      text-sm
                      text-slate-500
                    "
                  >
                    Revenue
                  </div>

                  <div
                    className="
                      mt-3
                      text-3xl
                      font-semibold
                      text-slate-900
                    "
                  >
                    Growth
                  </div>

                  <div
                    className="
                      mt-3
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >
                    Track historical and
                    forward-looking growth drivers.
                  </div>

                </div>


                <div
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-6
                  "
                >

                  <div
                    className="
                      text-sm
                      text-slate-500
                    "
                  >
                    Profitability
                  </div>

                  <div
                    className="
                      mt-3
                      text-3xl
                      font-semibold
                      text-slate-900
                    "
                  >
                    Margins
                  </div>

                  <div
                    className="
                      mt-3
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >
                    Identify changes in margins
                    and operating performance.
                  </div>

                </div>


                <div
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-6
                  "
                >

                  <div
                    className="
                      text-sm
                      text-slate-500
                    "
                  >
                    Valuation
                  </div>

                  <div
                    className="
                      mt-3
                      text-3xl
                      font-semibold
                      text-slate-900
                    "
                  >
                    DCF
                  </div>

                  <div
                    className="
                      mt-3
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >
                    Maintain control of assumptions
                    driving intrinsic value.
                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                FINAL ANALYSIS SECTION
               ================================================= */}

            <div
              className="
                px-6
                pb-24
                pt-8
                md:px-12
                lg:px-20
              "
              style={{
                opacity:
                  analysisBottomOpacity,
              }}
            >

              <div
                className="
                  mx-auto
                  max-w-7xl
                  rounded-3xl
                  bg-slate-50
                  p-8
                  md:p-12
                "
              >

                <div
                  className="
                    max-w-2xl
                  "
                >

                  <div
                    className="
                      text-sm
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-emerald-500
                    "
                  >
                    Your decision
                  </div>


                  <h3
                    className="
                      mt-4
                      text-3xl
                      font-semibold
                      tracking-tight
                      text-slate-900
                      md:text-4xl
                    "
                  >
                    AI provides the insight.
                    <br />
                    You control the valuation.
                  </h3>


                  <p
                    className="
                      mt-5
                      text-base
                      leading-7
                      text-slate-600
                    "
                  >
                    Every important assumption remains
                    visible, editable and under your
                    control.
                  </p>

                </div>

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
