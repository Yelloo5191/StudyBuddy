"use client";
import { startSession } from "./actions";

export default function FormJoin() {
  return (
    <form action={startSession}>
      <div className="flex flex-col gap-4 text-dark">
        <input type="text" name="classes" placeholder="Classes" required />
        <input type="text" name="majors" placeholder="Majors" required />
        <input type="text" name="interests" placeholder="Interests" required />

        <button className="bg-beaver-800" type="submit">
          Start Session
        </button>
      </div>
    </form>
  );
}
