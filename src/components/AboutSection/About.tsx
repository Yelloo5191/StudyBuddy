import Information from "./InformationAboutProduct";
import ListenToMusic from "./ListenToMusic";
export default function About() {
  return (
    <div className="w-full h-screen justify-center relative flex flex-row p-2 gap-5 bg-rose-100">
      <Information />
      <ListenToMusic />
    </div>
  );
}
