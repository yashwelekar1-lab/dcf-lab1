import { useEffect, useRef, useState } from "react";
import "./App.css";

type Story = {
  eyebrow: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
};

const stories: Story[] = [
  {
    eyebrow: "01 — DISCOVER",
    title: "Turn Reports Into Intelligence",
    description:
      "Upload an annual report and let the platform transform hundreds of pages of financial information into structured, investment-ready intelligence.",
    metric: "100+",
    metricLabel: "Financial data points",
  },
  {
    eyebrow: "02 — ANALYZE",
    title: "Understand The Business",
    description:
      "Move beyond numbers. Analyze management commentary, revenue drivers, margins, capital allocation, risks and the quality of earnings.",
    metric: "360°",
    metricLabel: "Business analysis",
  },
  {
    eyebrow: "03 — VALUE",
    title: "Build The Valuation",
    description:
      "Create a disciplined valuation framework using DCF, multiples, growth assumptions, WACC and scenario analysis.",
    metric: "DCF",
    metricLabel: "Valuation engine",
  },
  {
    eyebrow: "04 — DECIDE",
    title: "From Data To Conviction",
    description:
      "Bring fundamentals, valuation and business quality together into one clear research view designed to support better investment decisions.",
    metric: "1",
    metricLabel: "Investment thesis",
  },
];

export default function App() {
  const storyRef = useRef<HTMLElement | null>(null);

  const [progress, setProgress] = useState(0);
  const [activeStory, setActiveStory] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateStory = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const section = storyRef.current;

        if (!section) return;

        const rect = section.getBoundingClientRect();
        const scrollableDistance = section.offsetHeight - window.innerHeight;

        if (scrollableDistance <= 0) return;

        const rawProgress = -rect.top / scrollableDistance;

        const nextProgress = Math.min(
          1,
          Math.max(0, rawProgress)
        );

        setProgress(nextProgress);

        const nextStory = Math.min(
          stories.length - 1,
          Math.floor(nextProgress * stories.length)
        );

        setActiveStory(nextStory);
      });
    };

    window.addEventListener("scroll", updateStory, {
      passive: true,
    });

    window.addEventListener("resize", updateStory);

    updateStory();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateStory);
      window.removeEventListener("resize", updateStory);
    };
  }, []);

  /*
   * Ring animation.
   *
   * The ring never determines the page layout.
   * It only transforms visually.
   */
  const rotation = progress * 270;

  const ringScale =
    0.82 +
    Math.sin(progress * Math.PI) * 0.08;

  const ringOpacity =
    0.72 +
    Math.sin(progress * Math.PI) * 0.28;

  const innerRotation = -progress * 180;

  return (
    <main className="site">

      {/* =========================================================
          TOP NAV
      ========================================================= */}

      <header className="navbar">
        <div className="nav-logo">
          <span className="logo-dot" />
          DCF LAB
        </div>

        <nav className="nav-links">
          <a href="#story">Intelligence</a>
          <a href="#platform">Platform</a>
          <a href="#research">Research</a>
        </nav>

        <button className="nav-button">
          Explore Platform
        </button>
      </header>


      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="hero">

        <div className="hero-content">

          <div className="hero-badge">
            AI-POWERED FINANCIAL RESEARCH
          </div>

          <h1>
            Financial intelligence,
            <br />
            <span>without the noise.</span>
          </h1>

          <p>
            Transform annual reports, financial statements and
            valuation models into clear investment intelligence.
          </p>

          <div className="hero-actions">
            <button className="primary-button">
              Start Research
              <span>→</span>
            </button>

            <button className="secondary-button">
              See how it works
            </button>
          </div>

        </div>

        <div className="hero-orb">

          <div className="hero-ring">
            <div className="hero-ring-inner" />

            <div className="hero-ring-center">
              <span>DCF</span>
              <small>INTELLIGENCE</small>
            </div>
          </div>

        </div>

      </section>


      {/* =========================================================
          STORYTELLING
      ========================================================= */}

      <section
        ref={storyRef}
        id="story"
        className="story-section"
      >

        <div className="story-sticky">

          {/* LEFT STORY CONTENT */}

          <div className="story-copy">

            <div className="story-heading">

              <span className="section-label">
                THE INTELLIGENCE ENGINE
              </span>

              <h2>
                From information
                <br />
                to <span>conviction.</span>
              </h2>

            </div>


            <div className="story-progress">

              <div className="progress-line">
                <div
                  className="progress-fill"
                  style={{
                    height: `${progress * 100}%`,
                  }}
                />
              </div>

              <div className="story-numbers">

                {stories.map((_, index) => (
                  <button
                    key={index}
                    className={
                      index === activeStory
                        ? "story-number active"
                        : "story-number"
                    }
                    onClick={() => {
                      if (!storyRef.current) return;

                      const section =
                        storyRef.current;

                      const maxScroll =
                        section.offsetHeight -
                        window.innerHeight;

                      const targetProgress =
                        (index + 0.5) /
                        stories.length;

                      const target =
                        section.offsetTop +
                        maxScroll * targetProgress;

                      window.scrollTo({
                        top: target,
                        behavior: "smooth",
                      });
                    }}
                  >
                    0{index + 1}
                  </button>
                ))}

              </div>

            </div>


            <div className="story-text">

              {stories.map((story, index) => {

                const distance =
                  Math.abs(activeStory - index);

                return (
                  <article
                    key={story.eyebrow}
                    className={
                      index === activeStory
                        ? "story-card active"
                        : "story-card"
                    }
                    style={{
                      opacity:
                        index === activeStory
                          ? 1
                          : 0,
                      transform:
                        index === activeStory
                          ? "translateY(0)"
                          : index < activeStory
                            ? "translateY(-35px)"
                            : "translateY(35px)",
                      pointerEvents:
                        index === activeStory
                          ? "auto"
                          : "none",
                    }}
                  >

                    <div className="story-eyebrow">
                      {story.eyebrow}
                    </div>

                    <h3>
                      {story.title}
                    </h3>

                    <p>
                      {story.description}
                    </p>

                    <div className="story-metric">

                      <strong>
                        {story.metric}
                      </strong>

                      <span>
                        {story.metricLabel}
                      </span>

                    </div>

                  </article>
                );
              })}

            </div>

          </div>


          {/* RIGHT VISUAL */}

          <div className="story-visual">

            <div className="visual-grid" />

            <div
              className="story-ring"
              style={{
                transform: `
                  rotate(${rotation}deg)
                  scale(${ringScale})
                `,
                opacity: ringOpacity,
              }}
            >

              <div className="ring-gradient" />

              <div className="ring-hole" />

              <div
                className="ring-marker"
                style={{
                  transform: `
                    rotate(${innerRotation}deg)
                  `,
                }}
              >
                <span />
              </div>

            </div>


            {/* CENTER INFORMATION */}

            <div className="visual-center">

              <div className="center-star">
                ✦
              </div>

              <div className="center-title">
                DCF Lab
              </div>

              <div className="center-subtitle">
                Intelligence
              </div>

              <div className="center-description">
                AI-powered financial
                <br />
                research & valuation
              </div>

            </div>


            {/* DATA ORBITS */}

            <div className="orbit orbit-one">
              <span>Revenue</span>
            </div>

            <div className="orbit orbit-two">
              <span>EBITDA</span>
            </div>

            <div className="orbit orbit-three">
              <span>DCF</span>
            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          PLATFORM SECTION
      ========================================================= */}

      <section
        id="platform"
        className="platform-section"
      >

        <div className="platform-header">

          <span className="section-label">
            ONE RESEARCH WORKFLOW
          </span>

          <h2>
            Everything you need
            <br />
            to <span>think deeper.</span>
          </h2>

        </div>


        <div className="feature-grid">

          <Feature
            number="01"
            title="Annual Report Intelligence"
            text="Extract financial statements, KPIs, management commentary and business drivers automatically."
          />

          <Feature
            number="02"
            title="Financial Analysis"
            text="Analyze profitability, growth, leverage, cash flows and operating performance."
          />

          <Feature
            number="03"
            title="Valuation"
            text="Build DCF and relative valuation frameworks with transparent assumptions."
          />

          <Feature
            number="04"
            title="Research Output"
            text="Convert your analysis into an investment-ready research thesis."
          />

        </div>

      </section>


      {/* =========================================================
          RESEARCH SECTION
      ========================================================= */}

      <section
        id="research"
        className="research-section"
      >

        <div>

          <span className="section-label">
            RESEARCH WITH CONTEXT
          </span>

          <h2>
            Numbers tell you
            <br />
            <span>what happened.</span>
          </h2>

          <p>
            Intelligence helps you understand why.
          </p>

        </div>

        <button className="primary-button">
          Enter DCF Lab →
        </button>

      </section>


      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="footer">

        <div>
          <strong>DCF LAB</strong>
          <span>
            AI-powered financial research
          </span>
        </div>

        <div>
          © 2026 DCF Lab Intelligence
        </div>

      </footer>

    </main>
  );
}


/* =============================================================
   FEATURE COMPONENT
============================================================= */

function Feature({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="feature-card">

      <div className="feature-number">
        {number}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {text}
      </p>

      <span className="feature-arrow">
        ↗
      </span>

    </div>
  );
}
