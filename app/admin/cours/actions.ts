'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getYouTubeId } from '@/lib/youtube'

const CATEGORIES = ['debutant', 'intermediaire', 'avance'] as const

// ⚠️ La valeur 'admin' doit être EXACTEMENT celle de ta colonne profiles.role.
//    Vérifie avec :  select distinct role from profiles;
async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/dashboard')

  return supabase
}

export type ActionState = { error?: string; success?: string } | null

export async function createCourse(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // On récupère le client APRÈS le contrôle de rôle.
  const supabase = await createClient()
  await requireAdmin()

  const title = String(formData.get('title') ?? '').trim()
  const description = String(formData.get('description') ?? '').trim()
  const youtube_url = String(formData.get('youtube_url') ?? '').trim()
  const category = String(formData.get('category') ?? '').trim()
  const durationRaw = String(formData.get('duration_min') ?? '').trim()
  const isPublished = formData.get('is_published') === 'on'

  if (!title) return { error: 'Le titre est obligatoire.' }
  if (!CATEGORIES.includes(category as (typeof CATEGORIES)[number])) {
    return { error: 'Choisis une catégorie valide.' }
  }
  if (!getYouTubeId(youtube_url)) {
    return { error: 'Lien YouTube invalide. Exemple attendu : https://youtu.be/dQw4w9WgXcQ' }
  }

  let duration_min: number | null = null
  if (durationRaw) {
    const parsed = Number(durationRaw)
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return { error: 'La durée doit être un nombre positif (en minutes).' }
    }
    duration_min = Math.round(parsed)
  }

  const { error } = await supabase.from('courses').insert({
    title,
    description: description || null,
    youtube_url,
    category,
    duration_min,
    is_published: isPublished,
    position: 0,
  })

  if (error) return { error: `Erreur Supabase : ${error.message}` }

  revalidatePath('/admin/cours')                  // ← corrigé
  revalidatePath(`/dashboard/niveau/${category}`)

  return { success: `Cours « ${title} » créé avec succès.` }
}

export async function togglePublish(formData: FormData) {
  const supabase = await requireAdmin()
  const id = String(formData.get('id') ?? '')
  const next = formData.get('next') === 'true'
  if (!id) return

  await supabase
    .from('courses')
    .update({ is_published: next, updated_at: new Date().toISOString() })
    .eq('id', id)

  revalidatePath('/admin/cours')                  // ← corrigé
  revalidatePath('/dashboard/niveau/debutant')
  revalidatePath('/dashboard/niveau/intermediaire')
  revalidatePath('/dashboard/niveau/avance')
}

export async function deleteCourse(formData: FormData) {
  const supabase = await requireAdmin()
  const id = String(formData.get('id') ?? '')
  if (!id) return

  await supabase.from('courses').delete().eq('id', id)

  revalidatePath('/admin/cours')                  // ← corrigé
  revalidatePath('/dashboard/niveau/debutant')
  revalidatePath('/dashboard/niveau/intermediaire')
  revalidatePath('/dashboard/niveau/avance')
}