import TourInfo from "@/components/TourInfo";
import { getSingleTour } from "@/utils/actions";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

const getTour = cache(getSingleTour);

export const generateMetadata = async ({
  params,
}: {
  params: { tourId: string };
}) => {
  const tour = await getTour(params.tourId);
  if (!tour) {
    notFound();
  }

  return {
    title: {
      absolute: tour?.title,
    },
    description: tour?.description,
    openGraph: {
      title: tour?.title,
      siteName: "Mezo-GPT",
      locale: "en-US",
      type: "website",
      url: `${process.env.SITE_URL}/${params.tourId}`,
      images: [
        {
          url: `${process.env.SITE_URL}/opengraph-image.png`,
          width: 600,
          height: 600,
        },
      ],
      description: tour?.description,
    },
  };
};

const SingleTourPage = async ({ params }: { params: { tourId: string } }) => {
  const tour = await getTour(params.tourId);

  if (!tour) {
    notFound();
  }

  const response = await fetch(`${url}${tour.city}`);
  const data = await response.json();
  const tourImage = data?.results[0]?.urls?.raw;

  return (
    <div className="max-w-2xl">
      <Link href="/tours" className="btn btn-primary mb-8">
        Back to tours
      </Link>
      {tourImage ? (
        <Image
          alt={tour.title}
          src={tourImage as string}
          className="rounded-xl object-cover h-96 w-96 mb-16"
          width={300}
          height={300}
        />
      ) : null}
      <TourInfo tour={tour} />
    </div>
  );
};

export default SingleTourPage;
