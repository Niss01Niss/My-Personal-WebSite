// src/components/Contact.jsx — SSH terminal aesthetic
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { GitBranch, Link, Mail } from "lucide-react";
import { personal } from "../data/portfolio";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useTypewriter } from "../hooks/useTypewriter";

export default function Contact() {
  const { t } = useTranslation();
  const [ref, isVisible] = useIntersectionObserver(0.1);
  const cmdTyped = useTypewriter(t("contact.cmd"), 40, isVisible);

  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error"

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1200));
    if (form.email.includes("@")) {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
    setTimeout(() => setStatus(null), 4000);
  }

  const socialLinks = [
    {
      href: personal.github,
      label: t("contact.github"),
      icon: <GitBranch size={14} />,
      color: "var(--primary)",
    },
    {
      href: personal.linkedin,
      label: t("contact.linkedin"),
      icon: <Link size={14} />,
      color: "var(--secondary)",
    },
    {
      href: `mailto:${personal.email}`,
      label: t("contact.email_link"),
      icon: <Mail size={14} />,
      color: "var(--danger)",
    },
  ];

  return (
    <section id="contact" ref={ref} aria-label="Contact" style={{ position: "relative", zIndex: 10, padding: "var(--section-py) 24px" }}>
      <div className="container">
        {/* Section header */}
        <div className="term-cmd" style={{ marginBottom: "32px" }}>
          {cmdTyped}
        </div>

        {/* Connection established */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          style={{
            fontFamily: "var(--font-mono)", fontSize: "13px",
            color: "var(--primary)", marginBottom: "56px",
            display: "flex", alignItems: "center", gap: "10px",
          }}
        >
          <span style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: "var(--primary)",
            animation: "pulseGreen 2s ease-in-out infinite",
            display: "inline-block",
          }} />
          {t("contact.secure")}
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "48px" }} className="contact-grid">
          {/* LEFT — Contact form */}
          <motion.div
            className="term-card"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="term-titlebar">
              <div className="term-dot red" />
              <div className="term-dot yellow" />
              <div className="term-dot green" />
              <span className="term-titlebar-label">message.sh</span>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: "28px 24px" }}>
              {/* Name */}
              <div style={{ marginBottom: "24px" }}>
                <label
                  htmlFor="contact-name"
                  style={{
                    display: "block", fontFamily: "var(--font-mono)", fontSize: "13px",
                    color: "var(--secondary)", marginBottom: "8px",
                  }}
                >
                  {t("contact.name_label")}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  className="term-input"
                  placeholder={t("contact.name_placeholder")}
                  value={form.name}
                  onChange={handleChange}
                  required
                  aria-label={t("contact.name_label")}
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: "24px" }}>
                <label
                  htmlFor="contact-email"
                  style={{
                    display: "block", fontFamily: "var(--font-mono)", fontSize: "13px",
                    color: "var(--secondary)", marginBottom: "8px",
                  }}
                >
                  {t("contact.email_label")}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className="term-input"
                  placeholder={t("contact.email_placeholder")}
                  value={form.email}
                  onChange={handleChange}
                  required
                  aria-label={t("contact.email_label")}
                />
              </div>

              {/* Message */}
              <div style={{ marginBottom: "28px" }}>
                <label
                  htmlFor="contact-message"
                  style={{
                    display: "block", fontFamily: "var(--font-mono)", fontSize: "13px",
                    color: "var(--secondary)", marginBottom: "8px",
                  }}
                >
                  {t("contact.msg_label")}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="term-input"
                  placeholder={t("contact.msg_placeholder")}
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  aria-label={t("contact.msg_label")}
                />
              </div>

              {/* Status messages */}
              {status === "sent" && (
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "13px",
                  color: "var(--primary)", marginBottom: "16px",
                }}>
                  ✓ {t("contact.success")}
                </div>
              )}
              {status === "error" && (
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "13px",
                  color: "var(--danger)", marginBottom: "16px",
                }}>
                  ✗ {t("contact.error")}
                </div>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                className="btn-terminal"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={status === "sending"}
                style={{ width: "100%", justifyContent: "center" }}
                aria-label={t("contact.send")}
              >
                {status === "sending" ? "$ ./sending..." : t("contact.send")}
              </motion.button>
            </form>
          </motion.div>

          {/* RIGHT — Social links + info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35 }}
            style={{ display: "flex", flexDirection: "column", gap: "32px" }}
          >
            {/* Social */}
            <div>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "11px",
                color: "var(--text-muted)", marginBottom: "20px",
                letterSpacing: "2px",
              }}>
                {t("contact.social_title")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {socialLinks.map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="term-card"
                    whileHover={{ x: 6, borderColor: s.color }}
                    style={{
                      padding: "14px 20px",
                      textDecoration: "none",
                      display: "flex", alignItems: "center", gap: "14px",
                      transition: "border-color 0.2s",
                    }}
                    aria-label={s.label}
                  >
                    <span style={{ color: s.color }}>{s.icon}</span>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: "14px",
                      color: s.color,
                    }}>
                      {s.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Direct email */}
            <div className="term-card" style={{ padding: "20px" }}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "11px",
                color: "var(--text-muted)", marginBottom: "10px",
                letterSpacing: "2px",
              }}>
                // DIRECT CONTACT
              </div>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "14px",
                color: "var(--primary)",
              }}>
                {personal.email}
              </div>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "12px",
                color: "var(--text-muted)", marginTop: "8px",
              }}>
                {personal.location}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .contact-grid { grid-template-columns: 1fr 380px !important; }
        }
      `}</style>
    </section>
  );
}
