"use client";
import { startSession } from "./actions";

export default function FormJoin() {
  return (
    <form
      className="h-screen w-full flex justify-center items-start"
      action={startSession}
    >
      <div className="flex flex-col w-full md:w-1/2 justify-center items-center gap-4 rounded-lg">
        <h1 className="text-7xl w-full mb-4 font-bold text-gray-400 text-center">
          Find your StudyBuddy Now
        </h1>
        <input
          type="text"
          name="classes"
          placeholder="Classes"
          required
          className="rounded-lg w-full md:w-3/5 lg:w-1/2  p-2"
        />
        <input
          className="rounded-lg w-full md:w-3/5 lg:w-1/2  p-2"
          type="text"
          name="majors"
          placeholder="Majors"
          required
        />
        <input
          className="rounded-lg w-full md:w-3/5 lg:w-1/2 p-2"
          type="text"
          name="interests"
          placeholder="Interests"
          required
        />

        <button
          className="bg-beaver rounded-lg w-1/2 h-10 text-lg italic"
          type="submit"
        >
          Start Session
        </button>
      </div>
    </form>
  );
}
