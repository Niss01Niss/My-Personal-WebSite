// src/components/Projects.jsx — Terminal window cards, masonry grid
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";
import { projects } from "../data/portfolio";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useTypewriter } from "../hooks/useTypewriter";

function ProjectCard({ project, index, t }) {
  const [ref, isVisible] = useIntersectionObserver(0.1);
  const isWide = project.featured && index % 3 === 0;

  return (
    <motion.div
      ref={ref}
      className={`term-card${isWide ? " project-card-wide" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        y: -4,
        boxShadow: "0 0 30px var(--primary-dim), 0 8px 32px rgba(0,0,0,0.4)",
      }}
      style={{ display: "flex", flexDirection: "column" }}
    >
      {/* Title bar */}
      <div className="term-titlebar">
        <div className="term-dot red" />
        <div className="term-dot yellow" />
        <div className="term-dot green" />
        <span className="term-titlebar-label" style={{ textAlign: "left" }}>
          {project.icon} {project.name}
        </span>
        {project.featured && (
          <span style={{
            fontSize: "9px", color: "var(--primary)",
            border: "1px solid var(--border-bright)",
            padding: "1px 6px", borderRadius: "2px",
            letterSpacing: "1px",
          }}>
            {t("projects.featured")}
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "20px 18px", flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Category */}
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "10px",
          color: "var(--secondary)", letterSpacing: "2px",
        }}>
          [{project.category}]
        </div>

        {/* Description */}
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "clamp(11px, 1.3vw, 13px)",
          color: "var(--text)", lineHeight: "1.7",
          flex: 1,
        }}>
          <span style={{ color: "var(--primary)" }}>&gt; </span>
          {project.description}
        </div>

        {/* Long desc (for wide cards) */}
        {isWide && project.longDesc && (
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "12px",
            color: "var(--text-muted)", lineHeight: "1.7",
            paddingLeft: "12px",
            borderLeft: "2px solid var(--border)",
          }}>
            {project.longDesc}
          </div>
        )}

        {/* Tech deps */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "10px",
            color: "var(--text-muted)", marginRight: "4px", letterSpacing: "1px",
          }}>
            {t("projects.deps")}:
          </span>
          {project.tech.map((tech, i) => (
            <span key={i} style={{
              fontFamily: "var(--font-mono)", fontSize: "10px",
              padding: "2px 8px",
              border: "1px solid var(--border)",
              color: "var(--secondary)",
              borderRadius: "3px",
            }}>
              [{tech}]
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-terminal"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              aria-label={`Code source de ${project.name}`}
              style={{ fontSize: "11px", padding: "7px 14px" }}
            >
              <GitBranch size={13} />
              {t("projects.clone")}
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-terminal secondary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              aria-label={`Demo de ${project.name}`}
              style={{ fontSize: "11px", padding: "7px 14px" }}
            >
              <ExternalLink size={13} />
              {t("projects.demo")}
            </motion.a>
          )}
          {!project.github && !project.demo && (
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "11px",
              color: "var(--text-dim)", padding: "7px 0",
            }}>
              [PRIVATE REPOSITORY]
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useTranslation();
  const [ref, isVisible] = useIntersectionObserver(0.1);
  const cmdTyped = useTypewriter(t("projects.cmd"), 40, isVisible);

  return (
    <section id="projects" ref={ref} aria-label="Projets" style={{ position: "relative", zIndex: 10, padding: "var(--section-py) 24px" }}>
      <div className="container">
        {/* Section header */}
        <div className="term-cmd" style={{ marginBottom: "64px" }}>
          {cmdTyped}
        </div>

        {/* Directory listing header */}
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "11px",
          color: "var(--text-dim)", marginBottom: "32px",
          paddingBottom: "8px", borderBottom: "1px solid var(--border)",
        }}>
          total {projects.length} &nbsp;&nbsp; drwxr-xr-x nisrine staff &nbsp; ./projects/
        </div>

        {/* Masonry grid */}
        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
