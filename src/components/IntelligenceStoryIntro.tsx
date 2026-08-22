import { useEffect, useRef, useState } from "react";

export default function IntelligenceStoryIntro() {
  const [progress, setProgress] = useState(0);

  const sectionRef = useRef<HTMLElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const isAutoScrolling = useRef(false);
  const hasPlayed = useRef(false);
  const userInteracting = useRef(false);

  /*
   * ============================================================
   * SETTINGS
   * ============================================================
   */

  // Total automatic storytelling duration.
  // Increase for slower storytelling.
  const STORY_DURATION = 12000;

  /*
   * ============================================================
   * CALCULATE STORY PROGRESS
   * ============================================================
   */

  const updateProgress = () => {
    const section = sectionRef.current;

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

  /*
   * ============================================================
   * NORMAL SCROLL LISTENER
   * ============================================================
   */

  useEffect(() => {
    const handleScroll = () => {
      updateProgress();
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    updateProgress();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /*
   * ============================================================
   * AUTOMATIC STORY SCROLL
   *
   * When the Intelligence section enters the viewport,
   * automatically scroll through the complete story.
   * ============================================================
   */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry.isIntersecting) return;

        if (hasPlayed.current) return;

        /*
         * Require a meaningful amount of the story section
         * to be visible before starting.
         */

        if (entry.intersectionRatio < 0.35) {
          return;
        }

        hasPlayed.current = true;

        startAutomaticStory();
      },
      {
        threshold: [0.35, 0.5, 0.75],
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();

      if (animationRef.current !== null) {
        cancelAnimationFrame(
          animationRef.current
        );
      }
    };
  }, []);

  /*
   * ============================================================
   * START AUTOMATIC STORY
   * ============================================================
   */

  const startAutomaticStory = () => {
    const section = sectionRef.current;

    if (!section) return;

    if (isAutoScrolling.current) return;

    /*
     * Don't automatically control the page while the user
     * is interacting.
     */

    if (userInteracting.current) return;

    const sectionTop =
      window.scrollY +
      section.getBoundingClientRect().top;

    const maxScroll =
      section.offsetHeight -
      window.innerHeight;

    const startScroll = sectionTop;

    const endScroll =
      sectionTop + Math.max(maxScroll, 0);

    const initialScroll =
      window.scrollY;

    /*
     * If the user is already near the end,
     * don't replay the story.
     */

    if (
      initialScroll >=
      endScroll - 30
    ) {
      return;
    }

    isAutoScrolling.current = true;

    const startTime =
      performance.now();

    const animate = (
      currentTime: number
    ) => {
      if (
        userInteracting.current
      ) {
        isAutoScrolling.current =
          false;

        return;
      }

      const elapsed =
        currentTime - startTime;

      const rawProgress =
        Math.min(
          elapsed / STORY_DURATION,
          1
        );

      /*
       * Smooth cinematic easing.
       */

      const easedProgress =
        rawProgress < 0.5
          ? 2 *
            rawProgress *
            rawProgress
          : 1 -
            Math.pow(
              -2 * rawProgress + 2,
              2
            ) /
              2;

      const targetScroll =
        startScroll +
        (endScroll - startScroll) *
          easedProgress;

      window.scrollTo(
        0,
        targetScroll
      );

      updateProgress();

      if (rawProgress < 1) {
        animationRef.current =
          requestAnimationFrame(
            animate
          );
      } else {
        window.scrollTo(
          0,
          endScroll
        );

        updateProgress();

        isAutoScrolling.current =
          false;

        animationRef.current =
          null;
      }
    };

    animationRef.current =
      requestAnimationFrame(
        animate
      );
  };

  /*
   * ============================================================
   * USER INTERACTION
   *
   * If the user touches/wheels during the automatic story,
   * stop automatic scrolling and give control back to them.
   * ============================================================
   */

  useEffect(() => {
    const stopAutoScroll = () => {
      if (!isAutoScrolling.current) {
        return;
      }

      userInteracting.current = true;

      isAutoScrolling.current =
        false;

      if (
        animationRef.current !== null
      ) {
        cancelAnimationFrame(
          animationRef.current
        );

        animationRef.current = null;
      }
    };

    const handlePointerDown = () => {
      stopAutoScroll();
    };

    const handleWheel = () => {
      stopAutoScroll();
    };

    const handleTouchStart = () => {
      stopAutoScroll();
    };

    window.addEventListener(
      "pointerdown",
      handlePointerDown,
      { passive: true }
    );

    window.addEventListener(
      "wheel",
      handleWheel,
      { passive: true }
    );

    window.addEventListener(
      "touchstart",
      handleTouchStart,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      window.removeEventListener(
        "wheel",
        handleWheel
      );

      window.removeEventListener(
        "touchstart",
        handleTouchStart
      );
    };
  }, []);

  /*
   * ============================================================
   * STORY TIMELINE
   * ============================================================
   */

  /*
   * 0 → 18%
   * Center text visible
   */

  const centerTextProgress =
    Math.min(
      Math.max(
        (progress - 0.18) / 0.4,
        0
      ),
      1
    );

  /*
   * 18 → 58%
   * Circle wipes clockwise
   */

  const circleProgress =
    Math.min(
      Math.max(
        (progress - 0.18) / 0.4,
        0
      ),
      1
    );

  const wipeAngle =
    circleProgress * 360;

  /*
   * 68 → 80%
   * AI message appears
   */

  const textProgress =
    Math.min(
      Math.max(
        (progress - 0.68) / 0.12,
        0
      ),
      1
    );

  /*
   * 82 → 100%
   * Story exits
   */

  const exitProgress =
    Math.min(
      Math.max(
        (progress - 0.82) / 0.18,
        0
      ),
      1
    );

  /*
   * Background transition
   */

  const backgroundProgress =
    Math.min(
      Math.max(
        (progress - 0.7) / 0.3,
        0
      ),
      1
    );

  const backgroundColor =
    "rgb(" +
    Math.round(
      16 +
        235 *
          backgroundProgress
    ) +
    ", " +
    Math.round(
      26 +
        232 *
          backgroundProgress
    ) +
    ", " +
    Math.round(
      43 +
        212 *
          backgroundProgress
    ) +
    ")";

  /*
   * AI message movement
   */

  const messageY =
    35 -
    textProgress * 35;

  const messageTransform =
    "translateY(" +
    messageY +
    "px)";

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <section
      ref={sectionRef}
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
      ========================================================= */}

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
        ======================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            z-0
            h-[420px]
            w-[420px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            blur-[70px]

            min-[390px]:h-[500px]
            min-[390px]:w-[500px]

            sm:h-[650px]
            sm:w-[650px]

            lg:h-[750px]
            lg:w-[750px]
          "
          style={{
            background:
              "radial-gradient(circle, rgba(0,210,160,0.16), transparent 68%)",
            opacity:
              1 -
              progress * 0.85,
          }}
        />

        {/* ======================================================
            INTELLIGENCE CIRCLE
        ======================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2

            top-[25px]

            z-[20]
            -translate-x-1/2

            min-[390px]:top-[35px]

            sm:top-[45px]

            md:top-[55px]

            lg:top-[65px]
          "
          style={{
            opacity:
              1 - exitProgress,
          }}
        >
          {/* ====================================================
              RESPONSIVE CIRCLE
          ===================================================== */}

          <div
            className="
              relative

              h-[285px]
              w-[285px]

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
                CLOCKWISE WIPE
            =================================================== */}

            <div
              className="
                absolute
                inset-0
                overflow-hidden
                rounded-full
              "
              style={{
                WebkitMaskImage:
                  "conic-gradient(from 0deg, transparent 0deg " +
                  wipeAngle +
                  "deg, black " +
                  wipeAngle +
                  "deg 360deg)",

                maskImage:
                  "conic-gradient(from 0deg, transparent 0deg " +
                  wipeAngle +
                  "deg, black " +
                  wipeAngle +
                  "deg 360deg)",
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
                INNER CIRCLE
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
                opacity:
                  1 -
                  centerTextProgress,
              }}
            >
              {/* SPARKLE */}

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

              {/* SUBTITLE */}

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
              (1 -
                exitProgress *
                  0.2),

            transform:
              messageTransform,
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
        ======================================================= */}

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

        {/* ======================================================
            STORY PROGRESS
            Small indicator at bottom.
        ======================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-3
            left-1/2
            z-[100]
            h-[2px]
            w-[120px]
            -translate-x-1/2
            overflow-hidden
            rounded-full
            bg-white/10
          "
        >
          <div
            className="
              h-full
              rounded-full
              bg-emerald-400
            "
            style={{
              width:
                progress * 100 + "%",
            }}
          />
        </div>
      </div>
    </section>
  );
}
