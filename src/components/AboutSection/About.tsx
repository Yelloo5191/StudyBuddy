import Information from "./InformationAboutProduct";
import ListenToMusic from "./ListenToMusic";
export default function About() {
  return (
    <div className="w-full h-screen justify-center relative flex flex-row p-2 gap-5 bg-seasalt-500">
      <Information />
      <ListenToMusic />
    </div>
  );
}
