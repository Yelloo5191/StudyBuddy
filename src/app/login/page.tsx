"use client";

import { login, signup } from "./actions";
import { useRouter } from 'next/navigation';
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `https://ahjeuzhakgxsolkvdhpy.supabase.co/auth/v1/callback`,
        },
    });
  };

  return (
    <div className="flex flex-col bg-dark_light w-full h-screen gap-4 p-4">
      <div className="w-full h-16 flex flex-row justify-center items-center bg-light_gray rounded-lg">
        <h1 className="text-lg text-white">Log-in!</h1>
      </div>
      <div className="flex gap-4 h-full">
        <div className="w-1/2 h-1/2 flex flex-col gap-8 p-8 bg-light_gray rounded-lg">
          <button 
            className="bg-blue-500 text-white p-2 rounded" 
            onClick={handleLogin}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
