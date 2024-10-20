import Information from "./InformationAboutProduct";
import ListenToMusic from "./ListenToMusic";
import AIUsage from "./AIUsage";
export default function About() {
  return (
    <div className="flex flex-col">
      <div className="bg-seasalt-500">
        <h1 className="mt-8 italic font-bold text-center text-black text-7xl ">
          How does it work?
        </h1>
      </div>
      <div className="w-full h-full justify-center relative flex flex-row p-2 gap-5 bg-seasalt-500">
        <Information />
        <ListenToMusic />
        <AIUsage />
      </div>
    </div>
  );
}
