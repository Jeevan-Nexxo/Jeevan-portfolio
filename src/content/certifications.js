/**
 * CERTIFICATIONS — only verified credentials.
 * `emphasized` items get stronger visual treatment.
 * `image` → /public/assets/certificates/… (see ASSETS.md); missing assets
 * render a clean fallback instead of a broken preview.
 */
export const CERTIFICATIONS = [
  {
    id: 'ai-internship',
    title: 'Artificial Intelligence Internship',
    issuer: 'AI Explore · EFTSOONS Technologies (OPC) Pvt. Ltd.',
    date: 'May 2026 — June 2026',
    image: '/assets/certificates/ai-internship.jpg',
    emphasized: true,
    note: 'Two-week practical internship in the AI department.',
  },
  {
    id: 'c-essentials-1',
    title: 'C Essentials 1',
    issuer: 'RMV Polytechnic College · Cisco Networking Academy',
    date: 'Completed — 20 April 2026',
    image: '/assets/certificates/c-essentials-1.jpg',
    emphasized: false,
    note: 'Foundations of C programming through the Cisco Networking Academy.',
  },
]
