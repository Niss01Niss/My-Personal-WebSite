// src/components/BootScreen.jsx
// Fullscreen terminal boot animation shown once per session
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  "INITIALIZING SECURE CONNECTION...........",
  "LOADING PROFILE: NISRINE AMESJOUN........",
  "DECRYPTING PORTFOLIO DATA................",
  "FIREWALL STATUS: ACTIVE..................",
  "ACCESS GRANTED ✓",
];
const OK_TAG = "[ OK ]";

export default function BootScreen({ onComplete }) {
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

  // Typewriter effect per line
  useEffect(() => {
    if (sessionStorage.getItem("boot-shown")) return;
    if (lineIdx >= BOOT_LINES.length) {
      // All lines done — wait then slide up
      timerRef.current = setTimeout(() => {
        setSliding(true);
        setTimeout(() => {
          sessionStorage.setItem("boot-shown", "1");
          onComplete();
        }, 700);
      }, 800);
      setDone(true);
      return;
    }

    const line = BOOT_LINES[lineIdx];
    if (charIdx <= line.length) {
      timerRef.current = setTimeout(() => {
        setTyping(line.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, 28);
    } else {
      // Line complete — show OK tag and move to next
      timerRef.current = setTimeout(() => {
        const isLast = lineIdx === BOOT_LINES.length - 1;
        setLines((prev) => [
          ...prev,
          { text: line, ok: !isLast, success: isLast },
        ]);
        setTyping("");
        setCharIdx(0);
        setLineIdx((i) => i + 1);
      }, isLastLine(lineIdx) ? 200 : 120);
    }

    return () => clearTimeout(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIdx, lineIdx]);

  function isLastLine(idx) { return idx === BOOT_LINES.length - 1; }

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
            background: "#020c02",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "clamp(32px, 8vw, 120px)",
            fontFamily: '"JetBrains Mono", monospace',
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "40px" }}>
            <div style={{ color: "#00FF41", fontSize: "11px", letterSpacing: "3px", marginBottom: "8px", opacity: 0.6 }}>
              NISRINE AMESJOUN // PORTFOLIO v2.0
            </div>
            <div style={{ color: "#4a7a4a", fontSize: "11px", letterSpacing: "2px" }}>
              ─────────────────────────────────────────
            </div>
          </div>

          {/* Completed lines */}
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
                  color: l.success ? "#00FF41" : "#C8FAD6",
                  fontSize: "clamp(12px, 1.8vw, 15px)",
                  fontWeight: l.success ? "700" : "400",
                  textShadow: l.success ? "0 0 12px rgba(0,255,65,0.6)" : "none",
                }}>
                  {l.text}
                </span>
                {l.ok && (
                  <span style={{ color: "#00FF41", fontSize: "clamp(12px, 1.8vw, 15px)", whiteSpace: "nowrap" }}>
                    {OK_TAG}
                  </span>
                )}
              </motion.div>
            ))}

            {/* Current typing line */}
            {!done && lineIdx < BOOT_LINES.length && (
              <div style={{ display: "flex", gap: "8px" }}>
                <span style={{ color: "#C8FAD6", fontSize: "clamp(12px, 1.8vw, 15px)" }}>
                  {typing}
                </span>
                <span style={{
                  display: "inline-block",
                  width: "9px", height: "16px",
                  background: "#00FF41",
                  animation: "cursorBlink 1s step-end infinite",
                  verticalAlign: "bottom",
                }} />
              </div>
            )}
          </div>

          {/* Skip button */}
          <button
            onClick={handleSkip}
            style={{
              position: "absolute",
              bottom: "40px", right: "clamp(20px, 5vw, 60px)",
              background: "transparent",
              border: "1px solid rgba(0,255,65,0.35)",
              color: "#4a7a4a",
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "12px",
              padding: "8px 18px",
              cursor: "pointer",
              letterSpacing: "1px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.target.style.color = "#00FF41"; e.target.style.borderColor = "#00FF41"; }}
            onMouseLeave={(e) => { e.target.style.color = "#4a7a4a"; e.target.style.borderColor = "rgba(0,255,65,0.35)"; }}
            aria-label="Passer l'animation d'introduction"
          >
            SKIP »
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
