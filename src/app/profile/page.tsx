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

  const quotes = [
    "One day, all your hard work will pay off.",
    "If we wait until we’re ready, we’ll be waiting for the rest of our lives.",
    "It’s never too late to be what you might have been.",
    "You don’t have to be great to start. But you have to start to be great.",
    "Nobody can go back and start a new beginning, but anyone can start today and make a new ending.",
  ];

  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  // console.log(data);

  const randomQuote = getRandomQuote();

  return (
    <>
      <Header />
      <div className="flex flex-col bg-dark_light w-full h-screen gap-4 p-4">
        <div className="w-full h-16 flex flex-row justify-center items-center bg-light_gray rounded-lg">
          <h1 className="text-lg text-white">Profile</h1>
        </div>
        <div className="flex gap-4 h-full">
          <div className="w-1/4 h-1/2 flex flex-col gap-8 p-8 bg-light_gray rounded-lg justify-center items-center">
            <Image
              src={
                data[0].avatar_url ||
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
              }
              alt="avatar"
              width={200}
              height={200}
              className="rounded-full hover:animate-spin"
              unoptimized
            />
          </div>
          <div className="w-full h-1/2 flex flex-col gap-8 p-8 bg-light_gray rounded-lg relative">
            <div className="flex flex-row gap-10">
              <div className="flex flex-col gap-6">
                <h1 className="text-3xl text-white">
                  Welcome,
                  <br />
                  <b>{data[0].full_name || "No full name available"}</b>
                </h1>
                <h1 className="text-lg text-white">
                  {user.email || "No email available"}
                </h1>
                <h1 className="text-lg text-white">
                  {user.id || "No id available"}
                </h1>

                <div className="flex flex-row focus-center">
                  <LogOut />
                  <SwitchAccounts />
                </div>
              </div>
              <div className="w-full flex justify-center items-center">
                <h1 className="text-2xl text-white text-center italic">
                  {randomQuote}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
