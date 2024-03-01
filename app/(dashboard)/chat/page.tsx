import Chat from "@/components/Chat";
import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat Page",
  description: "chat app like Chat-gpt",
  openGraph: {
    title: "Mezo-GPT",
    siteName: "Mezo-GPT",
    locale: "en-US",
    type: "website",
    url: `${process.env.SITE_URL}/chat`,
    images: [
      {
        url: `${process.env.SITE_URL}/opengraph-imageConfigDefault.png`,
        width: 600,
        height: 600,
      },
    ],
    description:
      "chat app like Chat-gpt and tour gide generator to specify where you need to go and let us decide the beautiful places to visit",
  },
};

const ChatPage = () => {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Chat />
    </HydrationBoundary>
  );
};

export default ChatPage;
