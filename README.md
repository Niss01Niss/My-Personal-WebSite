# 🛡️ Nisrine Amesjoun — Portfolio Cybersécurité

Portfolio professionnel de **Nisrine Amesjoun**, Ingénieure Cybersécurité Junior, développé avec React + Vite + Framer Motion.

---

## 🚀 Démarrage rapide

### Prérequis
- Node.js ≥ 18.x
- npm ≥ 9.x

### Installation & lancement

```bash
# Depuis le répertoire portfolio/
npm install
npm run dev
```

Le site sera disponible sur **http://localhost:5173**

### Build production

```bash
npm run build
# Les fichiers seront dans dist/
npm run preview  # Prévisualiser le build
```

### Tests

```bash
npm run test
```

---

## 📁 Structure du projet

```
portfolio/
├── public/
│   ├── favicon.svg                  # Icône personnalisée NA
│   └── CV_NISRINE_AMESJOUN.pdf      # CV téléchargeable
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               # Navigation sticky + menu mobile
│   │   ├── Hero.jsx                 # Section héro avec typing animation
│   │   ├── About.jsx                # À propos + stats
│   │   ├── Experience.jsx           # Timeline expériences professionnelles
│   │   ├── Skills.jsx               # Compétences techniques par catégorie
│   │   ├── Projects.jsx             # Projets avec filtres
│   │   ├── Education.jsx            # Formation + certifications + langues
│   │   ├── Contact.jsx              # Formulaire de contact
│   │   ├── Footer.jsx               # Pied de page
│   │   ├── SectionTitle.jsx         # Composant titre réutilisable
│   │   └── SocialIcons.jsx          # SVG GitHub + LinkedIn custom
│   ├── data/
│   │   └── portfolio.js             # Toutes les données du CV
│   ├── hooks/
│   │   └── useInView.js             # Hook Intersection Observer
│   ├── App.jsx                      # Composition de la page
│   ├── main.jsx                     # Point d'entrée React
│   └── index.css                    # Styles globaux + thème Tailwind v4
├── index.html                       # HTML avec SEO + Open Graph
├── vite.config.js                   # Config Vite + Tailwind CSS
└── package.json
```

---

## 🎨 Design System

| Token       | Valeur                       |
|-------------|------------------------------|
| Primary     | `#0A1628` (Deep Navy)        |
| Accent      | `#C9A84C` (Gold)             |
| Text        | `#FFFFFF` / `#94A3B8`        |
| Slate       | `#64748B`                    |
| Font Head   | Playfair Display             |
| Font Body   | Inter                        |

---

## ✨ Fonctionnalités

- ✅ **Navbar** sticky avec smooth scroll + menu hamburger mobile animé
- ✅ **Héro** full-viewport avec effet de frappe animé (typing effect)
- ✅ **À Propos** avec avatar, bio et stats
- ✅ **Timeline** des expériences avec animations scroll-triggered
- ✅ **Compétences** en grille avec pills interactifs
- ✅ **Projets** avec filtres par catégorie + hover lift
- ✅ **Formation** avec diplômes, certifications, langues et centres d'intérêt
- ✅ **Contact** avec formulaire mailto + liens sociaux
- ✅ **Footer** minimal
- ✅ Animations Framer Motion sur toutes les sections
- ✅ SEO complet (title, meta, Open Graph)
- ✅ Accessible (aria-labels, keyboard nav)
- ✅ Fully responsive (mobile-first)
- ✅ Téléchargement du CV en un clic
- ✅ Test de smoke (Vitest + Testing Library)

---

## 🛠️ Tech Stack

| Technologie       | Usage                    |
|-------------------|--------------------------|
| React 19          | UI Framework             |
| Vite 8            | Build Tool               |
| Tailwind CSS v4   | Styling (via @theme)     |
| Framer Motion     | Animations               |
| Lucide React      | Iconographie             |

---

## 📝 Personnalisation

Toutes les données du CV sont centralisées dans **`src/data/portfolio.js`**.  
Pour mettre à jour le contenu, modifiez uniquement ce fichier.

Pour les CV PDF : placez **deux fichiers** dans `public/cv/` — `CV_Nisrine_Amesjoun_FR.pdf` et `CV_Nisrine_Amesjoun_EN.pdf` (noms modifiables via `personal.cvFiles` dans `src/data/portfolio.js`). Le téléchargement suit la langue du site (FR / EN).

---

© 2026 Nisrine Amesjoun — Casablanca, Maroc
