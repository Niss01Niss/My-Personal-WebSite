// src/components/Education.jsx — JSON output aesthetic
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { education, certifications } from "../data/portfolio";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useTypewriter } from "../hooks/useTypewriter";

function JsonBlock({ data, delay, isVisible, t }) {
  const statusKey = data.status === "En cours" || data.status === "IN PROGRESS"
    ? "education.status_current"
    : "education.status_done";

  return (
    <motion.div
      className="term-card"
      initial={{ opacity: 0, y: 16 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      style={{ padding: "0", marginBottom: "20px" }}
    >
      <div className="term-titlebar">
        <div className="term-dot red" />
        <div className="term-dot yellow" />
        <div className="term-dot green" />
        <span className="term-titlebar-label">credentials.json</span>
      </div>
      <div style={{
        padding: "20px 24px",
        fontFamily: "var(--font-mono)",
        fontSize: "clamp(11px, 1.3vw, 13px)",
        lineHeight: "2",
      }}>
        <div><span className="json-punc">{"{"}</span></div>
        <div style={{ paddingLeft: "20px" }}>
          <span className="json-key">"degree"</span><span className="json-punc">: </span>
          <span className="json-str">"{data.degree}"</span><span className="json-punc">,</span>
        </div>
        <div style={{ paddingLeft: "20px" }}>
          <span className="json-key">"field"</span><span className="json-punc">: </span>
          <span className="json-str">"{data.field}"</span><span className="json-punc">,</span>
        </div>
        <div style={{ paddingLeft: "20px" }}>
          <span className="json-key">"institution"</span><span className="json-punc">: </span>
          <span className="json-str">"{data.institution}"</span><span className="json-punc">,</span>
        </div>
        <div style={{ paddingLeft: "20px" }}>
          <span className="json-key">"location"</span><span className="json-punc">: </span>
          <span className="json-str">"{data.location}"</span><span className="json-punc">,</span>
        </div>
        <div style={{ paddingLeft: "20px" }}>
          <span className="json-key">"period"</span><span className="json-punc">: </span>
          <span className="json-str">"{data.period}"</span><span className="json-punc">,</span>
        </div>
        <div style={{ paddingLeft: "20px" }}>
          <span className="json-key">"status"</span><span className="json-punc">: </span>
          <span style={{
            color: data.status === "En cours" ? "var(--primary)" : "var(--secondary)",
          }}>
            "{t(statusKey)}"
          </span>
        </div>
        <div><span className="json-punc">{"}"}</span></div>
      </div>
    </motion.div>
  );
}

function CertCard({ cert, index, isVisible }) {
  return (
    <motion.div
      className="term-card"
      initial={{ opacity: 0, y: 12 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.2 + index * 0.12 }}
      style={{ padding: "16px 20px" }}
    >
      <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
        <span style={{ fontSize: "22px" }}>{cert.icon}</span>
        <div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "clamp(11px, 1.3vw, 14px)",
            color: cert.color, fontWeight: "600", marginBottom: "4px",
          }}>
            {cert.title}
          </div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "11px",
            color: "var(--text-muted)",
          }}>
            {cert.issuer}
            {cert.note && <span style={{ color: "var(--text-dim)", marginLeft: "8px" }}>({cert.note})</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Education() {
  const { t } = useTranslation();
  const [ref, isVisible] = useIntersectionObserver(0.1);
  const cmdTyped = useTypewriter(t("education.cmd"), 40, isVisible);

  return (
    <section id="education" ref={ref} aria-label="Formation et certifications" style={{ position: "relative", zIndex: 10, padding: "100px 24px" }}>
      <div className="container">
        {/* Section header */}
        <div className="term-cmd" style={{ marginBottom: "64px" }}>
          {cmdTyped}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "48px" }} className="edu-grid">
          {/* Left — Education */}
          <div>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "11px",
              color: "var(--text-muted)", marginBottom: "24px",
              letterSpacing: "2px",
            }}>
              // EDUCATION RECORDS
            </div>
            {education.map((edu, i) => (
              <JsonBlock key={edu.id} data={edu} delay={i * 0.15} isVisible={isVisible} t={t} />
            ))}
          </div>

          {/* Right — Certifications */}
          <div>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "11px",
              color: "var(--text-muted)", marginBottom: "24px",
              letterSpacing: "2px",
            }}>
              // {t("education.certifications").toUpperCase()}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {certifications.map((cert, i) => (
                <CertCard key={cert.id} cert={cert} index={i} isVisible={isVisible} />
              ))}
            </div>

            {/* Languages */}
            <div style={{ marginTop: "32px" }}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "11px",
                color: "var(--text-muted)", marginBottom: "20px",
                letterSpacing: "2px",
              }}>
                // LANGUAGE PROFICIENCY
              </div>
              {[
                { name: "Arabe", level: "Native", pct: 100, color: "var(--primary)" },
                { name: "Français", level: "B2", pct: 80, color: "var(--secondary)" },
                { name: "Anglais", level: "B2", pct: 80, color: "var(--secondary)" },
              ].map((lang, i) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    fontFamily: "var(--font-mono)", fontSize: "13px",
                    marginBottom: "12px",
                  }}
                >
                  <span style={{ color: "var(--text-muted)", minWidth: "80px" }}>{lang.name}</span>
                  <span style={{ color: lang.color, fontSize: "11px" }}>
                    {"█".repeat(Math.round(lang.pct / 10))}{"░".repeat(10 - Math.round(lang.pct / 10))}
                  </span>
                  <span style={{ color: "var(--text-muted)", fontSize: "11px" }}>{lang.level}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .edu-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
