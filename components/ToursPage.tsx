"use client";

import { getAllTours } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import ToursList from "./ToursList";
import { useState } from "react";

const ToursPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: tours, isPending } = useQuery({
    queryKey: ["tours", searchTerm],
    queryFn: () => getAllTours(searchTerm),
  });

  return (
    <>
      <form className="max-w-lg mb-8">
        <div className="join w-full">
          <input
            placeholder="enter city or country here.."
            className="input input-bordered join-item w-full"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <button className="btn btn-primary join-item">Search</button> */}
        </div>
      </form>
      {tours?.length === 0 && (
        <p className="text-center text-2xl ">NO tours found...</p>
      )}
      {isPending ? (
        <span className="loading loading-lg"></span>
      ) : (
        <ToursList tours={tours} />
      )}
    </>
  );
};

export default ToursPage;
