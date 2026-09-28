'use client'

import Link from 'next/link'

type Course = {
  id: string
  title: string
  category: string | null
  youtube_url: string | null
}

export default function CourseList({ courses }: { courses: Course[] }) {
  if (courses.length === 0) {
    return (
      <p className="rounded-2xl border border-slate-200 bg-white px-5 py-10 text-center text-sm text-slate-500">
        Aucun cours dans ce niveau pour le moment.
      </p>
    )
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {courses.map((course) => (
        <li
          key={course.id}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {course.category ?? 'Général'}
          </p>
          <h3 className="mt-1 text-base font-semibold text-slate-900">
            {course.title}
          </h3>

          {course.youtube_url ? (
            <Link
              href={`/dashboard/cours/${course.id}`}
              className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline"
            >
              Ouvrir le cours →
            </Link>
          ) : (
            <span className="mt-3 inline-block text-sm text-slate-400">
              Vidéo bientôt disponible
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}