import { useEffect, useState } from "react";

export default function IntelligenceStoryIntro() {
  const [progress, setProgress] = useState(0);

  /* ============================================================
     SCROLL PROGRESS
     ============================================================ */

  useEffect(() => {
    let raf = 0;

    const updateProgress = () => {
      const section =
        document.getElementById("intelligence-story");

      if (!section) return;

      const rect = section.getBoundingClientRect();

      const totalScroll =
        section.offsetHeight - window.innerHeight;

      if (totalScroll <= 0) {
        setProgress(0);
        return;
      }

      const distanceScrolled =
        Math.max(0, -rect.top);

      const value =
        distanceScrolled / totalScroll;

      setProgress(
        Math.min(
          Math.max(value, 0),
          1
        )
      );
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(
        updateProgress
      );
    };

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateProgress
    );

    updateProgress();

    return () => {
      cancelAnimationFrame(raf);

      window.removeEventListener(
        "scroll",
        onScroll
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


  /* ============================================================
     SEQUENTIAL TIMELINE

     0.00 ───────── 0.10
       Circle introduction / glow

     0.10 ───────── 0.56
       Circle wipes away

     0.56 ───────── 0.62
       Empty pause

     0.62 ───────── 0.72
       AI message appears

     0.72 ───────── 0.86
       AI message stays

     0.86 ───────── 1.00
       Background becomes white

     IMPORTANT:
     NOTHING MOVES VERTICALLY.
     ============================================================ */


  /* ============================================================
     1. CIRCLE WIPE
     ============================================================ */

  const circleWipeProgress =
    ease(
      clamp(
        (progress - 0.10) /
          0.46
      )
    );


  const visibleAngle =
    360 -
    circleWipeProgress * 360;


  /* ============================================================
     2. CIRCLE CONTENT

     Inner text disappears slightly before
     the outer circle finishes.
     ============================================================ */

  const circleTextOpacity =
    1 -
    ease(
      clamp(
        (progress - 0.16) /
          0.28
      )
    );


  /* ============================================================
     3. CIRCLE OPACITY

     Only fades at the very end of the wipe.
     ============================================================ */

  const circleOpacity =
    progress < 0.55
      ? 1
      : 1 -
          ease(
            clamp(
              (progress - 0.55) /
                0.07
            )
          );


  /* ============================================================
     4. CIRCLE GLOW

     Gentle pulsing glow.
     No movement.
     ============================================================ */

  const pulse =
    0.72 +
    Math.sin(
      progress *
        Math.PI *
        6
    ) *
      0.07;


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
      0 0 45px
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
        ${pulse * 0.30}
      )
    )
  `;


  /* ============================================================
     5. AI MESSAGE APPEARANCE

     IMPORTANT:

     It starts ONLY after circle disappears.

     It uses opacity only.
     No translate.
     No movement.
     ============================================================ */

  let aiOpacity = 0;

  if (progress < 0.62) {
    aiOpacity = 0;
  }

  else if (progress < 0.72) {
    aiOpacity =
      ease(
        (progress - 0.62) /
          0.10
      );
  }

  else {
    aiOpacity = 1;
  }


  /* ============================================================
     6. AI GLOW

     Strong when it first appears.
     Gradually becomes softer as screen
     transitions to white.
     ============================================================ */

  const aiGlow =
    progress < 0.76
      ? 0.85
      : 0.85 *
          (
            1 -
            ease(
              clamp(
                (progress - 0.76) /
                  0.24
              )
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
      0 0 50px
      rgba(
        0,
        220,
        170,
        ${aiGlow * 0.45}
      )
    )
  `;


  /* ============================================================
     7. BACKGROUND COLOR
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
      p: 0.36,
      r: 9,
      g: 48,
      b: 56,
    },

    {
      p: 0.55,
      r: 7,
      g: 65,
      b: 65,
    },

    {
      p: 0.70,
      r: 13,
      g: 79,
      b: 76,
    },

    {
      p: 0.84,
      r: 78,
      g: 119,
      b: 122,
    },

    {
      p: 0.93,
      r: 190,
      g: 207,
      b: 209,
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
     8. BACKGROUND GLOW

     Glow disappears gradually.
     ============================================================ */

  const backgroundGlow =
    progress < 0.72
      ? 1
      : 1 -
          ease(
            clamp(
              (progress - 0.72) /
                0.28
            )
          );


  /* ============================================================
     9. AI TEXT COLOR

     White on dark background.
     Dark navy on white background.

     "You decide." remains emerald.
     ============================================================ */

  const textTransition =
    ease(
      clamp(
        (progress - 0.76) /
          0.24
      )
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
     10. FINAL WHITE TRANSITION

     Only opacity changes.
     No movement.
     ============================================================ */

  const whiteOpacity =
    ease(
      clamp(
        (progress - 0.92) /
          0.08
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

      {/* ========================================================
          STICKY CINEMATIC VIEWPORT

          This keeps everything in the same
          screen position while scrolling.
         ======================================================== */}

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

        {/* ======================================================
            CENTRAL BACKGROUND GLOW
           ====================================================== */}

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


        {/* ======================================================
            LARGE SOFT GLOW
           ====================================================== */}

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


        {/* ======================================================
            CIRCLE

            IMPORTANT:

            There is NO scroll-based transform.

            It is always:

            left: 50%
            top: 54%

            Only the mask and opacity change.
           ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[54%]
            z-20
          "
          style={{
            /*
             * Automatic screen sizing.
             */

            width:
              "clamp(340px, min(58vw, 58vh), 520px)",

            height:
              "clamp(340px, min(58vw, 58vh), 520px)",

            /*
             * Permanent centering.
             *
             * NOT animated.
             */

            transform:
              "translate(-50%, -50%)",

            filter:
              circleGlow,

            opacity:
              circleOpacity,
          }}
        >

          {/* ====================================================
              OUTER CIRCLE WIPE

              The circle itself does NOT move.

              The mask reveals less and less of it.
             ==================================================== */}

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
                  black 0deg ${visibleAngle}deg,
                  transparent ${visibleAngle}deg 360deg
                )
                `,

              maskImage:
                `
                conic-gradient(
                  from -90deg,
                  black 0deg ${visibleAngle}deg,
                  transparent ${visibleAngle}deg 360deg
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


          {/* ====================================================
              INNER CIRCLE
             ==================================================== */}

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

            {/* SPARK */}

            <div
              className="
                mb-3
                text-[24px]
                leading-none
                text-emerald-400
              "
            >
              ✦
            </div>


            {/* TITLE */}

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


            {/* DESCRIPTION */}

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


        {/* ======================================================
            AI MESSAGE

            THIS DOES NOT MOVE.

            It appears using opacity only.
           ====================================================== */}

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

            {/* ==================================================
                HEADING
               ================================================== */}

            <h1
              className="
                m-0
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


            {/* ==================================================
                DESCRIPTION
               ================================================== */}

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


        {/* ======================================================
            SCROLL INDICATOR

            Only opacity changes.
            It does NOT move.
           ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-10
            left-1/2
            z-[50]
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


        {/* ======================================================
            WHITE BACKGROUND

            It is BELOW the AI text.

            Therefore:

            WHITE BACKGROUND
                  ↓
            AI TEXT
                  ↓
            STILL VISIBLE

            No movement.
           ====================================================== */}

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

      </div>

    </section>
  );
}
