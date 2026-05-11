// src/components/Navbar.jsx — Terminal Hacker Theme
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { personal } from "../data/portfolio";

const NAV_LINKS = [
  { key: "about",      sectionId: "about"      },
  { key: "experience", sectionId: "experience" },
  { key: "projects",   sectionId: "projects"   },
  { key: "skills",     sectionId: "skills"     },
  { key: "education",  sectionId: "education"  },
  { key: "contact",    sectionId: "contact"    },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang]         = useState(i18n.language === "en" ? "EN" : "FR");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function toggleLang() {
    const next = lang === "FR" ? "en" : "fr";
    i18n.changeLanguage(next);
    localStorage.setItem("portfolio-lang", next);
    setLang(next.toUpperCase());
  }

  function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    setMenuOpen(false);
  }

  const linkStyle = {
    color: "var(--text-muted)",
    textDecoration: "none",
    fontSize: "13px",
    fontFamily: "var(--font-mono)",
    letterSpacing: "0.3px",
    padding: "4px 0",
    transition: "color 0.2s, text-shadow 0.2s",
    whiteSpace: "nowrap",
  };

  return (
    <>
      <motion.nav
        role="navigation"
        aria-label="Navigation principale"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          height: "var(--navbar-h)",
          background: scrolled ? "rgba(2, 8, 16, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--accent)" : "none",
          transition: "all 0.35s ease",
          boxShadow: scrolled ? "0 0 18px var(--accent-glow)" : "none",
        }}
      >
        <div style={{
          maxWidth: "1280px", margin: "0 auto",
          padding: "0 24px", height: "100%",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Monogram logo */}
          <motion.button
            type="button"
            onClick={() => scrollToSection("hero")}
            whileHover={{ scale: 1.05 }}
            aria-label="Accueil"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "none",
              border: "none",
              cursor: "none",
              padding: 0,
            }}
          >
            <div style={{
              width: "42px", height: "42px",
              border: "1px solid var(--accent)",
              background: "var(--accent)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontWeight: "700",
              fontSize: "14px", color: "var(--text)",
              boxShadow: "0 0 16px var(--accent-glow)",
              borderRadius: "3px",
            }}>
              NA
            </div>
            <span className="desktop-only" style={{
              fontFamily: "var(--font-mono)", fontSize: "13px",
              color: "var(--text-muted)", letterSpacing: "0.5px",
            }}>
              nisrine@portfolio<span style={{ color: "var(--primary)" }}>:~$</span>
            </span>
          </motion.button>

          {/* Desktop nav links */}
          <div className="desktop-only" style={{ gap: "24px", alignItems: "center" }}>
            {NAV_LINKS.map((link) => (
              <motion.button
                key={link.key}
                type="button"
                style={{ ...linkStyle, background: "none", border: "none", cursor: "none" }}
                whileHover={{ color: "var(--primary)", textShadow: "0 0 8px var(--primary-glow)" }}
                onClick={() => scrollToSection(link.sectionId)}
              >
                {t(`nav.${link.key}`)}
              </motion.button>
            ))}
          </div>

          {/* Right controls */}
          <div className="desktop-only" style={{ gap: "12px", alignItems: "center" }}>
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              aria-label={`Changer la langue en ${lang === "FR" ? "Anglais" : "Français"}`}
              style={{
                fontFamily: "var(--font-mono)", fontSize: "12px",
                border: "1px solid var(--accent)",
                background: "transparent",
                color: "var(--text-muted)",
                padding: "6px 12px", cursor: "none",
                borderRadius: "3px", letterSpacing: "1px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.target.style.color = "var(--primary)"; e.target.style.borderColor = "var(--primary)"; }}
              onMouseLeave={(e) => { e.target.style.color = "var(--text-muted)"; e.target.style.borderColor = "var(--accent)"; }}
            >
              [ {lang === "FR" ? "FR" : "EN"} | {lang === "FR" ? "EN" : "FR"} ]
            </button>

            {/* Download CV */}
            <motion.a
              href={personal.cvFile}
              download
              className="btn-terminal"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Télécharger le CV"
            >
              {t("nav.download")}
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="mobile-only"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            style={{
              background: "none", border: "1px solid var(--border)",
              cursor: "none", color: "var(--primary)",
              padding: "8px 12px", fontFamily: "var(--font-mono)", fontSize: "14px",
              borderRadius: "3px",
            }}
          >
            {menuOpen ? "[X]" : "[≡]"}
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(2, 8, 16, 0.97)",
              zIndex: 999,
              display: "flex", flexDirection: "column",
              justifyContent: "center", alignItems: "flex-start",
              padding: "40px",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div style={{
              fontSize: "11px", color: "var(--text-muted)",
              letterSpacing: "2px", marginBottom: "40px",
            }}>
              nisrine@portfolio:~$ <span style={{ color: "var(--primary)" }}>ls navigation/</span>
            </div>

            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.key}
                type="button"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => scrollToSection(link.sectionId)}
                style={{
                  color: "var(--text)", textDecoration: "none",
                  fontSize: "clamp(24px, 5vw, 36px)",
                  fontFamily: "var(--font-display)", fontWeight: "700",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--border)",
                  width: "100%",
                  display: "block",
                  letterSpacing: "2px",
                  background: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderTop: "none",
                  textAlign: "left",
                  cursor: "none",
                }}
              >
                <span style={{ color: "var(--primary)", fontSize: "14px", marginRight: "12px" }}>&gt;</span>
                {t(`nav.${link.key}`)}
              </motion.button>
            ))}

            <div style={{ display: "flex", gap: "16px", marginTop: "40px", flexWrap: "wrap" }}>
              <button
                onClick={toggleLang}
                style={{
                  fontFamily: "var(--font-mono)", fontSize: "13px",
                  border: "1px solid var(--border)",
                  background: "transparent",
                  color: "var(--secondary)", padding: "10px 20px",
                  cursor: "none", borderRadius: "3px",
                  letterSpacing: "1px",
                }}
              >
                [ {lang === "FR" ? "FR" : "EN"} | {lang === "FR" ? "EN" : "FR"} ]
              </button>
              <a
                href={personal.cvFile}
                download
                className="btn-terminal"
                onClick={() => setMenuOpen(false)}
              >
                {t("nav.download")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
