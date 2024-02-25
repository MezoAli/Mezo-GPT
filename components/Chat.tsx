"use client";

import {
  fetchUserTokensById,
  generateChatResponse,
  subtractTokens,
} from "@/utils/actions";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { userId } = useAuth();

  const { mutate, isPending, data } = useMutation({
    mutationFn: async (textMsg) => {
      if (!userId) return;
      const userTokens = await fetchUserTokensById(userId);
      if (!userTokens) return;

      if (userTokens < 100) {
        toast.error("incuffient tokens balance..");
        return;
      }
      const response = await generateChatResponse([
        ...messages,
        textMsg,
      ] as any);

      if (!response) {
        toast.error("something went wrong!!");
        return;
      }

      setMessages((prev: any) => [...prev, response.message] as any);

      const newTokens = await subtractTokens(
        userId,
        response.tokensUsed as number
      );

      toast.success(`${newTokens} tokens are remaining`);
    },
    // onSuccess: (data) => {
    //   if (!data) {
    //     toast.error("something went wrong!!");
    //     return;
    //   }
    //   setMessages((prev: any) => [...prev, data] as any);
    // },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = { role: "user", content: inputRef?.current?.value };
    mutate(query as any);
    setMessages((prev: any) => [...prev, query] as any);
    if (inputRef?.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, []);

  return (
    <>
      {messages.length === 0 ? (
        <h2 className="text-2xl mb-2 font-bold">Chat Page</h2>
      ) : null}
      <div className="grid grid-rows-[1fr,auto] min-h-[calc(100vh-6rem)]">
        <div>
          {messages.map(({ role, content }, index) => {
            const avatar = role == "user" ? "👤" : "🤖";
            const bcg = role == "user" ? "bg-base-200" : "bg-base-100";
            return (
              <div
                key={index}
                className={` ${bcg} flex py-6 -mx-8 px-8
               text-xl leading-loose border-b border-base-300`}
              >
                <span className="mr-4 ">{avatar}</span>
                <p className="max-w-3xl">{content}</p>
              </div>
            );
          })}
          {isPending && <span className="loading"></span>}
        </div>
        <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
          <div className="join w-full">
            <input
              type="text"
              ref={inputRef}
              required
              placeholder="Message MezoGPT"
              className="join-item input input-bordered w-full"
              // value={text}
              // onChange={(e) => setText(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-primary join-item"
              disabled={isPending}
            >
              {isPending ? "Please Wait..." : "Ask Question"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chat;
