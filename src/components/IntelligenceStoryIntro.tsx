import { useEffect, useState } from "react";

export default function IntelligenceStoryIntro() {
  const [progress, setProgress] = useState(0);

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
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /*
   * ============================================
   * STORY TIMELINE
   * ============================================
   *
   * 0.00 - 0.20
   * Logo fully visible
   *
   * 0.20 - 0.58
   * Logo wipes clockwise
   *
   * 0.40 - 0.72
   * Message appears
   *
   * 0.72 - 1.00
   * Message remains while story exits
   */

  const circleProgress = Math.min(
    Math.max(
      (progress - 0.18) / 0.40,
      0
    ),
    1
  );

  /*
   * 0 = no wipe
   * 360 = completely wiped
   */
  const wipeAngle =
    circleProgress * 360;

  /*
   * Text fade in
   */
  const textProgress = Math.min(
    Math.max(
      (progress - 0.38) / 0.25,
      0
    ),
    1
  );

  /*
   * Final story fade
   */
  const exitProgress = Math.min(
    Math.max(
      (progress - 0.82) / 0.18,
      0
    ),
    1
  );

  /*
   * Background transition:
   * dark cinematic background →
   * light background matching
   * the actual DCF page.
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
    <section
      id="intelligence-story"
      className="relative h-[280vh]"
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          backgroundColor,
        }}
      >

        {/* ==========================================
            BACKGROUND GLOW
        ========================================== */}

        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[750px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(0,210,160,0.16), transparent 68%)",
            opacity:
              1 - progress * 0.85,
          }}
        />

        {/* ==========================================
            REAL DCF LOGO
        ========================================== */}

        <div
          className="absolute left-1/2 top-1/2 z-20"
          style={{
            opacity:
              1 - exitProgress,

            transform: `
              translate(-50%, -50%)
              scale(${1 + progress * 0.05})
            `,
          }}
        >

          {/* 
             The mask starts at 12 o'clock
             and wipes clockwise.
          */}

          <div
            className="relative h-[min(590px,72vw)] w-[min(590px,72vw)] overflow-hidden rounded-full"
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
              className="block h-full w-full object-contain"
            />

          </div>

        </div>

        {/* ==========================================
            AI MESSAGE
        ========================================== */}

        <div
          className="absolute inset-0 z-10 flex items-center justify-center px-6"
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

          <div className="w-full max-w-[850px] text-center">

            <h1
              className="font-semibold leading-[1.02] tracking-[-0.045em] text-[48px] md:text-[72px]"
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

            <p
              className="mx-auto mt-8 max-w-[700px] text-[18px] leading-[1.7] md:text-[22px]"
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
              className="mx-auto mt-2 max-w-[700px] text-[18px] leading-[1.7] md:text-[22px]"
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

        {/* ==========================================
            SCROLL INDICATOR
        ========================================== */}

        <div
          className="absolute bottom-10 left-1/2 z-30 -translate-x-1/2 text-center"
          style={{
            opacity:
              Math.max(
                1 - progress * 5,
                0
              ),
          }}
        >

          <div
            className="text-[11px] uppercase tracking-[0.25em]"
            style={{
              color:
                "rgba(255,255,255,0.60)",
            }}
          >
            Scroll to explore
          </div>

          <div
            className="mx-auto mt-3 h-8 w-[1px]"
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
