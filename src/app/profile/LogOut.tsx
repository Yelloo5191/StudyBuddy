"use client";

import { Logout } from "./actions";

export default function LogOut() {
  return (
    <form action={Logout}>
      <button className="w-40 h-12 bg-dark rounded-lg text-white" type="submit">
        Logout
      </button>
    </form>
  );
}
