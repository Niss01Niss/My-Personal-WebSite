// src/data/portfolio.js
// ─── All CV data for Nisrine Amesjoun ────────────────────────────────────────

export const personal = {
  name: "Nisrine Amesjoun",
  initials: "NA",
  title: "Ingénieure Cybersécurité Junior",
  titles: [
    "Analyste SOC",
    "Experte en Audit IT",
    "Spécialiste en Détection d'Intrusions",
    "Ingénieure Cybersécurité",
    "Développeuse SecDevOps",
  ],
  tagline:
    "Rigoureuse et analytique, je mets l'expertise technique au service de la sécurité et de la gestion des risques.",
  email: "nisrineamesjoun@gmail.com",
  phone: null,
  phoneDisplay: "Disponible sur demande",
  location: "Casablanca, Maroc — 20400",
  bio: [
    "Bientôt ingénieure en Cybersécurité à l'ENSIASD, je combine une expertise solide en analyse de données, détection d'intrusions et sécurité des systèmes d'information. Mon parcours m'a permis de développer des compétences pointues tant sur le plan offensif que défensif.",
    "Mes expériences en SOC, développement sécurisé et administration de bases de données m'ont appris à allier rigueur technique et vision stratégique. Je m'intéresse particulièrement à l'application de l'intelligence artificielle pour renforcer la détection des menaces en temps réel.",
    "Passionnée par les défis technologiques, je participe activement à des CTF et hackathons, et je souhaite aujourd'hui mettre cette expertise technique au service de l'Audit IT pour optimiser la gestion des risques et le contrôle interne.",
  ],
  stats: [
    { value: "4+", label: "Expériences Pro" },
    { value: "3", label: "Projets Majeurs" },
    { value: "15+", label: "Technologies" },
    { value: "2", label: "Certifications CISCO" },
  ],
  cvFile: "/CV_NISRINE_AMESJOUN.pdf",
  github: "https://github.com/Niss01Niss",
  linkedin: "https://www.linkedin.com/in/nisrine-amesjoun",
};

export const experiences = [
  {
    id: 1,
    role: "Analyste en Cybersécurité",
    company: "Ineos Cyberdefense",
    location: "Casablanca, Maroc",
    period: "Février 2026 — Août 2026",
    duration: "6 mois",
    type: "Stage",
    description:
      "Conception d'un système de détection d'intrusions (IDS) basé sur l'intelligence artificielle pour la protection des réseaux d'entreprise.",
    bullets: [
      "Développement d'un IDS basé sur des Graph Neural Networks (GNN) pour la détection d'anomalies réseau",
      "Intégration de techniques d'Explainability (XAI) pour la transparence des décisions du modèle",
      "Orchestration SOAR pour l'automatisation de la réponse aux incidents",
      "Déploiement containerisé avec Docker pour une mise en production scalable",
    ],
    tech: ["Python", "Scikit-learn", "PyTorch", "TensorFlow", "GNN", "Docker", "SOAR", "XAI"],
    color: "#00B4D8",
  },
  {
    id: 2,
    role: "Analyste SOC",
    company: "ArcaShield — Groupe Corporate Software",
    location: "Casablanca, Maroc",
    period: "Juin 2025 — Septembre 2025",
    duration: "3 mois",
    type: "Stage",
    description:
      "Mise en place d'une cellule de veille pour la détection et l'analyse contextualisée des menaces émergentes et critiques.",
    bullets: [
      "Conception d'un système de veille automatisé pour la surveillance des menaces en temps réel",
      "Mise en place d'alertes intelligentes via intégration SMTP et MFA",
      "Utilisation de Raspberry Pi comme infrastructure de monitoring locale",
      "Automatisation des workflows de sécurité avec n8n et Supabase",
    ],
    tech: ["n8n", "Supabase", "Raspberry Pi", "MFA", "SMTP", "Threat Intelligence"],
    color: "#0077B6",
  },
  {
    id: 3,
    role: "Développeuse Full Stack",
    company: "MED YOU IN",
    location: "Meknès, Maroc",
    period: "Avril 2023 — Juillet 2023",
    duration: "3 mois",
    type: "Stage",
    description:
      "Conception et déploiement de la plateforme DabaPermis : développement d'interfaces réactives et d'API sécurisées.",
    bullets: [
      "Développement front-end réactif avec React et Livewire",
      "Conception d'API RESTful sécurisées documentées avec Swagger/OpenAPI",
      "Mise en place de contrôles d'accès et d'audit des flux de données",
      "Tests d'API avec Postman et intégration Node.js",
    ],
    tech: ["Laravel", "Livewire", "React", "Node.js", "Postman", "Swagger", "OpenAPI"],
    color: "#74C69D",
  },
  {
    id: 4,
    role: "Administratrice des Bases de Données",
    company: "AREF",
    location: "Guelmim, Maroc",
    period: "Juin 2022 — Septembre 2022",
    duration: "3 mois",
    type: "Stage",
    description:
      "Digitalisation et sécurisation des processus administratifs via la création d'une application de gestion d'archives.",
    bullets: [
      "Développement d'une application de gestion d'archives documentaires",
      "Conception et optimisation de bases de données MySQL/PostgreSQL",
      "Sécurisation des données et des accès applicatifs",
      "Implémentation d'interfaces Bootstrap responsives",
    ],
    tech: ["PHP", "Laravel", "Livewire", "MySQL", "PostgreSQL", "Bootstrap", "Git"],
    color: "#1B4332",
  },
];

export const projects = [
  {
    id: 1,
    name: "Plateforme d'Audit de Sécurité Réseau",
    category: "Sécurité",
    description:
      "Outil de scan automatisé des vulnérabilités avec tests de pénétration automatisés et génération de rapports détaillés.",
    longDesc:
      "Développement d'une plateforme complète d'audit de sécurité réseau intégrant scanning automatisé, détection de vulnérabilités et génération de rapports professionnels.",
    tech: ["Python", "Nmap", "OpenVAS", "Docker"],
    github: null,
    demo: null,
    icon: "🛡️",
    featured: true,
  },
  {
    id: 2,
    name: "Analyse de Vulnérabilités des LLMs",
    category: "IA & Sécurité",
    description:
      "Techniques de test par injection de prompts, analyse des vecteurs d'attaque et implémentation de contre-mesures pour LLMs.",
    longDesc:
      "Recherche avancée sur la sécurité des modèles de langage : développement de techniques de jailbreak, analyse des vecteurs d'attaque et proposition de contre-mesures adaptées.",
    tech: ["Gpt4ALL", "Hugging Face", "Llama", "GPT", "Mistral"],
    github: null,
    demo: null,
    icon: "🤖",
    featured: true,
  },
  {
    id: 3,
    name: "Solution SIEM Open-Source",
    category: "SOC",
    description:
      "Configuration complète d'une stack ELK pour corrélation d'événements et alerting automatisé pour incidents critiques.",
    longDesc:
      "Déploiement et configuration d'une infrastructure SIEM open-source complète avec la stack ELK augmentée de Wazuh pour la détection et la réponse aux incidents.",
    tech: ["Elasticsearch", "Logstash", "Kibana", "Wazuh"],
    github: "https://github.com/Niss01Niss/SOC_Monitiring_Alerting",
    demo: null,
    icon: "📊",
    featured: true,
  },
  {
    id: 4,
    name: "IDS basé sur l'IA (GAT + Zero-Day)",
    category: "IA & Sécurité",
    description:
      "Système de détection d'intrusions basé sur des Graph Attention Networks avec détection Zero-Day et explicabilité (XAI).",
    longDesc:
      "Développement d'un IDS avancé utilisant les Graph Attention Networks (GAT) pour la détection d'anomalies réseau et la détection d'attaques Zero-Day, avec intégration XAI.",
    tech: ["Python", "PyTorch", "GNN", "XAI", "Docker", "SOAR"],
    github: "https://github.com/Niss01Niss/IDS-Gat-ZeroDay",
    demo: null,
    icon: "🔍",
    featured: true,
  },
];

export const skillCategories = [
  {
    id: "governance",
    title: "Gouvernance & Audit",
    icon: "📋",
    skills: ["ISO 27001", "NIST", "PCI-DSS", "CIS Controls", "RGPD", "MASVS"],
  },
  {
    id: "network",
    title: "Sécurité Réseaux",
    icon: "🌐",
    skills: ["IDS/IPS", "VPN", "SSL/TLS", "IPSec", "Firewalls", "Zero Trust", "Segmentation réseau"],
  },
  {
    id: "offensive",
    title: "Sécurité Offensive & Défensive",
    icon: "⚔️",
    skills: ["Nmap", "Metasploit", "Burp Suite", "Nessus", "OpenVAS", "Tests de pénétration", "Analyse de malware"],
  },
  {
    id: "dev",
    title: "Développement",
    icon: "💻",
    skills: ["Python", "Java", "Laravel", "C++", "React", "PowerShell", "Bash"],
  },
  {
    id: "devsecops",
    title: "DevSecOps",
    icon: "🔄",
    skills: ["CI/CD sécurisés", "Docker", "Ansible", "Terraform", "Infrastructure as Code"],
  },
  {
    id: "cloud",
    title: "Cloud Security",
    icon: "☁️",
    skills: ["Sécurité AWS", "Sécurité Azure", "IAM Cloud", "Hardening", "Surveillance et monitoring"],
  },
  {
    id: "siem",
    title: "SIEM & SOC",
    icon: "🔍",
    skills: ["Elasticsearch", "Logstash", "Kibana", "Wazuh", "Splunk", "Threat Intelligence", "Réponse aux incidents"],
  },
];

export const education = [
  {
    id: 1,
    degree: "Diplôme d'Ingénieur d'État",
    field: "Sécurité IT et Confiance Numérique",
    institution: "ENSIASD — École Nationale Supérieure de l'Intelligence Artificielle et Sciences des Données",
    location: "Taroudannt, Maroc",
    period: "Depuis septembre 2023",
    status: "En cours",
    icon: "🎓",
  },
  {
    id: 2,
    degree: "DUT en Génie Informatique",
    field: "Génie Informatique",
    institution: "ESTM — École Supérieure de Technologie",
    location: "Meknès, Maroc",
    period: "Septembre 2021 — Juin 2023",
    status: "Obtenu",
    icon: "🏛️",
  },
  {
    id: 3,
    degree: "Baccalauréat International",
    field: "Sciences Physiques — Option Française",
    institution: "Lycée El Mansour Eddahbi",
    location: "Casablanca, Maroc",
    period: "Septembre 2020 — Juin 2021",
    status: "Obtenu",
    icon: "📚",
  },
];

export const certifications = [
  {
    id: 1,
    title: "CISCO Ethical Hacking",
    issuer: "Cisco Networking Academy",
    icon: "🔐",
    color: "#00B4D8",
  },
  {
    id: 2,
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    icon: "🛡️",
    color: "#0077B6",
  },
  {
    id: 3,
    title: "CCNA",
    issuer: "Cisco Networking Academy",
    note: "Formation suivie",
    icon: "🌐",
    color: "#74C69D",
  },
];

export const languages = [
  { name: "Arabe", level: "Maternelle", percent: 100 },
  { name: "Français", level: "B2", percent: 80 },
  { name: "Anglais", level: "B2", percent: 80 },
];

export const interests = [
  { label: "Hackathons & Tech Events", icon: "🏆" },
  { label: "CTF Challenges", icon: "🚩" },
  { label: "Normes de Sécurité", icon: "📖" },
  { label: "Photographie", icon: "📷" },
];
