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
   * ============================================================
   */

  const centerTextProgress = Math.min(
    Math.max((progress - 0.18) / 0.4, 0),
    1
  );

  const circleProgress = Math.min(
    Math.max((progress - 0.18) / 0.4, 0),
    1
  );

  const wipeAngle = circleProgress * 360;

  const textProgress = Math.min(
    Math.max((progress - 0.68) / 0.12, 0),
    1
  );

  const exitProgress = Math.min(
    Math.max((progress - 0.82) / 0.18, 0),
    1
  );

  const backgroundProgress = Math.min(
    Math.max((progress - 0.7) / 0.3, 0),
    1
  );

  const backgroundColor = `rgb(
    ${Math.round(16 + 235 * backgroundProgress)},
    ${Math.round(26 + 232 * backgroundProgress)},
    ${Math.round(43 + 212 * backgroundProgress)}
  )`;

  return (
    <section
      id="intelligence-story"
      className="
        relative
        m-0
        min-h-[280vh]
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
          min-h-[620px]
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
            ======================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            z-0
            h-[500px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            blur-[80px]
            sm:h-[650px]
            sm:w-[650px]
            sm:blur-[100px]
            lg:h-[750px]
            lg:w-[750px]
          "
          style={{
            background:
              "radial-gradient(circle, rgba(0,210,160,0.16), transparent 68%)",
            opacity: 1 - progress * 0.85,
          }}
        />

        {/* ======================================================
            DCF LAB INTELLIGENCE CIRCLE

            IMPORTANT:
            - NO fixed positioning
            - stays inside story viewport
            - automatically scales on mobile
            - cannot overlap TopNavigation
        ======================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[24px]
            z-[20]
            w-full
            -translate-x-1/2
            sm:top-[35px]
            lg:top-[55px]
          "
          style={{
            opacity: 1 - exitProgress,
          }}
        >
          {/* ====================================================
              RESPONSIVE CIRCLE
              ==================================================== */}

          <div
            className="
              relative
              mx-auto
              h-[300px]
              w-[300px]
              sm:h-[360px]
              sm:w-[360px]
              md:h-[440px]
              md:w-[440px]
              lg:h-[520px]
              lg:w-[520px]
            "
          >
            {/* ==================================================
                CLOCKWISE OUTER CIRCLE WIPE
                =================================================== */}

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
                =================================================== */}

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
                opacity: 1 - centerTextProgress,
              }}
            >
              {/* SPARKLE */}

              <div
                className="
                  mb-2
                  text-[18px]
                  leading-none
                  text-emerald-400
                  sm:mb-3
                  sm:text-[22px]
                  md:text-[25px]
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
                  leading-[1.02]
                  tracking-[-0.04em]
                "
              >
                <span
                  className="
                    text-[24px]
                    font-bold
                    text-white
                    sm:text-[29px]
                    md:text-[36px]
                    lg:text-[43px]
                  "
                >
                  DCF Lab
                </span>

                <span
                  className="
                    text-[24px]
                    font-bold
                    text-emerald-400
                    sm:text-[29px]
                    md:text-[36px]
                    lg:text-[43px]
                  "
                >
                  Intelligence
                </span>
              </div>

              {/* SUBTITLE */}

              <div
                className="
                  mt-2
                  text-[8px]
                  leading-[1.35]
                  text-slate-300
                  sm:mt-3
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
            ======================================================= */}

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

            transform: `
              translateY(
                ${35 - textProgress * 35}px
              )
            `,
          }}
        >
          <div
            className="
              w-full
              max-w-[850px]
              text-center
            "
          >
            {/* MAIN MESSAGE */}

            <h1
              className="
                text-[36px]
                font-semibold
                leading-[1.02]
                tracking-[-0.045em]
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
              <span>AI reads.</span>{" "}
              <span style={{ color: "#00bd87" }}>
                You decide.
              </span>
            </h1>

            {/* FIRST DESCRIPTION */}

            <p
              className="
                mx-auto
                mt-6
                max-w-[700px]
                text-[15px]
                leading-[1.6]
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

            {/* SECOND DESCRIPTION */}

            <p
              className="
                mx-auto
                mt-2
                max-w-[700px]
                text-[15px]
                leading-[1.6]
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
            ======================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-[12%]
            left-1/2
            z-[100]
            -translate-x-1/2
            text-center
            sm:top-[82%]
            sm:bottom-auto
          "
          style={{
            opacity: Math.max(1 - progress, 0),
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
