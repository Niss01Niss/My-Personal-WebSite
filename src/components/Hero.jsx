// src/components/Hero.jsx — Terminal hacker hero, asymmetric layout
import { useEffect, useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { personal } from "../data/portfolio";
import { useCyclingTypewriter } from "../hooks/useTypewriter";

function TerminalWidget({ t }) {
  // Memoize lines so the reference is stable (prevents infinite re-renders)
  const lang = t("nav.lang"); // changes when language switches
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const lines = useMemo(() => t("hero.terminal_lines", { returnObjects: true }), [lang]);

  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLine, setCurrentLine]   = useState(0);
  const [currentText, setCurrentText]   = useState("");
  const [charIdx, setCharIdx]           = useState(0);

  const linesRef = useRef(lines);

  useEffect(() => {
    linesRef.current = lines;
    const id = window.setTimeout(() => {
      setVisibleLines([]);
      setCurrentLine(0);
      setCurrentText("");
      setCharIdx(0);
    }, 0);
    return () => window.clearTimeout(id);
  }, [lines]);

  useEffect(() => {
    if (currentLine >= lines.length) return;
    const line = lines[currentLine];

    if (charIdx <= line.length) {
      const t = setTimeout(() => {
        setCurrentText(line.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, line === "" ? 0 : 22);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        setCurrentText("");
        setCharIdx(0);
        setCurrentLine((c) => c + 1);
      }, line === "" ? 60 : 80);
      return () => clearTimeout(t);
    }
  }, [charIdx, currentLine, lines]);

  return (
    <div className="term-card" style={{ height: "100%", minHeight: "320px" }}>
      {/* Title bar */}
      <div className="term-titlebar">
        <div className="term-dot red" />
        <div className="term-dot yellow" />
        <div className="term-dot green" />
        <span className="term-titlebar-label">{t("hero.terminal_title")}</span>
      </div>

      {/* Output */}
      <div style={{
        padding: "20px 18px",
        fontFamily: "var(--font-mono)",
        fontSize: "clamp(10px, 1.3vw, 13px)",
        lineHeight: "1.8",
        height: "calc(100% - 42px)",
        overflowY: "auto",
      }}>
        {visibleLines.map((line, i) => (
          <div key={i} style={{
            color: line.startsWith(">") ? "var(--primary)" : line === "" ? undefined : "var(--text)",
            opacity: line === "" ? 0 : 1,
            height: line === "" ? "8px" : undefined,
          }}>
            {line}
          </div>
        ))}
        {currentLine < lines.length && (
          <div style={{
            color: lines[currentLine]?.startsWith(">") ? "var(--primary)" : "var(--text)",
            display: "flex", alignItems: "center", gap: "2px",
          }}>
            {currentText}
            <span style={{
              display: "inline-block", width: "7px", height: "14px",
              background: "var(--primary)",
              animation: "cursorBlink 1s step-end infinite",
            }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  const { t } = useTranslation();
  const typedRole = useCyclingTypewriter(personal.titles, 70, 2500);
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  };

  return (
    <section
      id="hero"
      aria-label="Introduction"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "calc(var(--navbar-h) + 40px) 24px 80px",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "48px",
          alignItems: "center",
        }}
        className="hero-grid"
        >
          {/* ── LEFT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Status */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              marginBottom: "24px",
              fontFamily: "var(--font-mono)", fontSize: "12px",
              color: "var(--text-muted)", letterSpacing: "1.5px",
            }}>
              <span style={{
                width: "8px", height: "8px", borderRadius: "50%",
                background: "var(--success)",
                animation: "pulseGreen 2s ease-in-out infinite",
                display: "inline-block",
              }} />
              {t("hero.status")}
            </div>

            {/* > whoami */}
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "clamp(12px, 1.5vw, 15px)",
              color: "var(--secondary)", marginBottom: "12px",
            }}>
              {t("hero.whoami")}
            </div>

            {/* Big name */}
            <h1
              className="crt-flicker"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(48px, 8vw, 110px)",
                fontWeight: "700",
                lineHeight: "0.95",
                color: "var(--primary)",
                textShadow: "0 0 24px rgba(0, 150, 199, 0.20)",
                marginBottom: "32px",
                letterSpacing: "-1px",
                wordBreak: "break-word",
              }}
            >
              {personal.name.split(" ").map((word, i) => (
                <span key={i} style={{ display: "block" }}>{word}</span>
              ))}
            </h1>

            {/* > role --current */}
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "clamp(12px, 1.5vw, 15px)",
              color: "var(--secondary)", marginBottom: "10px",
            }}>
              {t("hero.role_cmd")}
            </div>

            {/* Cycling role title */}
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(16px, 2.5vw, 24px)",
              color: "var(--text)",
              marginBottom: "48px",
              minHeight: "36px",
              display: "flex", alignItems: "center", gap: "4px",
            }}>
              <span style={{ color: "var(--secondary)" }}>&gt;&nbsp;</span>
              <span>{typedRole}</span>
              <span style={{
                display: "inline-block", width: "10px", height: "20px",
                background: "var(--primary)",
                animation: "cursorBlink 1s step-end infinite",
                marginLeft: "2px",
              }} />
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <motion.a
                href={personal.cvFile}
                download
                className="btn-terminal"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Télécharger le CV"
                style={{ fontSize: "clamp(12px, 1.5vw, 14px)" }}
              >
                {t("hero.cta_cv")}
              </motion.a>
              <motion.button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="btn-terminal secondary"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Me contacter"
                style={{ fontSize: "clamp(12px, 1.5vw, 14px)" }}
              >
                {t("hero.cta_contact")}
              </motion.button>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN — Terminal widget ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ height: "420px" }}
          >
            <TerminalWidget t={t} />
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{ marginTop: "64px", textAlign: "center" }}
        >
          <button
            type="button"
            onClick={() => scrollToSection("about")}
            aria-label="Défiler vers le bas"
            style={{
              color: "var(--text-muted)", textDecoration: "none",
              fontFamily: "var(--font-mono)", fontSize: "11px",
              letterSpacing: "2px", display: "inline-block",
              background: "none",
              border: "none",
              cursor: "none",
            }}
          >
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "block" }}
            >
              ▼
            </motion.span>
            SCROLL
          </button>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .hero-grid { grid-template-columns: 60% 40% !important; }
        }
      `}</style>
    </section>
  );
}
