import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer/Footer";
import LogOut from "./LogOut";
import Image from "next/image";
import { redirect } from "next/navigation";
import SwitchAccounts from "./SwitchAccount";

export default async function ProfilePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id);

  if (!data) {
    redirect("/login");
  }

  console.log(data);

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
              src={
                data[0].avatar_url ||
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
              }
              alt="avatar"
              width={250}
              height={250}
              className="rounded-full"
              unoptimized
            />
          </div>
          <div className="w-1/2 h-1/2 flex flex-col gap-8 p-8 bg-light_gray rounded-lg">
            <h1 className="text-3xl text-white">
              Welcome,
              <br />
              <b>{data[0].full_name || "No full name available"}</b>
            </h1>
            <h1 className="text-lg text-white">
              {user.email || "No email available"}
            </h1>
            <div className="flex flex-col focus-center gap-2">
              <LogOut />
              <SwitchAccounts />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
