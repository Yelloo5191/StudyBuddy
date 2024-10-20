import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LogOut from "./LogOut";
import Image from "next/image";

export default async function ProfilePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  return (
    <>
      <Header />
      <div className="flex flex-col bg-dark_light w-full h-screen gap-4 p-4">
        <div className="w-full h-16 flex flex-row justify-center items-center bg-light_gray rounded-lg">
          <h1 className="text-lg text-white">Profile</h1>
        </div>
        <div className="flex gap-4 h-full">
          <div className="w-1/2 h-1/2 flex flex-col gap-8 p-8 bg-light_gray rounded-lg">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
              alt="avatar"
              width={200}
              height={200}
              className="rounded-full"
              unoptimized
            />
          </div>
          <div className="w-1/2 h-1/2 flex flex-col gap-8 p-8 bg-light_gray rounded-lg">
            <h1 className="text-lg text-white">
              {data?.user ? data.user.email : "No email available"}
            </h1>
            <LogOut />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
