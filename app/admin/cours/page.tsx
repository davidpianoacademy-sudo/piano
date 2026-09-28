import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LEVELS, LEVEL_SLUGS } from '@/lib/levels'
import CourseForm from '../CourseForm'
import { togglePublish, deleteCourse } from './actions'

export const dynamic = 'force-dynamic'

export default async function AdminCoursesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail || user.email?.toLowerCase() !== adminEmail.toLowerCase()) {
    redirect('/dashboard')
  }

  const { data: courses, error } = await supabase
    .from('courses')
    .select('id, title, category, youtube_url, is_published, duration_min, created_at')
    .order('created_at', { ascending: false })

  const published = (courses ?? []).filter((c) => c.is_published).length

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">
        ← Retour à mon espace
      </Link>

      <h1 className="mt-4 text-3xl font-bold">Gestion des cours</h1>
      <p className="mt-2 text-gray-600">
        {courses?.length ?? 0} cours au total · {published} publié(s)
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {LEVEL_SLUGS.map((slug) => (
          <Link
            key={slug}
            href={`/dashboard/niveau/${slug}`}
            className="rounded-full border border-gray-300 px-4 py-1.5 text-sm hover:bg-gray-100"
          >
            Voir {LEVELS[slug].label}
          </Link>
        ))}
      </div>

      {error && (
        <p className="mt-6 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          Erreur Supabase : {error.message}
        </p>
      )}

      <div className="mt-8">
        <CourseForm />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Cours existants</h2>

      {!courses || courses.length === 0 ? (
        <p className="mt-4 rounded border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
          Aucun cours pour l'instant. Crée ton premier cours ci-dessus.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {courses.map((course) => (
            <li
              key={course.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-4"
            >
              <div className="min-w-0">
                <p className="font-medium text-gray-900">{course.title}</p>
                <p className="mt-0.5 text-xs text-gray-500">
                  {LEVELS[course.category as keyof typeof LEVELS]?.label ?? course.category}
                  {course.duration_min ? ` · ${course.duration_min} min` : ''}
                  {' · '}
                  <span className={course.is_published ? 'text-green-600' : 'text-orange-600'}>
                    {course.is_published ? 'Publié' : 'Brouillon (invisible étudiants)'}
                  </span>
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <form action={togglePublish}>
                  <input type="hidden" name="id" value={course.id} />
                  <input type="hidden" name="next" value={course.is_published ? 'false' : 'true'} />
                  <button
                    type="submit"
                    className="rounded border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100"
                  >
                    {course.is_published ? 'Dépublier' : 'Publier'}
                  </button>
                </form>

                <form action={deleteCourse}>
                  <input type="hidden" name="id" value={course.id} />
                  <button
                    type="submit"
                    className="rounded border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
                  >
                    Supprimer
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}