// Single source of truth for all portfolio content.
// Everything here is taken from Vasanth's resume. Edit this file to update the site.

export interface Profile {
  name: string;
  initials: string;
  title: string;
  company: string;
  intro: string;
  heroTech: string[];
  email: string;
  phone: string;
  phoneHref: string;
  linkedin: string;
  github: string;
  resume: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface NavLink {
  id: string;
  label: string;
}

export type HighlightIcon = "layers" | "plug" | "zap" | "shield";

export interface Highlight {
  icon: HighlightIcon;
  title: string;
  text: string;
}

export interface About {
  paragraphs: string[];
  stats: { value: string; label: string }[];
  highlights: Highlight[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Role {
  title: string;
  dates: string;
  current?: boolean;
  bullets: string[];
  tech: string[];
}

export interface Experience {
  company: string;
  companyUrl: string;
  location: string;
  roles: Role[];
}

export interface Project {
  name: string;
  featured?: boolean;
  purpose: string;
  overview: string;
  contributions: string[];
  challenge?: { problem: string; solution: string };
  also?: string;
  integrations?: string[];
  tech: string[];
  /** Add real URLs only: { github: "https://...", live: "https://..." } */
  links: { github?: string; live?: string };
}

export interface Education {
  degree: string;
  institution: string;
  years: string;
  cgpa: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface Award {
  name: string;
  text: string;
}

export const profile: Profile = {
  name: "Vasanth V",
  initials: "VV",
  title: "Software Engineer | Full-Stack Developer",
  company: "SPAN Technology Services Pvt Ltd",
  intro:
    "Software Engineer with 3+ years of experience building scalable full-stack web applications with JavaScript, React.js, Next.js, Node.js, Express.js, and MongoDB. I work on REST APIs, authentication, third-party integrations, and performance optimization.",
  heroTech: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB"],
  email: "vasanthv8122001@gmail.com",
  phone: "+91 73393 70582",
  phoneHref: "+917339370582",
  linkedin: "https://www.linkedin.com/in/vasanth-v-b4210b238",
  github: "https://github.com/Vasanthv8122001",
  resume: "/resume.pdf",
};

export const heroStats: Stat[] = [
  { value: "3+", label: "Years of experience" },
  { value: "15+", label: "REST APIs built" },
  { value: "1,000+", label: "Users on WealthRabbit" },
  { value: "80%+", label: "Jest test coverage" },
];

export const navLinks: NavLink[] = [
  { id: "about", label: "About" },
  { id: "work", label: "Work & Projects" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const about: About = {
  paragraphs: [
    "I am a software engineer at SPAN Technology Services, where I joined as a trainee in June 2023 and have grown into a software engineer role. I build full-stack applications with React.js and Next.js on the frontend and Node.js, Express.js, and MongoDB on the backend.",
    "On the frontend, I have delivered server-side rendered Next.js pages, a reusable React component library, and faster pages through code splitting and lazy loading. On the backend, I design RESTful APIs with JWT authentication and role-based access control, tune MongoDB queries and schemas, and use Redis caching.",
    "A lot of my work involves integrating third-party platforms such as Plaid, Stripe, and Apex Fintech, and automating email workflows with AWS SES and Lambda. I care about maintainable code, testing with Jest, careful debugging, and measurable performance improvements.",
  ],
  stats: [
    { value: "3+ years", label: "Professional experience" },
    { value: "3 roles", label: "Progression at one company" },
  ],
  highlights: [
    { icon: "layers", title: "Full-Stack Development", text: "React.js and Next.js interfaces backed by Node.js and Express.js APIs." },
    { icon: "plug", title: "APIs and Integrations", text: "Plaid, Stripe, Apex Fintech, AWS SES, and Lambda workflows." },
    { icon: "zap", title: "Performance", text: "Query tuning, caching, code splitting, and lazy loading." },
    { icon: "shield", title: "Quality and Security", text: "Jest testing, debugging, JWT authentication, and RBAC." },
  ],
};

export const skillGroups: SkillGroup[] = [
  { title: "Programming Languages", items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"] },
  { title: "Frontend Development", items: ["React.js", "Next.js (SSR/SSG)", "Redux", "Reusable Component Libraries", "Code Splitting"] },
  { title: "Backend Development", items: ["Node.js", "Express.js", "REST APIs", "Microservices", "WebSockets", "MVC Architecture", "Middleware"] },
  { title: "Databases and Caching", items: ["MongoDB", "MySQL", "Redis", "Apache Kafka", "Event-Driven Architecture"] },
  { title: "APIs and Integrations", items: ["Plaid", "Stripe", "Apex Fintech", "Mailtrap/MailPit"] },
  { title: "Authentication and Security", items: ["JWT Authentication", "Role-Based Access Control (RBAC)", "AWS Secrets Manager"] },
  { title: "Testing and Debugging", items: ["Jest", "Supertest", "Postman (API Testing)", "Unit and Integration Testing", "Debugging", "Sentry", "Performance Optimization"] },
  { title: "Tools and Platforms", items: ["Git", "GitHub", "CI/CD (GitHub Actions)", "Docker", "AWS (Lambda, S3, SES, Secrets Manager)", "Vercel", "Netlify", "Agile/Scrum"] },
];

export const experience: Experience = {
  company: "SPAN Technology Services Pvt Ltd",
  companyUrl: "https://spantechnologyservices.com/",
  location: "Coimbatore, India",
  roles: [
    {
      title: "Software Engineer",
      dates: "February 2026 – Present",
      current: true,
      bullets: [
        "Direct the development team in sprint planning and Agile ceremonies, achieving 100% completion of sprint deliverables.",
        "Designed and developed RESTful APIs using Node.js, Express.js, and JWT authentication; optimized MongoDB queries and document schemas, reducing query latency by 35% for high-frequency operations.",
        "Enhanced frontend modules, reducing page load times and bounce rates by 20% through code splitting and lazy loading.",
        "Configured AWS Secrets Manager to eliminate hard-coded credentials and reduced AWS SES costs by routing test emails through Mailtrap.",
      ],
      tech: ["Node.js", "Express.js", "MongoDB", "JWT", "AWS Secrets Manager", "AWS SES", "Agile"],
    },
    {
      title: "Junior Software Engineer",
      dates: "January 2024 – January 2026",
      bullets: [
        "Engineered full-stack modules that reduced manual data entry by 90% and automated compliance submissions.",
        "Architected a multi-tenant white-label platform that served multiple clients from a single codebase, using Redis caching to reduce configuration-fetch overhead.",
        "Implemented JWT-based role-based access control (RBAC), decreasing unauthorized access incidents by 99% across the platform.",
        "Spearheaded the migration from a monolithic architecture to microservices, improving scalability, fault isolation, and deployment independence.",
        "Automated AWS SES and Lambda email workflows with retry handling, failure tracking, and delivery monitoring.",
      ],
      tech: ["Redis", "RBAC", "Microservices", "AWS SES", "AWS Lambda"],
    },
    {
      title: "Junior Software Engineer Trainee",
      dates: "June 2023 – December 2023",
      bullets: [
        "Delivered server-side rendered (SSR) Next.js pages, contributing to a 40% improvement in SEO crawl frequency during peak traffic.",
        "Created a reusable React component library, accelerating feature development and ensuring UI consistency.",
        "Optimized database queries and backend logic, improving API response times by 30% under concurrent load.",
      ],
      tech: ["Next.js", "React.js", "SSR", "Query Optimization"],
    },
  ],
};

export const projects: Project[] = [
  {
    name: "WealthRabbit — IRA Management Platform",
    featured: true,
    purpose: "A FinTech platform for managing IRA (retirement) accounts.",
    overview:
      "Integrates Apex Fintech, Plaid, and Stripe for secure bank verification, ACH transfers, and retirement account provisioning, with Express middleware enforcing validation and IRA rules.",
    contributions: [
      "Integrated Apex Fintech, Plaid, and Stripe APIs for secure bank verification, ACH transfers, and retirement account provisioning; built Express middleware for input validation, IRA rule enforcement, and centralized error handling.",
      "Built 15+ REST APIs with Jest tests (80%+ coverage), cutting post-release defects by 30% for 1,000+ users.",
    ],
    challenge: {
      problem:
        "A production Kafka issue was blocking data from being inserted into the admin portal through the Express backend.",
      solution:
        "Traced it to a topic name shared with the sandbox environment, then diagnosed and fixed it.",
    },
    also: "Reworked the users collection and turned business onboarding into a business information collection step for the accountant flow.",
    integrations: ["Apex Fintech", "Plaid", "Stripe"],
    tech: ["Node.js", "Express.js", "Apex Fintech", "Plaid", "Stripe", "Apache Kafka", "Jest"],
    links: {}, // add { github: "https://...", live: "https://..." } only if real URLs exist
  },
  {
    name: "Lead Management System",
    purpose: "A tool for tracking leads and engagement.",
    overview:
      "Lead-profile and engagement-tracking UI with data visualization, backed by MySQL analytics and reporting queries.",
    contributions: [
      "Designed the lead-profile and engagement-tracking UI with data visualization, backed by MySQL analytics and reporting queries.",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MySQL"],
    links: {},
  },
];

export const education: Education = {
  degree: "Bachelor of Engineering in Electronics and Communication Engineering",
  institution: "Dr. N.G.P. Institute of Technology, Coimbatore",
  years: "2019 – 2023",
  cgpa: "8.4 / 10",
};

export const certifications: Certification[] = [
  { name: "Claude Code 101", issuer: "Anthropic", date: "May 2026" },
  { name: "React Front To Back", issuer: "Udemy", date: "September 2023" },
  { name: "The Complete Node.js Developer Course (3rd Edition)", issuer: "Udemy", date: "August 2023" },
  { name: "Modern JavaScript From The Beginning 2.0 (2023 Revamp)", issuer: "Udemy", date: "July 2023" },
];

export const awards: Award[] = [
  {
    name: "Super Star Award",
    text: "Recognized for handling complex e-signature agreement workflows across multiple scenarios and portals.",
  },
];
