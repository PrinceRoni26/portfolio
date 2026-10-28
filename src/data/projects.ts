import type { Project } from "@/types";

/**
 * Projects shown on the site. `featured: true` projects get a card on the
 * home page and a case study at /projects/[slug].
 *
 * Only add technologies, links, and results you can verify.
 * Screenshots go in /public/images/projects — then set `image`.
 */
export const projects: Project[] = [
  {
    slug: "prodisenyo-probuild",
    title: "Prodisenyo Probuild",
    category: "Enterprise Software / Construction Management",
    year: "2026",
    summary:
      "A role-based internal platform connecting attendance, payroll, approvals, project budgets, cost tracking, and departmental reporting for a construction company.",
    // Add the stack once confirmed, e.g. ["Next.js", "TypeScript", "MySQL"].
    tech: [],
    tags: ["Role-based dashboards", "Payroll automation", "Approvals", "Reporting"],
    confidential: true,
    type: "Internal company software",
    featured: true,
    caseStudy: {
      introduction:
        "Prodisenyo Probuild is the internal management platform of Prodisenyo Builders Corp., a construction company in Cagayan de Oro. I began working on it as a Business Systems Analyst intern and continued developing it after being retained by the company's IT team.",
      problem:
        "Attendance, payroll, purchasing, budgeting, and reporting relied on separate manual processes and spreadsheets. Each department handled its own records, which made approvals slow, introduced repetitive data entry, and made it harder for management to see project costs in one place.",
      role:
        "Business systems analyst and developer. I gathered requirements from operations, HR, and management, translated them into role-based features, implemented biometric attendance and payroll automation, and continue to maintain and extend the platform.",
      solution:
        "A single role-based platform where each department works in its own dashboard while sharing the same underlying records — so attendance feeds payroll, requests flow through approvals, and costs roll up into executive reporting.",
      features: [
        { title: "Role-based dashboards", description: "Views and permissions tailored to engineering, HR, purchasing, finance, and management." },
        { title: "Employee attendance", description: "Centralized attendance records connected directly to payroll." },
        { title: "Biometric import workflows", description: "Imports biometric device logs and validates them before they reach payroll." },
        { title: "Payroll processing", description: "Automated payroll computation based on validated attendance data." },
        { title: "Project monitoring", description: "Tracking of active construction projects and their progress." },
        { title: "Material requests & purchase approvals", description: "Structured request and approval flows replacing ad-hoc paperwork." },
        { title: "Financial & cost tracking", description: "Project budgets and costs recorded against each project." },
        { title: "Executive reporting", description: "Consolidated reports for management across departments." },
      ],
      challenges: [
        { title: "Data consistency", description: "Biometric logs and manual records did not always agree. Validation steps were added so inconsistent entries are caught before payroll is computed." },
        { title: "Workflows that match reality", description: "Approval rules differ by department and role. Features were refined iteratively with the people who use them, rather than designed once up front." },
        { title: "Working in a small team", description: "With a small IT team, AI-assisted development was used to speed up prototyping, documentation, and troubleshooting." },
      ],
      outcome: [
        "Connected attendance, payroll, approvals, budgets, and reporting in one system.",
        "Reduced repetitive manual work in recurring operational workflows.",
        "Led to my retention by the company to continue developing the platform.",
      ],
      video: {
        src: "/videos/probuild-demo.mp4",
        teaser: "/videos/probuild-demo-teaser.mp4",
        poster: "/images/projects/probuild/demo-poster.webp",
        title: "ProBuild demo: one system from estimate to payroll",
        duration: "1:28",
        caption:
          "Product demo with voiceover — the CEO dashboard, BOQ estimates, approvals, procurement, and biometric attendance to payroll. Uses demo project data; employee names and pay are blurred, and the Purchaser screens are a concept mockup.",
      },
      visualNote:
        "This is internal company software. Source code and financial records are confidential. The demo video uses demo project data with personal details blurred; other visuals are illustrative.",
    },
  },
  {
    slug: "mr-depot",
    title: "MR Depot",
    category: "Web Application / Business Platform",
    year: "2026",
    summary:
      "A public website and role-based staff portal for a modular kitchen and interior materials company — portfolio, product catalog, live chat, project pipeline, follow-ups, approvals, and a built-in CMS in one system.",
    // Add the rest of the stack once confirmed (database, auth, hosting).
    tech: ["Next.js", "Cloudinary"],
    tags: ["Public website", "Staff portal", "Live chat", "Project pipeline", "CMS"],
    image: "/images/projects/mr-depot/cover.webp",
    imageAlt: "MR Depot home page with a large “MR DEPOT” heading, View Portfolio and Get a Quote buttons, and photos of modular kitchens and cabinetry",
    liveUrl: "https://www.mrdepot.online/",
    type: "Company website & staff portal",
    featured: true,
    caseStudy: {
      introduction:
        "MR Depot Corp. designs and installs custom modular kitchens, cabinets, and wardrobes and supplies interior finishing materials from its showroom in Cagayan de Oro. I built its website and staff portal as one connected platform, and also produced the marketing that launched it — the promo video, reels, and social covers.",
      problem:
        "Inquiries arrived by phone, Messenger, and email with no single owner or next step. Project stages, deadlines, and offer values lived in spreadsheets, reports and leave requests waited on paper forms and chat approvals, and new projects or materials had to wait for a developer before they appeared on the website.",
      role:
        "Developer and marketing. I designed and built the public website and the role-based staff portal, set up the content manager so staff can publish to the site themselves, and created the platform's promo video, reels, and social media assets.",
      solution:
        "Two experiences on one platform. The public website attracts and captures leads with a portfolio, a filterable materials catalog, a quote form, and live chat. The staff portal delivers the work: a drag-and-drop project pipeline, client follow-ups, a shared calendar, a support inbox, paperless forms with approvals, and admin KPIs — and staff publish new projects and materials straight back to the website.",
      features: [
        { title: "Portfolio & product catalog", description: "Project stories with location, scope, and service, plus 61 materials across 7 categories with sizes and filters." },
        { title: "Quote form & live chat", description: "Visitors send a structured quote request or chat with a real employee from any page." },
        { title: "Support inbox", description: "Website chats land in a shared queue where staff claim, reply, and resolve them in real time." },
        { title: "Drag-and-drop project pipeline", description: "Six stages from Planning to Completed, with deadlines, progress, offer amounts, and estimated costs on each card." },
        { title: "Client follow-ups & calendar", description: "Follow-up boards with due-date buckets, plus a team calendar for appointments, deadlines, and follow-ups." },
        { title: "Forms & approvals", description: "Report, Leave, Accounting, and Work forms with attachments; admins accept or reject with a required comment." },
        { title: "Admin overview", description: "Live KPIs, pipeline value by stage, team workload, and items that need attention on one screen." },
        { title: "Built-in CMS", description: "Staff add, publish, feature, and archive website projects and materials, with image uploads hosted on Cloudinary." },
        { title: "Access control & activity log", description: "Admin and Employee roles, staff suspension, announcements, and a timestamped log of sensitive actions." },
      ],
      challenges: [
        { title: "Two audiences, one system", description: "Customers needed a polished storefront while staff needed working tools. Sharing the same records means a website inquiry flows straight into chat, follow-ups, and the pipeline without re-typing." },
        { title: "Keeping the website fresh", description: "Instead of routing every update through a developer, a content manager with draft, publish, and archive states lets staff update the live site in minutes." },
        { title: "Visibility without micromanaging", description: "Owners wanted the real pipeline and workload at a glance, so the admin overview rolls up stages, offers, overdue items, and per-employee activity automatically." },
      ],
      outcome: [
        "Launched the live website at mrdepot.online with a 61-item materials catalog across 7 categories.",
        "Replaced chat threads, spreadsheets, and paper forms with one staff portal for leads, projects, follow-ups, and approvals.",
        "Produced the launch marketing: a platform promo video, reels, and Facebook and link-preview covers.",
      ],
      video: {
        src: "/videos/mr-depot-platform-promo.mp4",
        teaser: "/videos/mr-depot-platform-teaser.mp4",
        poster: "/images/creative/mr-depot-platform-promo-poster.webp",
        title: "MR Depot platform promo: website and staff portal in one system",
        duration: "1:27",
        caption: "Promo video — the public website, live chat, project pipeline, follow-ups, calendar, approvals, and the built-in CMS.",
      },
      gallery: [
        { src: "/images/projects/mr-depot/home.webp", alt: "MR Depot home page with navigation, a large MR DEPOT heading, call-to-action buttons, and a gallery of finished interiors", caption: "Home page" },
        { src: "/images/projects/mr-depot/portfolio.webp", alt: "Portfolio story for a Modern Modular Kitchen showing location, scope, service, description, and a Start your project button", caption: "Portfolio stories" },
        { src: "/images/projects/mr-depot/catalog.webp", alt: "Products catalog with a category sidebar and flexible stone finishes showing names and sizes", caption: "Materials catalog with category filters" },
        { src: "/images/projects/mr-depot/process.webp", alt: "Three-step process section: Understand, Design and Select, Install", caption: "From idea to installation" },
      ],
    },
  },
  {
    slug: "archivia",
    title: "Archivia",
    category: "Machine Learning / Web Application",
    year: "2026",
    summary:
      "An AI-powered thesis archive with searchable academic records and an adviser recommendation system based on TF-IDF and SBERT semantic similarity.",
    tech: ["Next.js", "NextAuth (JWT)", "Supabase (PostgreSQL)", "Python", "TF-IDF", "SBERT"],
    tags: ["Semantic similarity", "Search", "Role-based access"],
    image: "/images/projects/archivia/cover.webp",
    imageAlt: "Archivia home page with the heading “Digital Thesis Archive” for the University of Science and Technology of Southern Philippines",
    recognition: "Best Capstone Award, 2026",
    type: "Academic capstone project",
    featured: true,
    caseStudy: {
      introduction:
        "Archivia is a digital thesis archive developed by a four-person capstone team for the BS Information Technology program at USTP, completed in November 2025. I was one of the team's developers. The project received the Best Capstone Award in 2026.",
      problem:
        "Past theses are hard to search when they live in physical shelves or scattered files, and matching a new research topic with the right faculty adviser often depends on word of mouth rather than on each adviser's actual research background.",
      role:
        "Developer on a four-person capstone team. I worked on the searchable repository and the adviser recommendation system, including the machine learning pipeline for text similarity.",
      solution:
        "A searchable repository of structured thesis records, combined with a recommendation engine that compares a proposed topic against advisers' past work. TF-IDF captures keyword relevance, while SBERT sentence embeddings capture semantic meaning — so related topics match even when they use different words.",
      features: [
        { title: "Searchable records", description: "Structured thesis entries that can be searched and browsed." },
        { title: "Adviser recommendations", description: "Suggests advisers whose previous work is most similar to a proposed topic." },
        { title: "TF-IDF relevance", description: "Weights distinctive terms to measure keyword-level similarity." },
        { title: "SBERT semantic similarity", description: "Sentence embeddings compare meaning rather than exact wording." },
        { title: "Role-based access", description: "Different permissions for different types of users." },
      ],
      challenges: [
        { title: "Keyword vs. meaning", description: "Keyword matching alone misses related topics phrased differently. Pairing TF-IDF with SBERT balanced precise term matching with semantic understanding." },
        { title: "Structured academic data", description: "Thesis records needed a consistent structure so they could be searched and compared reliably." },
      ],
      outcome: [
        "Received the Best Capstone Award, 2026 (Quality Education).",
        "Scored 85.68 on the System Usability Scale (“Excellent”) with 22 student respondents.",
        "SBERT achieved the best F1-score (0.76) and recall (0.62) among the five text models evaluated.",
      ],
      video: {
        src: "/videos/archivia-demo.mp4",
        teaser: "/videos/archivia-teaser.mp4",
        poster: "/images/projects/archivia/demo-poster.webp",
        title: "Archivia demo: from thesis search to finding the right adviser",
        duration: "2:59",
        caption: "Demo video with voiceover — search, bookmarks, the adviser recommender, and how the hybrid SBERT ranking works.",
      },
      gallery: [
        {
          src: "/images/projects/archivia/thesis-search.webp",
          alt: "Archivia thesis search page with a search bar, sort and filter controls, and thesis cards showing adviser, panel, proponents, year and abstract",
          caption: "Thesis search",
        },
        {
          src: "/images/projects/archivia/find-your-adviser.webp",
          alt: "Find Your Adviser form where a student enters a research title and overview to get adviser recommendations",
          caption: "Find Your Adviser: TF-IDF + SBERT recommender",
        },
        {
          src: "/images/projects/archivia/faculty-dashboard.webp",
          alt: "Faculty dashboard with advisory request counts, quick actions and an advisory requests log; personal details are blurred",
          caption: "Faculty dashboard",
        },
        {
          src: "/images/projects/archivia/admin-dashboard.webp",
          alt: "Admin dashboard with user and request counts, quick actions and a monthly adviser requests chart",
          caption: "Admin dashboard",
        },
      ],
    },
  },
];

/**
 * Template for additional projects (e.g. from GitHub). Copy, fill in real
 * details, and add to `projects` above with `featured: false`.
 *
 * {
 *   slug: "project-slug",
 *   title: "Project Title",
 *   category: "Web Application",
 *   year: "2025",
 *   summary: "One or two sentences about what it does.",
 *   tech: ["Python"],
 *   tags: [],
 *   githubUrl: "https://github.com/your-username/repo",
 *   featured: false,
 * }
 */

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug && p.caseStudy);
}
