'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export type ActionState = {
  success: boolean
  error?: string
}

export async function createCourse(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient()

  const title = (formData.get('title') as string)?.trim()
  if (!title) return { success: false, error: 'Le titre est obligatoire.' }

  const { error } = await supabase.from('courses').insert({
    title,
    category: (formData.get('category') as string) || null,
    youtube_url: (formData.get('youtube_url') as string) || null,
  })

  if (error) return { success: false, error: error.message }

  revalidatePath('/admin')
  return { success: true }
}