import { createClient } from "@/lib/supabase/client";
import type { Auth } from "@/types/authTypes";
import { redirect } from "next/navigation";

export async function signInUser(authData: Auth) {
  const supabase = createClient();

  // Step 1: Create user in Supabase Auth with metadata
  const { data, error } = await supabase.auth.signInWithPassword({
    email: authData.email,
    password: authData.password,
  });

  if (error) {
    console.error("Supabase Auth Signin error:", error.message);
    return { error: error.message };
  }

  if (!data.user) {
    console.error("Supabase Auth Signin: User object not found after signin");
    return { error: "User signin failed. Please try again." };
  }

  // Step 2: The Supabase Trigger will handle inserting into public.User and public.Provider
  // No direct DB insert here as the trigger automates it.
  // We just need to ensure the user is redirected or logged in.
  redirect("/dashboard");
}
