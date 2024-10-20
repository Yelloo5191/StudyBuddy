"use client";

import { createClient } from "@/utils/supabase/client";
import { RealtimeChannel, User } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Chat({ room_id }: { room_id: string }) {
  const channel = useRef<RealtimeChannel | null>(null);
  const [messages, setMessages] = useState<
    {
      message: string;
      user_id: string;
      avatar: string;
      room_id: string;
      name: string;
    }[]
  >([]);
  const [user, setUser] = useState<User>();
  const [avatar, setAvatar] = useState<string>();
  const supabase = createClient();

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to the bottom whenever the messages array is updated
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);

        supabase
          .from("profiles")
          .select("avatar_url")
          .eq("id", data.user.id)
          .then(({ data }) => {
            if (data) {
              setAvatar(data[0].avatar_url);
            }
          });
      }
    });

    if (!channel.current) {
      channel.current = supabase.channel("chat-room", {
        config: {
          broadcast: {
            self: true,
          },
        },
      });

      channel.current
        .on("broadcast", { event: `message ${room_id}` }, ({ payload }) => {
          setMessages((prev) => [...prev, payload]);
        })
        .subscribe();
    }

    return () => {
      channel.current?.unsubscribe();
      channel.current = null;
    };
  }, [room_id, supabase]);
  return (
    <div className="flex flex-col max-h-[85vh] max-w-[45%] shadow-md w-full gap-4 h-full overflow-y-hidden overflow-x-hidden">
      <div className="w-full h-full flex flex-col gap-2 overflow-x-hidden bg-light_gray rounded-lg">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-full p-2 flex flex-row gap-4 items-center ${
              message.user_id == user?.id ? "bg-taupe_gray" : "bg-redwood"
            } rounded-lg`}
          >
            <Image
              src={message.avatar}
              alt="avatar"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div className="flex flex-col gap-1">
              <p className="text-white text-sm">{message.name}</p>
              <p className="text-white text-wrap break-words">
                {message.message}
              </p>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const message = (
            document.querySelector(
              'input[name="current_message"]'
            ) as HTMLInputElement
          ).value;
          channel.current?.send({
            type: "broadcast",
            event: `message ${room_id}`,
            payload: {
              message,
              user_id: user?.id,
              avatar: avatar,
              room_id: room_id,
              name: user?.user_metadata.full_name,
            },
          });
          (
            document.querySelector(
              'input[name="current_message"]'
            ) as HTMLInputElement
          ).value = "";
        }}
      >
        <div className="w-full h-16 flex gap-2 justify-center items-center p-4 bg-light_gray rounded-lg">
          <input
            name="current_message"
            className="w-full h-full rounded-md text-dark placeholder-light_gray p-1 bg-taupe_gray"
            placeholder="Type your message here"
          />
          <button
            type="submit"
            className="px-5 py-1 text-base font-medium text-center text-white bg-red-400 rounded-xl hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-20"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
