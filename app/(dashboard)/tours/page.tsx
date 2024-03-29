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
    title: "Tours Page",
    siteName: "Mezo-GPT",
    locale: "en-US",
    type: "website",
    url: `${process.env.SITE_URL}/tours`,
    images: [
      {
        url: `${process.env.SITE_URL}/tours/opengraph-image.png`,
        width: 600,
        height: 600,
      },
    ],
    description:
      "tour gide generator to specify where you need to go and let us decide the beautiful places to visit",
  },
  alternates: {
    canonical: `${process.env.SITE_URL}/tours`,
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
