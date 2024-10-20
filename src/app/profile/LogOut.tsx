"use client";

import { Logout } from "./actions";

export default function LogOut() {
  return (
    <form action={Logout}>
      <button
        className="w-fill h-fill p-3 bg-dark rounded-lg text-white"
        type="submit"
      >
        Logout
      </button>
    </form>
  );
}
