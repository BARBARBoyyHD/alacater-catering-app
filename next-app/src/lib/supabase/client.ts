import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/config/supabaseKey";
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
