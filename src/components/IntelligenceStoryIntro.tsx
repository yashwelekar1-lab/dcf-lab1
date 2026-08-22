import { useEffect, useState } from "react";

export default function IntelligenceStoryIntro() {
  const [progress, setProgress] = useState(0);

  /* ============================================================
     SCROLL PROGRESS
     ============================================================ */

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      const section =
        document.getElementById(
          "intelligence-story"
        );

      if (!section) return;

      const rect =
        section.getBoundingClientRect();

      const scrollDistance =
        section.offsetHeight -
        window.innerHeight;

      if (scrollDistance <= 0) {
        setProgress(0);
        return;
      }

      /*
       * 0 = story just entered
       * 1 = story completely finished
       */

      const current =
        Math.max(0, -rect.top);

      const value =
        current / scrollDistance;

      setProgress(
        Math.min(
          Math.max(value, 0),
          1
        )
      );
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);

      frame =
        requestAnimationFrame(
          updateProgress
        );
    };

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateProgress
    );

    updateProgress();

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener(
        "scroll",
        onScroll
      );

      window.removeEventListener(
        "resize",
        updateProgress
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
  ) =>
    Math.min(
      Math.max(value, min),
      max
    );

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

     0.00 - 0.15
       Circle holds

     0.15 - 0.55
       Circle wipes

     0.55 - 0.62
       Small pause

     0.62 - 0.70
       AI message appears

     0.70 - 0.94
       AI message remains visible

     0.94 - 1.00
       Message fades away

     ============================================================ */


  /* ============================================================
     CIRCLE WIPE
     ============================================================ */

  const wipeProgress =
    smooth(
      clamp(
        (progress - 0.15) /
          0.40
      )
    );

  /*
   * 360 = completely visible
   * 0   = completely invisible
   */

  const visibleAngle =
    360 -
    wipeProgress * 360;


  /* ============================================================
     CENTER CONTENT
     ============================================================ */

  const centerOpacity =
    1 -
    smooth(
      clamp(
        (progress - 0.18) /
          0.27
      )
    );


  /* ============================================================
     AI MESSAGE
     ============================================================ */

  let aiOpacity = 0;

  if (progress < 0.62) {
    aiOpacity = 0;
  }

  else if (progress < 0.70) {
    aiOpacity =
      smooth(
        (progress - 0.62) /
          0.08
      );
  }

  else if (progress < 0.94) {
    aiOpacity = 1;
  }

  else {
    aiOpacity =
      1 -
      smooth(
        (progress - 0.94) /
          0.06
      );
  }


  /* ============================================================
     BACKGROUND
     ============================================================ */

  const darkToLight =
    smooth(
      clamp(
        (progress - 0.72) /
          0.28
      )
    );

  const backgroundColor =
    `rgb(
      ${Math.round(
        14 +
          (247 - 14) *
            darkToLight
      )},
      ${Math.round(
        24 +
          (250 - 24) *
            darkToLight
      )},
      ${Math.round(
        40 +
          (252 - 40) *
            darkToLight
      )}
    )`;


  /* ============================================================
     GLOW
     ============================================================ */

  const glowOpacity =
    Math.max(
      0.85 -
        progress * 1.1,
      0
    );


  /* ============================================================
     AI TEXT COLORS
     ============================================================ */

  const textTransition =
    smooth(
      clamp(
        (progress - 0.86) /
          0.14
      )
    );

  const headingColor =
    `rgb(
      ${Math.round(
        255 -
          225 *
            textTransition
      )},
      ${Math.round(
        255 -
          225 *
            textTransition
      )},
      ${Math.round(
        255 -
          210 *
            textTransition
      )}
    )`;

  const descriptionColor =
    `rgb(
      ${Math.round(
        211 -
          105 *
            textTransition
      )},
      ${Math.round(
        221 -
          105 *
            textTransition
      )},
      ${Math.round(
        232 -
          100 *
            textTransition
      )}
    )`;


  /* ============================================================
     RENDER
     ============================================================ */

  return (
    <section
      id="intelligence-story"
      className="
        relative
        w-full
        h-[280vh]
        m-0
        p-0
      "
    >

      {/* ======================================================
          STICKY VIEWPORT

          This is what locks everything to the screen.
         ====================================================== */}

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
              "radial-gradient(circle at 50% 50%, rgba(0,210,160,0.16), transparent 45%)",

            opacity:
              glowOpacity,
          }}
        />


        {/* ====================================================
            LARGE SOFT GLOW
           ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[850px]
            w-[850px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            blur-[140px]
          "
          style={{
            background:
              "radial-gradient(circle, rgba(0,210,160,0.18), transparent 68%)",

            opacity:
              glowOpacity,
          }}
        />


        {/* ====================================================
            CIRCLE

            IMPORTANT:
            absolute inside sticky viewport.

            It NEVER moves vertically.

            Scroll ONLY changes the wipe.
           ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            z-20
          "
          style={{
            width:
              "min(600px, 78vw)",

            height:
              "min(600px, 78vw)",

            transform:
              "translate(-50%, -50%)",
          }}
        >

          {/* ==================================================
              OUTER CIRCLE
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
                  from -90deg,
                  black 0deg ${visibleAngle}deg,
                  transparent ${visibleAngle}deg 360deg
                )`,

              maskImage:
                `conic-gradient(
                  from -90deg,
                  black 0deg ${visibleAngle}deg,
                  transparent ${visibleAngle}deg 360deg
                )`,
            }}
          >

            <img
              src="/DCF Logo.png"
              alt="DCF Lab Intelligence"
              className="
                block
                h-full
                w-full
                object-contain
              "
            />

          </div>


          {/* ==================================================
              INNER TEXT CIRCLE
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
              px-4
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
                  text-[clamp(26px,4vw,50px)]
                  font-bold
                  text-white
                "
              >
                DCF Lab
              </span>

              <span
                className="
                  text-[clamp(26px,4vw,50px)]
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

            Same viewport position as circle.
           ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-40
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
                text-[clamp(42px,6vw,82px)]
                font-semibold
                leading-[1.05]
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
                max-w-[850px]
                text-[clamp(18px,2vw,25px)]
                leading-[1.6]
              "
              style={{
                color:
                  descriptionColor,
              }}
            >
              DCF Lab Intelligence uncovers the
              hidden insights behind financial
              data—while keeping you in complete
              control of your valuation assumptions.
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
            z-50
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
              text-white/70
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
            FINAL TRANSITION
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
              progress > 0.96
                ? smooth(
                    (progress - 0.96) /
                      0.04
                  )
                : 0,
          }}
        />

      </div>

    </section>
  );
}
