'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type Course = {
  id: string
  title: string
  category: string | null
  youtube_url: string | null
  is_published: boolean | null
  created_at: string
}

export default function CourseManager({ courses }: { courses: Course[] }) {
  const supabase = createClient()
  const router = useRouter()
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  async function togglePublished(course: Course) {
    setLoadingId(course.id)
    const { error } = await supabase
      .from('courses')
      .update({ is_published: !course.is_published })
      .eq('id', course.id)
    setLoadingId(null)
    if (error) return alert('Erreur : ' + error.message)
    router.refresh()
  }

  async function handleDelete(id: string) {
    setLoadingId(id)
    const { error } = await supabase.from('courses').delete().eq('id', id)
    setLoadingId(null)
    if (error) return alert('Erreur : ' + error.message)
    setConfirmId(null)
    router.refresh()
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Gestion des cours</h2>
          <p className="text-xs text-slate-500">{courses.length} cours au total</p>
        </div>
      </div>

      {courses.length === 0 ? (
        <p className="px-5 py-10 text-center text-sm text-slate-500">
          Aucun cours pour le moment.
        </p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {courses.map((course) => (
            <li key={course.id} className="flex flex-wrap items-center gap-3 px-5 py-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900">
                  {course.title}
                </p>
                <p className="text-xs text-slate-500">
                  {course.category ?? 'Sans catégorie'} ·{' '}
                  {new Date(course.created_at).toLocaleDateString('fr-FR')}
                </p>
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  course.is_published
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-700'
                }`}
              >
                {course.is_published ? 'Publié' : 'Brouillon'}
              </span>

              <button
                onClick={() => togglePublished(course)}
                disabled={loadingId === course.id}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                {course.is_published ? 'Dépublier' : 'Publier'}
              </button>

              {confirmId === course.id ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(course.id)}
                    disabled={loadingId === course.id}
                    className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
                  >
                    Confirmer
                  </button>
                  <button
                    onClick={() => setConfirmId(null)}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600"
                  >
                    Annuler
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmId(course.id)}
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                >
                  Supprimer
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}