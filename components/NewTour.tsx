"use client";

import {
  Destination,
  generateTourResponse,
  createNewTourToDatabase,
  getExistingTour,
} from "@/utils/actions";
import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import TourInfo from "./TourInfo";

const NewTour = () => {
  const {
    mutate,
    isPending,
    data: tour,
  } = useMutation({
    mutationFn: async (destination: Destination) => {
      const existingTour = await getExistingTour(destination);
      if (existingTour) {
        return existingTour;
      }
      const newTour = await generateTourResponse(destination);
      if (newTour) {
        await createNewTourToDatabase(newTour);
        return newTour;
      }
      toast.error("Something went wrong!!!");
      return null;
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries()) as Destination;
    mutate(destination);
  };
  return (
    <>
      <div className="max-w-3xl">
        <p className="mb-4 capitalize text-xl">select your dream destination</p>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="join">
            <input
              className="input input-bordered join-item w-full"
              type="text"
              placeholder="City"
              name="city"
              required
            />
            <input
              className="input input-bordered join-item w-full"
              type="text"
              placeholder="Country"
              name="country"
              required
            />
            <button className="btn btn-primary" disabled={isPending}>
              {isPending ? "Please Wait..." : "generate"}
            </button>
          </div>
        </form>
      </div>
      <div className="mt-16">
        {tour ? (
          <TourInfo tour={tour} />
        ) : isPending ? (
          <span className="loading text-2xl"></span>
        ) : null}
      </div>
    </>
  );
};

export default NewTour;
