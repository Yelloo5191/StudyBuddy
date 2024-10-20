// import Call from "@/components/Call";
import { createClient } from "@/utils/supabase/server";
import dynamic from "next/dynamic";

export default async function Page({
  params,
}: {
  params: { channelName: string };
}) {
  const Dashboard = dynamic(() => import("@/components/Dashboard"), {
    ssr: false,
  });
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="flex w-full h-full flex-col">
      <Dashboard
        appId={process.env.PUBLIC_AGORA_APP_ID!}
        channelName={params.channelName}
        userId={user?.id ?? ""}
      ></Dashboard>
    </main>
  );
}
