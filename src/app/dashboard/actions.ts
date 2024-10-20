"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

const PairedMatch = z.object({
  pair: z.string(),
});

// Function to start a session and handle user input
export async function startSession(formData: FormData) {
  const supabase = createClient();
  const target = Object.fromEntries(formData.entries());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("User not authenticated");
    return; // Handle unauthenticated user case (show an error or redirect)
  }

  const userId = user.id;
  const classes =
    typeof target.classes === "string" ? target.classes.split(",") : [];
  const majors =
    typeof target.majors === "string" ? target.majors.split(",") : [];
  const interests =
    typeof target.interests === "string" ? target.interests.split(",") : [];

  await addToQueue(userId, classes, majors, interests);
}

// Function to add user to the waiting queue
export async function addToQueue(
  userId: string,
  classes: string[],
  majors: string[],
  interests: string[]
) {
  const supabase = createClient();

  // Check if user is already in the queue
  const { data: queueData, error: queueError } = await supabase
    .from("waiting_queue")
    .select("*")
    .eq("user_id", userId);

  if (queueError) {
    console.error("Error fetching queue data:", queueError);
    return;
  }

  if (queueData?.length) {
    console.log("User already in queue:", queueData);
    return;
  }

  // Add user to the queue
  const { data, error } = await supabase
    .from("waiting_queue")
    .insert([{ user_id: userId, classes, majors, interests }])
    .select("*");

  if (error) {
    console.error("Error adding to queue:", error);
  } else {
    console.log("User added to queue:", data);
    const buddy = await fetchMatches();
    if (buddy) {
      console.log("Buddy found:", buddy);

      const buddyPair = PairedMatch.parse(JSON.parse(buddy));
      const buddy1 = buddyPair.pair.split(" - ")[0];
      const buddy2 = buddyPair.pair.split(" - ")[1];

      // Remove buddies from the queue
      await removeFromQueue(buddy1);
      await removeFromQueue(buddy2);
      let buddy1_formatted = buddy1.replaceAll("-", "");
      let buddy2_formatted = buddy2.replaceAll("-", "");
      const channel = `${buddy1_formatted}${buddy2_formatted}`;
      console.log(channel);

      redirect(`/channel/${channel}`);
    }
  }
}

async function fetchMatches() {
  const supabase = createClient();

  const { data: queueData, error } = await supabase
    .from("waiting_queue")
    .select("*");

  if (error) {
    console.error("Error fetching queue data:", error);
    return null;
  }

  if (queueData.length < 2) {
    console.log("Not enough users in the queue, waiting...");
    //  show a message until there are enough users
    redirect("/waiting");
  }

  const pairsPrompt = createPairsPrompt(queueData);

  // const response = await fetch("https://api.openai.com/v1/chat/completions", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${process.env.OPENAI_KEY}`,
  //   },
  //   body: JSON.stringify({
  //     model: "gpt-4o-mini",
  //     messages: [{ role: "user", content: pairsPrompt }],
  //     temperature: 0.7,
  //   }),
  // });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: pairsPrompt }],
    response_format: zodResponseFormat(PairedMatch, "pair"),
  });

  if (!completion.choices[0]?.message?.content) {
    console.error("Error parsing response");
    return null;
  }

  const buddyMatches = completion.choices[0].message.content;
  console.log("Buddy matches:", buddyMatches);
  return buddyMatches;
}

function createPairsPrompt(
  queueData: {
    user_id: string;
    classes: string[];
    majors: string[];
    interests: string[];
  }[]
) {
  return (
    `Based on the following user data, please suggest buddy pairs:\n\n` +
    queueData
      .map(
        (user) =>
          `User ID: ${user.user_id}, Classes: ${user.classes.join(
            ", "
          )}, Majors: ${user.majors.join(
            ", "
          )}, Interests: ${user.interests.join(", ")}`
      )
      .join("\n") +
    `\nPlease return pairs in the format: User ID 1 - User ID 2.`
  );
}

async function removeFromQueue(userId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("waiting_queue")
    .delete()
    .eq("user_id", userId);

  if (error) {
    console.error("Error removing from queue:", error);
  } else {
    console.log(`User ${userId} removed from the queue.`);
  }
}
