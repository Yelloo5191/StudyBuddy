import { LoginWithGoogle } from "./actions";

export default function SignIn() {
  return (
    <form action={LoginWithGoogle}>
      <button className="bg-blue-500 text-white p-2 rounded" type="submit">
        Sign in with Google
      </button>
    </form>
  );
}
