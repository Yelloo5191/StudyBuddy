import Image from "next/image";

export default function Information() {
  return (
    <div className="bg-gray-700 mt-24 relative w-full max-w-md h-fit p-4 mr-auto lg:mr-10 ml-auto lg:ml-8 text-white flex flex-col items-center rounded-lg">
      {/* Aspect Ratio Container */}
      <div className="relative w-full" style={{ paddingBottom: "66.67%" }}>
        <Image
          src="/landing/study.jpg"
          alt="Study Call"
          fill
          className="rounded-lg object-cover"
        />
      </div>

      <p className="text-center h-fit font-bold italic mt-1">
        {" "}
        Find students similar to you:
      </p>

      <p className="text-center">
        Type in any subject or class you&apos;re studying and be matched with
        other students learning the exact same thing. {""}
      </p>
    </div>
  );
}
