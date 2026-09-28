import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getLevel, LEVEL_SLUGS, LEVELS } from '@/lib/levels'
import CourseList from './CourseList'

export const dynamic = 'force-dynamic'

export default async function LevelPage({
  params,
}: {
  params: Promise<{ level: string }>
}) {
  const { level } = await params
  const info = getLevel(level)
  if (!info) notFound()

  const supabase = await createClient()

  const { data: courses, error } = await supabase
    .from('courses')
    .select(
      'id, title, description, youtube_url, duration_min, position, created_at, category'
    )
    .eq('category', info.slug)
    .eq('is_published', true)
    .order('position', { ascending: true })
    .order('created_at', { ascending: false })

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">
        ← Retour à mon espace
      </Link>

      <h1 className="mt-4 text-3xl font-bold">{info.label}</h1>
      <p className="mt-2 text-gray-600">{info.description}</p>

      <nav className="mt-6 flex flex-wrap gap-2">
        {LEVEL_SLUGS.map((slug) => (
          <Link
            key={slug}
            href={`/dashboard/niveau/${slug}`}
            className={`rounded-full border px-4 py-1.5 text-sm ${
              slug === info.slug
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            {LEVELS[slug].label}
          </Link>
        ))}
      </nav>

      {error && (
        <p className="mt-6 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          Erreur de chargement : {error.message}
        </p>
      )}

      {!error && (!courses || courses.length === 0) && (
        <p className="mt-8 rounded border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
          Aucun cours disponible dans cette catégorie pour le moment.
        </p>
      )}

      {!error && courses && courses.length > 0 && <CourseList courses={courses} />}
    </main>
  )
}