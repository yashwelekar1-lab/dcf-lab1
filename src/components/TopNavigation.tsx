import { useEffect, useState } from "react";

export default function IntelligenceStoryIntro() {
  const [progress, setProgress] = useState(0);

  /*
   * ============================================================
   * SCROLL PROGRESS
   *
   * The page is allowed to scroll.
   * The visual storytelling stage itself stays FIXED.
   * ============================================================
   */

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById(
        "intelligence-story"
      );

      if (!section) return;

      const rect = section.getBoundingClientRect();

      const totalScroll =
        section.offsetHeight - window.innerHeight;

      if (totalScroll <= 0) return;

      const currentScroll = -rect.top;

      const value = Math.min(
        Math.max(currentScroll / totalScroll, 0),
        1
      );

      setProgress(value);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
   * ============================================================
   * STORY TIMELINE
   *
   * 0.00 - 0.18
   * Circle + center text visible
   *
   * 0.18 - 0.58
   * Circle wipes IN PLACE
   * Center text fades
   *
   * 0.58 - 0.68
   * Circle completely disappears
   *
   * 0.68 - 0.80
   * AI message appears IN PLACE
   *
   * 0.80 - 1.00
   * Transition to actual page
   * ============================================================
   */

  /*
   * ============================================================
   * CENTER TEXT FADE
   * ============================================================
   */

  const centerTextProgress = Math.min(
    Math.max(
      (progress - 0.18) / 0.40,
      0
    ),
    1
  );

  /*
   * ============================================================
   * CIRCLE WIPE
   *
   * IMPORTANT:
   * The circle NEVER changes position.
   *
   * Only the mask changes.
   * ============================================================
   */

  const circleProgress = Math.min(
    Math.max(
      (progress - 0.18) / 0.40,
      0
    ),
    1
  );

  const wipeAngle = circleProgress * 360;

  /*
   * ============================================================
   * AI MESSAGE APPEARANCE
   * ============================================================
   */

  const textProgress = Math.min(
    Math.max(
      (progress - 0.68) / 0.12,
      0
    ),
    1
  );

  /*
   * ============================================================
   * FINAL STORY FADE
   * ============================================================
   */

  const exitProgress = Math.min(
    Math.max(
      (progress - 0.82) / 0.18,
      0
    ),
    1
  );

  /*
   * ============================================================
   * BACKGROUND TRANSITION
   * ============================================================
   */

  const backgroundProgress = Math.min(
    Math.max(
      (progress - 0.70) / 0.30,
      0
    ),
    1
  );

  const backgroundColor = `rgb(
    ${Math.round(
      16 + 235 * backgroundProgress
    )},
    ${Math.round(
      26 + 232 * backgroundProgress
    )},
    ${Math.round(
      43 + 212 * backgroundProgress
    )}
  )`;

  return (
    /*
     * ==========================================================
     * STORY TIMELINE
     *
     * 280vh gives the user enough scroll distance.
     *
     * IMPORTANT:
     * Nothing visual is positioned relative to this scrolling
     * height.
     * ==========================================================
     */

    <section
      id="intelligence-story"
      className="
        relative
        h-[280vh]
      "
    >

      {/* ========================================================
          INVISIBLE SCROLL AREA

          This controls the timeline only.
      ======================================================== */}

      <div
        className="
          relative
          h-screen
          w-full
        "
      />

      {/* ========================================================
          FIXED STORYTELLING STAGE

          THIS IS THE MAIN CHANGE.

          The circle is now fixed to the viewport.

          It cannot move upward when the page scrolls.
      ======================================================== */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          z-20
          overflow-hidden
        "
        style={{
          backgroundColor,
        }}
      >

        {/* ======================================================
            BACKGROUND GLOW

            Fixed to the viewport.
            Only opacity changes.
        ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[750px]
            w-[750px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            blur-[100px]
          "
          style={{
            background:
              "radial-gradient(circle, rgba(0,210,160,0.16), transparent 68%)",

            opacity:
              1 - progress * 0.85,
          }}
        />

        {/* ======================================================
            FIXED CIRCLE CONTAINER

            No top animation.
            No translateY animation.
            No scale animation.

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
            opacity:
              1 - exitProgress,
          }}
        >

          {/* ====================================================
              OUTER CIRCLE
          ==================================================== */}

          <div
            className="
              relative
              h-[min(530px,72vw)]
              w-[min(530px,72vw)]
            "
          >

            {/* ==================================================
                CIRCLE WIPE

                ONLY THIS CHANGES WITH SCROLL.

                The physical position of the circle does not.
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

                Position NEVER changes.
                Only opacity changes.
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
                  1 - centerTextProgress,
              }}
            >

              {/* ================================================
                  SPARKLE
              ================================================= */}

              <div
                className="
                  mb-3
                  text-[25px]
                  leading-none
                  text-emerald-400
                "
              >
                ✦
              </div>

              {/* ================================================
                  TITLE
              ================================================= */}

              <div
                className="
                  flex
                  flex-col
                  items-center
                  leading-[1.02]
                  tracking-[-0.04em]
                "
              >

                <span
                  className="
                    text-[clamp(26px,3.4vw,43px)]
                    font-bold
                    text-white
                  "
                >
                  DCF Lab
                </span>

                <span
                  className="
                    text-[clamp(26px,3.4vw,43px)]
                    font-bold
                    text-emerald-400
                  "
                >
                  Intelligence
                </span>

              </div>

              {/* ================================================
                  SUBTITLE
              ================================================= */}

              <div
                className="
                  mt-3
                  text-[clamp(9px,1vw,13px)]
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

            FIXED IN THE SAME VIEWPORT.

            No translateY animation.
            It simply fades in.
        ====================================================== */}

        <div
          className="
            absolute
            inset-0
            z-10
            flex
            items-center
            justify-center
            px-6
          "
          style={{
            opacity:
              textProgress *
              (1 - exitProgress * 0.2),
          }}
        >

          <div
            className="
              w-full
              max-w-[850px]
              text-center
            "
          >

            {/* ==================================================
                MAIN MESSAGE
            ================================================== */}

            <h1
              className="
                font-semibold
                leading-[1.02]
                tracking-[-0.045em]
                text-[48px]
                md:text-[72px]
              "
              style={{
                color:
                  progress < 0.72
                    ? "#ffffff"
                    : "#0b1b38",
              }}
            >

              <span>
                AI reads.
              </span>

              {" "}

              <span
                style={{
                  color: "#00bd87",
                }}
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
                max-w-[700px]
                text-[18px]
                leading-[1.7]
                md:text-[22px]
              "
              style={{
                color:
                  progress < 0.72
                    ? "#cbd5e1"
                    : "#526581",
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
                mt-2
                max-w-[700px]
                text-[18px]
                leading-[1.7]
                md:text-[22px]
              "
              style={{
                color:
                  progress < 0.72
                    ? "#cbd5e1"
                    : "#526581",
              }}
            >
              You remain in control of the assumptions
              that drive valuation.
            </p>

          </div>

        </div>

        {/* ======================================================
            SCROLL INDICATOR

            FIXED.
            Only opacity changes.
        ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[82%]
            z-[100]
            -translate-x-1/2
            -translate-y-1/2
            text-center
          "
          style={{
            opacity:
              Math.max(
                1 - progress * 3,
                0
              ),
          }}
        >

          <div
            className="
              whitespace-nowrap
              text-[12px]
              font-medium
              uppercase
              tracking-[0.25em]
            "
            style={{
              color:
                "rgba(255,255,255,0.85)",
            }}
          >
            Scroll to explore
          </div>

          <div
            className="
              mx-auto
              mt-3
              h-8
              w-[2px]
            "
            style={{
              background:
                "linear-gradient(
                  to bottom,
                  #00c98b,
                  transparent
                )",
            }}
          />

        </div>

      </div>

    </section>
  );
}
