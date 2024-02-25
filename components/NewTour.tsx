"use client";

import {
  Destination,
  generateTourResponse,
  createNewTourToDatabase,
  getExistingTour,
  fetchUserTokensById,
  subtractTokens,
} from "@/utils/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import TourInfo from "./TourInfo";
import { useAuth } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";

const NewTour = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();
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
      const currentTokens = await fetchUserTokensById(userId as string);
      if (!userId) return;

      if (!currentTokens) return;

      if (currentTokens < 300) {
        toast.error("your token balance is too low..");
        return;
      }
      const newTour = await generateTourResponse(destination);

      if (!newTour) {
        toast.error("no matching city found!!!");
        return null;
      }
      if (newTour?.tour) {
        await createNewTourToDatabase(newTour.tour);
        queryClient.invalidateQueries({ queryKey: ["tours"] });
        const remaningTokens = await subtractTokens(
          userId,
          newTour.tokensUsed as number
        );
        toast.success(`you have ${remaningTokens} tokens available`);
        return newTour.tour;
      }
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
