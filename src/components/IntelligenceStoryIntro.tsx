import { useEffect, useState } from "react";

export default function IntelligenceStoryIntro() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const section = document.getElementById("intelligence-story");

      if (!section) return;

      const rect = section.getBoundingClientRect();

      /*
       * The story itself is 300vh tall.
       * We calculate progress only while the story
       * is passing through the viewport.
       */
      const totalScroll =
        section.offsetHeight - window.innerHeight;

      if (totalScroll <= 0) return;

      const currentScroll = -rect.top;

      const nextProgress = Math.min(
        Math.max(currentScroll / totalScroll, 0),
        1
      );

      setProgress(nextProgress);
    };

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  /*
   * ============================================================
   * STORY TIMELINE
   * ============================================================
   *
   * 0.00 → 0.18
   * Circle stays fully visible
   *
   * 0.18 → 0.58
   * Circle wipes clockwise
   * Center text fades
   *
   * 0.58 → 0.68
   * Circle disappears completely
   *
   * 0.68 → 0.82
   * AI message appears
   *
   * 0.82 → 1.00
   * Story fades out
   * Actual Intelligence page appears
   * ============================================================
   */

  const clamp = (
    value: number,
    min = 0,
    max = 1
  ) => Math.min(Math.max(value, min), max);

  /*
   * CENTER TEXT
   */
  const centerTextProgress = clamp(
    (progress - 0.18) / 0.40
  );

  /*
   * OUTER CIRCLE WIPE
   */
  const circleProgress = clamp(
    (progress - 0.18) / 0.40
  );

  const wipeAngle = circleProgress * 360;

  /*
   * AI MESSAGE
   */
  const textProgress = clamp(
    (progress - 0.68) / 0.14
  );

  /*
   * FINAL EXIT
   */
  const exitProgress = clamp(
    (progress - 0.84) / 0.16
  );

  /*
   * BACKGROUND
   *
   * Keep the cinematic dark background.
   * Do NOT transition to white here.
   * Your real page underneath handles its own background.
   */
  const backgroundProgress = clamp(
    (progress - 0.72) / 0.28
  );

  const backgroundColor = `rgb(
    ${Math.round(16 + 8 * backgroundProgress)},
    ${Math.round(26 + 12 * backgroundProgress)},
    ${Math.round(43 + 10 * backgroundProgress)}
  )`;

  return (
    /*
     * ============================================================
     * FULL WIDTH STORY
     *
     * IMPORTANT:
     *
     * w-screen + relative left-1/2 + -translate-x-1/2
     *
     * forces this section to escape any max-width parent.
     *
     * This fixes your current desktop problem where the circle
     * is appearing on the left instead of the center.
     * ============================================================
     */
    <section
      id="intelligence-story"
      className="
        relative
        left-1/2
        w-screen
        -translate-x-1/2
        h-[300vh]
        m-0
        p-0
      "
    >
      {/* ========================================================
          STICKY STORY VIEWPORT
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
            BACKGROUND GLOW
           ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            z-0
            h-[800px]
            w-[800px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            blur-[110px]
          "
          style={{
            background:
              "radial-gradient(circle, rgba(0,210,160,0.18), transparent 68%)",

            opacity:
              1 - progress * 0.9,
          }}
        />

        {/* ======================================================
            STORY CIRCLE

            NEVER fixed.
            NEVER translated by scroll.
            NEVER moved horizontally by progress.

            It stays exactly in the center.
           ====================================================== */}

        <div
          className="
            absolute
            left-1/2
            top-1/2
            z-20
            -translate-x-1/2
            -translate-y-1/2
          "
          style={{
            opacity: 1 - exitProgress,
          }}
        >
          {/* ====================================================
              CIRCLE CONTAINER
             ==================================================== */}

          <div
            className="
              relative
              h-[min(560px,78vw)]
              w-[min(560px,78vw)]
            "
          >
            {/* ==================================================
                OUTER LOGO WIPE

                The physical circle does NOT move.

                Only the conic mask changes.
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
                  absolute
                  inset-0
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
                opacity: 1 - centerTextProgress,
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
                  leading-[1]
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

            Appears AFTER circle disappears.
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
              textProgress *
              (1 - exitProgress),
          }}
        >
          <div
            className="
              w-full
              max-w-[900px]
              text-center
            "
          >
            <h1
              className="
                font-semibold
                leading-[1.02]
                tracking-[-0.05em]
                text-[clamp(42px,6vw,82px)]
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
                leading-[1.7]
                text-slate-300
              "
            >
              DCF Lab Intelligence helps uncover
              the information behind the numbers.
            </p>

            <p
              className="
                mx-auto
                mt-2
                max-w-[720px]
                text-[clamp(17px,2vw,23px)]
                leading-[1.7]
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
            pointer-events-none
            absolute
            bottom-10
            left-1/2
            z-40
            -translate-x-1/2
            text-center
          "
          style={{
            opacity: Math.max(
              1 - progress * 4,
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
              tracking-[0.28em]
              text-white/80
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
