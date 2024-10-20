// app/match-result/page.tsx
"use client";

import { useSearchParams } from "next/navigation";

export default function MatchResult() {
  const searchParams = useSearchParams();
  const buddy = searchParams.get("buddy");

  return (
    <div>
      <h1>Your Study Buddy</h1>
      <p>{buddy ? `You have been matched with: ${buddy}` : "No match found"}</p>
    </div>
  );
}
