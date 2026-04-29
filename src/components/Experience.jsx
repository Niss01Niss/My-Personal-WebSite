// src/components/Experience.jsx — Log-file aesthetic

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { experiences } from "../data/portfolio";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useTypewriter } from "../hooks/useTypewriter";

function LogEntry({ exp, index, t }) {
  const [ref, isVisible] = useIntersectionObserver(0.1);


  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0", marginBottom: "40px" }}
      className="log-entry-grid"
    >
      {/* Log header row */}
      <div style={{
        display: "flex", flexWrap: "wrap", gap: "12px",
        alignItems: "center",
        padding: "10px 16px",
        background: "rgba(0, 119, 182, 0.04)",
        border: "1px solid var(--border)",
        borderBottom: "none",
        fontFamily: "var(--font-mono)", fontSize: "clamp(10px, 1.3vw, 12px)",
      }}>
        <span style={{ color: "var(--text-muted)" }}>[{exp.period}]</span>
        <span style={{ color: "var(--primary)" }}>[INFO]</span>
        <span style={{ color: "var(--secondary)" }}>{t("experience.joined")}:</span>
        <span style={{ color: "var(--text)", fontWeight: "600" }}>{exp.company}</span>
        <span style={{ color: "var(--text-muted)" }}>—</span>
        <span style={{ color: "var(--text)" }}>{exp.role}</span>
        <span style={{
          marginLeft: "auto",
          padding: "2px 10px",
          border: `1px solid ${exp.color}40`,
          color: exp.color,
          fontSize: "10px", borderRadius: "3px",
        }}>
          {exp.type}
        </span>
      </div>

      {/* Log body */}
      <div className="term-card" style={{ borderRadius: "0 0 4px 4px", padding: "16px 20px" }}>
        {/* Description */}
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "clamp(11px, 1.3vw, 13px)",
          color: "var(--text-muted)", marginBottom: "14px",
          paddingLeft: "12px",
          borderLeft: `2px solid ${exp.color}60`,
        }}>
          {exp.description}
        </div>

        {/* Tasks */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "14px" }}>
          {exp.bullets.map((b, i) => (
            <div key={i} style={{
              display: "flex", gap: "10px",
              fontFamily: "var(--font-mono)", fontSize: "clamp(11px, 1.3vw, 13px)",
            }}>
              <span style={{ color: "var(--secondary)", flexShrink: 0 }}>[{t("experience.tasks")}]</span>
              <span style={{ color: "var(--text)" }}>{b}</span>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
          {exp.tech.map((tech, i) => (
            <span key={i} style={{
              fontFamily: "var(--font-mono)", fontSize: "11px",
              padding: "3px 10px",
              border: `1px solid ${exp.color}50`,
              color: exp.color,
              borderRadius: "3px",
              background: `${exp.color}0a`,
            }}>
              {tech}
            </span>
          ))}
        </div>

        {/* Exit line */}
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "11px",
          color: "var(--text-dim)",
        }}>
          [{t("experience.exit")}] {t("experience.duration")}: {exp.duration} — {exp.location}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const { t } = useTranslation();
  const [ref, isVisible] = useIntersectionObserver(0.1);
  const cmdTyped = useTypewriter(t("experience.cmd"), 40, isVisible);

  return (
    <section id="experience" ref={ref} aria-label="Expérience professionnelle" style={{ position: "relative", zIndex: 10, padding: "var(--section-py) 24px" }}>
      <div className="container">
        {/* Section header */}
        <div className="term-cmd" style={{ marginBottom: "64px" }}>
          {cmdTyped}
        </div>

        {/* Log entries */}
        <div>
          {experiences.map((exp, i) => (
            <LogEntry key={exp.id} exp={exp} index={i} t={t} />
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .log-entry-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
