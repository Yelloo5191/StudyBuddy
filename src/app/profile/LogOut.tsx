"use client";

import { createClient } from "@/utils/supabase/client";

export default function LogOut() {
  const supabase = createClient();

  return (
    <button
      className="w-40 h-12 bg-dark rounded-lg text-white"
      onClick={async () => {
        await supabase.auth.signOut();
        window.location.reload();
      }}
    >
      Logout
    </button>
  );
}
