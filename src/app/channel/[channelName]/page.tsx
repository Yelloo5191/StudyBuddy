// import Call from "@/components/Call";
import Dashboard from "@/components/Dashboard";

export default function Page({ params }: { params: { channelName: string } }) {
  return (
    <main className="flex w-full h-full flex-col">
      <Dashboard
        appId={process.env.PUBLIC_AGORA_APP_ID!}
        channelName={params.channelName}
      ></Dashboard>
    </main>
  );
}
