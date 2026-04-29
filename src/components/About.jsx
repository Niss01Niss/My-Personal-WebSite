// src/components/About.jsx — Terminal hacker style
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { personal } from "../data/portfolio";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useTypewriter } from "../hooks/useTypewriter";

function BioLine({ text, delay, active }) {
  const typed = useTypewriter(text, 18, active, delay);
  return (
    <div style={{
      display: "flex", gap: "12px",
      fontFamily: "var(--font-mono)", fontSize: "clamp(12px, 1.4vw, 14px)",
      color: "var(--text)", lineHeight: "1.8", marginBottom: "16px",
      opacity: typed.length > 0 ? 1 : 0,
      transition: "opacity 0.3s",
    }}>
      <span style={{ color: "var(--primary)", flexShrink: 0 }}>&gt;</span>
      <span>{typed}</span>
    </div>
  );
}

export default function About() {
  const { t, i18n } = useTranslation();
  const [ref, isVisible] = useIntersectionObserver(0.15);
  const cmdTyped = useTypewriter(t("about.cmd"), 40, isVisible);
  // Stabilize array refs with useMemo keyed on language
  const lang = i18n.language;
  const bioLines    = useMemo(() => t("about.bio",   { returnObjects: true }), [lang]); // eslint-disable-line
  const statsLabels = useMemo(() => t("about.stats", { returnObjects: true }), [lang]); // eslint-disable-line


  return (
    <section id="about" ref={ref} aria-label="À propos" style={{ position: "relative", zIndex: 10, padding: "100px 24px" }}>
      <div className="container">
        {/* Section header */}
        <div className="term-cmd" style={{ marginBottom: "64px" }}>
          {cmdTyped}
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "64px",
          alignItems: "start",
        }}
        className="about-grid"
        >
          {/* LEFT — Access card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}
          >
            {/* Hexagonal badge */}
            <div style={{
              position: "relative",
              width: "200px", height: "200px",
            }}>
              <div style={{
                width: "200px", height: "200px",
                clipPath: "polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)",
                background: "var(--accent)",
                border: "2px solid var(--accent)",
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 0 24px var(--accent-glow)",
              }}>
                {/* Initials */}
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "52px", fontWeight: "700",
                  color: "var(--text)",
                  zIndex: 2,
                }}>
                  NA
                </div>
                {/* Authorized watermark */}
                <div style={{
                  position: "absolute",
                  bottom: "28px",
                  fontFamily: "var(--font-mono)", fontSize: "8px",
                  color: "rgba(202, 240, 248, 0.4)", letterSpacing: "4px",
                  textTransform: "uppercase", transform: "rotate(-15deg)",
                  userSelect: "none",
                }}>
                  ✓ AUTORISÉ
                </div>
                {/* Scan line effect */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(202, 240, 248, 0.04) 3px, rgba(202, 240, 248, 0.04) 4px)",
                  pointerEvents: "none",
                }} />
              </div>
            </div>

            {/* ID Card details */}
            <div className="term-card" style={{ width: "100%", maxWidth: "260px", padding: "16px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", lineHeight: "2" }}>
                <div><span style={{ color: "var(--text-muted)" }}>ID:</span> <span style={{ color: "var(--primary)" }}>NA-SEC-001</span></div>
                <div><span style={{ color: "var(--text-muted)" }}>LOC:</span> <span style={{ color: "var(--text)" }}>Casablanca, Maroc</span></div>
                <div><span style={{ color: "var(--text-muted)" }}>STATUS:</span> <span style={{ color: "var(--success)" }}>● ACTIVE</span></div>
                <div><span style={{ color: "var(--text-muted)" }}>CLEARANCE:</span> <span style={{ color: "var(--secondary)" }}>LEVEL 5</span></div>
              </div>
            </div>

            {/* Stats */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "12px", width: "100%", maxWidth: "260px",
            }}>
              {personal.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="term-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  style={{ padding: "14px 12px", textAlign: "center" }}
                >
                  <div style={{
                    fontFamily: "var(--font-display)", fontSize: "24px",
                    color: "var(--primary)", fontWeight: "700",
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-mono)", fontSize: "9px",
                    color: "var(--text-muted)", marginTop: "4px",
                    letterSpacing: "0.5px",
                  }}>
                    {statsLabels[i] || stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Bio terminal output */}
          <div>
            <div className="term-card" style={{ padding: "0" }}>
              <div className="term-titlebar">
                <div className="term-dot red" />
                <div className="term-dot yellow" />
                <div className="term-dot green" />
                <span className="term-titlebar-label">about.txt</span>
              </div>
              <div style={{ padding: "24px 20px" }}>
                {bioLines.map((line, i) => (
                  <BioLine
                    key={`${i}-${line}`}
                    text={line}
                    delay={i * 600}
                    active={isVisible}
                  />
                ))}
              </div>
            </div>

            {/* Interests */}
            <div style={{ marginTop: "24px" }}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "12px",
                color: "var(--text-muted)", marginBottom: "16px",
              }}>
                <span style={{ color: "var(--secondary)" }}>&gt;</span> interests --list
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {personal.interests?.map ? personal.interests.map((item, i) => (
                  <div key={i} style={{
                    fontFamily: "var(--font-mono)", fontSize: "12px",
                    padding: "6px 14px",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                    borderRadius: "3px",
                  }}>
                    {item.icon} {item.label}
                  </div>
                )) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .about-grid { grid-template-columns: 300px 1fr !important; }
        }
      `}</style>
    </section>
  );
}
