import TourCard from "./TourCard";

const ToursList = ({ tours }: any) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {tours?.map((tour: any) => {
        return <TourCard key={tour.id} tour={tour} />;
      })}
    </div>
  );
};

export default ToursList;
