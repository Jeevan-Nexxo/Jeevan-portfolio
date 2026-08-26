/**
 * PROJECTS — structured for easy add/remove/update.
 * Rules:
 *  - Never invent URLs or tech. Use null → UI renders a safe disabled state.
 *  - `image` points to /public/assets/projects/… (see ASSETS.md).
 *  - Live URLs only. GitHub links intentionally live in the Contact section.
 */
export const PROJECTS = [
  {
    id: 'apex',
    index: '01',
    name: 'APEX',
    status: 'Currently in Development',
    description:
      'A student-driven innovation/startup platform where students share ideas, showcase projects, collaborate and develop practical solutions. I am the primary developer and part of the startup team.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Express.js', 'PostgreSQL', 'JWT Auth', 'Multer'],
    image: '/assets/projects/apex.jpg',
    liveUrl: null, // TODO — add live URL when available (see ASSETS.md)
  },
  {
    id: 'arun-portfolio',
    index: '02',
    name: 'Arun Portfolio',
    status: 'Completed',
    description:
      'Responsive personal portfolio website designed and developed for a friend, Featuring dark/light theme, persistent settings, scroll-triggered reveals and ambient visuals.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    image: '/assets/projects/arun-portfolio.jpg',
    liveUrl: 'https://arunvasudevc.vercel.app/', // TODO — add live URL when available (see ASSETS.md)
  },
  {
    id: 'birthday-experience',
    index: '03',
    name: 'Birthday Experience',
    status: 'Soon / In Development',
    description:
      'An interactive cinematic birthday experience designed as a personalized digital journey.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    image: '/assets/projects/birthday-experience.jpg',
    liveUrl: null, // TODO — add live URL when available (see ASSETS.md)
  },
  {
    id: 'this-portfolio',
    index: '04',
    name: 'This Portfolio',
    status: 'Currently Live / In Development',
    description:
      'A personal portfolio designed and developed to showcase my projects, technical skills, creative experiments and ongoing journey as a Computer Science student.',
    highlight:
      'Responsive editorial UI, interactive motion, theme system, optional 3D intro and subtle hidden interactions.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    image: '/assets/projects/this-portfolio.jpg',
    liveUrl: '#top', // the current site itself
    liveLabel: 'Live · Current Site',
  },
]
