import SignInButton from "./SignInButton";

export default function LoginPage() {
  return (
    <div className="flex flex-col bg-dark_light w-full h-screen gap-4 p-4">
      <div className="w-full h-16 flex flex-row justify-center items-center bg-light_gray rounded-lg">
        <h1 className="text-lg text-white">Log-in!</h1>
      </div>
      <div className="flex gap-4 h-full">
        <div className="w-1/2 h-1/2 flex flex-col gap-8 p-8 bg-light_gray rounded-lg">
          <SignInButton />
        </div>
      </div>
    </div>
  );
}
