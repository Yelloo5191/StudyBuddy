// import Call from "@/components/Call";
import dynamic from "next/dynamic";

export default function Page({ params }: { params: { channelName: string } }) {
  const Dashboard = dynamic(() => import("@/components/Dashboard"), {
    ssr: false,
  });
  return (
    <main className="flex w-full h-full flex-col">
      <Dashboard
        appId={process.env.PUBLIC_AGORA_APP_ID!}
        channelName={params.channelName}
      ></Dashboard>
    </main>
  );
}
