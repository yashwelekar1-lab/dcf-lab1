import { useEffect, useState } from "react";

export default function IntelligenceStoryIntro() {
  const [progress, setProgress] = useState(0);

  /* ============================================================
     SCROLL ENGINE
     ============================================================ */

  useEffect(() => {
    let animationFrame = 0;

    const calculateProgress = () => {
      const section = document.getElementById(
        "intelligence-story"
      );

      if (!section) return;

      const rect = section.getBoundingClientRect();

      const scrollableDistance =
        section.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) {
        setProgress(0);
        return;
      }

      const value =
        -rect.top / scrollableDistance;

      setProgress(
        Math.min(
          Math.max(value, 0),
          1
        )
      );
    };

    const handleScroll = () => {
      cancelAnimationFrame(animationFrame);

      animationFrame =
        requestAnimationFrame(
          calculateProgress
        );
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      calculateProgress
    );

    calculateProgress();

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        calculateProgress
      );
    };
  }, []);

  /* ============================================================
     HELPERS
     ============================================================ */

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

  const smooth = (
    value: number
  ) => {
    const x = clamp(value);

    return (
      x *
      x *
      (3 - 2 * x)
    );
  };

  /* ============================================================
     STORY TIMELINE

     0.00 - 0.30
       Circle completely visible

     0.30 - 0.60
       Circle wipes

     0.60 - 0.68
       Pause

     0.68 - 0.72
       AI fades in

     0.72 - 0.98
       AI fully visible

     0.98 - 1.00
       AI disappears

     ============================================================ */

  /* ============================================================
     CIRCLE WIPE
     ============================================================ */

  const circleProgress = smooth(
    clamp(
      (progress - 0.30) /
        0.30
    )
  );

  const wipeAngle =
    circleProgress * 360;

  /* ============================================================
     CENTER TEXT
     ============================================================ */

  const centerOpacity =
    1 -
    smooth(
      clamp(
        (progress - 0.32) /
          0.20
      )
    );

  /* ============================================================
     AI MESSAGE
     ============================================================ */

  let aiOpacity = 0;

  if (progress < 0.68) {
    aiOpacity = 0;
  } else if (progress < 0.72) {
    aiOpacity =
      smooth(
        (progress - 0.68) /
          0.04
      );
  } else if (progress < 0.98) {
    aiOpacity = 1;
  } else {
    aiOpacity =
      1 -
      smooth(
        (progress - 0.98) /
          0.02
      );
  }

  /* ============================================================
     BACKGROUND COLORS
     ============================================================ */

  type ColorStop = {
    position: number;
    r: number;
    g: number;
    b: number;
  };

  const colors: ColorStop[] = [
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
      g: 48,
      b: 57,
    },
    {
      position: 0.60,
      r: 7,
      g: 67,
      b: 66,
    },
    {
      position: 0.72,
      r: 12,
      g: 79,
      b: 76,
    },
    {
      position: 0.84,
      r: 48,
      g: 103,
      b: 108,
    },
    {
      position: 0.94,
      r: 145,
      g: 173,
      b: 178,
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
      i < colors.length - 1;
      i++
    ) {
      const current =
        colors[i];

      const next =
        colors[i + 1];

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
          smooth(
            localProgress
          );

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

    return "rgb(247,250,252)";
  };

  const backgroundColor =
    getBackgroundColor(
      progress
    );

  /* ============================================================
     BACKGROUND GLOW
     ============================================================ */

  const glowOpacity =
    progress < 0.80
      ? 0.85
      : Math.max(
          0.85 -
            ((progress - 0.80) /
              0.20) *
              0.75,
          0
        );

  /* ============================================================
     AI TEXT COLOR
     ============================================================ */

  const textTransition =
    smooth(
      clamp(
        (progress - 0.94) /
          0.06
      )
    );

  const headingColor =
    `rgb(
      ${Math.round(
        255 -
          235 *
            textTransition
      )},
      ${Math.round(
        255 -
          225 *
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

  /* ============================================================
     CIRCLE EXIT
     ============================================================ */

  const circleExit =
    progress >= 0.96
      ? smooth(
          (progress - 0.96) /
            0.04
        )
      : 0;

  /* ============================================================
     FINAL WHITE OVERLAY
     ============================================================ */

  const whiteOverlay =
    progress >= 0.995
      ? smooth(
          (progress - 0.995) /
            0.005
        )
      : 0;

  /* ============================================================
     RENDER
     ============================================================ */

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
          STICKY VIEWPORT
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
            BACKGROUND GLOW
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
              "radial-gradient(circle at 50% 48%, rgba(0,210,160,0.11), transparent 46%)",
            opacity:
              glowOpacity,
          }}
        />

        {/* ====================================================
            LARGE CENTRAL GLOW
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
            FIXED CIRCLE LAYER

            IMPORTANT:
            This is deliberately fixed to the viewport.

            The circle itself NEVER changes position.

            Only:
              - mask
              - opacity

            change with scroll.
           ==================================================== */}

        <div
          className="
            pointer-events-none
            fixed
            left-1/2
            top-1/2
            z-20
          "
          style={{
            width:
              "min(560px, 76vw)",
            height:
              "min(560px, 76vw)",

            transform:
              "translate(-50%, -50%)",

            opacity:
              1 - circleExit,
          }}
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
              INNER CIRCLE
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
                centerOpacity,
            }}
          >

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

        {/* ====================================================
            AI MESSAGE

            Also viewport locked.
           ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[60]
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
              max-w-[1050px]
              text-center
            "
          >

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
              AI reads.{" "}

              <span
                className="
                  text-emerald-400
                "
              >
                You decide.
              </span>
            </h1>

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
            z-[70]
            -translate-x-1/2
            text-center
          "
          style={{
            opacity:
              progress < 0.08
                ? 1
                : 0,
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
            FINAL WHITE OVERLAY
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
              whiteOverlay * 0.12,
          }}
        />

      </div>

    </section>
  );
}
