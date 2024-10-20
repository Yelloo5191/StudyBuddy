import Image from "next/image";

export default function Musics() {
  return (
    <div className="flex flex-row w-fitS gap-2 md:mt-2">
      <div className="w-1/3">
        <Image
          src="/landing/Spotify.png"
          alt="First Music Image"
          width={100}
          height={100}
          className="rounded-lg object-cover"
        />
      </div>

      <div className="w-1/3">
        <Image
          src="/landing/youtube.png"
          alt="Second Music Image"
          width={100}
          height={100}
          className="w-full rounded-lg object-cover mt-3 mr-2"
        />
      </div>

      <div className="w-1/3">
        <Image
          src="/landing/AppleMusic.png"
          alt="Third Music Image"
          width={100}
          height={100}
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  );
}
