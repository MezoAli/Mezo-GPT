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
    title: "Chat Page",
    siteName: "Mezo-GPT",
    locale: "en-US",
    type: "website",
    url: `${process.env.SITE_URL}/chat`,
    images: [
      {
        url: `${process.env.SITE_URL}/chat/opengraph-image.png`,
        width: 1200,
        height: 630,
      },
    ],
    description: "chat app like Chat-gpt",
  },
  alternates: {
    canonical: `${process.env.SITE_URL}/chat`,
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
