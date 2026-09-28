export type LevelSlug = 'debutant' | 'intermediaire' | 'avance'

export const LEVELS: Record<LevelSlug, { label: string; description: string }> = {
  debutant: {
    label: 'Débutant',
    description: 'Premiers pas au piano : posture, notes et premiers morceaux simples.',
  },
  intermediaire: {
    label: 'Intermédiaire',
    description: 'Accords, rythme, lecture à deux mains et morceaux complets.',
  },
  avance: {
    label: 'Avancé',
    description: 'Technique, interprétation et pièces exigeantes du répertoire.',
  },
}

export const LEVEL_SLUGS = Object.keys(LEVELS) as LevelSlug[]

export function isLevelSlug(value: string): value is LevelSlug {
  return LEVEL_SLUGS.includes(value as LevelSlug)
}

export function getLevel(slug: string): { slug: LevelSlug; label: string; description: string } | null {
  if (!isLevelSlug(slug)) return null
  return { slug, ...LEVELS[slug] }
}