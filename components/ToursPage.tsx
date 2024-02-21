"use client";

import { getAllTours } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import ToursList from "./ToursList";

const ToursPage = () => {
  const { data: tours } = useQuery({
    queryKey: ["tours"],
    queryFn: () => getAllTours(),
  });

  if (tours?.length === 0) {
    return <p className="text-center text-2xl ">NO tours found...</p>;
  }
  return <ToursList tours={tours} />;
};

export default ToursPage;
