// Extraction robuste de l'ID d'une vidéo YouTube.
// Accepte : youtu.be/ID · watch?v=ID · embed/ID · shorts/ID · live/ID · l'ID brut.

const ID_REGEX = /^[A-Za-z0-9_-]{11}$/

const PATTERNS = [
  /(?:youtube\.com|youtube-nocookie\.com)\/watch\?[^#]*\bv=([A-Za-z0-9_-]{11})/,
  /youtu\.be\/([A-Za-z0-9_-]{11})/,
  /(?:youtube\.com|youtube-nocookie\.com)\/embed\/([A-Za-z0-9_-]{11})/,
  /(?:youtube\.com|youtube-nocookie\.com)\/shorts\/([A-Za-z0-9_-]{11})/,
  /(?:youtube\.com|youtube-nocookie\.com)\/live\/([A-Za-z0-9_-]{11})/,
]

export function getYouTubeId(input: string | null | undefined): string | null {
  if (!input) return null
  const value = String(input).trim()
  if (!value) return null
  if (ID_REGEX.test(value)) return value

  for (const pattern of PATTERNS) {
    const match = value.match(pattern)
    if (match) return match[1]
  }
  return null
}

export function getYouTubeEmbedUrl(
  input: string | null | undefined,
  options?: { start?: number }
): string | null {
  const id = getYouTubeId(input)
  if (!id) return null
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  })
  if (options?.start) params.set('start', String(options.start))
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`
}

// --- Alias de compatibilité : évite les erreurs de casse au build ---
export const getYoutubeId = getYouTubeId
export const getYoutubeEmbed = getYouTubeEmbedUrl
export const getYoutubeEmbedUrl = getYouTubeEmbedUrl
export const extractYouTubeId = getYouTubeId

export default getYouTubeId