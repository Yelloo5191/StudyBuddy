import { FaBook } from "react-icons/fa6";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 h-full">
      <div className="flex flex-col gap-4 lg:gap-8 w-full lg:w-auto">
        {/* TITLE */}
        <div className="w-full h-16 lg:h-20 flex flex-row justify-start gap-4 lg:gap-8 px-2 lg:px-4 items-center bg-dark rounded-lg">
          <FaBook size={30} />
          <h1 className="text-lg lg:text-2xl text-white">
            Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row h-full gap-4 lg:gap-8">
          <div className="flex flex-col gap-4 lg:gap-8">
            {/* FACECAMS */}
            <div className="w-full lg:w-[626px] h-40 lg:h-full bg-beaver rounded-lg"></div>
            <div className="w-full lg:w-[626px] h-40 lg:h-full bg-raisin_black rounded-lg"></div>
          </div>
          {/* CHAT */}
          <div className="flex flex-col gap-4 lg:gap-8 h-40 lg:h-full">
            <div className="w-full lg:w-[500px] h-40 lg:h-full bg-light_gray rounded-lg"></div>
            <div className="w-full h-16 lg:h-20 bg-light_gray rounded-lg"></div>
          </div>
        </div>
      </div>
      {/* MUSIC */}
      <div className="w-full h-40 lg:h-full bg-taupe_gray rounded-lg"></div>
    </div>
  );
}
