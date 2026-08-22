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
     CIRCLE WIPE PROGRESS

     The wipe starts at 12 o'clock and grows clockwise.
     It is deliberately slow so the circle remains visible.
     ============================================================ */

  const circleProgress = phase(0.14, 0.42);

  // CSS conic-gradient angles increase clockwise.
  const wipeAngle = circleProgress * 360;


  /* ============================================================
     FINAL STORY TIMELINE

     0.00 - 0.14   Circle holds
     0.14 - 0.42   Circle slowly wipes
     0.42 - 0.50   Circle disappears
     0.50 - 0.62   AI message appears
     0.62 - 0.88   AI message stays
     0.88 - 0.96   Background becomes white
     0.94 - 0.96   AI message fades out
     0.96 - 0.99   PURE WHITE PAUSE
     0.99 - 0.995  Analysis heading
     0.995 - 0.998 Analysis workspace
     0.998 - 1.00  Analysis cards

     IMPORTANT:
     Nothing moves upward.
     Nothing slides from bottom.
     Analysis remains hidden until the white pause is finished.
     ============================================================ */



  /* ============================================================
     CIRCLE INNER TEXT
     ============================================================ */

  const circleTextOpacity =
    1 -
    phase(
      0.20,
      0.38
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
        5
    );

  const circleGlowStrength =
    0.72 +
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

     THIS IS THE IMPORTANT FIX.

     The message:
       appears
       stays
       survives the white transition
       then fades OUT

     BEFORE analysis begins.
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

  } else if (progress < 0.94) {
    /*
     * Fully visible for a long time.
     */
    aiOpacity = 1;

  } else if (progress < 0.96) {
    /*
     * Fade out BEFORE analysis.
     */
    aiOpacity =
      1 -
      phase(
        0.94,
        0.96
      );

  } else {
    aiOpacity = 0;
  }


  /* ============================================================
     AI TEXT GLOW
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
      position: 0.88,
      r: 150,
      g: 175,
      b: 178,
    },

    {
      position: 0.94,
      r: 220,
      g: 229,
      b: 230,
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
      0.70,
      0.94
    );


  /* ============================================================
     AI TEXT COLOR

     Changes gradually from light to dark
     while background becomes white.
     ============================================================ */

  const textTransition =
    phase(
      0.78,
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

     Starts AFTER AI has been visible.

     Finishes BEFORE AI disappears.
     ============================================================ */

  const whiteOpacity =
    phase(
      0.88,
      0.96
    );


    /* ============================================================
     RENDER
     ============================================================ */

  return (
    <section
      id="intelligence-story"
      className="
        relative
        m-0
        h-[1600vh]
        w-full
        p-0
      "
    >

      {/* ======================================================
          STICKY STORY VIEWPORT

          THIS NEVER MOVES.
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
    CIRCLE + CENTER TEXT

    IMPORTANT:
    Circle and text are separate layers.
    The circle wipes independently.
    The text stays perfectly centered.
   ==================================================== */}

<div
  className="
    pointer-events-none
      fixed
    left-1/2
    top-[44%]
    z-20
  "
  style={{
    width:
      "clamp(420px, min(72vw, 72vh), 700px)",

    height:
      "clamp(420px, min(72vw, 72vh), 700px)",

    transform:
      "translate(-50%, -50%)",

    opacity:
      circleOpacity,

    filter:
      circleGlow,
  }}
>

  {/* ==================================================
      CIRCLE WIPE ONLY
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
          transparent 0deg,
          transparent ${wipeAngle}deg,
          black ${wipeAngle}deg,
          black 360deg
        )`,

      maskImage:
        `conic-gradient(
          from -90deg,
          transparent 0deg,
          transparent ${wipeAngle}deg,
          black ${wipeAngle}deg,
          black 360deg
        )`,

      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskSize: "100% 100%",
      maskSize: "100% 100%", 
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

</div>


{/* ====================================================
    CENTER CONTENT

    THIS IS COMPLETELY INDEPENDENT FROM THE WIPE.
    It remains exactly centered.
   ==================================================== */}

<div
  className="
    pointer-events-none
    fixed
    left-1/2
    top-[44%]
    z-30
    flex
    flex-col
    items-center
    justify-center
    text-center
  "
  style={{
    width:
      "clamp(280px, min(42vw, 42vh), 390px)",

    transform:
      "translate(-50%, -50%)",

    opacity:
      circleTextOpacity,
  }}
>

  {/* Star */}

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


  {/* Title */}

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


  {/* Subtitle */}

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


        {/* ====================================================
            AI MESSAGE

            z-[110]

            It sits ABOVE the white layer.
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

            z-[100]

            AI text is z-[110].
            Analysis is z-[120].
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
