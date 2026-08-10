import { useEffect, useState } from "react";

export default function IntelligenceStoryIntro() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
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

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  /* ============================================================
     STORY PROGRESS
     ============================================================ */

  const centerFade = Math.min(
    Math.max((progress - 0.18) / 0.40, 0),
    1
  );

  const wipeProgress = Math.min(
    Math.max((progress - 0.18) / 0.40, 0),
    1
  );

  const wipeAngle = wipeProgress * 360;

  const messageProgress = Math.min(
    Math.max((progress - 0.68) / 0.12, 0),
    1
  );

  const exitProgress = Math.min(
    Math.max((progress - 0.82) / 0.18, 0),
    1
  );

  /* ============================================================
     BACKGROUND
     ============================================================ */

  const backgroundProgress = Math.min(
    Math.max((progress - 0.70) / 0.30, 0),
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
      className="relative w-full h-[280vh]"
    >
      {/* ========================================================
          STORY VIEWPORT

          IMPORTANT:
          - sticky, NOT fixed
          - stays inside this section
          - cannot cover Calculator/Saved Analysis
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
            BACKGROUND GLOW
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
            opacity: 1 - progress * 0.85,
          }}
        />

        {/* ======================================================
            STATIC CIRCLE

            IMPORTANT:
            The circle has NO:
            - scale animation
            - translateY animation
            - scroll-based top
            ====================================================== */}

        <div
          className="
            absolute
            left-1/2
            top-1/2
            z-10
            -translate-x-1/2
            -translate-y-1/2
          "
          style={{
            opacity: 1 - exitProgress,
          }}
        >
          <div
            className="
              relative
              h-[min(530px,72vw)]
              w-[min(530px,72vw)]
            "
          >
            {/* ==================================================
                CIRCLE WIPE

                ONLY THE MASK CHANGES WITH SCROLL
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
                opacity: 1 - centerFade,
              }}
            >
              {/* SPARKLE */}

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

              {/* SUBTITLE */}

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

            Appears in place.
            NO translateY.
            ====================================================== */}

        <div
          className="
            absolute
            inset-0
            z-20
            flex
            items-center
            justify-center
            px-6
          "
          style={{
            opacity:
              messageProgress *
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
              <span>AI reads.</span>{" "}
              <span className="text-[#00bd87]">
                You decide.
              </span>
            </h1>

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
            ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[82%]
            z-30
            -translate-x-1/2
            -translate-y-1/2
            text-center
          "
          style={{
            opacity: Math.max(
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
                "linear-gradient(to bottom, #00c98b, transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
