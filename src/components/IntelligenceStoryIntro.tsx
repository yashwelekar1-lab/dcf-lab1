import { useEffect, useState } from "react";

export default function IntelligenceStoryIntro() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const section = document.getElementById("intelligence-story");

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

    const onScroll = () => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("resize", onScroll);

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

  const clamp = (
    value: number,
    min = 0,
    max = 1
  ) => Math.min(Math.max(value, min), max);

  /*
   * ============================================================
   * STORY TIMELINE
   *
   * 0.00 - 0.25
   * Hero circle
   *
   * 0.25 - 0.62
   * Circle wipes away
   *
   * 0.62 - 0.70
   * Empty cinematic pause
   *
   * 0.70 - 0.86
   * AI message
   *
   * 0.86 - 1.00
   * Smooth transition to page
   * ============================================================
   */

  const circleProgress = clamp(
    (progress - 0.25) / 0.37
  );

  const centerFade = clamp(
    (progress - 0.25) / 0.25
  );

  const aiProgress = clamp(
    (progress - 0.68) / 0.14
  );

  const finalProgress = clamp(
    (progress - 0.90) / 0.10
  );

  /*
   * Circle remains physically stationary.
   */
  const wipeAngle =
    circleProgress * 360;

  /*
   * Cinematic dark background.
   *
   * Stay dark for almost the entire story.
   * Do NOT suddenly turn white.
   */
  const bgFade = clamp(
    (progress - 0.90) / 0.10
  );

  const backgroundColor = `rgb(
    ${Math.round(14 + 241 * bgFade)},
    ${Math.round(24 + 237 * bgFade)},
    ${Math.round(40 + 215 * bgFade)}
  )`;

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
          PINNED CINEMATIC VIEW
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
            BACKGROUND
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
              "radial-gradient(circle at 50% 50%, rgba(0,210,160,0.09), transparent 42%)",
          }}
        />

        {/* ======================================================
            SOFT GLOW
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
              1 - progress * 0.9,
          }}
        />

        {/* ======================================================
            MAIN STORY CIRCLE

            THIS NEVER MOVES.

            Only:
            - wipe
            - opacity
            - center text opacity
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
                WebkitMaskImage: `conic-gradient(
                  from 0deg,
                  transparent 0deg ${wipeAngle}deg,
                  black ${wipeAngle}deg 360deg
                )`,

                maskImage: `conic-gradient(
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
                CENTER
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
                "
              >
                <span
                  className="
                    text-[clamp(28px,4vw,48px)]
                    font-bold
                    tracking-[-0.045em]
                    text-white
                  "
                >
                  DCF Lab
                </span>

                <span
                  className="
                    text-[clamp(28px,4vw,48px)]
                    font-bold
                    tracking-[-0.045em]
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

            It appears without moving the page.
           ====================================================== */}

        <div
          className="
            absolute
            inset-0
            z-30
            flex
            items-center
            justify-center
            px-6
            pointer-events-none
          "
          style={{
            opacity:
              aiProgress *
              (1 - finalProgress),
          }}
        >
          <div
            className="
              max-w-[900px]
              text-center
            "
          >
            <h1
              className="
                text-[clamp(42px,6vw,82px)]
                font-semibold
                leading-[1]
                tracking-[-0.055em]
              "
            >
              <span className="text-white">
                AI reads.
              </span>{" "}
              <span className="text-emerald-400">
                You decide.
              </span>
            </h1>

            <p
              className="
                mx-auto
                mt-8
                max-w-[720px]
                text-[clamp(17px,2vw,23px)]
                leading-[1.65]
                text-slate-300
              "
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
                text-slate-300
              "
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
            absolute
            bottom-10
            left-1/2
            z-50
            -translate-x-1/2
            text-center
            pointer-events-none
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
            FINAL TRANSITION

            This prevents the abrupt dark → white jump.
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
              finalProgress * 0.96,
          }}
        />
      </div>
    </section>
  );
}
