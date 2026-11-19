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
        id: 'lms-intern',
        period: 'Jul 2026 - Sep 2026',
        type: 'Internship',
        title: 'Full Stack Web Developer Intern',
        organization: 'Vocational High School 1 Barunawati Jakarta',
        description:
          'Collaborated to design and develop a web-based Learning Management System (LMS). Designed system architecture with UML diagrams, built frontend and backend components, and prepared comprehensive technical documentation.',
        tools: ['Visual Paradigm', 'UML Modeling', 'UI/UX Design', 'Full-Stack Web', 'Database Integration'],
        details: [
          {
            heading: 'Overview',
            paragraphs: [
              'During my internship at Vocational High School 1 Barunawati, I collaborated with a development team to design and develop a web-based Learning Management System (LMS) aimed at supporting and improving digital learning activities for teachers and students. The project was developed as a practical solution to facilitate the management of learning materials, assignments, assessments, attendance, grades, and other academic activities through an integrated digital platform. Working in a remote environment, I actively participated throughout the software development lifecycle (SDLC), starting from requirements analysis and system planning to system design, implementation, testing, debugging, evaluation, and technical documentation.',
            ],
          },
          {
            heading: 'Analysis & Planning',
            paragraphs: [
              "During the analysis and planning phase, I contributed to identifying the functional requirements of the LMS based on the needs of different users, particularly administrators, teachers, and students. I analyzed the expected workflows and interactions between users and the system to ensure that the proposed features could support the school's learning processes effectively. I also helped translate these requirements into structured system designs and functional specifications that could be used as a reference during the development process.",
            ],
          },
          {
            heading: 'System Architecture & UML Modeling',
            paragraphs: [
              'One of my primary responsibilities was designing and modeling the system architecture using Visual Paradigm. I created and refined various UML diagrams, including Use Case Diagrams, Activity Diagrams, Sequence Diagrams, Class Diagrams, and other supporting system models. These diagrams were used to represent user interactions, business processes, system workflows, object relationships, and functional requirements. Through this process, I gained practical experience in system analysis and design while learning how to transform real-world business requirements into structured technical models that could be understood by both developers and stakeholders.',
            ],
          },
          {
            heading: 'UI/UX Design',
            paragraphs: [
              'I was also involved in designing the UI/UX of the LMS, focusing on creating an intuitive, consistent, and user-friendly interface for different types of users. I considered navigation structure, information hierarchy, layout consistency, usability, accessibility, and responsive design when developing the interface concepts. The design process focused on making important learning features easy to access while reducing unnecessary complexity for teachers and students.',
            ],
          },
          {
            heading: 'Full-Stack Development',
            paragraphs: [
              'On the development side, I contributed to building both the frontend and backend components of the LMS. My responsibilities included implementing user interface components, developing system functionalities, connecting application features with the database, and supporting communication between the user interface and server-side logic. I worked with web development technologies and frameworks to translate the system designs and requirements into functional application features.',
              'Database integration was another important part of my responsibilities. I worked with the database structure to ensure that information generated by different system features could be stored, retrieved, and managed properly.',
            ],
          },
          {
            heading: 'Collaboration & Testing',
            paragraphs: [
              'Throughout the development process, I collaborated closely with my teammate to implement, test, debug, and refine the system. We divided development tasks, discussed technical problems, reviewed system functionality, and evaluated the results of each implementation. When errors or unexpected behaviors occurred, I participated in troubleshooting and debugging to identify the underlying causes and determine appropriate solutions.',
              'I was also involved in the testing and evaluation stage of the project. I reviewed implemented features to ensure that they functioned according to the defined requirements and user workflows.',
            ],
          },
          {
            heading: 'Documentation',
            paragraphs: [
              'In addition to technical development, I prepared comprehensive technical documentation and internship reports throughout the project. The documentation covered the system background, requirements analysis, system architecture, UML modeling, database design, UI/UX design, implementation, testing, evaluation, and conclusions.',
            ],
          },
        ],
      },
      {
        id: 'al-muddatsiriyah-intern',
        period: 'Jun 2025 - Sep 2025',
        type: 'Internship',
        title: 'Full Stack Database Developer Intern',
        organization: 'Islamic Elementary School Al-Muddatsiriyah',
        description:
          'Contributed to the design and development of a web-based Student Database Management System. Utilized Visual Paradigm for system modeling, Laravel for development, and Figma for UI/UX design.',
        tools: ['Laravel', 'MySQL', 'Figma', 'Visual Paradigm', 'Microsoft Excel'],
        details: [
          {
            heading: 'Overview',
            paragraphs: [
              'During my internship at Islamic Elementary School Al-Muddatsiriyah, I was involved in the development of a web-based Student Database Management System designed to improve the organization, management, accessibility, and accuracy of student-related information. The project aimed to provide a more structured digital solution for managing student data and reducing the limitations associated with manual data management. Throughout the internship, I actively contributed to several stages of the software development process, including system analysis, UI/UX design, data management, system implementation, testing, validation, and project documentation.',
            ],
          },
          {
            heading: 'System Analysis',
            paragraphs: [
              'One of my main responsibilities was assisting in the analysis of the existing student data management process. I examined how student information was collected, organized, stored, and accessed to identify potential challenges and areas for improvement. Based on this analysis, I contributed to defining system requirements and determining the necessary functionalities to support more efficient and structured student data management.',
            ],
          },
          {
            heading: 'Laravel Development',
            paragraphs: [
              'On the development side, I utilized Laravel as the primary web development framework to assist in building the student database management website. I contributed to implementing system features and ensuring proper communication between the user interface, backend processes, and database. I also worked with database-related processes, including storing, retrieving, updating, and managing student information. This experience provided me with practical knowledge of backend development and strengthened my understanding of how Laravel-based applications interact with relational databases.',
            ],
          },
          {
            heading: 'Data Validation',
            paragraphs: [
              'I was also responsible for managing and validating student data to help maintain the accuracy, consistency, and reliability of information within the system. This included reviewing existing datasets, identifying incomplete or inconsistent records, organizing student information, and ensuring that data followed the required structure and format. I utilized Microsoft Excel to assist with data preparation, organization, validation, and analysis before the information was integrated into the web-based system.',
            ],
          },
          {
            heading: 'UI/UX Design',
            paragraphs: [
              'In addition to database management, I contributed to the UI/UX design process using Figma. I designed and developed interface concepts and prototypes with a focus on usability, clarity, consistency, and ease of navigation. I considered information hierarchy, layout structure, navigation flow, user interaction, and overall visual consistency to ensure that users could manage and access student information efficiently.',
            ],
          },
          {
            heading: 'System Modeling & Documentation',
            paragraphs: [
              'For system analysis and documentation, I utilized Visual Paradigm to create system models and supporting documentation. I contributed to developing diagrams that represented system processes, user interactions, system components, and relationships between relevant data entities. These models helped provide a clearer understanding of the system structure and served as references throughout the development process.',
              'I also participated in testing, debugging, and system evaluation. I reviewed implemented functionalities to ensure that they operated according to the defined requirements and user workflows.',
            ],
          },
        ],
      },
      {
        id: 'gdsc-member',
        period: 'Feb 2023 - Aug 2024',
        type: 'Community',
        title: 'Member, Google Developer Student Clubs',
        organization: 'GDSC on Campus, Telkom University Jakarta Chapter',
        description:
          'Part of a technology-focused student community that provided opportunities to expand knowledge, explore new technologies, and connect with fellow students interested in software development and digital innovation.',
        tools: ['Software Development', 'Tech Community', 'Collaboration', 'Networking'],
        details: [
          {
            heading: 'Overview',
            paragraphs: [
              'As a member of Google Developer Student Clubs (GDSC) on Campus, Telkom University Jakarta Chapter, I was part of a technology-focused student community that provided opportunities to expand my knowledge, explore new technologies, and connect with fellow students who shared similar interests in software development, technology, and digital innovation.',
            ],
          },
          {
            heading: 'Learning & Development',
            paragraphs: [
              'Throughout my involvement in the community, I participated in various activities, learning sessions, discussions, and knowledge-sharing opportunities related to technology and software development. These activities allowed me to gain additional exposure to topics and practices beyond what I encountered in academic coursework. I was able to learn from fellow students, explore different perspectives, and become more familiar with the broader technology ecosystem.',
            ],
          },
          {
            heading: 'Collaboration & Networking',
            paragraphs: [
              'As a community member, I also had opportunities to interact and collaborate with students from different academic and technical backgrounds. These interactions helped me improve my communication and teamwork skills while allowing me to exchange ideas, discuss technical topics, and learn from the experiences of other members.',
              'My involvement in GDSC also supported my professional development by providing an environment where I could strengthen my networking and interpersonal skills. I gained experience communicating with peers, participating in collaborative activities, and adapting to different working and learning environments.',
            ],
          },
          {
            heading: 'Impact',
            paragraphs: [
              'Overall, this experience broadened my perspective on technology and software development while strengthening my communication, teamwork, networking, collaboration, and continuous-learning skills. It also contributed to my personal and professional growth as an Information Systems student and aspiring technology professional.',
            ],
          },
        ],
      },
      {
        id: 'inaba-intern',
        period: 'Feb 2022 - May 2022',
        type: 'Field Work Practice',
        title: 'Graphic Design Intern',
        organization: 'Universitas Indonesia Membangun (INABA)',
        description:
          'Created and edited visual content for student recruitment and promotional activities. Utilized Adobe Photoshop, CorelDRAW, and Filmora to produce engaging visual and video content.',
        tools: ['Adobe Photoshop', 'CorelDRAW', 'Filmora', 'Visual Communication'],
        details: [
          {
            heading: 'Overview',
            paragraphs: [
              "During my Field Work Practice at Universitas Indonesia Membangun (INABA), I worked as a Graphic Design Intern supporting the university's promotional and communication activities. My responsibilities primarily focused on creating and editing visual content for student recruitment and other institutional needs based on design materials and references provided by the team.",
            ],
          },
          {
            heading: 'Graphic Design',
            paragraphs: [
              'I edited student admission and registration posters using Adobe Photoshop and CorelDRAW, refining layouts, typography, images, and visual elements to produce clear and engaging promotional materials. I worked with existing design assets and prepared materials provided by the team, making adjustments and ensuring that the final designs were visually consistent and suitable for publication.',
            ],
          },
          {
            heading: 'Video Editing',
            paragraphs: [
              'In addition to graphic design, I also contributed to video editing using Filmora. I edited video materials by arranging provided footage, adding text and visual elements, adjusting transitions, and refining the overall presentation to create more engaging video content.',
            ],
          },
          {
            heading: 'Skills Gained',
            paragraphs: [
              'This experience strengthened my practical skills in Adobe Photoshop, CorelDRAW, and Filmora, while also improving my understanding of visual communication, graphic design principles, content editing, attention to detail, and working according to organizational requirements and provided design guidelines.',
            ],
          },
        ],
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
        id: 'subsense',
        title: 'Subsense',
        category: 'TechSprint Innovation Cup 2026',
        period: '2026',
        role: 'System Analyst & UI/UX Designer',
        description:
          'Subscription management & financial tracking app designed for TechSprint Innovation Cup 2026. Features intuitive interfaces with subscription analytics, smart reminders, and spending dashboards.',
        tech: ['Figma', 'UI/UX Design', 'Subscription Analytics', 'Financial Tracking'],
        link: '#projects',
        details: [
          {
            heading: 'Overview',
            paragraphs: [
              'Subsense is a subscription management and personal financial tracking application created for the TechSprint Innovation Cup 2026. The product addresses the growing problem of recurring digital expenses going unnoticed across streaming platforms, SaaS tools, and utility memberships.',
            ],
          },
          {
            heading: 'Problem & Objectives',
            paragraphs: [
              'Many users struggle to keep track of multiple billing cycles, free-trial expirations, and cumulative monthly subscription costs. Subsense aims to consolidate every recurring commitment into one clear dashboard so users can audit spending and cancel unused services proactively.',
            ],
          },
          {
            heading: 'Key Features',
            paragraphs: [
              '• Subscription Analytics: Visualizes monthly and yearly recurring expenditure breakdowns by category to highlight spending patterns.',
              '• Smart Billing Reminders: Sends timely pre-renewal alerts before automatic deductions occur, preventing accidental charges.',
              '• Spending Dashboards: Interactive overview displaying active plans, upcoming due dates, and potential monthly savings.',
            ],
          },
          {
            heading: 'Design & Analysis Approach',
            paragraphs: [
              'Focused on clear information hierarchy, calm dark-surface readability, and low-friction subscription onboarding flows. User journeys were mapped from requirement discovery through interactive Figma prototypes to ensure effortless navigation across mobile viewports.',
            ],
          },
        ],
      },
      {
        id: 'edura',
        title: 'Edura',
        category: 'Mobile E-Learning Platform',
        period: '2025',
        role: 'UI/UX Designer & Product Concept',
        description:
          'Mobile-based e-learning platform providing affordable and accessible learning. Features structured roadmaps, premium courses, digital certificates, and gamification elements like badges.',
        tech: ['Figma', 'Mobile UI/UX', 'Gamification', 'E-Learning'],
        link: '#projects',
        details: [
          {
            heading: 'Overview',
            paragraphs: [
              'Edura is a mobile-based e-learning platform built around the mission of making structured skill acquisition affordable and accessible. Designed for students and self-learners, the app organizes learning paths into digestible milestones that maintain long-term motivation.',
            ],
          },
          {
            heading: 'Key Features',
            paragraphs: [
              '• Structured Learning Roadmaps: Guides learners step-by-step from foundational concepts to specialized competencies.',
              '• Premium & Accessible Courses: Curated modules featuring video lessons, reading summaries, and progress tracking.',
              '• Digital Certificates: Verifiable completion credentials generated once learners finish course assessments.',
              '• Gamification Elements: Achievement badges, streak trackers, and milestone rewards designed to sustain engagement.',
            ],
          },
          {
            heading: 'UX & Interface Highlights',
            paragraphs: [
              'Designed intuitive navigation patterns tailored for thumb-friendly mobile study sessions, combining clean lesson cards with visual progress rings and straightforward course discovery filters.',
            ],
          },
        ],
      },
      {
        id: 'finoria',
        title: 'Finoria',
        category: 'Mobile Banking Application',
        period: '2025',
        role: 'UI/UX & System Flow Designer',
        description:
          'Smart and secure mobile banking application focusing on financial inclusion. Features biometric authentication, smart budgeting tools, and financial education modules.',
        tech: ['Figma', 'Fintech UX', 'Biometrics', 'Smart Budgeting'],
        link: '#projects',
        details: [
          {
            heading: 'Overview',
            paragraphs: [
              'Finoria is a smart and secure mobile banking concept centered on improving financial inclusion and everyday money management. The application pairs trustworthy banking workflows with accessible guidance so both first-time digital banking users and experienced savers feel confident.',
            ],
          },
          {
            heading: 'Key Features',
            paragraphs: [
              '• Biometric Authentication: Fast, secure login and transaction confirmation using fingerprint and facial verification flows.',
              '• Smart Budgeting Tools: Automated spending categorization, customizable monthly limits, and visual savings goal tracking.',
              '• Financial Education Modules: Bite-sized literacy cards integrated directly into the banking experience to build healthier financial habits.',
            ],
          },
          {
            heading: 'Security & Usability Focus',
            paragraphs: [
              'Mapped end-to-end transaction verification flows to minimize user error while keeping critical actions—transfers, bill payments, and budget adjustments—clear, transparent, and trustworthy.',
            ],
          },
        ],
      },
      {
        id: 'qateringgo',
        title: 'QateringGo',
        category: 'Web Catering Marketplace',
        period: '2025',
        role: 'System Analyst & Web UI/UX Designer',
        description:
          'Web-based catering marketplace connecting customers, corporate clients, and vendors. Designed seamless workflows for online ordering, digital payments, and real-time order tracking.',
        tech: ['System Analysis', 'Figma', 'Web Marketplace', 'Order Tracking'],
        link: '#projects',
        details: [
          {
            heading: 'Overview',
            paragraphs: [
              'QateringGo is a web-based catering marketplace designed to connect everyday customers, corporate event planners, and verified catering vendors on one unified platform. It simplifies discovering menus, comparing packages, and coordinating bulk food deliveries.',
            ],
          },
          {
            heading: 'Multi-Stakeholder Workflows',
            paragraphs: [
              '• Customer & Corporate Ordering: Supports customizable meal packages, scheduled event deliveries, and transparent quotation flows.',
              '• Vendor Management: Enables catering partners to showcase menus, manage incoming orders, and update preparation milestones.',
            ],
          },
          {
            heading: 'Key Features',
            paragraphs: [
              '• Online Ordering & Package Customization: Flexible portion selection and dietary filtering for personal or corporate events.',
              '• Digital Payments: Streamlined checkout workflow supporting transparent invoicing and digital payment confirmations.',
              '• Real-Time Order Tracking: Status timeline keeping buyers updated from order confirmation and kitchen preparation through delivery.',
            ],
          },
        ],
      },
    ],
    certificates: [
      {
        id: 'field-work-practice',
        previewType: 'prakerin',
        title: 'Field Work Practice Certificate',
        issuer: 'Vocational High School 1 Barunawati Jakarta',
        year: '2022',
        credentialNo: '210/SMK-BRW/MM/PKL/IV/2022',
        recipient: 'Mohamad Dio Ridian',
        hostInstitution: 'Universitas Indonesia Membangun (INABA)',
        duration: '1 March 2022 – 30 April 2022 (2 Months)',
        competenceField: 'Multimedia',
        details: [
          {
            heading: 'Overview',
            paragraphs: [
              'Official Praktik Kerja Industri (PRAKERIN) / Field Work Practice Certificate awarded to Mohamad Dio Ridian from SMK 1 Barunawati Jakarta (Multimedia Competence Program) upon completing a 2-month industrial placement at Universitas Indonesia Membangun (INABA) from 1 March 2022 to 30 April 2022.',
            ],
          },
          {
            heading: 'Credential Information',
            paragraphs: [
              '• Certificate Number: 210/SMK-BRW/MM/PKL/IV/2022',
              '• Issuing School: Vocational High School 1 Barunawati Jakarta (SMK 1 Barunawati)',
              '• Host Institution: Universitas Indonesia Membangun (INABA)',
              '• Field of Competence: Multimedia',
              '• Placement Period: 1 March 2022 – 30 April 2022 (2 Months)',
            ],
          },
          {
            heading: 'Competencies & Activities Demonstrated',
            paragraphs: [
              '• Designed and refined student recruitment and promotional posters using Adobe Photoshop and CorelDRAW.',
              '• Edited promotional video footage, titles, and transitions using Filmora to support institutional communication.',
              '• Applied visual communication principles, typography balance, and brand consistency in an organizational setting.',
            ],
          },
        ],
      },
      {
        id: 'certified-system-analyst',
        previewType: 'csa',
        title: 'Certified System Analyst (CSA)',
        issuer: 'Indonesian Professional Certification Authority (BNSP) / LSP Informatika',
        year: '2026',
        credentialNo: '62019 2512 4 0007339 2026',
        registrationNo: 'TIK 017 000921 2026',
        recipient: 'Mohamad Dio Ridian, CSA',
        qualification: 'Analis Sistem (System Analyst)',
        competenceField: 'Information System and Technology Development',
        validity: 'Valid for 3 Years (Issued 2026)',
        details: [
          {
            heading: 'Overview',
            paragraphs: [
              'National Certificate of Competence (Sertifikat Kompetensi) issued by the Indonesian Professional Certification Authority (BNSP) through LSP Informatika, officially certifying Mohamad Dio Ridian, CSA as competent in Information System and Technology Development with the qualification of Analis Sistem (System Analyst).',
            ],
          },
          {
            heading: 'Credential Information',
            paragraphs: [
              '• Certificate Number: 62019 2512 4 0007339 2026',
              '• Registration Number: No. Reg. TIK 017 000921 2026',
              '• Qualification Title: Analis Sistem (System Analyst) — Certified System Analyst (CSA)',
              '• Competency Area: Pengembangan Sistem dan Teknologi Informasi (Information System and Technology Development)',
              '• Certification Authority: Badan Nasional Sertifikasi Profesi (BNSP) / Lembaga Sertifikasi Profesi (LSP) Informatika',
              '• Validity Period: 3 Years from issuance in 2026',
            ],
          },
          {
            heading: 'Validated Core Competencies',
            paragraphs: [
              '• Business Requirements & System Analysis: Eliciting, analyzing, and structuring functional and non-functional requirements.',
              '• Process & Architecture Modeling: Translating organizational workflows into formal UML and system design models.',
              '• Technical Specification & Documentation: Producing clear system documentation that bridges business stakeholders and development teams.',
              '• System Evaluation & Quality Assurance: Verifying system workflows and alignment with business objectives.',
            ],
          },
        ],
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
