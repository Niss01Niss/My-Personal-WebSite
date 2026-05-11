// src/components/Skills.jsx — System monitor / htop style
import { useTranslation } from "react-i18next";
import { skillCategories } from "../data/portfolio";
import { resolveLang, skillKey, tx } from "../utils/l10n";
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
// Languages → #0077B6 (accent), Tools → #1B4332 (tools), Security → #00B4D8 (primary highlight)
const CAT_COLORS = {
  governance: "var(--primary)",
  network:    "var(--primary)",
  offensive:  "var(--primary)",
  dev:        "var(--accent)",
  devsecops:  "var(--primary)",
  cloud:      "var(--primary)",
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

function SkillsPanel({ cats, isVisible, catNames, lang, t }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
      {cats.map((cat) => (
        <div
          key={cat.id}
          className="term-card"
          style={{
            padding: "16px 16px 10px",
            background: "rgba(7, 17, 32, 0.88)",
            borderColor: "rgba(14, 165, 233, 0.24)",
          }}
        >
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: CAT_COLORS[cat.id] || "var(--primary)",
            letterSpacing: "2px",
            marginBottom: "14px",
            paddingBottom: "10px",
            borderBottom: `1px solid ${(CAT_COLORS[cat.id] || "var(--primary)")}40`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            gap: "12px",
          }}>
            <span>
              ▶ {CAT_PROCESS[cat.id] || "PROC"} :: {catNames[cat.id] || cat.title}
            </span>
            <span style={{ color: "var(--text-muted)", whiteSpace: "nowrap" }}>
              {cat.skills.length} {t("skills.tasks_suffix")}
            </span>
          </div>

          {cat.skills.map((skill) => (
            <SkillBar
              key={skillKey(skill)}
              skill={skill}
              color={CAT_COLORS[cat.id] || "var(--primary)"}
              active={isVisible}
              lang={lang}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function SkillBar({ skill, color, active, lang }) {
  const pct = SKILL_LEVELS[skillKey(skill)] || 65;
  const label = tx(skill, lang);

  return (
    <div style={{
      marginBottom: "10px",
      opacity: active ? 1 : 0,
      transform: active ? "translateX(0)" : "translateX(-10px)",
      transition: "opacity 0.4s ease, transform 0.4s ease",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        marginBottom: "6px",
      }}>
        <span style={{
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(10px, 1.2vw, 13px)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          letterSpacing: "0.2px",
        }}>
          {label}
        </span>

        <span style={{
          color,
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          minWidth: "36px",
          textAlign: "right",
          fontWeight: 400,
        }}>
          {pct}%
        </span>
      </div>

      <div
        style={{
          height: "8px",
          borderRadius: "999px",
          background: "rgba(202, 240, 248, 0.14)",
          border: "1px solid rgba(202, 240, 248, 0.16)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: active ? `${pct}%` : "0%",
            height: "100%",
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}`,
            opacity: 0.95,
            transition: "width 0.9s ease",
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const { t, i18n } = useTranslation();
  const lang = resolveLang(i18n);
  const [ref, isVisible] = useIntersectionObserver(0.1);
  const cmdTyped = useTypewriter(t("skills.cmd"), 40, isVisible);
  const catNames = t("skills.categories", { returnObjects: true });

  // Split categories into two panels
  const left  = skillCategories.slice(0, Math.ceil(skillCategories.length / 2));
  const right = skillCategories.slice(Math.ceil(skillCategories.length / 2));

  return (
    <section id="skills" ref={ref} aria-label={t("skills.title")} style={{ position: "relative", zIndex: 10, padding: "100px 24px" }}>
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
          <SkillsPanel cats={left} isVisible={isVisible} catNames={catNames} lang={lang} t={t} />
          <SkillsPanel cats={right} isVisible={isVisible} catNames={catNames} lang={lang} t={t} />
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .skills-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
