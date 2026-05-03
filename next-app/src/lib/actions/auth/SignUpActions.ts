import { createClient } from "@/lib/supabase/client"
import type { Auth } from "@/types/authTypes"
import { redirect } from 'next/navigation'

export async function signUpNewUser(authData: Auth) {
  const supabase = createClient()

    // Step 1: Create user in Supabase Auth with metadata
    const { data:signUpData, error: authError } = await supabase.auth.signUp({
      email: authData.email,
      password: authData.password,
      options: {
        // IMPORTANT: Setting role in metadata as per requirements
        data: {
          role: 'catering_owner',
          businessName: authData.businessName, // Also store business name here for initial sync
        },
      },
    })
    console.log(signUpData)
    if (authError) {
      console.error('Supabase Auth Signup error:', authError.message)
      return { error: authError.message }
    }
  
    if (!signUpData.user) {
      console.error('Supabase Auth Signup: User object not found after signup')
      return { error: 'User creation failed. Please try again.' }
    }

    // Step 2: Check if user already exists in users table before inserting
    const { data: existingUser, error: checkError } = await supabase
      .from('User')
      .select('id')
      .eq('id', signUpData.user.id)
      .single()

    if (existingUser) {
      console.error('User already exists in users table:', signUpData.user.id)
      // Return or handle as needed - since they already exist, we might not want to re-insert
      redirect('/login?signupSuccess=true')
    }

    const { data: insertData, error: triggerError } = await supabase.from('User').insert({
      id: signUpData.user.id,
      email: authData.email,
      business_name: authData.businessName || '',
      role: 'catering_owner',
    })

    if(triggerError) {
      console.error('Error inserting into User table:', triggerError.message)
      return { error: triggerError.message }
    }
  
    // Step 2: The Supabase Trigger will handle inserting into public.User and public.Provider
    // No direct DB insert here as the trigger automates it.
    // We just need to ensure the user is redirected or logged in.
  
    // For simplicity, we'll redirect to login. The trigger should handle the rest.
    // In a real app, you might want to confirm email verification first or auto-login.
    redirect('/login?signupSuccess=true')
}