'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signup(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const email = (formData.get('email') as string).trim().toLowerCase()
  const password = formData.get('password') as string
  const fullName = (formData.get('full_name') as string)?.trim()

  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  })

  if (signUpError) {
    if (signUpError.message.includes('already registered')) {
      return { error: 'Un compte existe déjà avec cet email.' }
    }
    return { error: signUpError.message }
  }

  // Cas e-mail à confirmer : utilisateur créé, session nulle
  if (!data.session) {
    return {
      error: null,
      message: 'Compte créé. Vérifie ta boîte mail pour confirmer ton adresse.',
    }
  }

  // Session active : le profil peut être inséré avec la RLS
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({ id: data.user!.id, email, full_name: fullName, role: 'student' })

  if (profileError) {
    console.error('profiles insert:', profileError.message)
  }

  redirect('/dashboard')
}