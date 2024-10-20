"use server";

// import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function LoginWithGoogle() {
  const supabase = createClient();

  const isProd = process.env.NODE_ENV === "production";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: isProd
        ? `https://study-sync-phi-eight.vercel.app/auth/callback`
        : `http://localhost:3000/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url);
  }

  if (error) {
    console.error(error);
  }
}
