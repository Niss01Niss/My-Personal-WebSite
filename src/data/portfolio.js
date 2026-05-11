// src/data/portfolio.js
// ─── CV data — strings as { fr, en } where the UI must switch with i18n ─────

export const personal = {
  name: "Nisrine Amesjoun",
  initials: "NA",
  title: { fr: "Ingénieure Cybersécurité Junior", en: "Junior Cybersecurity Engineer" },
  titles: [
    { fr: "Analyste SOC", en: "SOC Analyst" },
    { fr: "Experte en Audit IT", en: "IT Audit Expert" },
    { fr: "Spécialiste en Détection d'Intrusions", en: "Intrusion Detection Specialist" },
    { fr: "Ingénieure Cybersécurité", en: "Cybersecurity Engineer" },
    { fr: "Développeuse SecDevOps", en: "SecDevOps Developer" },
  ],
  tagline: {
    fr: "Rigoureuse et analytique, je mets l'expertise technique au service de la sécurité et de la gestion des risques.",
    en: "Rigorous and analytical, I apply technical expertise to security and risk management.",
  },
  email: "nisrineamesjoun@gmail.com",
  phone: null,
  phoneDisplay: { fr: "Disponible sur demande", en: "Available on request" },
  location: { fr: "Casablanca, Maroc — 20400", en: "Casablanca, Morocco — 20400" },
  bio: [
    {
      fr: "Bientôt ingénieure en Cybersécurité à l'ENSIASD, je combine une expertise solide en analyse de données, détection d'intrusions et sécurité des systèmes d'information. Mon parcours m'a permis de développer des compétences pointues tant sur le plan offensif que défensif.",
      en: "Soon-to-be cybersecurity engineer at ENSIASD, I combine strong expertise in data analysis, intrusion detection, and information systems security. My path has sharpened both offensive and defensive skills.",
    },
    {
      fr: "Mes expériences en SOC, développement sécurisé et administration de bases de données m'ont appris à allier rigueur technique et vision stratégique. Je m'intéresse particulièrement à l'application de l'intelligence artificielle pour renforcer la détection des menaces en temps réel.",
      en: "My SOC, secure development, and database administration experience taught me to balance technical rigor with strategic vision. I am especially interested in using AI to strengthen real-time threat detection.",
    },
    {
      fr: "Passionnée par les défis technologiques, je participe activement à des CTF et hackathons, et je souhaite aujourd'hui mettre cette expertise technique au service de l'Audit IT pour optimiser la gestion des risques et le contrôle interne.",
      en: "Passionate about technical challenges, I actively take part in CTFs and hackathons, and I want to apply this expertise to IT audit to improve risk management and internal control.",
    },
  ],
  stats: [
    { value: "4+", label: { fr: "Expériences Pro", en: "Pro experiences" } },
    { value: "3", label: { fr: "Projets Majeurs", en: "Major projects" } },
    { value: "15+", label: { fr: "Technologies", en: "Technologies" } },
    { value: "2", label: { fr: "Certifications CISCO", en: "CISCO certifications" } },
  ],
  cvFile: "/CV_NISRINE_AMESJOUN.pdf",
  github: "https://github.com/Niss01Niss",
  linkedin: "https://www.linkedin.com/in/nisrine-amesjoun",
};

const internship = { fr: "Stage", en: "Internship" };

export const experiences = [
  {
    id: 1,
    role: { fr: "Analyste en Cybersécurité", en: "Cybersecurity Analyst" },
    company: "Ineos Cyberdefense",
    location: { fr: "Casablanca, Maroc", en: "Casablanca, Morocco" },
    period: { fr: "Février 2026 — Août 2026", en: "February 2026 — August 2026" },
    duration: { fr: "6 mois", en: "6 months" },
    type: internship,
    description: {
      fr: "Conception d'un système de détection d'intrusions (IDS) basé sur l'intelligence artificielle pour la protection des réseaux d'entreprise.",
      en: "Design of an AI-based intrusion detection system (IDS) for enterprise network protection.",
    },
    bullets: [
      { fr: "Développement d'un IDS basé sur des Graph Neural Networks (GNN) pour la détection d'anomalies réseau", en: "Developed a GNN-based IDS for network anomaly detection" },
      { fr: "Intégration de techniques d'Explainability (XAI) pour la transparence des décisions du modèle", en: "Integrated explainability (XAI) for transparent model decisions" },
      { fr: "Orchestration SOAR pour l'automatisation de la réponse aux incidents", en: "SOAR orchestration for automated incident response" },
      { fr: "Déploiement containerisé avec Docker pour une mise en production scalable", en: "Containerized deployment with Docker for scalable production" },
    ],
    tech: ["Python", "Scikit-learn", "PyTorch", "TensorFlow", "GNN", "Docker", "SOAR", "XAI"],
    color: "#00B4D8",
  },
  {
    id: 2,
    role: { fr: "Analyste SOC", en: "SOC Analyst" },
    company: "ArcaShield — Groupe Corporate Software",
    location: { fr: "Casablanca, Maroc", en: "Casablanca, Morocco" },
    period: { fr: "Juin 2025 — Septembre 2025", en: "June 2025 — September 2025" },
    duration: { fr: "3 mois", en: "3 months" },
    type: internship,
    description: {
      fr: "Mise en place d'une cellule de veille pour la détection et l'analyse contextualisée des menaces émergentes et critiques.",
      en: "Built a threat intelligence cell for detection and contextual analysis of emerging and critical threats.",
    },
    bullets: [
      { fr: "Conception d'un système de veille automatisé pour la surveillance des menaces en temps réel", en: "Automated threat monitoring for real-time surveillance" },
      { fr: "Mise en place d'alertes intelligentes via intégration SMTP et MFA", en: "Smart alerting via SMTP and MFA integration" },
      { fr: "Utilisation de Raspberry Pi comme infrastructure de monitoring locale", en: "Raspberry Pi used as local monitoring infrastructure" },
      { fr: "Automatisation des workflows de sécurité avec n8n et Supabase", en: "Security workflow automation with n8n and Supabase" },
    ],
    tech: ["n8n", "Supabase", "Raspberry Pi", "MFA", "SMTP", "Threat Intelligence"],
    color: "#0077B6",
  },
  {
    id: 3,
    role: { fr: "Développeuse Full Stack", en: "Full Stack Developer" },
    company: "MED YOU IN",
    location: { fr: "Meknès, Maroc", en: "Meknes, Morocco" },
    period: { fr: "Avril 2023 — Juillet 2023", en: "April 2023 — July 2023" },
    duration: { fr: "3 mois", en: "3 months" },
    type: internship,
    description: {
      fr: "Conception et déploiement de la plateforme DabaPermis : développement d'interfaces réactives et d'API sécurisées.",
      en: "Designed and deployed the DabaPermis platform: reactive UIs and secure APIs.",
    },
    bullets: [
      { fr: "Développement front-end réactif avec React et Livewire", en: "Reactive front-end with React and Livewire" },
      { fr: "Conception d'API RESTful sécurisées documentées avec Swagger/OpenAPI", en: "Secure REST APIs documented with Swagger/OpenAPI" },
      { fr: "Mise en place de contrôles d'accès et d'audit des flux de données", en: "Access controls and data-flow auditing" },
      { fr: "Tests d'API avec Postman et intégration Node.js", en: "API testing with Postman and Node.js integration" },
    ],
    tech: ["Laravel", "Livewire", "React", "Node.js", "Postman", "Swagger", "OpenAPI"],
    color: "#74C69D",
  },
  {
    id: 4,
    role: { fr: "Administratrice des Bases de Données", en: "Database Administrator" },
    company: "AREF",
    location: { fr: "Guelmim, Maroc", en: "Guelmim, Morocco" },
    period: { fr: "Juin 2022 — Septembre 2022", en: "June 2022 — September 2022" },
    duration: { fr: "3 mois", en: "3 months" },
    type: internship,
    description: {
      fr: "Digitalisation et sécurisation des processus administratifs via la création d'une application de gestion d'archives.",
      en: "Digitization and securing of administrative processes through an archive management application.",
    },
    bullets: [
      { fr: "Développement d'une application de gestion d'archives documentaires", en: "Document archive management application" },
      { fr: "Conception et optimisation de bases de données MySQL/PostgreSQL", en: "MySQL/PostgreSQL design and optimization" },
      { fr: "Sécurisation des données et des accès applicatifs", en: "Data and application access hardening" },
      { fr: "Implémentation d'interfaces Bootstrap responsives", en: "Responsive Bootstrap interfaces" },
    ],
    tech: ["PHP", "Laravel", "Livewire", "MySQL", "PostgreSQL", "Bootstrap", "Git"],
    color: "#1B4332",
  },
];

export const projects = [
  {
    id: 1,
    name: { fr: "Plateforme d'Audit de Sécurité Réseau", en: "Network Security Audit Platform" },
    category: { fr: "Sécurité", en: "Security" },
    description: {
      fr: "Outil de scan automatisé des vulnérabilités avec tests de pénétration automatisés et génération de rapports détaillés.",
      en: "Automated vulnerability scanning with automated penetration tests and detailed reporting.",
    },
    longDesc: {
      fr: "Développement d'une plateforme complète d'audit de sécurité réseau intégrant scanning automatisé, détection de vulnérabilités et génération de rapports professionnels.",
      en: "Full network security audit platform with automated scanning, vulnerability detection, and professional reports.",
    },
    tech: ["Python", "Nmap", "OpenVAS", "Docker"],
    github: null,
    demo: null,
    icon: "🛡️",
    featured: true,
  },
  {
    id: 2,
    name: { fr: "Analyse de Vulnérabilités des LLMs", en: "LLM Vulnerability Analysis" },
    category: { fr: "IA & Sécurité", en: "AI & Security" },
    description: {
      fr: "Techniques de test par injection de prompts, analyse des vecteurs d'attaque et implémentation de contre-mesures pour LLMs.",
      en: "Prompt injection testing, attack-vector analysis, and LLM countermeasures.",
    },
    longDesc: {
      fr: "Recherche avancée sur la sécurité des modèles de langage : développement de techniques de jailbreak, analyse des vecteurs d'attaque et proposition de contre-mesures adaptées.",
      en: "Advanced LLM security research: jailbreak techniques, attack vectors, and tailored mitigations.",
    },
    tech: ["Gpt4ALL", "Hugging Face", "Llama", "GPT", "Mistral"],
    github: null,
    demo: null,
    icon: "🤖",
    featured: true,
  },
  {
    id: 3,
    name: { fr: "Solution SIEM Open-Source", en: "Open-Source SIEM Solution" },
    category: { fr: "SOC", en: "SOC" },
    description: {
      fr: "Configuration complète d'une stack ELK pour corrélation d'événements et alerting automatisé pour incidents critiques.",
      en: "Full ELK stack for event correlation and automated alerting on critical incidents.",
    },
    longDesc: {
      fr: "Déploiement et configuration d'une infrastructure SIEM open-source complète avec la stack ELK augmentée de Wazuh pour la détection et la réponse aux incidents.",
      en: "Deployed open-source SIEM with ELK plus Wazuh for detection and incident response.",
    },
    tech: ["Elasticsearch", "Logstash", "Kibana", "Wazuh"],
    github: "https://github.com/Niss01Niss/SOC_Monitiring_Alerting",
    demo: null,
    icon: "📊",
    featured: true,
  },
  {
    id: 4,
    name: { fr: "IDS basé sur l'IA (GAT + Zero-Day)", en: "AI-based IDS (GAT + Zero-Day)" },
    category: { fr: "IA & Sécurité", en: "AI & Security" },
    description: {
      fr: "Système de détection d'intrusions basé sur des Graph Attention Networks avec détection Zero-Day et explicabilité (XAI).",
      en: "Intrusion detection with Graph Attention Networks, zero-day detection, and explainability (XAI).",
    },
    longDesc: {
      fr: "Développement d'un IDS avancé utilisant les Graph Attention Networks (GAT) pour la détection d'anomalies réseau et la détection d'attaques Zero-Day, avec intégration XAI.",
      en: "Advanced IDS using GATs for network anomaly and zero-day detection with XAI integration.",
    },
    tech: ["Python", "PyTorch", "GNN", "XAI", "Docker", "SOAR"],
    github: "https://github.com/Niss01Niss/IDS-Gat-ZeroDay",
    demo: null,
    icon: "🔍",
    featured: true,
  },
];

const sk = (fr, en) => ({ fr, en });

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
    skills: ["IDS/IPS", "VPN", "SSL/TLS", "IPSec", "Firewalls", "Zero Trust", sk("Segmentation réseau", "Network segmentation")],
  },
  {
    id: "offensive",
    title: "Sécurité Offensive & Défensive",
    icon: "⚔️",
    skills: ["Nmap", "Metasploit", "Burp Suite", "Nessus", "OpenVAS", sk("Tests de pénétration", "Penetration testing"), sk("Analyse de malware", "Malware analysis")],
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
    skills: [sk("CI/CD sécurisés", "Secure CI/CD"), "Docker", "Ansible", "Terraform", sk("Infrastructure as Code", "Infrastructure as Code")],
  },
  {
    id: "cloud",
    title: "Cloud Security",
    icon: "☁️",
    skills: [sk("Sécurité AWS", "AWS Security"), sk("Sécurité Azure", "Azure Security"), "IAM Cloud", "Hardening", sk("Surveillance et monitoring", "Monitoring & observability")],
  },
  {
    id: "siem",
    title: "SIEM & SOC",
    icon: "🔍",
    skills: ["Elasticsearch", "Logstash", "Kibana", "Wazuh", "Splunk", "Threat Intelligence", sk("Réponse aux incidents", "Incident response")],
  },
];

export const education = [
  {
    id: 1,
    ongoing: true,
    degree: { fr: "Diplôme d'Ingénieur d'État", en: "State Engineering Degree" },
    field: { fr: "Sécurité IT et Confiance Numérique", en: "IT Security & Digital Trust" },
    institution: {
      fr: "ENSIASD — École Nationale Supérieure de l'Intelligence Artificielle et Sciences des Données",
      en: "ENSIASD — National School of Artificial Intelligence and Data Science",
    },
    location: { fr: "Taroudannt, Maroc", en: "Taroudannt, Morocco" },
    period: { fr: "Depuis septembre 2023", en: "Since September 2023" },
    icon: "🎓",
  },
  {
    id: 2,
    ongoing: false,
    degree: { fr: "DUT en Génie Informatique", en: "Associate Degree (DUT) in Computer Science" },
    field: { fr: "Génie Informatique", en: "Computer Science" },
    institution: { fr: "ESTM — École Supérieure de Technologie", en: "ESTM — School of Technology" },
    location: { fr: "Meknès, Maroc", en: "Meknes, Morocco" },
    period: { fr: "Septembre 2021 — Juin 2023", en: "September 2021 — June 2023" },
    icon: "🏛️",
  },
  {
    id: 3,
    ongoing: false,
    degree: { fr: "Baccalauréat International", en: "International Baccalaureate" },
    field: { fr: "Sciences Physiques — Option Française", en: "Physics — French track" },
    institution: { fr: "Lycée El Mansour Eddahbi", en: "El Mansour Eddahbi High School" },
    location: { fr: "Casablanca, Maroc", en: "Casablanca, Morocco" },
    period: { fr: "Septembre 2020 — Juin 2021", en: "September 2020 — June 2021" },
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
    note: { fr: "Formation suivie", en: "Training completed" },
    icon: "🌐",
    color: "#74C69D",
  },
];

export const languages = [
  { name: { fr: "Arabe", en: "Arabic" }, level: { fr: "Maternelle", en: "Native" }, percent: 100 },
  { name: { fr: "Français", en: "French" }, level: { fr: "B2", en: "B2" }, percent: 80 },
  { name: { fr: "Anglais", en: "English" }, level: { fr: "B2", en: "B2" }, percent: 80 },
];

export const interests = [
  { label: { fr: "Hackathons & événements tech", en: "Hackathons & tech events" }, icon: "🏆" },
  { label: { fr: "Défis CTF", en: "CTF challenges" }, icon: "🚩" },
  { label: { fr: "Normes de sécurité", en: "Security standards" }, icon: "📖" },
  { label: { fr: "Photographie", en: "Photography" }, icon: "📷" },
];
