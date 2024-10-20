import Image from "next/image";

export default function AIUsage() {
  return (
    <div className="bg-seasalt-300 mt-24 mb-12 relative w-full max-w-md h-fit p-4 ml-auto lg:ml-10 mr-auto lg:mr-14 text-white flex flex-col items-center rounded-lg">
      {/* Aspect Ratio Container */}
      <div
        className="relative w-full rounded-lg"
        style={{ paddingBottom: "99.67%" }}
      >
        <Image
          src="/landing/AI.png"
          alt="AI"
          fill
          className="rounded-lg object-cover"
        />
      </div>

      <p className="text-center h-fit font-bold italic mt-1">
        {" "}
        Smart Subject Categorizing:
      </p>

      <p className=" text-center h-fit">
        Use artificial intelligence to match with other students, regardless of
        course name or description.
      </p>
    </div>
  );
}
