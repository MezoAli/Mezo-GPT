import ToursPage from "@/components/ToursPage";
import { getAllTours } from "@/utils/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tours Page",
  openGraph: {
    title: "Mezo-GPT",
    siteName: "Mezo-GPT",
    locale: "en-US",
    type: "website",
    url: `${process.env.SITE_URL}/tours`,
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
  description:
    "tour gide generator to specify where you need to go and let us decide the beautiful places to visit",
};

const AllToursPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["tours", ""],
    queryFn: () => getAllTours(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ToursPage />
    </HydrationBoundary>
  );
};

export default AllToursPage;
