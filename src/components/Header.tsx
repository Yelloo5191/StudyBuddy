import Link from "next/link";
import { createClient } from "../utils/supabase/server";
import SignIn from "@/app/login/SignInButton";

export default async function Header() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
  }

  return (
    <div className="w-full h-40 bg-dark flex flex-row gap-12 justify-center items-center">
      <Link href="/dashboard">
        <p className="text-2xl text-white gruppo">Start</p>
      </Link>

      <Link href="/">
        <p className="text-5xl text-white">StudySync</p>
      </Link>
      {data.user ? (
        <Link href="/profile">
          <p className="text-2xl text-white gruppo">Profile</p>
        </Link>
      ) : (
        <SignIn />
      )}
    </div>
  );
}
