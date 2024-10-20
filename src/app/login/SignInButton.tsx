import { LoginWithGoogle } from "./actions";

export default function SignIn() {
  return (
    <form action={LoginWithGoogle}>
      <button className="text-2xl text-white gruppo" type="submit">
        Login
      </button>
    </form>
  );
}
