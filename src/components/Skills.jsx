// src/components/Skills.jsx — System monitor / htop style
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { skillCategories } from "../data/portfolio";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useTypewriter } from "../hooks/useTypewriter";

// Map skill to a percentage (heuristic based on keyword)
const SKILL_LEVELS = {
  "Python": 88, "Java": 72, "Laravel": 75, "C++": 65, "React": 78, "PowerShell": 70, "Bash": 75,
  "ISO 27001": 70, "NIST": 68, "PCI-DSS": 65, "CIS Controls": 62, "RGPD": 70, "MASVS": 60,
  "IDS/IPS": 82, "VPN": 75, "SSL/TLS": 78, "IPSec": 65, "Firewalls": 78, "Zero Trust": 68, "Segmentation réseau": 65,
  "Nmap": 85, "Metasploit": 78, "Burp Suite": 75, "Nessus": 70, "OpenVAS": 72, "Tests de pénétration": 80, "Analyse de malware": 68,
  "CI/CD sécurisés": 70, "Docker": 80, "Ansible": 65, "Terraform": 62, "Infrastructure as Code": 65,
  "Sécurité AWS": 65, "Sécurité Azure": 60, "IAM Cloud": 68, "Hardening": 75, "Surveillance et monitoring": 72,
  "Elasticsearch": 75, "Logstash": 70, "Kibana": 72, "Wazuh": 78, "Splunk": 65, "Threat Intelligence": 80, "Réponse aux incidents": 78,
};

// Color per category
const CAT_COLORS = {
  governance: "var(--secondary)",
  network:    "var(--primary)",
  offensive:  "var(--danger)",
  dev:        "var(--primary)",
  devsecops:  "var(--secondary)",
  cloud:      "#00D4FF",
  siem:       "var(--primary)",
};

// Process type labels
const CAT_PROCESS = {
  governance: "GOV_PROC",
  network:    "NET_STAT",
  offensive:  "SEC_SCAN",
  dev:        "CPU_LOAD",
  devsecops:  "SYS_PROC",
  cloud:      "CLD_STAT",
  siem:       "SOC_PROC",
};

function SkillBar({ name, color, active }) {
  const pct = SKILL_LEVELS[name] || 65;
  const filled = Math.round(pct / 10);
  const empty  = 10 - filled;
  const barStr = "█".repeat(filled) + "░".repeat(empty);

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "10px",
      fontFamily: "var(--font-mono)", fontSize: "clamp(10px, 1.2vw, 13px)",
      marginBottom: "10px",
      opacity: active ? 1 : 0,
      transform: active ? "translateX(0)" : "translateX(-10px)",
      transition: "opacity 0.4s ease, transform 0.4s ease",
    }}>
      {/* Skill name */}
      <span style={{
        color: "var(--text-muted)", minWidth: "160px",
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
      }}>
        {name.padEnd(20, " ")}
      </span>

      {/* Bar */}
      <span style={{
        color,
        letterSpacing: "1px",
        textShadow: active ? `0 0 8px ${color}60` : "none",
        transition: "text-shadow 0.3s",
      }}>
        {barStr}
      </span>

      {/* Percentage */}
      <span style={{ color: "var(--text-muted)", minWidth: "36px" }}>
        {pct}%
      </span>
    </div>
  );
}

export default function Skills() {
  const { t } = useTranslation();
  const [ref, isVisible] = useIntersectionObserver(0.1);
  const cmdTyped = useTypewriter(t("skills.cmd"), 40, isVisible);
  const catNames = t("skills.categories", { returnObjects: true });

  // Split categories into two panels
  const left  = skillCategories.slice(0, Math.ceil(skillCategories.length / 2));
  const right = skillCategories.slice(Math.ceil(skillCategories.length / 2));

  function Panel({ cats, delay }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        {cats.map((cat, ci) => (
          <div key={cat.id}>
            {/* Category header */}
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: CAT_COLORS[cat.id] || "var(--primary)",
              letterSpacing: "2px",
              marginBottom: "16px",
              paddingBottom: "8px",
              borderBottom: `1px solid ${(CAT_COLORS[cat.id] || "var(--primary)")}30`,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span>
                ▶ {CAT_PROCESS[cat.id] || "PROC"} :: {catNames[cat.id] || cat.title}
              </span>
              <span style={{ color: "var(--text-dim)" }}>
                {cat.skills.length} tasks
              </span>
            </div>

            {/* Skills */}
            {cat.skills.map((skill, si) => (
              <SkillBar
                key={skill}
                name={skill}
                color={CAT_COLORS[cat.id] || "var(--primary)"}
                active={isVisible}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <section id="skills" ref={ref} aria-label="Compétences" style={{ position: "relative", zIndex: 10, padding: "100px 24px" }}>
      <div className="container">
        {/* Section header */}
        <div className="term-cmd" style={{ marginBottom: "16px" }}>
          {cmdTyped}
        </div>

        {/* htop-style header */}
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "11px",
          color: "var(--text-dim)", marginBottom: "48px",
          borderBottom: "1px solid var(--border)", paddingBottom: "12px",
          display: "flex", gap: "24px", flexWrap: "wrap",
        }}>
          <span>PID: 1337</span>
          <span>USER: nisrine</span>
          <span>MEM: 42.0%</span>
          <span>CPU: 99.9%</span>
          <span style={{ color: "var(--primary)" }}>STATUS: RUNNING</span>
        </div>

        {/* Two-panel layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "48px",
        }}
        className="skills-grid"
        >
          <Panel cats={left} delay={0} />
          <Panel cats={right} delay={200} />
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .skills-grid { grid-template-columns: 40% 58% !important; }
        }
      `}</style>
    </section>
  );
}
