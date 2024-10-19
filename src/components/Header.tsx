import Link from "next/link";
import { createClient } from "../utils/supabase/server";

export default async function Header() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
  }

  return (
    <div className="w-full h-40 bg-dark flex flex-row gap-12 justify-center items-center">
      <h1 className="text-5xl text-white">StudySync</h1>
      <Link href="/">
        <p className="text-2xl text-white gruppo">Home</p>
      </Link>
      <Link href="/dashboard">
        <p className="text-2xl text-white gruppo">Start</p>
      </Link>
      {data.user ? (
        <Link href="/profile">
          <p className="text-2xl text-white gruppo">Profile</p>
        </Link>
      ) : (
        <Link href="/login">
          <p className="text-2xl text-white gruppo">Login</p>
        </Link>
      )}
    </div>
  );
}
