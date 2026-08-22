import { useEffect, useState } from "react";

export default function IntelligenceStoryIntro() {
  const [progress, setProgress] = useState(0);

  /* ============================================================
     SCROLL PROGRESS
     ============================================================ */

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const section = document.getElementById(
        "intelligence-story"
      );

      if (!section) return;

      const rect = section.getBoundingClientRect();

      const scrollDistance =
        section.offsetHeight - window.innerHeight;

      if (scrollDistance <= 0) return;

      const rawProgress =
        -rect.top / scrollDistance;

      const nextProgress = Math.min(
        Math.max(rawProgress, 0),
        1
      );

      setProgress(nextProgress);
    };

    const handleScroll = () => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", update);

    update();

    return () => {
      cancelAnimationFrame(raf);

      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        update
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

  const ease = (value: number) => {
    const x = clamp(value);

    return x * x * (3 - 2 * x);
  };

  /* ============================================================
     STORY TIMELINE
     ============================================================

     0.00 ───────── 0.25
              Circle holds

     0.25 ───────── 0.55
              Circle slowly wipes

     0.55 ───────── 0.65
              Cinematic pause

     0.65 ───────── 0.73
              AI fades in

     0.73 ───────── 0.96
              AI stays visible

     0.96 ───────── 1.00
              Background reaches white
              AI fades away

     ============================================================ */

  /* ============================================================
     CIRCLE WIPE
     ============================================================ */

  const circleProgress = ease(
    clamp(
      (progress - 0.25) / 0.30
    )
  );

  const wipeAngle =
    circleProgress * 360;

  /* ============================================================
     CENTER TEXT FADE
     ============================================================ */

  const centerFade = ease(
    clamp(
      (progress - 0.29) / 0.22
    )
  );

  /* ============================================================
     AI MESSAGE
     ============================================================ */

  let aiOpacity = 0;

  /*
   * FADE IN
   * 65% → 73%
   */

  if (
    progress >= 0.65 &&
    progress < 0.73
  ) {
    aiOpacity = ease(
      (progress - 0.65) / 0.08
    );
  }

  /*
   * HOLD
   *
   * 73% → 96%
   *
   * The AI message stays fully visible.
   */

  if (
    progress >= 0.73 &&
    progress < 0.96
  ) {
    aiOpacity = 1;
  }

  /*
   * FINAL FADE
   *
   * Only after the background is almost white.
   *
   * 96% → 100%
   */

  if (progress >= 0.96) {
    aiOpacity =
      1 -
      ease(
        (progress - 0.96) / 0.04
      );
  }

  /* ============================================================
     FINAL CIRCLE EXIT
     ============================================================ */

  const circleExit = ease(
    clamp(
      (progress - 0.96) / 0.04
    )
  );

  /* ============================================================
     BACKGROUND COLOR
     ============================================================

     The background changes VERY gradually.

     Navy
       ↓
     Blue
       ↓
     Deep Teal
       ↓
     Emerald Teal
       ↓
     Soft Teal
       ↓
     Light Blue
       ↓
     White

     ============================================================ */

  type ColorStop = {
    position: number;
    r: number;
    g: number;
    b: number;
  };

  const colorStops: ColorStop[] = [
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
      b: 47,
    },

    {
      position: 0.36,
      r: 10,
      g: 43,
      b: 55,
    },

    {
      position: 0.54,
      r: 8,
      g: 58,
      b: 63,
    },

    {
      position: 0.68,
      r: 8,
      g: 72,
      b: 69,
    },

    {
      position: 0.78,
      r: 18,
      g: 84,
      b: 80,
    },

    {
      position: 0.88,
      r: 58,
      g: 110,
      b: 115,
    },

    {
      position: 0.95,
      r: 151,
      g: 178,
      b: 182,
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
      i < colorStops.length - 1;
      i++
    ) {
      const current =
        colorStops[i];

      const next =
        colorStops[i + 1];

      if (
        p >= current.position &&
        p <= next.position
      ) {
        const localProgress =
          (p - current.position) /
          (next.position -
            current.position);

        const eased =
          ease(localProgress);

        const r = Math.round(
          current.r +
            (next.r -
              current.r) *
              eased
        );

        const g = Math.round(
          current.g +
            (next.g -
              current.g) *
              eased
        );

        const b = Math.round(
          current.b +
            (next.b -
              current.b) *
              eased
        );

        return `rgb(${r}, ${g}, ${b})`;
      }
    }

    return "rgb(247, 250, 252)";
  };

  const backgroundColor =
    getBackgroundColor(progress);

  /* ============================================================
     BACKGROUND GLOW
     ============================================================ */

  const glowOpacity =
    progress < 0.82
      ? 0.85
      : 0.85 -
        ((progress - 0.82) / 0.18) *
          0.75;

  /* ============================================================
     AI TEXT COLOR
     ============================================================

     Keep the AI message bright and readable.

     Only near the final white transition do we move toward
     dark text.
     ============================================================ */

  const textTransition = ease(
    clamp(
      (progress - 0.94) / 0.06
    )
  );

  const headingR = Math.round(
    255 -
      235 * textTransition
  );

  const headingG = Math.round(
    255 -
      225 * textTransition
  );

  const headingB = Math.round(
    255 -
      205 * textTransition
  );

  const headingColor =
    `rgb(${headingR}, ${headingG}, ${headingB})`;

  const descriptionR = Math.round(
    211 -
      125 * textTransition
  );

  const descriptionG = Math.round(
    221 -
      115 * textTransition
  );

  const descriptionB = Math.round(
    232 -
      105 * textTransition
  );

  const descriptionColor =
    `rgb(${descriptionR}, ${descriptionG}, ${descriptionB})`;

  /* ============================================================
     RENDER
     ============================================================ */

  return (
    <section
      id="intelligence-story"
      className="
        relative
        left-1/2
        w-screen
        -translate-x-1/2
        h-[500vh]
        m-0
        p-0
      "
    >

      {/* ========================================================
          STICKY CINEMATIC VIEWPORT
         ======================================================== */}

      <div
        className="
          sticky
          top-0
          h-screen
          w-screen
          overflow-hidden
        "
        style={{
          backgroundColor,
        }}
      >

        {/* ======================================================
            BACKGROUND RADIAL GLOW
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
              "radial-gradient(circle at 50% 48%, rgba(0,210,160,0.11), transparent 46%)",

            opacity:
              glowOpacity,
          }}
        />

        {/* ======================================================
            CENTER GREEN GLOW
           ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[800px]
            w-[800px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            blur-[130px]
          "
          style={{
            background:
              "radial-gradient(circle, rgba(0,210,160,0.20), transparent 68%)",

            opacity:
              glowOpacity,
          }}
        />

        {/* ======================================================
            STORY CIRCLE
           ====================================================== */}

        <div
          className="
            absolute
            inset-0
            z-20
            flex
            items-center
            justify-center
          "
          style={{
            opacity:
              1 - circleExit,
          }}
        >

          <div
            className="
              relative
              h-[min(560px,76vw)]
              w-[min(560px,76vw)]
            "
          >

            {/* ==================================================
                OUTER CIRCLE
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
                    from 0deg,
                    transparent 0deg ${wipeAngle}deg,
                    black ${wipeAngle}deg 360deg
                  )`,

                maskImage:
                  `conic-gradient(
                    from 0deg,
                    transparent 0deg ${wipeAngle}deg,
                    black ${wipeAngle}deg 360deg
                  )`,
              }}
            >

              <img
                src="/DCF Logo.png"
                alt="DCF Lab Intelligence"
                className="
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
                text-center
              "
              style={{
                opacity:
                  1 - centerFade,
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
                    text-[clamp(28px,4vw,48px)]
                    font-bold
                    text-white
                  "
                >
                  DCF Lab
                </span>

                <span
                  className="
                    text-[clamp(28px,4vw,48px)]
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

        </div>

        {/* ======================================================
            AI MESSAGE
           ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-40
            flex
            items-center
            justify-center
            px-6
          "
          style={{
            opacity:
              aiOpacity,
          }}
        >

          <div
            className="
              w-full
              max-w-[1000px]
              text-center
            "
          >

            <h1
              className="
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

              <span>
                AI reads.
              </span>

              {" "}

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
              DCF Lab Intelligence helps uncover
              the information behind the numbers.
            </p>

            <p
              className="
                mx-auto
                mt-4
                max-w-[760px]
                text-[clamp(18px,2vw,24px)]
                leading-[1.65]
              "
              style={{
                color:
                  descriptionColor,
              }}
            >
              You remain in control of the assumptions
              that drive valuation.
            </p>

          </div>

        </div>

        {/* ======================================================
            SCROLL INDICATOR
           ====================================================== */}

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
                : Math.max(
                    1 -
                      progress * 8,
                    0
                  ),
          }}
        >

          <div
            className="
              whitespace-nowrap
              text-[11px]
              font-medium
              uppercase
              tracking-[0.30em]
              text-white/75
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
            FINAL WHITE TRANSITION
           ======================================================

           IMPORTANT:

           This starts only at 99%.

           The actual background itself has already been
           gradually changing toward white.
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
              progress >= 0.99
                ? ease(
                    (progress - 0.99) /
                      0.01
                  ) * 0.10
                : 0,
          }}
        />

      </div>
    </section>
  );
}
