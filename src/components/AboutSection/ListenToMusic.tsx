import Image from "next/image";
import Musics from "./Musics";
export default function ListenToMusic() {
  return (
    <div className="bg-amber-900 md:mt-16 relative md:mb-10 w-full max-w-md h-fit p-4 ml-auto lg:ml-10 mr-auto lg:mr-14 text-white flex flex-col items-center rounded-lg">
      {/* Aspect Ratio Container */}
      <div
        className="relative w-full rounded-lg"
        style={{ paddingBottom: "99.67%" }}
      >
        <Image
          src="/landing/JammingOut.png"
          alt="JammingOut"
          fill
          className="rounded-lg object-cover"
        />
      </div>

      <p className="text-center h-fit font-bold italic mt-1">
        {" "}
        Listen to music together:
      </p>

      <p className=" text-center h-fit">
        Share and suggest songs to study while jamming out.
      </p>

      <Musics />
    </div>
  );
}
