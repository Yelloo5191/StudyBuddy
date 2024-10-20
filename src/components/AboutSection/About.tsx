import Information from "./InformationAboutProduct";
import ListenToMusic from "./ListenToMusic";
import AIUsage from "./AIUsage";
import Link from "next/link";
import { LoginWithGoogle } from "@/app/login/actions";

import { createClient } from "@/utils/supabase/server";

export default async function About() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
  }

  return (
    <div className="flex flex-col">
      <div className="bg-seasalt-500">
        <h1 className="mt-8 italic font-bold text-center text-black text-7xl ">
          How does it work?
        </h1>
      </div>
      <div className="flex flex-col  bg-seasalt-500 ">
        <div className="w-full h-full justify-center relative flex flex-row p-2 gap-5 bg-seasalt-500">
          <Information />
          <ListenToMusic />
          <AIUsage />
        </div>
        <div className="mb-10 bg-seasalt-500 flex justify-center items-center">
          {data.user ? (
            <Link href="/dashboard">
              <p className="text-6xl flex focus-center text-gray-600 gruppo">
                Get Started
              </p>
            </Link>
          ) : (
            <form action={LoginWithGoogle}>
              <button
                className="text-6xl flex focus-center text-gray-600 gruppo"
                type="submit"
              >
                Get Started
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
