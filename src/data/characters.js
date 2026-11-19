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
    fullName: 'Mohamad Dio Ridian',
    role: 'System Analyst, Web Developer & UI/UX Designer',
    classTitle: 'System Analyst',
    tagline:
      'Analyzing business needs, developing scalable web applications, and designing user-centered digital experiences.',
    accentHex: '#a855f7',
    secondaryHex: '#6d28d9',
    accentRgb: '168, 85, 247',
    avatarUrl: null,
    stats: [
      { label: 'System Analysis', value: 94 },
      { label: 'Web Dev', value: 90 },
      { label: 'UI/UX Design', value: 92 },
    ],
    topSkills: ['Laravel', 'React / Next.js', 'Figma', 'Visual Paradigm'],
    about: {
      headline: 'Bridging business objectives and technical implementation.',
      paragraphs: [
        'Passionate System Analyst, Web Developer, and UI/UX Designer with a strong interest in analyzing business needs, developing scalable web applications, and designing user-centered digital experiences. Experienced in gathering and documenting system requirements, modeling business processes, designing intuitive user interfaces, and building responsive web solutions.',
        'Skilled in system analysis, business process modeling, web development, Figma, and data analysis, with the ability to bridge business objectives and technical implementation. Committed to continuous learning and leveraging emerging technologies to create innovative, efficient, and impactful digital products.',
      ],
      location: 'Jakarta, Indonesia',
      status: 'Open for Opportunities',
      focus: 'System Analysis, Web Dev & UI/UX',
    },
    experience: [
      {
        period: 'Jul 2026 - Sep 2026',
        type: 'Internship',
        title: 'Stack Web Developer Intern',
        organization: 'Vocational High School 1 Barunawati Jakarta',
        description:
          'Collaborated to design and develop a web-based Learning Management System (LMS). Designed system architecture with UML diagrams, built frontend and backend components, and prepared comprehensive technical documentation.',
      },
      {
        period: 'Jun 2025 - Sep 2025',
        type: 'Internship',
        title: 'Full Stack Database Developer Intern',
        organization: 'Islamic Elementary School Al-Muddatsiriyah',
        description:
          'Contributed to the design and development of a web-based Student Database Management System. Utilized Visual Paradigm for system modeling, Laravel for development, and Figma for UI/UX design.',
      },
      {
        period: 'Feb 2023 - Aug 2024',
        type: 'Community',
        title: 'GDSC on Campus, Telkom University Jakarta Chapter',
        organization: 'Telkom University Jakarta',
        description:
          'Part of a technology-focused student community that provided opportunities to expand knowledge, explore new technologies, and connect with fellow students interested in software development and digital innovation.',
      },
      {
        period: 'Feb 2022 - May 2022',
        type: 'Field Work Practice',
        title: 'Graphic Design Intern',
        organization: 'Universitas Indonesia Membangun (INABA)',
        description:
          'Created and edited visual content for student recruitment and promotional activities. Utilized Adobe Photoshop, CorelDRAW, and Filmora to produce engaging visual and video content.',
      },
    ],
    education: [
      {
        period: '2023 – 2027',
        type: 'University',
        degree: 'Information Systems',
        institution: 'Telkom University Jakarta',
        highlights:
          'Studying Information Systems with a focus on business process analysis, system development, database management, and information technology. Developing skills in analyzing business requirements, designing effective digital solutions, and integrating technology to improve organizational processes and efficiency.',
      },
      {
        period: '2020 – 2023',
        type: 'Vocational High School',
        degree: 'Multimedia',
        institution: 'Vocational High School 1 Barunawati Jakarta',
        highlights:
          'Studied Multimedia with a focus on graphic design, visual communication, video production, and digital media. Developed practical skills in creating visual content, editing multimedia projects, and applying creative design principles across digital platforms.',
      },
    ],
    projects: [
      {
        title: 'Subsense',
        category: 'TechSprint Innovation Cup 2026',
        description:
          'Subscription management & financial tracking app designed for TechSprint Innovation Cup 2026. Features intuitive interfaces with subscription analytics, smart reminders, and spending dashboards.',
        tech: ['UI/UX', 'Analytics', 'Financial Tracking'],
        link: '#projects',
      },
      {
        title: 'Edura',
        category: 'Mobile E-Learning Platform',
        description:
          'Mobile-based e-learning platform providing affordable and accessible learning. Features structured roadmaps, premium courses, digital certificates, and gamification elements like badges.',
        tech: ['Mobile App', 'Gamification', 'E-Learning'],
        link: '#projects',
      },
      {
        title: 'Finoria',
        category: 'Mobile Banking Application',
        description:
          'Smart and secure mobile banking application focusing on financial inclusion. Features biometric authentication, smart budgeting tools, and financial education modules.',
        tech: ['Fintech', 'Biometrics', 'Smart Budgeting'],
        link: '#projects',
      },
      {
        title: 'QateringGo',
        category: 'Web Catering Marketplace',
        description:
          'Web-based catering marketplace connecting customers, corporate clients, and vendors. Designed seamless workflows for online ordering, digital payments, and real-time order tracking.',
        tech: ['Web Marketplace', 'Payments', 'Order Tracking'],
        link: '#projects',
      },
    ],
    skillGroups: {
      hard: [
        {
          category: 'Frontend',
          items: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Next.js', 'Tailwind CSS'],
        },
        {
          category: 'Backend',
          items: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'Git'],
        },
        {
          category: 'Design & Analysis',
          items: [
            'Figma',
            'Visual Paradigm',
            'Photoshop',
            'CorelDRAW',
            'Filmora',
            'Microsoft Excel',
            'Power BI',
            'Microsoft Word',
          ],
        },
      ],
      soft: [
        {
          category: 'Interpersonal',
          items: ['Communication', 'Teamwork', 'Networking', 'Collaboration'],
        },
        {
          category: 'Self-Management',
          items: [
            'Problem Solving',
            'Time Management',
            'Adaptability',
            'Attention to Detail',
            'Continuous Learning',
          ],
        },
      ],
    },
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
