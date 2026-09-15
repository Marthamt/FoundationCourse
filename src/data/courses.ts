import { Course } from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'ai-fundamentals',
    slug: 'ai-fundamentals',
    title: 'AI Fundamentals for Practical Creators & Business Owners',
    category: 'AI Core',
    level: 'Beginner',
    duration: '4.5 hours',
    totalLessons: 14,
    badge: 'Core Foundation',
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Master modern artificial intelligence as an everyday leverage engine. Learn foundational models, high-performance prompting frameworks, and safe, responsible deployment.',
    fullDescription: 'This foundational course demystifies Generative AI and Large Language Models. Instead of treating AI as theoretical science, you will learn how to wield it as an executive assistant, software architect, research partner, and creative producer. By the end of this course, you will understand how modern models reason, how to construct system prompts with zero ambiguity, and how to safeguard sensitive business workflows.',
    instructor: {
      name: 'Marcus Vance',
      role: 'Lead AI Systems Architect & Founder',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
    learningObjectives: [
      'Understand the architecture of modern Generative AI and LLMs without technical jargon',
      'Deploy AI as a 10x multiplier for research, writing, strategic ideation, and business workflows',
      'Master the 5-part precision prompting formula to eliminate hallucinations and vague outputs',
      'Establish ethical, privacy-compliant AI usage guidelines for yourself and your team',
    ],
    skills: ['Prompt Engineering', 'LLM Mental Models', 'Workflow Automation', 'Context Window Management', 'AI Ethics & Risk Mitigation'],
    intendedAudience: [
      'Entrepreneurs seeking operational leverage',
      'Local business owners wanting to automate day-to-day communication',
      'Aspiring software creators looking to build their first digital products',
    ],
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Understanding Modern Artificial Intelligence',
        description: 'Demystifying how transformers, context windows, and foundational models actually think and process information.',
        order: 1,
        lessons: [
          {
            id: 'les-1-1',
            title: 'Lesson 1: The Modern AI Revolution: From Prediction to Creation',
            duration: '14 mins',
            type: 'video',
            isFreePreview: true,
            order: 1,
            summary: 'Explore why modern AI represents a seismic shift in technology, moving from narrow pattern recognition to generative creation.',
            keyTakeaways: [
              'Generative models synthesize new tokens rather than regurgitating indexed databases.',
              'The distinction between reasoning capacity, context window size, and deterministic software.',
              'Why domain knowledge + AI assistance outperforms pure software developers without domain insight.',
            ],
            promptTemplates: [
              {
                name: 'Executive Role Calibration',
                prompt: 'You are an elite enterprise consultant specializing in digital transformations. Critique the following business workflow with focus on speed, cost reduction, and quality bottlenecks: [INSERT WORKFLOW].',
              },
            ],
            resources: [
              { title: 'The Generative AI Mental Model (PDF)', url: '#', type: 'pdf' },
              { title: 'AI Capabilities Matrix 2026', url: '#', type: 'link' },
            ],
            content: `### What Makes Modern AI Fundamentally Different

For decades, computers operated exclusively on rigid, if-this-then-that logic. If a developer did not write a specific conditional statement, the software simply could not adapt. 

Modern artificial intelligence fundamentally alters this contract:
1. **Probabilistic Reasoning**: Foundational models predict the most coherent next token based on extensive multimodal training.
2. **Natural Language Interface**: Code is no longer the sole gatekeeper between your thoughts and functional digital output. English is now the world's most powerful programming syntax.
3. **Synthesis Over Search**: Unlike a search engine that returns blue links, generative models aggregate, structure, cross-examine, and reformat disparate sources into tailored solutions.

#### The Core Shift: Leverage Over Labor
The objective of Foundation Course is not to make you a data scientist. Your role is that of a **Director of Digital Output**. You define the strategy, provide high-resolution context, review intermediate drafts, and execute quality assurance. The AI handles the cognitive heavy lifting.`,
          },
          {
            id: 'les-1-2',
            title: 'Lesson 2: Demystifying LLMs, Context Windows, and Temperature',
            duration: '18 mins',
            type: 'article',
            order: 2,
            summary: 'Learn the core technical mechanics that dictate model accuracy, memory retention, and creative output.',
            keyTakeaways: [
              'Context windows dictate how much historical conversation and reference text the model can process.',
              'Temperature controls randomness: low for precision & code, high for creative marketing.',
              'Why providing structured reference material eliminates 90% of model hallucinations.',
            ],
            promptTemplates: [
              {
                name: 'Deterministic Data Extraction',
                prompt: 'Analyze the following unorganized meeting notes. Return ONLY a valid JSON object matching the provided schema with keys: action_items, responsible_party, target_date, blocker. Do not include conversational remarks.',
              },
            ],
            content: `### Understanding Context Windows and Model Attention

When interacting with models like Gemini or Claude, the "Context Window" is the working memory of the session. 

* **Input Tokens**: The prompt you provide, system guidelines, and uploaded reference documents.
* **Output Tokens**: The resulting response produced by the model.
* **Attention Mechanism**: The mathematical process by which the model weighs which parts of your prompt matter most.

#### Temperature & Top-P Settings
- **Temperature 0.0 - 0.2**: Ideal for writing code, validating logic, extracting structured JSON, and financial math.
- **Temperature 0.7 - 1.0**: Ideal for brainstorming naming concepts, creative marketing hooks, and diverse storytelling.`,
          },
        ],
      },
      {
        id: 'mod-2',
        title: 'Module 2: AI as a Productivity & Business Leverage Tool',
        description: 'Translating AI capabilities into measurable time savings, customer communication, and strategic operational speed.',
        order: 2,
        lessons: [
          {
            id: 'les-2-1',
            title: 'Lesson 3: The 10x Business Workflow Audit',
            duration: '16 mins',
            type: 'video',
            order: 1,
            summary: 'How to map your weekly business tasks into low-friction AI automated routines.',
            keyTakeaways: [
              'Categorizing tasks into Repetitive Text, Data Reformatting, Strategic Analysis, and Creative Ideation.',
              'Calculating dollar-value hourly savings per automated workflow.',
            ],
            content: `### Auditing Your Operational Day

Before opening any AI tool, map your daily activities into the 4 Quadrants of Cognitive Labor:
1. **High Volume, Low Complexity** (Customer email responses, calendar confirmations, invoices) -> Instant AI delegation.
2. **Medium Volume, High Structure** (Drafting blog posts, creating proposal outlines, cleaning spreadsheets) -> AI co-piloting.
3. **Low Volume, High Strategy** (Pricing changes, partnership decisions, hire selection) -> AI devil's advocate.
4. **Physical / Relationship Execution** (Handshakes, team culture, physical labor) -> 100% human focus.`,
          },
        ],
      },
      {
        id: 'mod-3',
        title: 'Module 3: Effective AI Prompting Architecture',
        description: 'The definitive framework for getting deterministic, world-class outputs on the very first try.',
        order: 3,
        lessons: [
          {
            id: 'les-3-1',
            title: 'Lesson 4: The 5-Part Precision Prompting Framework',
            duration: '22 mins',
            type: 'project',
            order: 1,
            summary: 'Role, Context, Task, Constraints, and Output Format: the bulletproof structure used by elite AI engineers.',
            keyTakeaways: [
              'Role primes the semantic weights in the neural net.',
              'Constraints prevent generic fluff and wordiness.',
              'Few-shot examples yield 4x higher accuracy than zero-shot instructions.',
            ],
            promptTemplates: [
              {
                name: 'The 5-Part Master Template',
                prompt: `[ROLE]: You are a senior brand positioning strategist.
[CONTEXT]: I operate a boutique commercial landscaping firm in Seattle catering to high-end tech corporate campuses.
[TASK]: Write 3 distinct value proposition elevator pitches for our RFP submittals.
[CONSTRAINTS]: No jargon like "cutting-edge" or "eco-friendly". Emphasize uptime, risk mitigation, and pristine aesthetic presentation for board meetings.
[FORMAT]: Markdown with bold headline, 3-sentence body, and bulleted proof metric.`,
              },
            ],
            content: `### Mastering the 5-Part Precision Prompt Formula

Vague prompts generate vague responses. When users complain that "AI sounds generic," it is almost universally caused by underspecified constraints.

Use this 5-part architecture for every serious prompt:
1. **Role**: Define who the model is embodying.
2. **Context**: Provide the background facts, business type, and target audience.
3. **Task**: Explicitly state the primary objective.
4. **Constraints**: Define what NOT to do (length limits, banned clichés, tone).
5. **Output Specification**: Request tables, JSON, markdown headings, or bullet points.`,
          },
        ],
      },
      {
        id: 'mod-4',
        title: 'Module 4: Responsible, Ethical & Safe AI Deployment',
        description: 'Safeguarding proprietary data, understanding IP rights, avoiding copyright traps, and managing privacy.',
        order: 4,
        lessons: [
          {
            id: 'les-4-1',
            title: 'Lesson 5: Privacy, Data Protection, and Hallucination Verification',
            duration: '15 mins',
            type: 'article',
            order: 1,
            summary: 'How to ensure confidential client information never leaks into public training corpora.',
            keyTakeaways: [
              'Consumer chat interfaces vs enterprise API data privacy terms.',
              'Techniques for zero-retention API calls.',
              'Verification protocol: how to cross-examine critical legal or numerical claims.',
            ],
            content: `### The Data Privacy Rulebook

When utilizing AI tools in business operations, you must distinguish between:
* **Consumer-facing web apps**: Free versions often reserve the right to incorporate your inputs into training datasets.
* **Commercial APIs & Enterprise agreements**: Strictly guarantee zero data retention and no model fine-tuning on your proprietary inputs.

Always scrub sensitive Personal Identifiable Information (PII) such as Social Security Numbers, customer credit card digits, or unannounced trade secrets before pasting into public interfaces.`,
          },
        ],
      },
    ],
  },
  {
    id: 'build-websites-with-ai',
    slug: 'build-websites-with-ai',
    title: 'Build High-Converting Websites with AI',
    category: 'Web Development',
    level: 'Beginner to Intermediate',
    duration: '6.5 hours',
    totalLessons: 18,
    badge: 'High Demand',
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Plan, design, code, and deploy modern responsive websites from scratch using AI as your full-time front-end engineer.',
    fullDescription: 'Stop paying thousands to agencies for standard marketing websites. In this comprehensive course, you will learn how to direct AI tools to generate clean HTML, Tailwind CSS, and interactive JavaScript. You will build mobile-responsive landing pages, local business directories, booking widgets, and deploy them live to production with custom domains in under an hour.',
    instructor: {
      name: 'Elena Rostova',
      role: 'Senior Front-End Architect & UI Designer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    },
    learningObjectives: [
      'Draft detailed website specifications and user flows with conversational AI',
      'Generate production-grade Tailwind CSS layouts that look hand-crafted by senior designers',
      'Integrate interactive JavaScript components, contact forms, and lead generation modals',
      'Audit mobile responsiveness, performance scores, and accessibility (WCAG AA)',
      'Deploy live websites to modern cloud hosting platforms like Vercel and Netlify for free',
    ],
    skills: ['AI-Assisted Web Design', 'HTML5 & Tailwind CSS', 'Interactive JavaScript', 'Mobile-First Layouts', 'Domain & DNS Configuration', 'Performance Auditing'],
    intendedAudience: [
      'Business owners who want a high-converting website without high agency costs',
      'Freelancers who want to deliver commercial websites to clients in 48 hours',
      'Marketers who need fast landing pages for ad campaigns and product launches',
    ],
    modules: [
      {
        id: 'web-mod-1',
        title: 'Module 1: Planning & Wireframing Websites with AI',
        description: 'Using AI to define sitemaps, user psychology, conversion funnels, and component architecture before writing code.',
        order: 1,
        lessons: [
          {
            id: 'web-1-1',
            title: 'Lesson 1: The Blueprint Prompt: Planning Site Architecture',
            duration: '16 mins',
            type: 'video',
            isFreePreview: true,
            order: 1,
            summary: 'Turn a 2-paragraph business concept into a comprehensive 7-section website blueprint with exact wireframe specifications.',
            keyTakeaways: [
              'The anatomy of a high-converting homepage: Hero, Social Proof, Core Benefits, Mechanism, Offer, Testimonials, Final CTA.',
              'Generating semantic HTML section tags with clear styling instructions.',
            ],
            promptTemplates: [
              {
                name: 'Website Architecture Architect',
                prompt: 'Act as an award-winning web design director. I run a local roofing company in Denver. Produce a complete wireframe architecture for our homepage, including section names, visual focal points, exact copy recommendations, and primary conversion triggers.',
              },
            ],
            resources: [
              { title: 'The High-Converting Homepage Wireframe Spec (PDF)', url: '#', type: 'pdf' },
            ],
            content: `### Why Great Websites Start with Prompted Architecture

Most developers fail because they jump straight into code before establishing structural hierarchy. 

When directing an AI model to write a website:
1. Define the **User Journey**: What single action must the visitor take within 5 seconds?
2. Structure the **Visual Sections**:
   - Header with Logo, Navigation, and High-Contrast Action Button.
   - Hero Section with high-contrast headline and immediate benefit statement.
   - Trust Bar / Client Logos / Verified Badges.
   - Pain Points vs Solution Grid.
   - Interactive Pricing or Calculator Widget.
   - Frequently Asked Questions accordion.
   - Sticky or prominent Footer.`,
          },
        ],
      },
      {
        id: 'web-mod-2',
        title: 'Module 2: Generating Layouts, Content & Design Systems',
        description: 'Creating cohesive color palettes, typography pairings, and modern UI components that avoid the generic AI look.',
        order: 2,
        lessons: [
          {
            id: 'web-2-1',
            title: 'Lesson 2: Crafting Premium Tailwind CSS with AI',
            duration: '24 mins',
            type: 'project',
            order: 1,
            summary: 'Directing AI to produce modern, optical design systems with nuanced shadows, subtle borders, and balanced whitespace.',
            keyTakeaways: [
              'Avoiding AI clichés: no loud purple gradients or unreadable thin text.',
              'Using mathematical spacing scales and strict contrast ratios.',
            ],
            content: `### Elevating AI-Generated CSS to World-Class Design

AI models tend to default to dated styles unless explicitly instructed on modern aesthetic rules:
* Specify **Neutrals with character**: Replace pure #000000 and #ffffff with subtle slate, zinc, or stone tones.
* Demand **Optical Spacing**: Ensure button padding is mathematically proportional (horizontal padding 2x vertical padding).
* Enforce **Subtle Depth**: Pair clean 1px border outlines with whisper-soft box shadows.`,
          },
        ],
      },
      {
        id: 'web-mod-3',
        title: 'Module 3: AI-Assisted HTML, CSS, and JavaScript',
        description: 'Writing clean, semantic markup and wiring up reactive elements like mobile menus, filterable galleries, and forms.',
        order: 3,
        lessons: [
          {
            id: 'web-3-1',
            title: 'Lesson 3: Adding Interactivity: Lead Capture, Modals & Menus',
            duration: '28 mins',
            type: 'video',
            order: 1,
            summary: 'Prompting AI to write clean, vanilla JavaScript for interactive UI widgets and form validation.',
            keyTakeaways: [
              'Handling event listeners cleanly without memory leaks.',
              'Client-side form validation with visual feedback states.',
            ],
            content: `### Creating Functional UI Widgets with AI

Learn how to ask AI to create accessible, keyboard-navigable components:
- Mobile drawer menus with backdrop blur and touch swipe support.
- Interactive pricing calculators that update quotes live based on user selections.
- Client-side email validation with immediate inline helper text.`,
          },
        ],
      },
      {
        id: 'web-mod-4',
        title: 'Module 4: Responsive Design, Mobile Optimization & Testing',
        description: 'Ensuring your website looks flawless on smartphones, tablets, laptops, and 4K desktop screens.',
        order: 4,
        lessons: [
          {
            id: 'web-4-1',
            title: 'Lesson 4: Mobile-First Breakpoints & Touch Target Optimization',
            duration: '18 mins',
            type: 'article',
            order: 1,
            summary: 'Auditing touch targets (minimum 44px), thumb-friendly navigation, and adaptive font sizing.',
            keyTakeaways: [
              'Testing with Chrome DevTools Device Mode.',
              'Refactoring desktop navigation bars into ergonomic bottom tab bars or sliding drawers.',
            ],
            content: `Over 68% of local business traffic arrives via mobile devices. If your website requires pinch-to-zoom or has cramped buttons, you lose 50% of your potential customers. In this lesson, we use AI to audit every breakpoint.`,
          },
        ],
      },
      {
        id: 'web-mod-5',
        title: 'Module 5: Testing, Auditing & Refining AI-Generated Websites',
        description: 'Lighthouse audits, SEO tag verification, performance budgets, and fixing subtle bugs.',
        order: 5,
        lessons: [
          {
            id: 'web-5-1',
            title: 'Lesson 5: Passing Google Lighthouse with 95+ Scores',
            duration: '20 mins',
            type: 'video',
            order: 1,
            summary: 'How to feed Lighthouse report errors directly into AI to resolve layout shifts and asset bottlenecks.',
            keyTakeaways: [
              'Diagnosing Cumulative Layout Shift (CLS) and Largest Contentful Paint (LCP).',
              'Using AI to compress inline SVG vectors and optimize web font loading.',
            ],
            content: `Learn the exact prompt template that takes an initial Lighthouse diagnostic JSON and returns surgical code fixes that drive performance scores to 95+.`,
          },
        ],
      },
      {
        id: 'web-mod-6',
        title: 'Module 6: Deploying Websites Online with Custom Domains',
        description: 'Going from local code files to a live, secure HTTPS website accessible to the entire world.',
        order: 6,
        lessons: [
          {
            id: 'web-6-1',
            title: 'Lesson 6: Instant Zero-Cost Hosting & DNS Configuration',
            duration: '22 mins',
            type: 'project',
            order: 1,
            summary: 'Deploying your site to Vercel, Netlify, or Cloudflare Pages, configuring SSL, and connecting custom .com domains.',
            keyTakeaways: [
              'Setting up A records and CNAME records in your domain registrar.',
              'Enabling automated HTTPS SSL certificates.',
            ],
            content: `Step-by-step walkthrough of deploying your AI-built website. You will connect your custom domain name, verify DNS propagation, and configure form submissions to deliver leads straight to your inbox.`,
          },
        ],
      },
    ],
  },
  {
    id: 'build-software-and-applications-with-ai',
    slug: 'build-software-and-applications-with-ai',
    title: 'Build Software & Applications with AI',
    category: 'Software Engineering',
    level: 'All Levels',
    duration: '8.5 hours',
    totalLessons: 24,
    badge: 'Flagship Masterclass',
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Turn software ideas into functional full-stack web apps, SaaS prototypes, and internal business tools with AI coding assistants.',
    fullDescription: 'You no longer need a 4-year computer science degree to build functional software. This flagship course teaches you the modern software engineering lifecycle powered by AI. You will learn project specification, working with advanced AI code editors (Cursor, Claude Code, GitHub Copilot), connecting PostgreSQL and Firestore databases, building REST APIs, and deploying production web applications.',
    instructor: {
      name: 'David Sterling',
      role: 'Former Staff Engineer & SaaS Founder',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
    learningObjectives: [
      'Write technical product requirement documents (PRDs) that AI models can execute without drift',
      'Leverage AI coding tools like Cursor, Claude, and Gemini to generate full-stack architectures',
      'Build reactive front-end interfaces in React & TypeScript paired with Express/Node back-ends',
      'Design relational schemas, SQL queries, and secure user authentication systems',
      'Debug runtime stack traces and deploy web applications to Cloud Run and Vercel',
    ],
    skills: ['AI-Driven Architecture', 'TypeScript & React', 'Node.js & Express', 'Database Modeling', 'API Integration', 'Full-Stack Debugging', 'Production Deployment'],
    intendedAudience: [
      'Entrepreneurs wanting to build their own SaaS products without a technical co-founder',
      'Product managers seeking to prototype real functional software',
      'Business operators building internal company dashboards and client portals',
    ],
    modules: [
      {
        id: 'soft-mod-1',
        title: 'Module 1: Planning Software Projects with AI',
        description: 'Writing technical specs, data models, API contracts, and user stories that keep AI coding tools on track.',
        order: 1,
        lessons: [
          {
            id: 'soft-1-1',
            title: 'Lesson 1: The Product Requirement Document (PRD) Blueprint',
            duration: '20 mins',
            type: 'video',
            isFreePreview: true,
            order: 1,
            summary: 'How to write a structured specification that guides AI through complex multi-file software builds without hallucinated breaking changes.',
            keyTakeaways: [
              'The danger of "vague prompting" in software development.',
              'Defining schemas, route signatures, and state containers up front.',
            ],
            content: `Software projects fail when developers instruct AI with one sentence like "build me an Uber for dogs". In this lesson, you will learn the exact 6-part PRD template that breaks software into manageable milestones, data contracts, and component trees.`,
          },
        ],
      },
      {
        id: 'soft-mod-2',
        title: 'Module 2: Turning an Idea into a Functional MVP',
        description: 'From blank workspace to a clickable, database-connected application prototype in 72 hours.',
        order: 2,
        lessons: [
          {
            id: 'soft-2-1',
            title: 'Lesson 2: Scaffolding the Core Engine & State Management',
            duration: '25 mins',
            type: 'project',
            order: 1,
            summary: 'Creating stateful React components, reactive state stores, and modular directory structures.',
            keyTakeaways: [
              'Separation of concerns: UI components vs data fetching hooks.',
              'Avoiding monolithic files that exceed AI context windows.',
            ],
            content: `Learn how to instruct AI to architect clean, modular folders with strict separation between user presentation, business logic, and API calls.`,
          },
        ],
      },
      {
        id: 'soft-mod-3',
        title: 'Module 3: Working with Modern AI Coding Assistants',
        description: 'Maximizing Cursor, GitHub Copilot, Gemini Code Assist, and terminal agents for superhuman development velocity.',
        order: 3,
        lessons: [
          {
            id: 'soft-3-1',
            title: 'Lesson 3: Cursor & Copilot: Composer, Rules, and @-Mentions',
            duration: '30 mins',
            type: 'video',
            order: 1,
            summary: 'Deep dive into system instruction files (.cursorrules), multi-file composer edits, and context grounding.',
            keyTakeaways: [
              'Using @file, @folder, and @docs to prevent outdated package syntax.',
              'Atomic prompt commits that preserve git history.',
            ],
            content: `Explore how to configure repository-level rules that teach your AI assistant your exact tech stack preferences, error handling policies, and coding conventions.`,
          },
        ],
      },
      {
        id: 'soft-mod-4',
        title: 'Module 4: Front-End and Back-End Architecture',
        description: 'Building cohesive client-server communication, authentication tokens, and server middleware.',
        order: 4,
        lessons: [
          {
            id: 'soft-4-1',
            title: 'Lesson 4: Building Express API Routes & Auth Middlewares',
            duration: '26 mins',
            type: 'video',
            order: 1,
            summary: 'Securing endpoints, parsing JSON payloads, managing sessions, and validating request schemas.',
            keyTakeaways: [
              'CORS, helmet, rate limiting, and input sanitization.',
              'JWT and cookie-based session verification patterns.',
            ],
            content: `Learn how to prompt AI to generate secure, production-grade Express server routes with rigorous validation, preventing SQL injection and cross-site scripting vulnerabilities.`,
          },
        ],
      },
      {
        id: 'soft-mod-5',
        title: 'Module 5: Databases, Schemas & Third-Party APIs',
        description: 'Connecting PostgreSQL, SQLite, and cloud databases; orchestrating external APIs with server-side safety.',
        order: 5,
        lessons: [
          {
            id: 'soft-5-1',
            title: 'Lesson 5: Database Modeling, Migrations, and CRUD Operations',
            duration: '28 mins',
            type: 'project',
            order: 1,
            summary: 'Designing entity relationships, foreign keys, indexes, and querying data with type safety.',
            keyTakeaways: [
              'One-to-many vs many-to-many relationship structures.',
              'Writing database seed scripts and safe migrations.',
            ],
            content: `Master instructing AI to generate robust relational database schemas and automated mock seed datasets for rapid local testing.`,
          },
        ],
      },
      {
        id: 'soft-mod-6',
        title: 'Module 6: Debugging, Refactoring & Test Generation',
        description: 'Using AI to diagnose obscure runtime stack traces, memory leaks, and write automated test suites.',
        order: 6,
        lessons: [
          {
            id: 'soft-6-1',
            title: 'Lesson 6: The AI Debugging Flywheel: Error Logs to Instant Patch',
            duration: '22 mins',
            type: 'article',
            order: 1,
            summary: 'Feeding browser console errors and server crash logs to AI for rapid root-cause isolation.',
            keyTakeaways: [
              'Providing minimal reproducible examples to avoid hallucinated solutions.',
              'Writing automated integration tests that prevent regressions.',
            ],
            content: `Learn how to diagnose nasty CORS bugs, race conditions, and null-pointer exceptions in seconds by feeding exact terminal logs into conversational AI.`,
          },
        ],
      },
      {
        id: 'soft-mod-7',
        title: 'Module 7: Cloud Deployment & CI/CD Pipelines',
        description: 'Shipping to production on Cloud Run, Docker containers, and configuring automated GitHub deployment actions.',
        order: 7,
        lessons: [
          {
            id: 'soft-7-1',
            title: 'Lesson 7: Production Docker Containers & Cloud Run Scaling',
            duration: '24 mins',
            type: 'video',
            order: 1,
            summary: 'Containerizing your full-stack application and deploying to scalable cloud infrastructure.',
            keyTakeaways: [
              'Writing minimal multi-stage Dockerfiles.',
              'Configuring environment variable secrets safely in production.',
            ],
            content: `Deploy your full-stack application live to Google Cloud Run or AWS with zero downtime and automatic autoscaling.`,
          },
        ],
      },
    ],
  },
  {
    id: 'ai-for-local-businesses',
    slug: 'ai-for-local-businesses',
    title: 'AI for Local Businesses: Operations, Automation & Growth',
    category: 'Local Business',
    level: 'Beginner',
    duration: '5 hours',
    totalLessons: 15,
    badge: 'Business Growth',
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Streamline local business operations, automate repetitive customer communication, and create high-converting marketing content.',
    fullDescription: 'Local businesses (contractors, dental offices, legal practices, restaurants, boutique fitness studios, retail shops) face a constant struggle with time. In this practical course, you will learn how to deploy AI to automate customer inquiries, craft professional marketing campaigns in minutes, draft personalized proposals, and streamline scheduling and administrative tasks.',
    instructor: {
      name: 'Sarah Jenkins',
      role: 'Local Business Growth Consultant & Digital Strategist',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    },
    learningObjectives: [
      'Diagnose and automate high-friction operational bottlenecks in your business',
      'Generate a month of high-converting local social media, email newsletters, and ad copy in 90 minutes',
      'Build automated customer response templates for phone, email, and social DMs',
      'Deploy AI to create professional quote estimates, project proposals, and customer onboarding docs',
    ],
    skills: ['Local Business Operations', 'Customer Workflow Automation', 'Content Marketing', 'Proposal Generation', 'Customer Engagement Systems'],
    intendedAudience: [
      'Brick-and-mortar store owners',
      'Home service contractors (plumbers, electricians, landscapers, roofers)',
      'Professional service providers (accountants, realtors, consultants, clinics)',
    ],
    modules: [
      {
        id: 'biz-mod-1',
        title: 'Module 1: Diagnosing & Streamlining Operational Bottlenecks',
        description: 'Mapping daily friction points where owner time is wasted on low-value repetitive tasks.',
        order: 1,
        lessons: [
          {
            id: 'biz-1-1',
            title: 'Lesson 1: The Local Business Operations Audit',
            duration: '18 mins',
            type: 'video',
            isFreePreview: true,
            order: 1,
            summary: 'How to calculate your effective hourly rate and automate tasks costing you over 15 hours per week.',
            keyTakeaways: [
              'Identifying high-frequency communication friction.',
              'Creating automated standard operating procedures (SOPs).',
            ],
            content: `Learn the step-by-step diagnostic audit that identifies the top 3 bottlenecks bleeding time in local businesses: appointment scheduling friction, inquiry lag, and manual estimate drafting.`,
          },
        ],
      },
      {
        id: 'biz-mod-2',
        title: 'Module 2: Rapid Professional Marketing & Digital Content Creation',
        description: 'Creating high-converting marketing campaigns, promotional flyers, email newsletters, and seasonal offers in minutes.',
        order: 2,
        lessons: [
          {
            id: 'biz-2-1',
            title: 'Lesson 2: The 30-Day Local Content Engine with AI',
            duration: '22 mins',
            type: 'project',
            order: 1,
            summary: 'Using AI to write localized, high-engagement content for Facebook, Instagram, Google Updates, and email newsletters.',
            keyTakeaways: [
              'Writing local-specific hooks that resonate with your specific neighborhood.',
              'Developing promotional offers that drive foot traffic and phone calls.',
            ],
            content: `Direct AI to write 30 days of authentic local social content, promotional offers, and client educational spotlights that position your business as the neighborhood authority.`,
          },
        ],
      },
      {
        id: 'biz-mod-3',
        title: 'Module 3: Automating Repetitive Tasks & Customer Inquiries',
        description: 'Setting up automated FAQ responders, quote request questionnaires, and email workflows.',
        order: 3,
        lessons: [
          {
            id: 'biz-3-1',
            title: 'Lesson 3: Instant 24/7 Inquiry Qualification System',
            duration: '20 mins',
            type: 'video',
            order: 1,
            summary: 'Drafting instant AI response sequences that qualify incoming leads and book appointments automatically.',
            keyTakeaways: [
              'The 5-minute lead response rule: why responding in 5 minutes increases close rates by 400%.',
              'Pre-qualifying budget and project scope with conversational forms.',
            ],
            content: `Learn how to connect simple form inputs with AI logic to respond to customer inquiries within 60 seconds with personalized, polite, and detailed estimates.`,
          },
        ],
      },
      {
        id: 'biz-mod-4',
        title: 'Module 4: Customer Retention & 5-Star Review Systems',
        description: 'Automating post-service check-ins, referral requests, and managing review sentiment.',
        order: 4,
        lessons: [
          {
            id: 'biz-4-1',
            title: 'Lesson 4: Turning Happy Customers into Unstoppable Word of Mouth',
            duration: '16 mins',
            type: 'article',
            order: 1,
            summary: 'Crafting automated SMS and email sequences that solicit glowing Google reviews at the moment of peak customer satisfaction.',
            keyTakeaways: [
              'Timing the review request for the "honeymoon window".',
              'Handling neutral or negative feedback privately before it reaches public platforms.',
            ],
            content: `Discover the exact post-job follow-up sequence that consistently delivers a 45% conversion rate on Google review requests for local service businesses.`,
          },
        ],
      },
    ],
  },
  {
    id: 'google-business-profile-mastery',
    slug: 'google-business-profile',
    title: 'Google Business Profile: Local Visibility & Customer Magnetism',
    category: 'Local SEO',
    level: 'Beginner',
    duration: '4 hours',
    totalLessons: 12,
    badge: 'Local SEO',
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Dominate Google Local 3-Pack rankings, optimize business information, and attract high-intent local customers on Google Maps.',
    fullDescription: 'When local customers search for services in your area, do you appear in the Google Maps Top 3? Google Business Profile is the highest-ROI digital asset for any local business. In this course, you will learn how to properly set up, verify, and fully optimize your profile, utilize AI to draft high-ranking weekly Google updates, craft keyword-optimized service catalogs, and build an unstoppable review flywheel.',
    instructor: {
      name: 'Michael Chang',
      role: 'Local SEO Specialist & Agency Director',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    },
    learningObjectives: [
      'Create, claim, verify, and bulletproof your Google Business Profile against suspension',
      'Optimize primary and secondary categories to unlock maximum local search impressions',
      'Write compelling service catalogs, descriptions, and FAQ sections with AI SEO prompts',
      'Execute a weekly posting cadence with photos and updates that signals high activity to Google algorithms',
      'Master the art of responding to both 5-star and critical reviews with AI-assisted professionalism',
    ],
    skills: ['Google Business Profile Optimization', 'Local 3-Pack Rankings', 'Local Keyword Research', 'Review Strategy & Management', 'Geo-Targeted Content'],
    intendedAudience: [
      'Local business owners seeking direct customer calls and map directions',
      'Service contractors looking to outrank legacy competitors in their metro area',
      'Agencies offering local SEO services to small business clients',
    ],
    modules: [
      {
        id: 'gbp-mod-1',
        title: 'Module 1: Creating & Bulletproofing Your Google Business Profile',
        description: 'Proper profile verification, avoiding suspension triggers, and configuring core business vitals.',
        order: 1,
        lessons: [
          {
            id: 'gbp-1-1',
            title: 'Lesson 1: The Verification & Setup Playbook',
            duration: '18 mins',
            type: 'video',
            isFreePreview: true,
            order: 1,
            summary: 'Navigating video verification, postcard verification, and setting up accurate service areas without address flags.',
            keyTakeaways: [
              'Storefront vs Service Area Business (SAB) configuration.',
              'Ensuring NAP (Name, Address, Phone) consistency across the web.',
            ],
            content: `Learn the essential steps to verify your Google Business Profile without triggering algorithmic suspension, and configure your operational hours and holiday schedules.`,
          },
        ],
      },
      {
        id: 'gbp-mod-2',
        title: 'Module 2: Local Search Ranking Factors & Category Optimization',
        description: 'The secret algorithm signals Google uses to rank businesses in the coveted 3-Pack.',
        order: 2,
        lessons: [
          {
            id: 'gbp-2-1',
            title: 'Lesson 2: Choosing Your Primary Category & Geo-Keywords',
            duration: '20 mins',
            type: 'article',
            order: 1,
            summary: 'Why your primary category accounts for over 50% of your ranking power, and how to select the highest-volume category.',
            keyTakeaways: [
              'Primary vs secondary category impact.',
              'Using AI to analyze top competitor categories in your zip code.',
            ],
            content: `Discover how adjusting a single word in your primary category can increase your Google Maps impressions by 300% within 14 days.`,
          },
        ],
      },
      {
        id: 'gbp-mod-3',
        title: 'Module 3: High-Converting Photos, Posts & Services Catalog',
        description: 'Populating your profile with conversion-focused visual assets and weekly AI-written promotional posts.',
        order: 3,
        lessons: [
          {
            id: 'gbp-3-1',
            title: 'Lesson 3: The Weekly Google Update Strategy',
            duration: '16 mins',
            type: 'video',
            order: 1,
            summary: 'Generating weekly updates, special offers, and event announcements using AI prompt formulas.',
            keyTakeaways: [
              'Google favors profiles updated at least once every 7 days.',
              'Including local geocoded photography to boost authority.',
            ],
            content: `Use our AI prompt generator to write 12 weeks of high-ranking Google Updates with clear call-to-action buttons (Call Now, Book, Order Online).`,
          },
        ],
      },
      {
        id: 'gbp-mod-4',
        title: 'Module 4: Strategies for Attracting Local Customers & Dominating Reviews',
        description: 'How to build review velocity, respond professionally to criticism, and convert map searches into paying clients.',
        order: 4,
        lessons: [
          {
            id: 'gbp-4-1',
            title: 'Lesson 4: The 5-Star Review Generation Machine',
            duration: '18 mins',
            type: 'project',
            order: 1,
            summary: 'Creating QR codes for checkout counters and generating AI-assisted personalized review responses.',
            keyTakeaways: [
              'Responding to 100% of reviews signals active customer service to Google.',
              'Embedding local keyword phrases naturally into review replies.',
            ],
            content: `Learn the exact AI template that generates warm, keyword-rich replies to every positive review and de-escalates negative customer experiences with empathy and class.`,
          },
        ],
      },
    ],
  },
  {
    id: 'personal-branding',
    slug: 'personal-branding',
    title: 'Personal Branding: Digital Identity, Authority & Influence',
    category: 'Personal Branding',
    level: 'All Levels',
    duration: '5.5 hours',
    totalLessons: 16,
    badge: 'Career & Authority',
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Build a commanding professional online identity, produce thought-leadership content with AI, and establish undeniable industry credibility.',
    fullDescription: 'In the modern digital economy, your personal brand is your most valuable asset. Whether you are an entrepreneur, consultant, founder, or service professional, people buy from people they know, like, and trust. In this course, you will learn how to clarify your positioning, craft high-authority profiles across LinkedIn, X, and personal websites, and utilize AI as a collaborative writing partner to publish insightful content consistently without burnout.',
    instructor: {
      name: 'Victoria Hayes',
      role: 'Brand Positioning Strategist & Author',
      avatar: 'https://images.unsplash.com/photo-1534751516642-a171edfe5c32?auto=format&fit=crop&w=300&q=80',
    },
    learningObjectives: [
      'Define your unique personal value proposition and target audience resonance points',
      'Optimize your LinkedIn and social media profiles into high-converting authority landing pages',
      'Use AI to outline, write, and refine high-impact thought leadership articles, case studies, and posts',
      'Establish credibility online through public portfolios, digital assets, and speaking opportunities',
      'Convert digital audience engagement into high-paying client inquiries and advisory roles',
    ],
    skills: ['Personal Brand Strategy', 'Authority Positioning', 'Executive Ghostwriting with AI', 'LinkedIn Optimization', 'Digital Credibility Building'],
    intendedAudience: [
      'Founders and business owners who want to become the face of their industry',
      'Consultants and freelancers looking to attract premium inbound clients',
      'Professionals aiming to accelerate career trajectory and speaking opportunities',
    ],
    modules: [
      {
        id: 'brand-mod-1',
        title: 'Module 1: Building a Professional Online Identity',
        description: 'Uncovering your unique zone of genius, defining your personal brand pillars, and crafting your core story.',
        order: 1,
        lessons: [
          {
            id: 'brand-1-1',
            title: 'Lesson 1: The Personal Positioning Canvas',
            duration: '20 mins',
            type: 'video',
            isFreePreview: true,
            order: 1,
            summary: 'Clarifying who you help, what transformation you provide, and why your background gives you unique authority.',
            keyTakeaways: [
              'The "One-Liner" positioning statement formula.',
              'Auditing your current digital footprint across Google search results.',
            ],
            content: `Your personal brand already exists; the question is whether you are intentionally shaping it or letting random search results define you. In this lesson, we build your core identity statement.`,
          },
        ],
      },
      {
        id: 'brand-mod-2',
        title: 'Module 2: Creating a High-Authority Personal Brand Platform',
        description: 'Optimizing LinkedIn, X, and your personal homepage into a coherent, high-converting digital storefront.',
        order: 2,
        lessons: [
          {
            id: 'brand-2-1',
            title: 'Lesson 2: The High-Converting LinkedIn Profile Makeover',
            duration: '24 mins',
            type: 'project',
            order: 1,
            summary: 'Banner design, headline copywriting, the "Featured" section setup, and storytelling "About" bio architecture.',
            keyTakeaways: [
              'Replacing passive job titles with active client transformation statements.',
              'Designing visual trust assets that showcase past outcomes.',
            ],
            content: `Learn how to turn your LinkedIn profile from a dry resume into a high-converting sales page that drives inbound inquiries while you sleep.`,
          },
        ],
      },
      {
        id: 'brand-mod-3',
        title: 'Module 3: Developing Professional Content with AI Support',
        description: 'Using AI as a research assistant, structural editor, and ideation partner while keeping your authentic human voice.',
        order: 3,
        lessons: [
          {
            id: 'brand-3-1',
            title: 'Lesson 3: The Voice-Matching AI Writing System',
            duration: '26 mins',
            type: 'video',
            order: 1,
            summary: 'Training an AI model on your past writing samples to produce drafts that sound 100% authentically like you.',
            keyTakeaways: [
              'Extracting your personal tone parameters: cadence, sentence length, vocabulary, and humor.',
              'The 80/20 rule: AI produces the 80% rough draft; you infuse the 20% irreplaceable personal wisdom.',
            ],
            content: `Learn the voice calibration prompt that instructs AI to mirror your exact sentence rhythm, metaphors, and storytelling style so your content never sounds generic or synthetic.`,
          },
        ],
      },
      {
        id: 'brand-mod-4',
        title: 'Module 4: Establishing Online Credibility & Growth Flywheel',
        description: 'Case studies, digital assets, podcast guest appearances, and turning attention into business revenue.',
        order: 4,
        lessons: [
          {
            id: 'brand-4-1',
            title: 'Lesson 4: The Inbound Client Conversion Flywheel',
            duration: '18 mins',
            type: 'article',
            order: 1,
            summary: 'Guiding audience attention from social posts to email subscribers and high-ticket consulting conversations.',
            keyTakeaways: [
              'Creating a high-value digital lead magnet with AI.',
              'Constructing frictionless calendar booking funnels.',
            ],
            content: `How to monetize your digital presence without feeling like a pushy salesperson. Turn passive readers into loyal clients through educational trust.`,
          },
        ],
      },
    ],
  },
];
