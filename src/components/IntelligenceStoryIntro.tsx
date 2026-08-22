import { useEffect, useState } from "react";

export default function IntelligenceStoryIntro() {
  const [progress, setProgress] = useState(0);

  /*
   * ============================================================
   * SCROLL PROGRESS
   * ============================================================
   *
   * The entire story is one long scroll timeline.
   *
   * The viewport stays pinned.
   * The visual elements animate inside it.
   *
   * ============================================================
   */

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const section = document.getElementById(
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

      const nextProgress = Math.min(
        Math.max(rawProgress, 0),
        1
      );

      setProgress(nextProgress);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(update);
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
   * Smoothstep easing.
   *
   * Makes all transitions feel cinematic rather than linear.
   */
  const smoothStep = (
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
   * 0.00 → 0.20
   * Initial hero circle
   *
   * 0.20 → 0.58
   * Circle wipes clockwise
   *
   * 0.58 → 0.68
   * Cinematic pause
   *
   * 0.68 → 0.84
   * AI message appears
   *
   * 0.84 → 1.00
   * Background continues changing
   * Story gently exits
   *
   * ============================================================
   */

  /*
   * Circle wipe
   */

  const circleProgress = smoothStep(
    clamp(
      (progress - 0.20) /
        0.38
    )
  );

  const wipeAngle =
    circleProgress * 360;

  /*
   * Center text fades while circle wipes.
   */

  const centerFade = smoothStep(
    clamp(
      (progress - 0.20) /
        0.25
    )
  );

  /*
   * AI message.
   */

  const aiProgress = smoothStep(
    clamp(
      (progress - 0.66) /
        0.16
    )
  );

  /*
   * Final exit.
   */

  const finalProgress = smoothStep(
    clamp(
      (progress - 0.91) /
        0.09
    )
  );

  /*
   * ============================================================
   * CINEMATIC BACKGROUND
   * ============================================================
   *
   * The background slowly moves through multiple colors.
   *
   * 0%
   * Deep Navy
   *
   * 22%
   * Deep Blue
   *
   * 45%
   * Teal
   *
   * 65%
   * Emerald / Teal
   *
   * 82%
   * Soft Blue
   *
   * 100%
   * Very Light
   *
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
      position: 0.22,
      r: 12,
      g: 34,
      b: 51,
    },

    {
      position: 0.45,
      r: 9,
      g: 58,
      b: 63,
    },

    {
      position: 0.65,
      r: 7,
      g: 91,
      b: 79,
    },

    {
      position: 0.82,
      r: 71,
      g: 126,
      b: 132,
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
    const currentProgress =
      clamp(value);

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
        currentProgress >=
          current.position &&
        currentProgress <=
          next.position
      ) {
        const range =
          next.position -
          current.position;

        const localProgress =
          (currentProgress -
            current.position) /
          range;

        const eased =
          smoothStep(
            localProgress
          );

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
    getBackgroundColor(
      progress
    );

  /*
   * ============================================================
   * BACKGROUND CONTRAST
   * ============================================================
   *
   * The glow becomes weaker as the background becomes lighter.
   */

  const glowOpacity =
    Math.max(
      0.85 -
        progress * 0.72,
      0.10
    );

  /*
   * ============================================================
   * TEXT COLOR TRANSITION
   * ============================================================
   *
   * When the background becomes lighter,
   * white text would become difficult to read.
   *
   * So the AI message slowly changes from:
   *
   * white → dark navy
   *
   * ============================================================
   */

  const textColorProgress =
    smoothStep(
      clamp(
        (progress - 0.76) /
          0.20
      )
    );

  const headingColor =
    `rgb(
      ${Math.round(
        255 -
          238 *
            textColorProgress
      )},
      ${Math.round(
        255 -
          225 *
            textColorProgress
      )},
      ${Math.round(
        255 -
          205 *
            textColorProgress
      )}
    )`;

  const descriptionColor =
    `rgb(
      ${Math.round(
        210 -
          125 *
            textColorProgress
      )},
      ${Math.round(
        220 -
          115 *
            textColorProgress
      )},
      ${Math.round(
        230 -
          105 *
            textColorProgress
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
        h-[240vh]
        m-0
        p-0
      "
    >
      {/* ========================================================
          PINNED STORY VIEWPORT
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
            CINEMATIC BACKGROUND GLOW
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
              "radial-gradient(circle at 50% 45%, rgba(0,210,160,0.10), transparent 45%)",

            opacity:
              glowOpacity,
          }}
        />

        {/* ======================================================
            LARGE SOFT GREEN GLOW
           ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[760px]
            w-[760px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            blur-[120px]
          "
          style={{
            background:
              "radial-gradient(circle, rgba(0,210,160,0.20), transparent 68%)",

            opacity:
              glowOpacity,
          }}
        />

        {/* ======================================================
            MAIN STORY CIRCLE

            The circle itself NEVER moves.

            It stays exactly in the center.

            Only:
            - mask
            - center opacity
            - final opacity
            change.
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
              1 - finalProgress,
          }}
        >

          {/* ====================================================
              CIRCLE
             ==================================================== */}

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
                INNER DARK CIRCLE
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

        {/* ======================================================
            AI MESSAGE
           ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-30
            flex
            items-center
            justify-center
            px-6
          "
          style={{
            opacity:
              aiProgress *
              (1 - finalProgress),
          }}
        >

          <div
            className="
              w-full
              max-w-[900px]
              text-center
            "
          >

            {/* ==================================================
                MAIN MESSAGE
               ================================================== */}

            <h1
              className="
                text-[clamp(42px,6vw,82px)]
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
                DESCRIPTION
               ================================================== */}

            <p
              className="
                mx-auto
                mt-8
                max-w-[720px]
                text-[clamp(17px,2vw,23px)]
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
                mt-3
                max-w-[720px]
                text-[clamp(17px,2vw,23px)]
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
              Math.max(
                1 - progress * 5,
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
              tracking-[0.3em]
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
            FINAL SOFT TRANSITION
           ======================================================

           IMPORTANT:

           This is NOT a hard white overlay.

           The actual background has already been gradually
           moving toward the light color.

           This overlay is only a tiny final softening layer.
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
              finalProgress * 0.18,
          }}
        />

      </div>
    </section>
  );
}
