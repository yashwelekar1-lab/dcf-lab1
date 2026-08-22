import { useEffect, useState } from "react";

export default function IntelligenceStoryIntro() {
  const [progress, setProgress] = useState(0);

  /*
   * ============================================================
   * SCROLL PROGRESS
   * ============================================================
   *
   * The section is intentionally very tall.
   *
   * The viewport remains pinned with:
   *
   * sticky top-0 h-screen
   *
   * This means the user scrolls through a cinematic timeline
   * instead of simply watching the page move upward.
   * ============================================================
   */

  useEffect(() => {
    let raf = 0;

    const update = () => {
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

      if (scrollDistance <= 0) return;

      const rawProgress =
        -rect.top / scrollDistance;

      const nextProgress =
        Math.min(
          Math.max(rawProgress, 0),
          1
        );

      setProgress(nextProgress);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);

      raf =
        requestAnimationFrame(update);
    };

    window.addEventListener(
      "scroll",
      onScroll,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      onScroll
    );

    update();

    return () => {
      cancelAnimationFrame(raf);

      window.removeEventListener(
        "scroll",
        onScroll
      );

      window.removeEventListener(
        "resize",
        onScroll
      );
    };
  }, []);

  /*
   * ============================================================
   * HELPERS
   * ============================================================
   */

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

  /*
   * Smoothstep.
   *
   * Makes animation start and stop gently.
   */
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

  /*
   * ============================================================
   * STORY TIMELINE
   * ============================================================
   *
   * 0%   → 28%
   * HERO HOLD
   *
   * 28%  → 58%
   * CIRCLE WIPE
   *
   * 58%  → 68%
   * CINEMATIC PAUSE
   *
   * 68%  → 76%
   * AI MESSAGE FADE IN
   *
   * 76%  → 94%
   * AI MESSAGE HOLD
   *
   * 94%  → 100%
   * AI MESSAGE FADE OUT
   *
   * ============================================================
   */

  /*
   * ============================================================
   * CIRCLE WIPE
   * ============================================================
   *
   * The circle does absolutely no physical movement.
   *
   * Only the visible portion changes.
   */

  const circleProgress =
    ease(
      clamp(
        (progress - 0.28) /
          0.30
      )
    );

  const wipeAngle =
    circleProgress * 360;

  /*
   * ============================================================
   * CENTER TEXT FADE
   * ============================================================
   */

  const centerFade =
    ease(
      clamp(
        (progress - 0.32) /
          0.20
      )
    );

  /*
   * ============================================================
   * AI MESSAGE
   * ============================================================
   *
   * IMPORTANT:
   *
   * This is intentionally separated into:
   *
   * FADE IN
   * HOLD
   * FADE OUT
   *
   * so the message doesn't disappear immediately.
   * ============================================================
   */

  let aiOpacity = 0;

  /*
   * ------------------------------------------------------------
   * FADE IN
   *
   * 68% → 76%
   * ------------------------------------------------------------
   */

  if (
    progress >= 0.68 &&
    progress < 0.76
  ) {
    aiOpacity =
      ease(
        (progress - 0.68) /
          0.08
      );
  }

  /*
   * ------------------------------------------------------------
   * HOLD
   *
   * 76% → 94%
   *
   * The message remains fully visible.
   * ------------------------------------------------------------
   */

  if (
    progress >= 0.76 &&
    progress < 0.94
  ) {
    aiOpacity = 1;
  }

  /*
   * ------------------------------------------------------------
   * FADE OUT
   *
   * 94% → 100%
   * ------------------------------------------------------------
   */

  if (progress >= 0.94) {
    aiOpacity =
      1 -
      ease(
        (progress - 0.94) /
          0.06
      );
  }

  /*
   * ============================================================
   * FINAL CIRCLE EXIT
   * ============================================================
   *
   * Circle remains gone after the wipe.
   * It only gets a very subtle final fade at the end.
   */

  const finalProgress =
    ease(
      clamp(
        (progress - 0.96) /
          0.04
      )
    );

  /*
   * ============================================================
   * CINEMATIC BACKGROUND
   * ============================================================
   *
   * The background does NOT jump from dark to white.
   *
   * It gradually evolves:
   *
   * 0%   Deep Navy
   * 20%  Dark Blue
   * 40%  Deep Teal
   * 60%  Emerald Teal
   * 78%  Dark/Medium Teal
   * 92%  Soft Blue
   * 100% Very Light
   *
   * Because the story is 500vh tall, these transitions
   * happen slowly in actual scrolling.
   * ============================================================
   */

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
      position: 0.20,
      r: 12,
      g: 31,
      b: 48,
    },

    {
      position: 0.40,
      r: 9,
      g: 49,
      b: 58,
    },

    {
      position: 0.60,
      r: 7,
      g: 68,
      b: 67,
    },

    {
      position: 0.78,
      r: 10,
      g: 79,
      b: 75,
    },

    {
      position: 0.92,
      r: 76,
      g: 119,
      b: 126,
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
        colorStops.length - 1;
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
          (p -
            current.position) /
          (next.position -
            current.position);

        const eased =
          ease(localProgress);

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

    return "rgb(247, 250, 252)";
  };

  const backgroundColor =
    getBackgroundColor(
      progress
    );

  /*
   * ============================================================
   * BACKGROUND GLOW
   * ============================================================
   *
   * Keep the green glow visible for most of the cinematic
   * section and slowly reduce it near the end.
   * ============================================================
   */

  const glowOpacity =
    progress < 0.80
      ? 0.82
      : 0.82 -
        ((progress - 0.80) /
          0.20) *
          0.62;

  /*
   * ============================================================
   * AI TEXT COLORS
   * ============================================================
   *
   * Keep the message white while the background is dark.
   *
   * Near the very end, it transitions toward dark navy.
   * ============================================================
   */

  const textTransition =
    ease(
      clamp(
        (progress - 0.90) /
          0.10
      )
    );

  const headingColor =
    `rgb(
      ${Math.round(
        255 -
          236 *
            textTransition
      )},
      ${Math.round(
        255 -
          226 *
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
          125 *
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

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

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

      {/* ======================================================
          PINNED VIEWPORT
         ====================================================== */}

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

        {/* ====================================================
            BACKGROUND RADIAL GLOW
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
              "radial-gradient(circle at 50% 48%, rgba(0,210,160,0.10), transparent 45%)",

            opacity:
              glowOpacity,
          }}
        />

        {/* ====================================================
            LARGE CENTER GLOW
           ==================================================== */}

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

        {/* ====================================================
            STORY CIRCLE
           ==================================================== */}

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
              1 - finalProgress,
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
                CENTER DARK CIRCLE
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

              {/* SPARKLE */}

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

              {/* SUBTITLE */}

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

        {/* ====================================================
            AI MESSAGE
           ==================================================== */}

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

            {/* ==================================================
                HEADING
               ================================================== */}

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

            {/* ==================================================
                FIRST DESCRIPTION
               ================================================== */}

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

            {/* ==================================================
                SECOND DESCRIPTION
               ================================================== */}

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
              progress < 0.10
                ? 1
                : Math.max(
                    1 -
                      progress * 7,
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

        {/* ====================================================
            VERY SOFT FINAL TRANSITION
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
              finalProgress * 0.10,
          }}
        />

      </div>

    </section>
  );
}
