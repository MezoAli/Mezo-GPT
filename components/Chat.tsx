"use client";

import { generateChatResponse } from "@/utils/actions";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

const Chat = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const { mutate } = useMutation({
    mutationFn: (textMsg) => generateChatResponse(textMsg!),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(text as any);
  };
  return (
    <div className="grid grid-rows-[1fr,auto] min-h-[calc(100vh-6rem)]">
      <div className="text-5xl">
        <h2>Messages</h2>
      </div>
      <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Message MezoGPT"
            className="join-item input input-bordered w-full"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="btn btn-primary join-item">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
