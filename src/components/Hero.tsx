import Image from "next/image";

export default function Hero() {
  return (
    <div className="w-full h-screen relative flex flex-col gap-4 justify-center items-center bg-dark_light">
      <div className="flex flex-row gap-4 w-fill px-28 justify-center items-center">
        {/* TEXT BLOCK */}
        <div className="flex flex-col w-1/3 gap-4 justify-center items-center">
          <h1 className="text-5xl text-white">
            Start a session with a buddy now!
          </h1>
          <p className="text-2xl text-white">
            Connect to students like you INSTANTLY. Work together, anywhere
            around the world.{" "}
          </p>
        </div>

        {/* UNDRAWED IMAGE */}
        <div className="w-fill min-w-1/3 flex items-center justify-center">
          <Image
            src="/landing/call_group.svg"
            alt="Study Call"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="w-full bg-taupe_gray absolute bottom-0 h-20 flex flex-row gap-4 justify-center items-center"></div>
    </div>
  );
}
