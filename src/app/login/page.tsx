import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <div className="w-1/2 mx-auto h-screen bg-dark_light p-8">
      <form className="flex flex-col h-full justify-center items-center gap-4">
        <input type="email" name="email" className="text-dark_light" />
        <input type="password" name="password" className="text-dark_light" />
        <button formAction={login}>Login</button>
        <button formAction={signup}>Signup</button>
      </form>
    </div>
  );
}
