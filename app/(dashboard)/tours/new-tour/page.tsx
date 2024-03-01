import NewTour from "@/components/NewTour";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Tour Page",
  openGraph: {
    title: "New Tour Page",
    siteName: "Mezo-GPT",
    locale: "en-US",
    type: "website",
    url: `${process.env.SITE_URL}/new-tour`,
    images: [
      {
        url: `${process.env.SITE_URL}/opengraph-image.png`,
        width: 600,
        height: 600,
      },
    ],
    description:
      "tour gide generator to specify where you need to go and let us decide the beautiful places to visit",
  },
  description:
    "tour gide generator to specify where you need to go and let us decide the beautiful places to visit",
};

const NewTourPage = async () => {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewTour />
    </HydrationBoundary>
  );
};

export default NewTourPage;
