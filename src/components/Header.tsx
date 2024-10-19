import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full h-40 bg-dark flex flex-row gap-12 justify-center items-center">
      <Link href="/">
        <p className="text-2xl text-white gruppo">Home</p>
      </Link>
      <h1 className="text-5xl text-white">StudySync</h1>
      <Link href="/dashboard">
        <p className="text-2xl text-white gruppo">Start</p>
      </Link>
    </div>
  );
}
