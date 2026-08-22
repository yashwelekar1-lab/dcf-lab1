import { useEffect, useState } from "react";

export default function IntelligenceStoryIntro() {
  const [progress, setProgress] = useState(0);

  /* ============================================================
     SCROLL ENGINE
     ============================================================ */

  useEffect(() => {
    let animationFrame = 0;

    const calculateProgress = () => {
      const section =
        document.getElementById(
          "intelligence-story"
        );

      if (!section) return;

      const rect =
        section.getBoundingClientRect();

      const scrollableDistance =
        section.offsetHeight -
        window.innerHeight;

      if (scrollableDistance <= 0) {
        setProgress(0);
        return;
      }

      const scrolled =
        Math.max(0, -rect.top);

      const value =
        scrolled /
        scrollableDistance;

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
          calculateProgress
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
      calculateProgress
    );

    calculateProgress();

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
        calculateProgress
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

  const smooth = (
    value: number
  ) => {
    const x = clamp(value);

    return (
      x *
      x *
      (3 - 2 * x)
    );
  };

  /* ============================================================
     STORY TIMELINE

     0.00 - 0.15
       Circle fully visible

     0.15 - 0.58
       Circle wipes

     0.58 - 0.64
       Pause

     0.64 - 0.72
       AI message appears

     0.72 - 0.90
       AI message stays fully visible

     0.90 - 1.00
       Background becomes WHITE

       IMPORTANT:
       AI MESSAGE DOES NOT DISAPPEAR.

     ============================================================ */


  /* ============================================================
     CIRCLE WIPE
     ============================================================ */

  const circleWipe =
    smooth(
      clamp(
        (progress - 0.15) /
          0.43
      )
    );

  const visibleAngle =
    360 -
    circleWipe * 360;


  /* ============================================================
     INNER CIRCLE TEXT
     ============================================================ */

  const centerOpacity =
    1 -
    smooth(
      clamp(
        (progress - 0.18) /
          0.25
      )
    );


  /* ============================================================
     CIRCLE GLOW
     ============================================================ */

  const glowPulse =
    0.72 +
    Math.sin(
      progress *
        Math.PI *
        5
    ) *
      0.08;

  const circleGlow =
    `drop-shadow(
      0 0 18px
      rgba(
        0,
        220,
        170,
        ${glowPulse}
      )
    )
    drop-shadow(
      0 0 45px
      rgba(
        0,
        220,
        170,
        ${glowPulse * 0.65}
      )
    )
    drop-shadow(
      0 0 90px
      rgba(
        0,
        220,
        170,
        ${glowPulse * 0.30}
      )
    )`;


  /* ============================================================
     AI MESSAGE

     IMPORTANT:

     The AI message NEVER fades away.

     Once it appears, it remains visible
     all the way through the white background.
     ============================================================ */

  let aiOpacity = 0;

  if (progress < 0.64) {
    aiOpacity = 0;
  }

  else if (progress < 0.72) {
    aiOpacity =
      smooth(
        (progress - 0.64) /
          0.08
      );
  }

  else {
    /*
     * IMPORTANT
     *
     * Keep this at 1.
     *
     * Do NOT fade it out.
     */

    aiOpacity = 1;
  }


  /* ============================================================
     AI GLOW

     Glow slowly reduces as the background
     becomes white.
     ============================================================ */

  const aiGlowFade =
    progress < 0.82
      ? 1
      : 1 -
          smooth(
            clamp(
              (progress - 0.82) /
                0.18
            )
          );

  const aiGlowIntensity =
    0.70 *
    aiGlowFade;

  const aiTextGlow =
    `drop-shadow(
      0 0 18px
      rgba(
        0,
        220,
        170,
        ${aiGlowIntensity}
      )
    )
    drop-shadow(
      0 0 45px
      rgba(
        0,
        220,
        170,
        ${aiGlowIntensity * 0.45}
      )
    )`;


  /* ============================================================
     BACKGROUND COLORS
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
      position: 0.20,
      r: 12,
      g: 31,
      b: 48,
    },

    {
      position: 0.40,
      r: 9,
      g: 48,
      b: 57,
    },

    {
      position: 0.58,
      r: 7,
      g: 67,
      b: 66,
    },

    {
      position: 0.70,
      r: 12,
      g: 79,
      b: 76,
    },

    {
      position: 0.82,
      r: 48,
      g: 103,
      b: 108,
    },

    {
      position: 0.92,
      r: 145,
      g: 173,
      b: 178,
    },

    {
      position: 1.00,
      r: 247,
      g: 250,
      b: 252,
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
        const localProgress =
          (p -
            current.position) /
          (next.position -
            current.position);

        const eased =
          smooth(
            localProgress
          );

        const r =
          Math.round(
            current.r +
              (next.r -
                current.r) *
                eased
          );

        const g =
          Math.round(
            current.g +
              (next.g -
                current.g) *
                eased
          );

        const b =
          Math.round(
            current.b +
              (next.b -
                current.b) *
                eased
          );

        return `rgb(${r}, ${g}, ${b})`;
      }
    }

    return "rgb(247,250,252)";
  };


  const backgroundColor =
    getBackgroundColor(
      progress
    );


  /* ============================================================
     BACKGROUND GLOW
     ============================================================ */

  const backgroundGlowOpacity =
    progress < 0.70
      ? 0.90
      : Math.max(
          0.90 -
            ((progress - 0.70) /
              0.30) *
              0.90,
          0
        );


  /* ============================================================
     TEXT COLOR

     IMPORTANT:

     As the background becomes white,
     the AI text changes from white
     to DARK BLUE.

     This means it stays readable
     on the white background.
     ============================================================ */

  const textTransition =
    smooth(
      clamp(
        (progress - 0.78) /
          0.22
      )
    );


  const headingColor =
    `rgb(
      ${Math.round(
        255 -
          225 *
            textTransition
      )},
      ${Math.round(
        255 -
          225 *
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
        211 -
          115 *
            textTransition
      )},
      ${Math.round(
        221 -
          115 *
            textTransition
      )},
      ${Math.round(
        232 -
          105 *
            textTransition
      )}
    )`;


  /* ============================================================
     FINAL WHITE TRANSITION

     Background reaches TRUE WHITE.

     The text remains above this layer.
     ============================================================ */

  const whiteTransition =
    smooth(
      clamp(
        (progress - 0.94) /
          0.06
      )
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
        h-[300vh]
        m-0
        p-0
      "
    >

      {/* ======================================================
          STICKY VIEWPORT
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
              "radial-gradient(circle at 50% 50%, rgba(0,220,170,0.14), transparent 48%)",

            opacity:
              backgroundGlowOpacity,
          }}
        />


        {/* ====================================================
            LARGE GLOW
           ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[850px]
            w-[850px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            blur-[150px]
            z-[1]
          "
          style={{
            background:
              "radial-gradient(circle, rgba(0,220,170,0.20), transparent 68%)",

            opacity:
              backgroundGlowOpacity,
          }}
        />


        {/* ====================================================
            CIRCLE

            Stays at EXACT same position.
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
  "clamp(280px, min(62vw, 62vh), 560px)",

height:
  "clamp(280px, min(62vw, 62vh), 560px)",
            
            transform:
              "translate(-50%, -50%)",

            filter:
              circleGlow,

            opacity:
              progress >= 0.58
                ? 1 -
                    smooth(
                      clamp(
                        (progress - 0.58) /
                          0.06
                      )
                    )
                : 1,
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
                `conic-gradient(
                  from -90deg,
                  black 0deg ${visibleAngle}deg,
                  transparent ${visibleAngle}deg 360deg
                )`,

              maskImage:
                `conic-gradient(
                  from -90deg,
                  black 0deg ${visibleAngle}deg,
                  transparent ${visibleAngle}deg 360deg
                )`,
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
                centerOpacity,

              boxShadow:
                `
                0 0 25px
                rgba(0,220,170,0.20),

                0 0 60px
                rgba(0,220,170,0.12)
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
                  text-[clamp(26px,4vw,50px)]
                  font-bold
                  text-white
                "
              >
                DCF Lab
              </span>

              <span
                className="
                  text-[clamp(26px,4vw,50px)]
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

            z-[110]

            IMPORTANT:
            It is ABOVE the white background layer.
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
                text-[clamp(42px,6vw,82px)]
                font-semibold
                leading-[1.05]
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
                max-w-[850px]
                text-[clamp(18px,2vw,25px)]
                leading-[1.6]
              "
              style={{
                color:
                  descriptionColor,
              }}
            >
              DCF Lab Intelligence uncovers the
              hidden insights behind financial
              data—while keeping you in complete
              control of your valuation assumptions.
            </p>

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
            z-50
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


        {/* ====================================================
            WHITE BACKGROUND TRANSITION

            IMPORTANT:

            This is BELOW the AI text.

            Therefore the text stays visible
            while the entire screen becomes white.
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
              whiteTransition,
          }}
        />

      </div>

    </section>
  );
}
