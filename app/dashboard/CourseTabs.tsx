'use client'

import { useState } from 'react'

type Course = {
  id: string
  title: string
  category: string
  youtube_url: string
}

const TABS = [
  { key: 'debutant', label: 'Débutant' },
  { key: 'intermediaire', label: 'Intermédiaire' },
  { key: 'avance', label: 'Avancé' },
] as const

function getYoutubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )

  return match ? match[1] : null
}

export default function CourseTabs({ courses }: { courses: Course[] }) {
  const availableTabs = TABS.filter((tab) =>
    courses.some((course) => course.category === tab.key)
  )

  const [active, setActive] = useState<string>(
    availableTabs[0]?.key ?? 'debutant'
  )
  const [selected, setSelected] = useState<Course | null>(null)

  const filtered = courses.filter((course) => course.category === active)

  return (
    <div>
      {/* Onglets */}
      <div className="mb-5 inline-flex flex-wrap gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
        {availableTabs.map((tab) => {
          const isActive = active === tab.key
          const count = courses.filter(
            (course) => course.category === tab.key
          ).length

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setActive(tab.key)
                setSelected(null)
              }}
              style={{
                backgroundColor: isActive ? '#4f46e5' : '#ffffff',
                color: isActive ? '#ffffff' : '#0f172a',
              }}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition hover:opacity-80"
            >
              <span
                style={{ color: isActive ? '#ffffff' : '#0f172a' }}
              >
                {tab.label}
              </span>

              <span
                style={{
                  backgroundColor: isActive ? '#6366f1' : '#e2e8f0',
                  color: isActive ? '#ffffff' : '#0f172a',
                }}
                className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Lecteur vidéo */}
      {selected && (
        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {getYoutubeId(selected.youtube_url) ? (
            <div className="aspect-video w-full bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${getYoutubeId(
                  selected.youtube_url
                )}`}
                title={selected.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center bg-slate-100 text-sm text-slate-500">
              Lien vidéo invalide
            </div>
          )}

          <div className="flex items-center justify-between p-4">
            <h3 className="font-semibold text-slate-900">
              {selected.title}
            </h3>

            <button
              type="button"
              onClick={() => setSelected(null)}
              className="text-sm text-slate-500 hover:text-slate-800"
            >
              Fermer ✕
            </button>
          </div>
        </div>
      )}

      {/* Grille des vidéos */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((course) => {
          const ytId = getYoutubeId(course.youtube_url)

          return (
            <button
              key={course.id}
              type="button"
              onClick={() => setSelected(course)}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                {ytId ? (
                  <img
                    src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`}
                    alt={course.title}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-slate-400">
                    Pas d'aperçu
                  </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/20">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 opacity-0 shadow transition group-hover:opacity-100">
                    <svg
                      viewBox="0 0 24 24"
                      className="ml-0.5 h-5 w-5 fill-indigo-600"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <p className="line-clamp-2 text-sm font-medium text-slate-900">
                  {course.title}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}