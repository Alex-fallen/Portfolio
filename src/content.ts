// Everything the page says lives here, so copy changes never touch layout code

export const person = {
  name: 'Prince Joshi',
  initials: 'PJ',
  role: 'Full-Stack Developer · AI Solutions',
  intro:
    'I build AI products end to end: React and TypeScript on the front, Python and FastAPI behind, and RAG pipelines that answer from real documents.',
  current: 'Full-Stack Developer at NLL Academy',
  since: 'Since February 2026',
  email: 'princejoshi2004@gmail.com',
}

export const links = {
  github: 'https://github.com/Alex-fallen',
  linkedin: 'https://www.linkedin.com/in/fx-prince-joshi',
  email: `mailto:${person.email}?subject=${encodeURIComponent('Hello from your portfolio')}`,
}

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
]

export const about = {
  headline: 'Documents in. Answers out.',
  body: [
    "I'm a full-stack developer at NLL Academy, building AI-powered applications from the interface down to the API.",
    'Most of my work sits where web apps meet language models: retrieval-augmented generation, document parsing with Docling, embeddings and vector search, and the React screens that make the results usable.',
  ],
  facts: [
    { label: 'Frontend', value: 'React, TypeScript, Tailwind CSS' },
    { label: 'Backend', value: 'Python, FastAPI, PostgreSQL' },
    { label: 'AI', value: 'RAG, embeddings, local LLMs' },
  ],
}

export const experience = {
  role: 'Full-Stack Developer',
  company: 'NLL Academy',
  period: 'Feb 2026 – Present',
  summary:
    'Contributing to AI-powered applications, including Lira and SOP Automation: building React and TypeScript interfaces, integrating Python/FastAPI backends, and developing document-processing and workflow features.',
  highlights: [
    {
      title: 'Lira',
      text: 'React and TypeScript interfaces for an AI knowledge assistant: document Q&A chat, role-play practice and a usage analytics dashboard.',
    },
    {
      title: 'SOP Automation',
      text: 'FastAPI services behind a three-step SOP builder: file-level mapping, section mapping and finalization, with drafts and status tracking.',
    },
    {
      title: 'Document processing',
      text: 'Parsing workflows with Docling, python-docx and Mammoth that turn PDF, DOCX and PPTX sources into structured, searchable content.',
    },
  ],
}

export type Project = {
  id: string
  name: string
  tagline: string
  description: string
  tech: string[]
  link: string
  shots: { src: string; alt: string; caption: string }[]
}

export const projects: Project[] = [
  {
    id: 'lira',
    name: 'Lira',
    tagline: 'AI-powered knowledge assistant',
    description:
      'An AI-powered knowledge platform that answers questions from internal documents using LLMs and RAG, with guided learning, conversational interactions and analytics.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Python', 'FastAPI', 'PostgreSQL', 'LLMs', 'RAG'],
    link: 'Internal company project · public link to follow',
    shots: [
      {
        src: '/work/lira-analytics.webp',
        alt: 'Lira analytics dashboard with a bar chart of monthly queries and bubbles for repeated question clusters',
        caption: 'Usage analytics and repeated-question clusters',
      },
      {
        src: '/work/lira-roleplay.webp',
        alt: 'Lira role-play practice start screen asking the user to choose courses',
        caption: 'Role-play practice built on course content',
      },
    ],
  },
  {
    id: 'sop',
    name: 'SOP Automation',
    tagline: 'AI-assisted SOP generation',
    description:
      'A document-driven application that streamlines Standard Operating Procedure creation through document processing, structured sections, draft management and SME guidance.',
    tech: ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Docling'],
    link: 'Internal company project · public link to follow',
    shots: [
      {
        src: '/work/sop-dashboard.webp',
        alt: 'SOP dashboard listing procedures with created date, author, draft status and processing state',
        caption: 'SOP dashboard with drafts, status and processing',
      },
      {
        src: '/work/sop-mapping.webp',
        alt: 'Three-step SOP builder showing SOP details and mapping a PDF source file to a section',
        caption: 'Mapping source documents to SOP sections',
      },
    ],
  },
]

export const stack = [
  {
    id: 'frontend',
    title: 'Frontend',
    tools: ['React.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'shadcn/ui', 'HTML5', 'CSS3'],
    also: 'Also worked with React Router, TanStack Table, Recharts, Apache ECharts, React Query, React Hook Form and Zod.',
  },
  {
    id: 'backend',
    title: 'Backend',
    tools: ['Python', 'FastAPI', 'Node.js', 'REST APIs', 'SQLAlchemy'],
  },
  {
    id: 'data',
    title: 'Databases & vector search',
    tools: ['PostgreSQL', 'Supabase', 'Qdrant', 'SQL', 'MongoDB'],
  },
  {
    id: 'ai',
    title: 'AI & LLM development',
    tools: ['Large language models', 'RAG', 'Document Q&A', 'Embeddings', 'Vector search'],
    also: 'Also explored Docling, BGE embeddings, local LLMs, speech-to-text and AI document-processing workflows.',
  },
  {
    id: 'docs',
    title: 'Document processing',
    tools: ['Docling', 'python-docx', 'Mammoth', 'PDF processing', 'DOCX / PPTX parsing'],
  },
  {
    id: 'tools',
    title: 'Tools & infrastructure',
    tools: ['Git', 'GitHub', 'Docker', 'Docker Compose', 'Vite', 'pnpm', 'AWS CLI'],
  },
]

