import TourInfo from "@/components/TourInfo";
import { getSingleTour } from "@/utils/actions";
import Link from "next/link";

const SingleTourPage = async ({ params }: { params: { tourId: string } }) => {
  const tour = await getSingleTour(params.tourId);
  return (
    <div className="max-w-2xl">
      <Link href="/tours" className="btn btn-primary mb-8">
        Back to tours
      </Link>
      <TourInfo tour={tour} />
    </div>
  );
};

export default SingleTourPage;
