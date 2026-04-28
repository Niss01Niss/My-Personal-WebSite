// src/components/Footer.jsx — Terminal aesthetic with live uptime counter
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Portfolio "birth date" — counts up from this timestamp
const START_TIME = new Date("2024-01-01T00:00:00Z").getTime();

function formatUptime(ms) {
  const total_s = Math.floor(ms / 1000);
  const d = Math.floor(total_s / 86400);
  const h = Math.floor((total_s % 86400) / 3600);
  const m = Math.floor((total_s % 3600) / 60);
  const s = total_s % 60;
  return `${d}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}

export default function Footer() {
  const { t } = useTranslation();
  const [uptime, setUptime] = useState(formatUptime(Date.now() - START_TIME));

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(formatUptime(Date.now() - START_TIME));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      role="contentinfo"
      style={{
        position: "relative", zIndex: 10,
        borderTop: "1px solid var(--border)",
        padding: "20px 24px",
        background: "rgba(2, 12, 2, 0.8)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div style={{
        maxWidth: "1280px", margin: "0 auto",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: "12px",
      }}>
        {/* Copyright */}
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "12px",
          color: "var(--text-muted)",
        }}>
          {t("footer.copy")} &nbsp;|&nbsp; {t("footer.built")}
        </div>

        {/* Uptime */}
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "12px",
          color: "var(--text-dim)",
          display: "flex", gap: "8px", alignItems: "center",
        }}>
          <span style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: "var(--primary)", display: "inline-block",
            animation: "pulseGreen 2s ease-in-out infinite",
          }} />
          {t("footer.uptime")}: <span style={{ color: "var(--primary)" }}>{uptime}</span>
        </div>
      </div>
    </footer>
  );
}
