/**
 * Resolve bilingual content: string stays as-is, { fr, en } picks by UI language.
 */
export function resolveLang(i18n) {
  const code = (i18n?.language || "fr").split("-")[0].toLowerCase();
  return code === "en" ? "en" : "fr";
}

export function tx(value, lang) {
  if (value == null || value === "") return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && (Object.prototype.hasOwnProperty.call(value, "fr") || Object.prototype.hasOwnProperty.call(value, "en"))) {
    return value[lang] ?? value.fr ?? value.en ?? "";
  }
  return String(value);
}

/** Canonical key for maps keyed by French label (e.g. skill levels). */
export function skillKey(skill) {
  if (typeof skill === "string") return skill;
  if (skill && typeof skill === "object" && skill.fr) return skill.fr;
  return String(skill);
}
