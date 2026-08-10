import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import type { Database } from "@/types/database";

import { getSupabaseEnv } from "./env";

/**
 * Server Component / Server Action / Route Handler Supabase client.
 * Cookie write failures in Server Components are ignored until auth middleware exists.
 */
export async function createClient() {
  // Read cookies first so the route opts into dynamic rendering
  // before env validation (keeps `next build` green without .env.local).
  const cookieStore = await cookies();
  const { url, publishableKey } = getSupabaseEnv();

  return createServerClient<Database>(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from a Server Component without mutable cookies.
          // Safe to ignore when proxy refreshes the session.
        }
      },
    },
  });
}
