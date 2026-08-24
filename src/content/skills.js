/**
 * SKILLS — organized by learning context. No proficiency bars/scores.
 * Visually communicates continuous learning, not artificial expertise.
 */
export const SKILL_GROUPS = [
  {
    id: '01',
    label: 'Academic Foundation',
    note: 'Completed through college curriculum',
    solid: true,
    items: ['C', 'C++', 'Java'],
  },
  {
    id: '02',
    label: 'Currently Exploring',
    note: 'Learning through building & experimentation',
    solid: false,
    items: [
      'JavaScript',
      'React',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'PostgreSQL',
      'Full Stack Development',
      'UI/UX',
    ],
  },
  {
    id: '03',
    label: 'Tools',
    note: 'Day-to-day workflow',
    solid: false,
    items: ['Git', 'GitHub', 'VS Code', 'Figma', 'Postman'],
  },
]

export const AI_WORKFLOW = {
  title: 'AI-Assisted Development',
  body: 'Using AI tools for learning, research and ideation.',
  footnote: 'Augmented — not replaced. Every project is understood, built and debugged by me.',
}
