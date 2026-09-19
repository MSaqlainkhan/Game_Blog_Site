export interface AuthorProfile {
  slug: string;
  name: string;
  role: string;
  bio: string;
  coverageAreas: string[];
  initials: string;
  accent: 'cyan' | 'teal' | 'amber';
}

export const authors: AuthorProfile[] = [
  {
    slug: 'marcus-vance',
    name: 'Marcus Vance',
    role: 'Senior Editorial Reviewer',
    bio:
      "Marcus Vance is GamersPulse's Senior Editorial Reviewer. His byline covers large-scale action RPGs and atmosphere-driven horror titles, including our coverage of Shadow of the Erdtree and Alan Wake 2. His reviews and guides focus on systems that reward patience — boss encounter design, resource management, and the mechanical texture of a game's difficulty curve.",
    coverageAreas: ['Action RPGs', 'Survival Horror', 'Boss Design & Difficulty Systems', 'Single-Player Narrative Games'],
    initials: 'MV',
    accent: 'cyan'
  },
  {
    slug: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Lead RPG Critic',
    bio:
      "Elena Rostova is GamersPulse's Lead RPG Critic, focused on narrative-driven role-playing games and the platform decisions that shape how players access them. She has written our coverage of Cyberpunk 2077: Phantom Liberty and Baldur's Gate 3, along with industry reporting on cross-platform save systems and console backward compatibility.",
    coverageAreas: ['RPGs & Narrative Design', 'Character Builds & Skill Systems', 'Platform & Industry Policy'],
    initials: 'ER',
    accent: 'teal'
  },
  {
    slug: 'julian-hayes',
    name: 'Julian Hayes',
    role: 'Hardware & Tech Editor',
    bio:
      "Julian Hayes is GamersPulse's Hardware & Tech Editor, covering performance, engine technology, and the hardware that runs modern games. His byline includes our reviews of Helldivers 2 and Balatro, plus technical reporting on Unreal Engine 5 geometry systems, handheld PC gaming, and PlayStation 5 Pro upscaling.",
    coverageAreas: ['PC Hardware & Performance', 'Game Engine Technology', 'Handheld Gaming Devices', 'Technical Benchmarking'],
    initials: 'JH',
    accent: 'amber'
  }
];

export function getAllAuthors(): AuthorProfile[] {
  return authors;
}

export function getAuthorBySlug(slug: string): AuthorProfile | undefined {
  return authors.find((a) => a.slug === slug);
}

export function getAuthorByName(name: string): AuthorProfile | undefined {
  return authors.find((a) => a.name === name);
}
