import { createClient } from "@supabase/supabase-js";

export const ClerkSupabaseClient = async (supabaseToken: string | null) => {
  const supabase = await createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${supabaseToken}`,
        },
      },
    }
  );

  return supabase;
};
