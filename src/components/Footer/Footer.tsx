import InstagramHandle from "./Instagram";
export default function Footer() {
  return (
    <div className="w-full h-24 bg-dark flex flex-col gap-1 items-center">
      <div>
        <p className="mt-2 text-2xl italic text-neutral-400">
          Meet the Creators:
        </p>
      </div>

      <InstagramHandle />
    </div>
  );
}
