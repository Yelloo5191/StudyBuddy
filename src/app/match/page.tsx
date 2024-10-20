// app/match/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuizForm() {
  const [formData, setFormData] = useState({
    classes: "",
    major: "",
    interests: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/match-buddy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    router.push(`/match-result?buddy=${data.selectedBuddy}`);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-dark gap-2 flex flex-col items-center justify-center h-screen"
    >
      <label>
        Classes:
        <input
          type="text"
          name="classes"
          value={formData.classes}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Major:
        <input
          type="text"
          name="major"
          value={formData.major}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Interests:
        <input
          type="text"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit">Find Buddy</button>
    </form>
  );
}
