import { useEffect, useState } from "react";

export default function IntelligenceStoryIntro() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("intelligence-story");

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
   * STORY TIMELINE
   *
   * 0.00 - 0.30
   * Circle remains visible
   *
   * 0.30 - 0.70
   * Circle wipes clockwise
   *
   * 0.60 - 0.85
   * Text appears
   *
   * 0.85 - 1.00
   * Text remains
   */

  const circleProgress = Math.min(
    Math.max((progress - 0.25) / 0.45, 0),
    1
  );

  const textProgress = Math.min(
    Math.max((progress - 0.60) / 0.20, 0),
    1
  );

  const circleOpacity =
    progress >= 0.75
      ? Math.max(1 - (progress - 0.75) * 8, 0)
      : 1;

  const textOpacity = textProgress;

  const textTranslate =
    35 - textProgress * 35;

  const backgroundProgress = Math.min(
    Math.max((progress - 0.55) / 0.20, 0),
    1
  );

  const backgroundColor =
    progress < 0.55
      ? "#202a3b"
      : `rgb(
          ${Math.round(32 + 223 * backgroundProgress)},
          ${Math.round(42 + 213 * backgroundProgress)},
          ${Math.round(59 + 196 * backgroundProgress)}
        )`;

  return (
    <section
      id="intelligence-story"
      className="relative h-[260vh]"
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{
          backgroundColor,
        }}
      >

        {/* =========================
            BACKGROUND GLOW
        ========================== */}

        <div
          className="absolute left-1/2 top-1/2
                     h-[700px] w-[700px]
                     -translate-x-1/2
                     -translate-y-1/2
                     rounded-full
                     blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, rgba(0,210,160,0.18), transparent 65%)",
            opacity: 1 - progress * 0.7,
          }}
        />

        {/* =========================
            CIRCLE LOGO
        ========================== */}

        <div
          className="absolute left-1/2 top-1/2"
          style={{
            opacity: circleOpacity,
            transform: `
              translate(-50%, -50%)
              scale(${1 + progress * 0.08})
            `,
          }}
        >

          <svg
            width="620"
            height="620"
            viewBox="0 0 620 620"
            className="block"
          >

            <defs>

              <linearGradient
                id="dcfIntelligenceGradient"
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
              >

                <stop
                  offset="0%"
                  stopColor="#a3ff63"
                />

                <stop
                  offset="45%"
                  stopColor="#00c98b"
                />

                <stop
                  offset="100%"
                  stopColor="#4dd9d5"
                />

              </linearGradient>

            </defs>

            {/* Dark center */}

            <circle
              cx="310"
              cy="310"
              r="160"
              fill="#202a3b"
            />

            {/* Gradient ring */}

            <circle
              cx="310"
              cy="310"
              r="220"
              fill="none"
              stroke="url(#dcfIntelligenceGradient)"
              strokeWidth="120"
              strokeLinecap="butt"
              strokeDasharray="1382"
              strokeDashoffset={
                1382 * circleProgress
              }
              transform="rotate(-90 310 310)"
            />

            {/* Logo text */}

            <text
              x="310"
              y="330"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="58"
              fontWeight="400"
              fontFamily="Arial, sans-serif"
            >
              LOGO
            </text>

          </svg>

        </div>

        {/* =========================
            AI MESSAGE
        ========================== */}

        <div
          className="absolute inset-0
                     flex items-center
                     justify-center
                     px-6"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslate}px)`,
          }}
        >

          <div className="max-w-[850px] text-center">

            <h1
              className="text-[46px]
                         leading-[1.05]
                         tracking-[-0.04em]
                         font-semibold
                         md:text-[64px]"
              style={{
                color:
                  progress < 0.75
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
              className="mt-8
                         text-[19px]
                         leading-[1.7]
                         md:text-[23px]"
              style={{
                color:
                  progress < 0.75
                    ? "#cbd5e1"
                    : "#526581",
              }}
            >
              DCF Lab Intelligence helps uncover the
              information behind the numbers.
            </p>

            <p
              className="mt-2
                         text-[19px]
                         leading-[1.7]
                         md:text-[23px]"
              style={{
                color:
                  progress < 0.75
                    ? "#cbd5e1"
                    : "#526581",
              }}
            >
              You remain in control of the assumptions
              that drive valuation.
            </p>

          </div>

        </div>

        {/* =========================
            SCROLL INDICATOR
        ========================== */}

        <div
          className="absolute bottom-10
                     left-1/2
                     -translate-x-1/2
                     text-center"
          style={{
            opacity: Math.max(
              1 - progress * 5,
              0
            ),
          }}
        >

          <div
            className="text-[11px]
                       uppercase
                       tracking-[0.25em]"
            style={{
              color: "#94a3b8",
            }}
          >
            Scroll to explore
          </div>

          <div
            className="mx-auto
                       mt-3
                       h-8
                       w-[1px]"
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
