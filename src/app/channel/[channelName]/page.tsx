// import Call from "@/components/Call";
import dynamic from "next/dynamic";
import { Suspense } from "react";

export default function Page({ params }: { params: { channelName: string } }) {
  const Dashboard = dynamic(() => import("@/components/Dashboard"), {
    ssr: false,
  });
  return (
    <main className="flex w-full h-full flex-col">
      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard
          appId={process.env.PUBLIC_AGORA_APP_ID!}
          channelName={params.channelName}
        ></Dashboard>
      </Suspense>
    </main>
  );
}
