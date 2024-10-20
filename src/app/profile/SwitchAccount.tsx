import { LoginWithGoogle } from "../login/actions";

export default function SwitchAccounts() {
  return (
    <form action={LoginWithGoogle}>
      <button
        className="bg-gray-700 w-fill h-fill text-white p-3 rounded absolute bottom-5 left-28"
        type="submit"
      >
        Switch Account
      </button>
    </form>
  );
}
