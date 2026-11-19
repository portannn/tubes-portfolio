export const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

/**
 * Character roster data for the portfolio.
 * Customize bios, avatarUrl, projects, experience, and contact details below.
 */
export const CHARACTERS = [
  {
    id: 'dio',
    code: '01',
    name: 'Dio',
    role: 'Full-Stack Developer',
    classTitle: 'System Architect',
    tagline: 'Crafting scalable web architectures with crisp interactive interfaces.',
    accentHex: '#a855f7',
    secondaryHex: '#6d28d9',
    accentRgb: '168, 85, 247',
    avatarUrl: null,
    stats: [
      { label: 'Frontend', value: 94 },
      { label: 'Backend', value: 89 },
      { label: 'UI Design', value: 86 },
    ],
    topSkills: ['Vue.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    about: {
      headline: 'Building resilient full-stack systems & fluid user experiences.',
      bio: 'A passionate full-stack developer focused on bridging clean backend engineering with responsive, high-craft frontend interfaces. Enjoys designing modular Vue.js applications, REST/GraphQL APIs, and smooth micro-interactions.',
      location: 'Indonesia',
      status: 'Available for Collaboration',
      focus: 'Full-Stack Web & Architecture',
    },
    experience: [
      {
        period: '2025 — Present',
        title: 'Lead Full-Stack Developer',
        organization: 'Tubes Portfolio Collective',
        description:
          'Architected the core Vue 3 application structure, component design system, and unified data layer for the team portfolio platform.',
      },
      {
        period: '2024 — 2025',
        title: 'Web Engineering Intern',
        organization: 'Digital Studio Lab',
        description:
          'Developed interactive dashboards, optimized bundle sizes, and built reusable state management patterns across client applications.',
      },
    ],
    education: [
      {
        period: '2023 — Present',
        degree: 'Bachelor of Informatics / Computer Science',
        institution: 'University Informatics Program',
        highlights: 'Focus on Software Engineering, Web Systems, and Human-Computer Interaction.',
      },
    ],
    projects: [
      {
        title: 'Nebula Character Portfolio',
        category: 'Vue 3 • Interactive UI',
        description:
          'Multi-character portfolio portal featuring ambient aurora shaders, keyboard-accessible character selection, and dynamic theme tinting.',
        tech: ['Vue 3', 'Vite', 'CSS Architecture'],
        link: '#projects',
      },
      {
        title: 'TaskFlow API & Dashboard',
        category: 'Full-Stack Web App',
        description:
          'Real-time project board with role-based permissions, sprint analytics, and clean RESTful endpoints.',
        tech: ['TypeScript', 'Node.js', 'PostgreSQL'],
        link: '#projects',
      },
    ],
    skills: [
      { name: 'Vue.js / Composition API', level: 95 },
      { name: 'JavaScript / TypeScript', level: 92 },
      { name: 'Node.js & Express', level: 88 },
      { name: 'SQL & Database Design', level: 85 },
      { name: 'UI Systems & Animation', level: 87 },
    ],
    contact: {
      email: 'dio@portfolio.dev',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'fahmi',
    code: '02',
    name: 'Fahmi',
    role: 'Frontend & Motion Dev',
    classTitle: 'Motion Illusionist',
    tagline: 'Turning static wireframes into silky-smooth interactive web journeys.',
    accentHex: '#818cf8',
    secondaryHex: '#4f46e5',
    accentRgb: '129, 140, 248',
    avatarUrl: null,
    stats: [
      { label: 'Frontend', value: 96 },
      { label: 'Motion', value: 93 },
      { label: 'Backend', value: 78 },
    ],
    topSkills: ['Vue 3', 'GSAP / CSS', 'Tailwind', 'Vite'],
    about: {
      headline: 'Obsessed with 60fps transitions, micro-interactions, and visual polish.',
      bio: 'A frontend engineer specializing in expressive layouts, responsive typography, and fluid browser animations. Focused on making every click, hover, and page transition feel intentional and effortless.',
      location: 'Indonesia',
      status: 'Open for Creative Projects',
      focus: 'Frontend Engineering & Motion',
    },
    experience: [
      {
        period: '2025 — Present',
        title: 'Frontend & Animation Specialist',
        organization: 'Tubes Portfolio Collective',
        description:
          'Designed the kinetic transition choreography, responsive card hover glows, and accessible keyboard navigation flows.',
      },
      {
        period: '2024 — 2025',
        title: 'Freelance Frontend Developer',
        organization: 'Independent',
        description:
          'Delivered modern landing pages and interactive product showcases with high Lighthouse performance scores.',
      },
    ],
    education: [
      {
        period: '2023 — Present',
        degree: 'Bachelor of Informatics / Computer Science',
        institution: 'University Informatics Program',
        highlights: 'Active in Frontend Guild and UI Engineering workshops.',
      },
    ],
    projects: [
      {
        title: 'Kinetic Glass UI Kit',
        category: 'Design System',
        description:
          'Lightweight glassmorphic Vue component library featuring adaptive blur layers and zero-jank CSS transitions.',
        tech: ['Vue 3', 'CSS Variables', 'Motion'],
        link: '#projects',
      },
      {
        title: 'Aurora Audio Visualizer',
        category: 'Creative Coding',
        description:
          'Browser-based real-time waveform and ambient gradient generator driven by Web Audio API.',
        tech: ['JavaScript', 'Canvas', 'Web Audio'],
        link: '#projects',
      },
    ],
    skills: [
      { name: 'Vue 3 & Pinia', level: 94 },
      { name: 'Modern CSS & Transitions', level: 96 },
      { name: 'Interactive Prototyping', level: 90 },
      { name: 'Web Performance & A11y', level: 88 },
      { name: 'REST API Integration', level: 82 },
    ],
    contact: {
      email: 'fahmi@portfolio.dev',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'triztan',
    code: '03',
    name: 'Triztan',
    role: 'Backend & Cloud Engineer',
    classTitle: 'Cyber Sentinel',
    tagline: 'Engineering fast APIs, clean data pipelines, and reliable deployments.',
    accentHex: '#e879f9',
    secondaryHex: '#a21caf',
    accentRgb: '232, 121, 249',
    avatarUrl: null,
    stats: [
      { label: 'Backend', value: 95 },
      { label: 'DevOps', value: 90 },
      { label: 'Frontend', value: 80 },
    ],
    topSkills: ['Node.js', 'Go / Python', 'Docker', 'Redis'],
    about: {
      headline: 'Designing dependable infrastructure, low-latency APIs, and secure systems.',
      bio: 'A backend and cloud-focused developer who thrives on clean architecture, database indexing, container orchestration, and observability. Keeps applications fast, secure, and ready to scale.',
      location: 'Indonesia',
      status: 'Building Scalable Backends',
      focus: 'Backend Systems & Cloud',
    },
    experience: [
      {
        period: '2025 — Present',
        title: 'Backend & Infrastructure Lead',
        organization: 'Tubes Portfolio Collective',
        description:
          'Structured data schemas, modular asset workflows, and build optimization pipelines for fast production delivery.',
      },
      {
        period: '2024 — 2025',
        title: 'Backend Lab Assistant',
        organization: 'Campus Computing Lab',
        description:
          'Mentored peers on REST API design, authentication security, Docker containers, and database normalization.',
      },
    ],
    education: [
      {
        period: '2023 — Present',
        degree: 'Bachelor of Informatics / Computer Science',
        institution: 'University Informatics Program',
        highlights: 'Focus on Distributed Systems, Network Security, and Cloud Computing.',
      },
    ],
    projects: [
      {
        title: 'Sentinel Auth Gateway',
        category: 'Security & Backend',
        description:
          'Stateless JWT & session gateway with rate limiting, audit logging, and clean service-to-service verification.',
        tech: ['Go', 'Redis', 'Docker'],
        link: '#projects',
      },
      {
        title: 'Pulse Metrics Collector',
        category: 'Observability Tool',
        description:
          'Lightweight telemetry aggregator tracking API latency percentiles and service health checks in real time.',
        tech: ['Node.js', 'PostgreSQL', 'Vite'],
        link: '#projects',
      },
    ],
    skills: [
      { name: 'Node.js / Go APIs', level: 95 },
      { name: 'PostgreSQL & Redis', level: 91 },
      { name: 'Docker & CI/CD', level: 89 },
      { name: 'Auth & Security Best Practices', level: 90 },
      { name: 'Vue.js Frontend Basics', level: 80 },
    ],
    contact: {
      email: 'triztan@portfolio.dev',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'seto',
    code: '04',
    name: 'Seto',
    role: 'UI/UX & Creative Dev',
    classTitle: 'Visual Artisan',
    tagline: 'Shaping atmospheric aesthetics, typography, and intuitive product flows.',
    accentHex: '#c084fc',
    secondaryHex: '#db2777',
    accentRgb: '192, 132, 252',
    avatarUrl: null,
    stats: [
      { label: 'UI/UX', value: 96 },
      { label: 'Frontend', value: 88 },
      { label: 'Branding', value: 92 },
    ],
    topSkills: ['Figma', 'Vue.js', 'Design Systems', 'SVG Art'],
    about: {
      headline: 'Blending editorial typography, dark-mode atmospheres, and human-centered UX.',
      bio: 'A creative developer and UI/UX designer passionate about visual storytelling, clean grid balance, and memorable user journeys. Translates Figma concepts straight into crisp, accessible Vue components.',
      location: 'Indonesia',
      status: 'Available for Design & Code',
      focus: 'UI/UX Design & Creative Dev',
    },
    experience: [
      {
        period: '2025 — Present',
        title: 'Product Designer & Creative Dev',
        organization: 'Tubes Portfolio Collective',
        description:
          'Crafted the obsidian-aurora visual direction, character emblem illustrations, and spacing/typography scale.',
      },
      {
        period: '2024 — 2025',
        title: 'UI/UX Designer',
        organization: 'Campus Tech Community',
        description:
          'Led user research, wireframing, and high-fidelity prototyping for student event portals and mobile apps.',
      },
    ],
    education: [
      {
        period: '2023 — Present',
        degree: 'Bachelor of Informatics / Computer Science',
        institution: 'University Informatics Program',
        highlights: 'Concentrating on Interaction Design, Visual Computing, and Frontend Craft.',
      },
    ],
    projects: [
      {
        title: 'Obsidian Editorial System',
        category: 'Brand & UI System',
        description:
          'Comprehensive dark-theme design tokens, glassmorphic elevations, and modular SVG iconography set.',
        tech: ['Figma', 'Design Tokens', 'SVG'],
        link: '#projects',
      },
      {
        title: 'Persona Interactive Showcase',
        category: 'Creative Web',
        description:
          'Responsive portfolio template allowing teams to present individual character cards inside one cohesive visual universe.',
        tech: ['Vue 3', 'CSS Grid', 'Typography'],
        link: '#projects',
      },
    ],
    skills: [
      { name: 'UI/UX & Product Design', level: 96 },
      { name: 'Figma & Design Systems', level: 95 },
      { name: 'HTML / CSS / Vue Templates', level: 89 },
      { name: 'SVG Illustration & Visuals', level: 92 },
      { name: 'Usability Testing', level: 86 },
    ],
    contact: {
      email: 'seto@portfolio.dev',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
]
