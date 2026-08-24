/**
 * PERSONAL IDENTITY & CONTACT — single source of truth.
 * Edit values here; sections read from this file.
 * Rules: never invent details. Placeholders stay clearly marked (null / TODO).
 */
export const PROFILE = {
  name: 'Jeevansri G',
  firstName: 'Jeevansri',
  role: 'Computer Science Student & Developer',
  title: 'Second-year B.Sc. Computer Science Student & Developer',

  heroStatement:
    'Building useful digital experiences, exploring modern technology, and turning ideas into working products.',

  bio: [
    "I'm Jeevansri — a second-year B.Sc. Computer Science student who enjoys building useful digital products and learning through practical implementation.",
    'Right now I am exploring software development, full stack work, UI/UX, artificial intelligence and automation — experimenting with modern web technologies and AI-assisted workflows.',
    'The goal is simple: turn curiosity and technical skills into real-world products, freelance work, collaborations and future opportunities.',
  ],

  currentlyExploring: [
    'Software Development',
    'Full Stack Development',
    'UI/UX',
    'Artificial Intelligence',
    'AI-Assisted Development',
    'Automation',
    'Modern Web Technologies',
  ],

  /** About — small editorial blocks rendered under the Goal paragraph. */
  approachBlocks: [
    {
      label: 'How I Work',
      body: 'I learn quickly, adapt easily to different teams, and enjoy turning new ideas into practical solutions through continuous exploration and hands-on building.',
    },
  ],

  emails: {
    primary: 'jeevansrig@gmail.com',
  },

  /** Verified mobile number — displayed as-is; tel: link strips formatting. */
  phone: {
    display: '+91 93615 74461',
    href: 'tel:+919361574461',
  },

  socials: {
    github: { label: 'GitHub', url: 'https://github.com/Lizz-Gentooo' },
    linkedin: { label: 'LinkedIn', url: 'https://www.linkedin.com/in/jeevansri-dev' },
    instagram: { label: 'Instagram', url: 'https://www.instagram.com/_.st4zx.exe._/' },
  },

  /** Resume PDF placed manually in public/assets/resume/ — see ASSETS.md */
  resumePath: '/assets/resume/resume.pdf',

  /** Contact section photo — replaceable, see ASSETS.md */
  contactPhoto: '/assets/photos/contact-casual.jpg',

  workPreferences: [
    'Freelance & Paid Projects',
    'Internships',
    'Job Opportunities',
    'Technical Collaborations',
  ],
}

export const FOOTER = {
  tagline: 'Computer Science Student · Developer · Builder',
  copyright: '© 2026 Jeevansri. Built with curiosity.',
}
