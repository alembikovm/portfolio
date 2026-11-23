/**
 * All site content lives here. Components never hard-code copy.
 * Source: CV (Senior Frontend / Full-Stack Engineer).
 */

export type Status = "building" | "live" | "award";

export type ProjectMedia = { src: string; caption: string };

export type ProjectLink = { label: string; href: string; badge?: string };

export type Project = {
  title: string;
  subtitle: string;
  role: string;
  period: string;
  team?: string;
  tags: string[];
  status: { label: string; tone: Status };
  /** One short paragraph: the problem the product had to solve. */
  challenge: string;
  /** What I built, as labelled items. */
  built: { label: string; text: string }[];
  /** Engineering details, rendered as a code-style panel. */
  engineering: string[];
  stats?: { value: string; label: string }[];
  note?: string;
  links?: ProjectLink[];
  /** First image is the hero shot; the rest become switchable thumbnails. */
  media: ProjectMedia[];
};

export type LabProject = {
  title: string;
  blurb: string;
  stack: string[];
  points: string[];
  links: ProjectLink[];
  image?: string;
  tone: string;
  /** Where and when, for client work (side projects leave it out). */
  context?: string;
};

export type Article = {
  title: string;
  blurb: string;
  tag: string;
  date: string;
  read: string;
  href: string;
  cover: string;
};

export const site = {
  name: { first: "Marat", last: "Alembikov" },
  initials: "MA",
  role: "Senior Frontend / Full-Stack",
  status: "Open to remote contracts & relocation · Lead & senior roles",
  email: "alembikovm@gmail.com",
  cv: "/Marat_Alembikov_CV.pdf",
  /** Put a photo in /public and set the path, e.g. "/portrait.jpg". */
  portrait: "/portrait.jpg" as string | null,
  /** CSS object-position: keeps the face in frame for both the wide and the card crop. */
  portraitFocus: "50% 28%",
  city: "Almaty",
  year: 2026,

  /** Chips that float in around the hero photo on hover. Position in % of the viewport. */
  heroFacts: [
    { title: "Planeer", sub: "Frontend Team Lead", x: 4, y: 40, rotate: -4 },
    { title: "9+ years", sub: "React · Next.js · Node", x: 80, y: 33, rotate: 5 },
    { title: "ALA ⇄ Remote", x: 9, y: 60, rotate: 3, outline: true },
    { title: "EN · RU", x: 76, y: 70, rotate: -6, outline: true },
  ],

  ribbon: ["React · Next.js · TypeScript", "Node.js / NestJS", "AI agents & MCP", "Almaty ⇄ Remote", "9+ years in production"],

  statement: [
    "Nine years of building web apps people use every day.",
    "From a 4M-user streaming platform to factory planning systems.",
  ],

  nav: [
    { id: "projects", label: "Projects" },
    { id: "lab", label: "Lab" },
    { id: "leetcode", label: "LeetCode" },
    { id: "toolbox", label: "Stack" },
    { id: "writing", label: "Writing" },
    { id: "motivation", label: "Approach" },
    { id: "experience", label: "Experience" },
    { id: "highlights", label: "Impact" },
    { id: "contact", label: "Contact" },
  ],

  projects: [
    {
      title: "Planeer Timelines",
      subtitle: "Production planning for manufacturing",
      role: "Frontend Team Lead",
      period: "2024 — now",
      team: "Frontend team + backend + product",
      tags: ["React", "React Flow", "KonvaJS", "MobX", "PHP / Symfony"],
      status: { label: "Live · since 2024", tone: "live" },
      challenge:
        "Factories planned production in spreadsheets. The product had to show thousands of orders, operations and machines on one live board, stay fast while people dragged things around, and survive a growing team shipping into the same codebase.",
      built: [
        { label: "Timelines", text: "Plan, Plan-Fact, Tooling and Workers boards with a live “now” line, drag-and-drop operations and equipment groups." },
        { label: "Technology Cards", text: "a module that describes how each product is made, feeding the planner." },
        { label: "UI kit and API", text: "a Storybook component library, plus PHP / Symfony endpoints with Redis caching." },
        { label: "The team", text: "code reviews, 20+ technical interviews, and AI agent workflows with custom skills and MCP integrations." },
      ],
      engineering: [
        "Timeline data model rebuilt as a linked list: insert and move are O(1), no array reshuffles",
        "Rendering reworked: 1000+ DOM nodes on the board down to 20",
        "Bundle 14 MB → 4 MB after moving to rsbuild and pruning dependencies",
        "Layout shift cut: CLS 2 → 0.1",
        "Codebase moved to Feature-Sliced Design",
        "Playwright + Jest + React Testing Library: 200+ tests on a codebase that had none",
      ],
      stats: [
        { value: "−70%", label: "bundle size" },
        { value: "0.1", label: "CLS, from 2" },
        { value: "20", label: "DOM nodes, from 1000+" },
        { value: "200+", label: "tests from zero" },
      ],
      media: [{ src: "/planeer.png", caption: "Resource-free timeline: plan and fact boards side by side, with the order operation panel" }],
    },
    {
      title: "Sparring",
      subtitle: "AI coding-interview trainer",
      role: "Solo · design to deploy",
      period: "2026",
      tags: ["Next.js", "NestJS", "Anthropic API", "pgvector", "SSE"],
      status: { label: "Live · personal project", tone: "live" },
      challenge:
        "LeetCode-style sites check that code runs, not how you explain it. I wanted a trainer that writes a fresh task for any stack, checks the solution against fixed tests and then interviews you about it like a real panel would.",
      built: [
        { label: "Drills", text: "tasks generated per stack and difficulty, each with fixed test cases and an in-browser editor." },
        { label: "STAR mode", text: "behavioural questions with feedback structured by the STAR method." },
        { label: "Side chat", text: "a streamed assistant that knows the current task and your code." },
        { label: "Custom tasks", text: "describe the task you want and get a full drill with tests." },
      ],
      engineering: [
        "Model calls retry with backoff and jitter, and detect truncated output",
        "Every model input and output is validated with zod",
        "Token usage logged per request; Redis rate limiting per user",
        "Semantic task search on pgvector (HNSW) with local embeddings",
        "Answers streamed over SSE to the side chat",
        "Agent-guarded codebase: Claude Code hooks + a reviewer subagent",
      ],
      links: [
        { label: "Open live demo", href: "https://code-sparring.vercel.app" },
        { label: "Backend source", href: "https://github.com/alembikovm/sparring-backend" },
      ],
      media: [
        { src: "/sparring-drill.png", caption: "A JavaScript drill: fixed test cases above, the editor below" },
        { src: "/sparring.png", caption: "Task with fixed test cases and a custom task prompt" },
      ],
    },
    {
      title: "YAPPY",
      subtitle: "UGC video platform · three services",
      role: "Frontend / Full-Stack",
      period: "2020 — 2023",
      team: "3 frontend → 10 full-stack engineers",
      tags: ["React", "Module Federation", "HLS", "WebSockets", "NestJS", "RabbitMQ"],
      status: { label: "Scaled to 4M users", tone: "award" },
      challenge:
        "A short-video startup from day one: thousands of new videos every day, and every one had to be checked by a person before it went live. The moderators needed a tool that was fast enough for an eight-hour shift.",
      built: [
        { label: "Main web app", text: "the multi-page application where people watch, discover and upload videos, with feeds and curated collections." },
        { label: "Moderation workspace", text: "an HLS player with a custom control panel, hotkeys, built-in chat and real-time uploads, used all day by the moderation team." },
        { label: "Content management", text: "CRUD, table import/export and analytics dashboards for the content team." },
      ],
      engineering: [
        "Micro-frontends on Module Federation in a monorepo; ran an internal talk and a workshop for 10 engineers",
        "Custom HLS player controls with keyboard-first moderation: 45% faster reviews",
        "Real-time upload status over WebSockets",
        "NestJS + MongoDB services; RabbitMQ events keep microservices in sync",
        "API, E2E and unit tests with BDD/TDD: 35% fewer bugs",
        "CI/CD for the services",
      ],
      stats: [
        { value: "4M", label: "users" },
        { value: "2000+", label: "videos / day" },
        { value: "−45%", label: "time per review" },
        { value: "−35%", label: "bugs" },
      ],
      media: [
        { src: "/yappy.png", caption: "Main web app: the video feed" },
        { src: "/yappy-collections.png", caption: "Main web app: curated collections" },
      ],
    },
    {
      title: "LedgerLet",
      subtitle: "Fintech dashboards · London",
      role: "Senior / Lead Frontend · contract",
      period: "2025 — now",
      tags: ["Next.js SSR", "TypeScript", "Clerk", "Vercel", "AI categorization"],
      status: { label: "Contract · since Oct 2025", tone: "building" },
      challenge:
        "Small businesses import thousands of bank transactions and need clean, categorised reports. The React SPA loaded slowly and struggled with large imports.",
      built: [
        { label: "Transaction import", text: "bank transaction import with preview tables and duplicate detection." },
        { label: "Reports", text: "financial reports with an AI assistant next to the data." },
        { label: "AI categorization", text: "transactions are categorised automatically and stay editable." },
      ],
      engineering: [
        "Migration from a React SPA to Next.js with SSR: −20% initial load",
        "Preview tables built for 10k+ records per session",
        "Duplicate detection on import",
        "Clerk authentication with multi-tenant accounts",
        "Deploys through Vercel",
      ],
      stats: [
        { value: "10k+", label: "records / session" },
        { value: "−20%", label: "initial load" },
      ],
      media: [{ src: "/ledgerlet.png", caption: "Transactions report with the AI assistant" }],
    },
  ] satisfies Project[],

  /** Open-source and side projects, from github.com/alembikovm. */
  lab: [
    {
      title: "IELTS Coach",
      blurb: "An AI coach for IELTS Academic: daily plan, Writing and Speaking feedback by criterion, generated Reading and Listening tests.",
      stack: ["Next.js", "FastAPI", "Claude", "Cloudflare Vectorize", "Electron", "GSAP"],
      points: [
        "Verified agent harness: bands, quotes and sources checked in code",
        "RAG on Workers AI + Vectorize, Whisper for speech",
        "Web and Electron clients; the API token never reaches the page",
      ],
      links: [
        { label: "Live", href: "https://ielts-coach-rouge.vercel.app" },
        { label: "Code", href: "https://github.com/alembikovm/ielts-coach-web" },
      ],
      image: "/ielts-coach.jpg",
      tone: "from-lime-100 to-stone-300",
      context: "Side project · 2026",
    },
    {
      title: "Mini Flow Builder",
      blurb: "A no-code flow builder: drag screens into a phone frame, edit them in an inspector, export JSON.",
      stack: ["React", "TypeScript", "Zustand", "immer", "zod", "dnd-kit"],
      points: [
        "Framework-agnostic core with patch-based undo/redo",
        "Import direction enforced by eslint-plugin-boundaries",
        "Vitest + Playwright, and an ADR log for every decision",
      ],
      links: [
        { label: "Live", href: "https://mini-flow-builder.vercel.app" },
        { label: "Code", href: "https://github.com/alembikovm/mini-flow-builder" },
      ],
      image: "/mini-flow-builder.png",
      tone: "from-sky-100 to-stone-300",
    },
    {
      title: "WoWS Ship Encyclopedia",
      blurb: "Every ship in World of Warships, filtered by nation, type and tier, in a virtualized dock.",
      stack: ["Vue 3", "Pinia", "TanStack Query", "GSAP"],
      points: [
        "BFF endpoint cached per Vercel region",
        "Dictionaries degrade independently: the UI never breaks on a partial outage",
        "Feature-Sliced Design, mobile-first",
      ],
      links: [
        { label: "Live", href: "https://wows-ship-encyclopedia.vercel.app" },
        { label: "Code", href: "https://github.com/alembikovm/wows-ship-encyclopedia" },
      ],
      tone: "from-slate-800 to-sky-900",
    },
    {
      title: "Mortgage Marketplace",
      blurb: "Pick a mortgage across 15+ banks: a calculator, a step-by-step borrower questionnaire and document upload for B2B and B2C clients.",
      stack: ["React", "Express", "UI kit"],
      points: ["Mortgage product selection 23% faster", "Step-by-step quiz for B2C clients", "Shared UI kit: new features 15% faster"],
      links: [],
      image: "/mortgage.jpg",
      tone: "from-emerald-200 to-stone-300",
      context: "Altarix · 2019 — 2020",
    },
    {
      title: "Music Label Community",
      blurb: "A music label platform where new artists upload tracks, climb the top charts and get discovered.",
      stack: ["React", "Redux", "Redux-Saga"],
      points: ["Auth, track uploads and artist pages", "Custom video player", "Latest releases and top tracks"],
      links: [],
      image: "/music-label.jpg",
      tone: "from-violet-700 to-stone-800",
      context: "SimbirSoft · 2018 — 2019",
    },
    {
      title: "Golf Challenge App",
      blurb: "A mobile app for golf clubs: pick a hole, set a challenge level and win prizes for a birdie or a hole in one.",
      stack: [],
      points: ["Built the Profile and Bets sections", "Challenge flow from course map to payout"],
      links: [],
      image: "/golf-app.jpg",
      tone: "from-emerald-800 to-emerald-950",
      context: "Mercury Development · 2018",
    },
  ] satisfies LabProject[],

  /** Snapshot of leetcode.com/u/alembikovm (public GraphQL), refresh by hand. */
  leetcode: {
    handle: "alembikovm",
    url: "https://leetcode.com/u/alembikovm/",
    asOf: "Nov 2026",
    since: 2020,
    activeDays: 41,
    solved: [
      { level: "Easy", count: 85, total: 977, color: "#2fb39a" },
      { level: "Medium", count: 65, total: 2150, color: "#e0a526" },
      { level: "Hard", count: 1, total: 992, color: "#e5564f" },
    ],
    languages: [
      { name: "JavaScript", count: 143 },
      { name: "TypeScript", count: 16 },
      { name: "PostgreSQL", count: 1 },
    ],
    topics: [
      { name: "Array", count: 67 },
      { name: "String", count: 34 },
      { name: "Hash Table", count: 30 },
      { name: "Two Pointers", count: 28 },
      { name: "Depth-First Search", count: 19 },
      { name: "Binary Tree", count: 18 },
      { name: "Sorting", count: 16 },
      { name: "Linked List", count: 12 },
      { name: "Binary Search", count: 12 },
      { name: "Sliding Window", count: 10 },
      { name: "Dynamic Programming", count: 9 },
      { name: "Union-Find", count: 4 },
    ],
  },

  /** LinkedIn articles, newest first. The first one is featured. */
  linkedin: "https://www.linkedin.com/in/marat-alembikov/",
  articles: [
    {
      title: "AI App Security: Plugging the Holes Everyone Forgets",
      blurb: "Your model key can stay hidden in env vars and still leak money through your own endpoint. How it happens and how to close the holes.",
      tag: "AI · Security",
      date: "Jul 2026",
      read: "8 min",
      href: "https://www.linkedin.com/pulse/ai-app-security-plugging-holes-everyone-forgets-marat-alembikov-6julf/",
      cover: "/articles/ai-app-security.jpg",
    },
    {
      title: "JavaScript Proxy: the feature most developers barely use",
      blurb: "What Proxy really does, and why so many modern libraries are built on top of it.",
      tag: "JavaScript",
      date: "Mar 2026",
      read: "2 min",
      href: "https://www.linkedin.com/pulse/javascript-proxy-one-most-powerful-features-barely-use-alembikov-nt78e/",
      cover: "/articles/js-proxy.jpg",
    },
    {
      title: "Memoization vs Caching in JavaScript",
      blurb: "Two ways to stop doing the same work twice: function-level memoization and app-level caching, and when to use each.",
      tag: "Performance",
      date: "Jan 2026",
      read: "3 min",
      href: "https://www.linkedin.com/pulse/memoization-vs-caching-javascript-marat-alembikov-uoc2c/",
      cover: "/articles/memoization-vs-caching.jpg",
    },
    {
      title: "React App Security Best Practices",
      blurb: "XSS, CSRF and data leaks are frontend problems too: practical defences for React apps.",
      tag: "Security",
      date: "Aug 2025",
      read: "2 min",
      href: "https://www.linkedin.com/pulse/react-app-security-best-practices-protect-against-xss-marat-alembikov-wolte/",
      cover: "/articles/react-security.jpg",
    },
    {
      title: "Animating with Framer Motion",
      blurb: "Smooth, declarative React animations without keyframes or heavy libraries.",
      tag: "Animation",
      date: "Aug 2025",
      read: "2 min",
      href: "https://www.linkedin.com/pulse/animating-framer-motion-create-smooth-animations-code-marat-alembikov-mt6me/",
      cover: "/articles/framer-motion.jpg",
    },
    {
      title: "React + Web Workers with Comlink",
      blurb: "Move heavy work off the main thread and keep the UI at 60 fps.",
      tag: "Performance",
      date: "Aug 2025",
      read: "1 min",
      href: "https://www.linkedin.com/pulse/react-web-workers-comlink-keep-your-ui-smooth-marat-alembikov-w6f5e/",
      cover: "/articles/web-workers-comlink.jpg",
    },
    {
      title: "SSR, SSG and SPA: Choosing the Right Rendering Strategy",
      blurb: "Where each rendering model wins, and how to pick one for your product.",
      tag: "Architecture",
      date: "Aug 2025",
      read: "2 min",
      href: "https://www.linkedin.com/pulse/ssr-ssg-spa-choosing-right-rendering-strategy-marat-alembikov-qqaqe/",
      cover: "/articles/rendering-strategies.jpg",
    },
    {
      title: "Testing Frontend Applications: From Unit to E2E",
      blurb: "A testing pyramid that actually works for frontend teams.",
      tag: "Testing",
      date: "Aug 2025",
      read: "2 min",
      href: "https://www.linkedin.com/pulse/testing-frontend-applications-from-unit-e2e-marat-alembikov-30wye/",
      cover: "/articles/frontend-testing.jpg",
    },
    {
      title: "CI/CD in Frontend with GitLab",
      blurb: "Automating delivery and code-quality checks for frontend projects.",
      tag: "DevOps",
      date: "Jul 2025",
      read: "2 min",
      href: "https://www.linkedin.com/pulse/cicd-frontend-automating-delivery-code-quality-gitlab-marat-alembikov-ikz6e/",
      cover: "/articles/frontend-cicd.jpg",
    },
    {
      title: "State Management in Large React Apps",
      blurb: "How to keep state predictable as a React app and its team grow.",
      tag: "Architecture",
      date: "Jun 2025",
      read: "3 min",
      href: "https://www.linkedin.com/pulse/best-practices-state-management-large-react-apps-marat-alembikov-sigue/",
      cover: "/articles/state-management.jpg",
    },
  ] satisfies Article[],

  /** Tech stack with brand icons. `icon` is a simple-icons export name; without it a monogram is drawn. */
  toolbox: [
    {
      group: "Frontend",
      items: [
        { name: "TypeScript", icon: "siTypescript" },
        { name: "React", icon: "siReact" },
        { name: "Next.js", icon: "siNextdotjs" },
        { name: "Redux", icon: "siRedux" },
        { name: "MobX", icon: "siMobx" },
        { name: "TanStack Query", icon: "siReactquery" },
        { name: "Module Federation", icon: "siWebpack" },
        { name: "Vue", icon: "siVuedotjs" },
        { name: "Tailwind", icon: "siTailwindcss" },
        { name: "GSAP", icon: "siGreensock" },
        { name: "Three.js", icon: "siThreedotjs" },
        { name: "KonvaJS", icon: "siKonva" },
      ],
    },
    {
      group: "Backend & data",
      items: [
        { name: "Node.js", icon: "siNodedotjs" },
        { name: "NestJS", icon: "siNestjs" },
        { name: "Express", icon: "siExpress" },
        { name: "PHP / Symfony", icon: "siSymfony" },
        { name: "PostgreSQL", icon: "siPostgresql" },
        { name: "MongoDB", icon: "siMongodb" },
        { name: "Redis", icon: "siRedis" },
        { name: "RabbitMQ", icon: "siRabbitmq" },
        { name: "Supabase", icon: "siSupabase" },
        { name: "WebSockets", icon: "siSocketdotio" },
      ],
    },
    {
      group: "Quality & delivery",
      items: [
        { name: "Playwright" },
        { name: "Jest", icon: "siJest" },
        { name: "Testing Library", icon: "siTestinglibrary" },
        { name: "Vitest", icon: "siVitest" },
        { name: "Storybook", icon: "siStorybook" },
        { name: "Docker", icon: "siDocker" },
        { name: "GitLab CI", icon: "siGitlab" },
        { name: "Vercel", icon: "siVercel" },
      ],
    },
    {
      group: "AI",
      items: [
        { name: "Anthropic API", icon: "siAnthropic" },
        { name: "Claude Code", icon: "siClaude" },
        { name: "MCP" },
        { name: "pgvector" },
        { name: "zod", icon: "siZod" },
      ],
    },
  ],

  motivation: {
    lead: "The best internal tool is the one people stop noticing.",
    paragraphs: [
      "Most of what I have built is used all day by people doing hard jobs: moderators reviewing thousands of videos, planners scheduling a factory, analysts reconciling bank records. When the tool is fast and predictable, the job gets easier.",
      "That is why I care about the unglamorous parts: bundle size, layout shift, data structures, tests and an architecture that a growing team can keep clean.",
      "Lately I build with AI agents as part of the team: custom skills, MCP integrations with Atlassian, Figma and GitLab, and hooks that keep generated code honest.",
    ],
  },

  mindset: [
    "Measure first. Every performance win on this page started with a number.",
    "Architecture is a team tool: boundaries should make the right change the easy one.",
    "Ship the boring, reliable version, then make it delightful.",
  ],

  experience: [
    { when: "2025 — now", title: "Frontend Team Lead", org: "Planeer · Production planning", body: "Lead the frontend team, run code reviews and 20+ technical interviews. Built AI agent orchestration with custom skills and MCP." },
    { when: "2025 — now", title: "Senior / Lead Frontend", org: "LedgerLet · London, remote", body: "Moved a fintech product from React SPA to Next.js SSR and built transaction import, reports and AI categorization." },
    { when: "2025", title: "Senior JavaScript SDE", org: "Innova · Belgrade, remote", body: "Evaluated AI-generated JS/TS, Node.js and React code across 1000+ human-in-the-loop review sessions." },
    { when: "2024 — 2025", title: "Senior Frontend / Full-Stack", org: "Planeer", body: "Built timelines with React Flow, KonvaJS and MobX, a Storybook UI kit, and API endpoints in PHP / Symfony with Redis caching." },
    { when: "2023 — 2024", title: "Senior Frontend Developer", org: "The National Lottery", body: "Built a CMS for draw stages and promo campaigns in Next.js that drew 500k+ visits." },
    { when: "2020 — 2023", title: "Frontend / Full-Stack", org: "YAPPY · UGC streaming", body: "From day one to 4M users: the main web app, a moderation workspace that made reviews 45% faster, content management, NestJS services and Module Federation." },
    { when: "2019 — 2020", title: "Frontend / Full-Stack", org: "Altarix", body: "Mortgage selection apps for B2B and B2C clients that made product selection 23% faster, an Express API, and a UI kit that sped up new features by 15%." },
    { when: "2017 — 2019", title: "Frontend / Full-Stack", org: "SimbirSoft", body: "30+ features for a music-label community: auth, video player, track uploads, artist pages. Localized a task tracker into three languages." },
    { when: "2006 — 2017", title: "Engineering + Web Development", org: "Samara State Technical University", body: "Bachelor’s degree in engineering and an additional degree in web design and development." },
  ],

  highlights: [
    { value: "4M", title: "users on a platform I joined at day one", body: "YAPPY grew to 4M users and $2M revenue while the team went from 3 to 10 engineers." },
    { value: "70%", title: "smaller bundle", body: "Planeer’s bundle went from 14 MB to 4 MB after moving to rsbuild and cleaning up dependencies." },
    { value: "500k", title: "visits to one campaign", body: "A promo campaign I pitched and built for The National Lottery, with 6,000+ engaged users." },
    { value: "200+", title: "tests from zero", body: "Set up Playwright, Jest and React Testing Library on a codebase that had none." },
    { value: "20+", title: "technical interviews", body: "Hiring and mentoring as a team lead; ran a Module Federation workshop for 10 engineers." },
    { value: "1000+", title: "AI code reviews", body: "Evaluated LLM-generated code for correctness, edge cases and architecture at Innova." },
  ],

  skills: {
    interests: ["Frontend Architecture", "Web Performance", "AI Agents & MCP", "Developer Experience"],
    building: ["Internal platforms", "Timelines & dashboards", "AI-powered products", "Fintech"],
    soft: ["Team leadership", "Mentoring", "Technical interviews", "Requirements gathering", "Stakeholder demos"],
  },

  languages: [
    { name: "English", level: "B2 · EFSET" },
    { name: "Русский", level: "Native" },
  ],

  github: "https://github.com/alembikovm",
};
