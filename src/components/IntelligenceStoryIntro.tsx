import { useEffect, useState } from "react";

export default function IntelligenceStoryIntro() {
  const [progress, setProgress] = useState(0);

  /*
   * ============================================================
   * SCROLL PROGRESS
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

      if (totalScroll <= 0) {
        setProgress(0);
        return;
      }

      const currentScroll = -rect.top;

      const nextProgress = Math.min(
        Math.max(currentScroll / totalScroll, 0),
        1
      );

      setProgress(nextProgress);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /*
   * ============================================================
   * STORY TIMELINE
   * ============================================================
   *
   * 0.00 → 0.18
   * Initial Intelligence circle
   *
   * 0.18 → 0.58
   * Center text fades
   * Circle wipes clockwise
   *
   * 0.58 → 0.68
   * Circle completes transition
   *
   * 0.68 → 0.80
   * AI message appears
   *
   * 0.82 → 1.00
   * Story exits
   * ============================================================
   */

  const centerTextProgress = Math.min(
    Math.max(
      (progress - 0.18) / 0.4,
      0
    ),
    1
  );

  const circleProgress = Math.min(
    Math.max(
      (progress - 0.18) / 0.4,
      0
    ),
    1
  );

  const wipeAngle =
    circleProgress * 360;

  const textProgress = Math.min(
    Math.max(
      (progress - 0.68) / 0.12,
      0
    ),
    1
  );

  const exitProgress = Math.min(
    Math.max(
      (progress - 0.82) / 0.18,
      0
    ),
    1
  );

  const backgroundProgress = Math.min(
    Math.max(
      (progress - 0.7) / 0.3,
      0
    ),
    1
  );

  /*
   * ============================================================
   * BACKGROUND COLOR
   * ============================================================
   */

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
    <section
      id="intelligence-story"
      className="
        relative
        m-0
        h-[280vh]
        w-full
        max-w-full
        overflow-x-hidden
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
          w-full
          max-w-full
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
            h-[450px]
            w-[450px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            blur-[70px]

            min-[390px]:h-[500px]
            min-[390px]:w-[500px]

            sm:h-[650px]
            sm:w-[650px]
            sm:blur-[90px]

            lg:h-[750px]
            lg:w-[750px]
            lg:blur-[100px]
          "
          style={{
            background:
              "radial-gradient(circle, rgba(0,210,160,0.16), transparent 68%)",
            opacity:
              1 - progress * 0.85,
          }}
        />

        {/* ======================================================
            INTELLIGENCE CIRCLE

            IMPORTANT:
            This remains FIXED so the scroll-driven animation
            continues working.

            Mobile:
            starts below Header + Navigation.

            Desktop:
            returns to the original upper position.
            ====================================================== */}

        <div
          className="
            pointer-events-none
            fixed
            left-1/2
            top-[435px]
            z-[20]
            -translate-x-1/2

            min-[390px]:top-[440px]

            sm:top-[155px]

            md:top-[165px]

            lg:top-[150px]
          "
          style={{
            opacity:
              1 - exitProgress,
          }}
        >
          {/* ====================================================
              RESPONSIVE CIRCLE
              ==================================================== */}

          <div
            className="
              relative
              h-[290px]
              w-[290px]

              min-[390px]:h-[310px]
              min-[390px]:w-[310px]

              sm:h-[380px]
              sm:w-[380px]

              md:h-[440px]
              md:w-[440px]

              lg:h-[520px]
              lg:w-[520px]
            "
          >
            {/* ==================================================
                OUTER CIRCLE WIPE
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
                px-2
                text-center
              "
              style={{
                opacity:
                  1 - centerTextProgress,
              }}
            >
              {/* =================================================
                  SPARKLE
                  ================================================= */}

              <div
                className="
                  mb-1
                  text-[16px]
                  leading-none
                  text-emerald-400

                  min-[390px]:text-[18px]

                  sm:mb-2
                  sm:text-[22px]

                  md:text-[25px]
                "
              >
                ✦
              </div>

              {/* =================================================
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
                    text-[19px]
                    font-bold
                    text-white

                    min-[390px]:text-[21px]

                    sm:text-[28px]

                    md:text-[34px]

                    lg:text-[43px]
                  "
                >
                  DCF Lab
                </span>

                <span
                  className="
                    text-[19px]
                    font-bold
                    text-emerald-400

                    min-[390px]:text-[21px]

                    sm:text-[28px]

                    md:text-[34px]

                    lg:text-[43px]
                  "
                >
                  Intelligence
                </span>
              </div>

              {/* =================================================
                  SUBTITLE
                  ================================================= */}

              <div
                className="
                  mt-1
                  text-[7px]
                  leading-[1.35]
                  text-slate-300

                  min-[390px]:text-[8px]

                  sm:mt-2
                  sm:text-[10px]

                  md:text-[11px]

                  lg:text-[13px]
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
            absolute
            inset-0
            z-10
            flex
            items-center
            justify-center
            px-4

            sm:px-6
          "
          style={{
            opacity:
              textProgress *
              (1 - exitProgress * 0.2),

            transform:
              `translateY(${35 - textProgress * 35}px)`,
          }}
        >
          <div
            className="
              w-full
              max-w-[850px]
              text-center
            "
          >
            {/* =================================================
                MAIN MESSAGE
                ================================================= */}

            <h1
              className="
                text-[34px]
                font-semibold
                leading-[1.02]
                tracking-[-0.045em]

                min-[390px]:text-[38px]

                sm:text-[48px]

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
              </span>{" "}
              <span
                style={{
                  color: "#00bd87",
                }}
              >
                You decide.
              </span>
            </h1>

            {/* =================================================
                FIRST DESCRIPTION
                ================================================= */}

            <p
              className="
                mx-auto
                mt-5
                max-w-[700px]
                text-[14px]
                leading-[1.6]

                min-[390px]:text-[15px]

                sm:mt-8
                sm:text-[18px]

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

            {/* =================================================
                SECOND DESCRIPTION
                ================================================= */}

            <p
              className="
                mx-auto
                mt-2
                max-w-[700px]
                text-[14px]
                leading-[1.6]

                min-[390px]:text-[15px]

                sm:text-[18px]

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
            ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            bottom-[12%]
            z-[100]
            -translate-x-1/2
            text-center

            sm:top-[82%]
            sm:bottom-auto
          "
          style={{
            opacity:
              Math.max(
                1 - progress,
                0
              ),
          }}
        >
          <div
            className="
              whitespace-nowrap
              text-[9px]
              font-medium
              uppercase
              tracking-[0.2em]

              sm:text-[12px]
              sm:tracking-[0.25em]
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
              mt-2
              h-6
              w-[2px]

              sm:mt-3
              sm:h-8
            "
            style={{
              background:
                "linear-gradient(to bottom, #00c98b, transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
