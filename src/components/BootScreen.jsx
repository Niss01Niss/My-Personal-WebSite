// src/components/BootScreen.jsx
// Fullscreen terminal boot animation shown once per session
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

function isLastBootLine(idx, total) {
  return total > 0 && idx === total - 1;
}

export default function BootScreen({ onComplete }) {
  const { t, i18n } = useTranslation();
  const bootLines = useMemo(
    () => t("boot.lines", { returnObjects: true }),
    // i18n.language drives bundle content; `t` identity can change every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i18n.language],
  );
  const bootLen = bootLines.length;

  const [lines, setLines]       = useState([]); // { text, ok }
  const [typing, setTyping]     = useState("");
  const [lineIdx, setLineIdx]   = useState(0);
  const [charIdx, setCharIdx]   = useState(0);
  const [done, setDone]         = useState(false);
  const [sliding, setSliding]   = useState(false);
  const timerRef                = useRef(null);

  // Session check — if already shown, skip immediately
  useEffect(() => {
    if (sessionStorage.getItem("boot-shown")) {
      onComplete();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset typing when language changes (boot not completed)
  useEffect(() => {
    if (sessionStorage.getItem("boot-shown")) return;
    const id = window.setTimeout(() => {
      setLines([]);
      setTyping("");
      setLineIdx(0);
      setCharIdx(0);
      setDone(false);
    }, 0);
    return () => window.clearTimeout(id);
  }, [bootLines]);

  // Typewriter effect per line
  useEffect(() => {
    if (sessionStorage.getItem("boot-shown")) return;
    if (!bootLen) return;

    if (lineIdx >= bootLen) {
      const doneId = window.setTimeout(() => setDone(true), 0);
      const slideId = window.setTimeout(() => {
        setSliding(true);
        setTimeout(() => {
          sessionStorage.setItem("boot-shown", "1");
          onComplete();
        }, 700);
      }, 800);
      return () => {
        window.clearTimeout(doneId);
        window.clearTimeout(slideId);
      };
    }

    const line = bootLines[lineIdx] ?? "";
    if (charIdx <= line.length) {
      timerRef.current = setTimeout(() => {
        setTyping(line.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, 28);
    } else {
      timerRef.current = setTimeout(() => {
        const isLast = isLastBootLine(lineIdx, bootLen);
        setLines((prev) => [
          ...prev,
          { text: line, ok: !isLast, success: isLast },
        ]);
        setTyping("");
        setCharIdx(0);
        setLineIdx((i) => i + 1);
      }, isLastBootLine(lineIdx, bootLen) ? 200 : 120);
    }

    return () => clearTimeout(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIdx, lineIdx, bootLines, bootLen]);

  function handleSkip() {
    clearTimeout(timerRef.current);
    setSliding(true);
    setTimeout(() => {
      sessionStorage.setItem("boot-shown", "1");
      onComplete();
    }, 600);
  }

  if (sessionStorage.getItem("boot-shown")) return null;

  return (
    <AnimatePresence>
      {!sliding && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100000,
            background: "#020810",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "clamp(32px, 8vw, 120px)",
            fontFamily: '"JetBrains Mono", monospace',
          }}
        >
          <div style={{ marginBottom: "40px" }}>
            <div style={{ color: "#00B4D8", fontSize: "11px", letterSpacing: "3px", marginBottom: "8px", opacity: 0.6 }}>
              {t("boot.header_title")}
            </div>
            <div style={{ color: "#5C8A75", fontSize: "11px", letterSpacing: "2px" }}>
              {t("boot.header_rule")}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", maxWidth: "700px" }}>
            {lines.map((l, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}
              >
                <span style={{
                  color: l.success ? "#00B4D8" : "#CAF0F8",
                  fontSize: "clamp(12px, 1.8vw, 15px)",
                  fontWeight: l.success ? "700" : "400",
                  textShadow: l.success ? "0 0 12px rgba(0,150,199,0.45)" : "none",
                }}>
                  {l.text}
                </span>
                {l.ok && (
                  <span style={{ color: "#2D6A4F", fontSize: "clamp(12px, 1.8vw, 15px)", whiteSpace: "nowrap" }}>
                    {t("boot.ok")}
                  </span>
                )}
              </motion.div>
            ))}

            {!done && lineIdx < bootLen && (
              <div style={{ display: "flex", gap: "8px" }}>
                <span style={{ color: "#CAF0F8", fontSize: "clamp(12px, 1.8vw, 15px)" }}>
                  {typing}
                </span>
                <span style={{
                  display: "inline-block",
                  width: "9px", height: "16px",
                  background: "#00B4D8",
                  animation: "cursorBlink 1s step-end infinite",
                  verticalAlign: "bottom",
                }} />
              </div>
            )}
          </div>

          <button
            onClick={handleSkip}
            style={{
              position: "absolute",
              bottom: "40px", right: "clamp(20px, 5vw, 60px)",
              background: "transparent",
              border: "1px solid rgba(0,150,199,0.35)",
              color: "#5C8A75",
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "12px",
              padding: "8px 18px",
              cursor: "pointer",
              letterSpacing: "1px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.target.style.color = "#00B4D8"; e.target.style.borderColor = "#00B4D8"; }}
            onMouseLeave={(e) => { e.target.style.color = "#5C8A75"; e.target.style.borderColor = "rgba(0,150,199,0.35)"; }}
            aria-label={t("boot.skip_aria")}
          >
            {t("boot.skip")}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
