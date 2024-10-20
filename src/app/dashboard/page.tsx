import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import FormJoin from "./Form";
import Header from "@/components/Header";
import Footer from "@/components/Footer/Footer";
export default async function page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/profile");
  }
  return (
    <div>
      <Header />
      <h1>Hello</h1>
      <div className="w-screen h-screen bg-dark_light p-8">
        <FormJoin />
      </div>
      <Footer />
    </div>
  );
}
