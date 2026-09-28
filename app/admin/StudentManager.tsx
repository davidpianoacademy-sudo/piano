'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type Student = {
  id: string
  full_name: string | null
  email: string | null
  created_at: string
}

export default function StudentManager({ students }: { students: Student[] }) {
  const supabase = createClient()
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const filtered = students.filter((s) => {
    const q = search.toLowerCase()
    return (
      (s.full_name ?? '').toLowerCase().includes(q) ||
      (s.email ?? '').toLowerCase().includes(q)
    )
  })

  async function handleDelete(id: string) {
    setLoadingId(id)
    const { error } = await supabase.from('profiles').delete().eq('id', id)
    setLoadingId(null)
    if (error) return alert('Erreur : ' + error.message)
    setConfirmId(null)
    router.refresh()
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Gestion des étudiants
            </h2>
            <p className="text-xs text-slate-500">
              {students.length} étudiant{students.length > 1 ? 's' : ''} inscrit
              {students.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par nom ou email..."
          className="mt-3 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="px-5 py-10 text-center text-sm text-slate-500">
          Aucun étudiant trouvé.
        </p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {filtered.map((student) => (
            <li key={student.id} className="flex flex-wrap items-center gap-3 px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                {(student.full_name ?? student.email ?? '?')
                  .slice(0, 1)
                  .toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900">
                  {student.full_name || 'Sans nom'}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {student.email || '—'}
                </p>
              </div>

              <span className="text-xs text-slate-400">
                {new Date(student.created_at).toLocaleDateString('fr-FR')}
              </span>

              {confirmId === student.id ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(student.id)}
                    disabled={loadingId === student.id}
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
                  onClick={() => setConfirmId(student.id)}
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