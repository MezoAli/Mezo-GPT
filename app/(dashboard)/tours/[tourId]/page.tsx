import TourInfo from "@/components/TourInfo";
import { generateTourImage, getSingleTour } from "@/utils/actions";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const SingleTourPage = async ({ params }: { params: { tourId: string } }) => {
  const tour = await getSingleTour(params.tourId);

  if (!tour) {
    notFound();
  }

  const tourImage = await generateTourImage({
    city: tour?.city,
    country: tour?.country,
  });

  return (
    <div className="max-w-2xl">
      <Link href="/tours" className="btn btn-primary mb-8">
        Back to tours
      </Link>
      {tourImage ? (
        <Image
          alt={tour.title}
          src={tourImage as string}
          className="rounded-xl object-cover h-96 w-96"
          width={300}
          height={300}
        />
      ) : null}
      <TourInfo tour={tour} />
    </div>
  );
};

export default SingleTourPage;
