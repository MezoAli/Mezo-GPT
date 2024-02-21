"use server";

import OpenAI from "openai";
import prisma from "./db";
import { Tour } from "@prisma/client";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY,
});

export const generateChatResponse = async (chatMessages: []) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "you are a helpful assistant" },
        ...chatMessages,
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });
    return response.choices[0].message;
  } catch (error) {
    return null;
  }
};

export type Destination = {
  city: string;
  country: string;
};

export const getExistingTour = async ({ city, country }: Destination) => {
  try {
    const getTour = await prisma.tour.findUnique({
      where: {
        city_country: {
          city,
          country,
        },
      },
    });

    if (!getTour) {
      return null;
    }

    return getTour;
  } catch (error) {
    return null;
  }
};

export const generateTourResponse = async ({ city, country }: Destination) => {
  try {
    const query = `Find a exact ${city} in this exact ${country}.
    If ${city} and ${country} exist, create a list of things families can do in this ${city},${country}. 
    Once you have a list, create a one-day tour. Response should be  in the following JSON format: 
    {
      "tour": {
        "city": "${city}",
        "country": "${country}",
        "title": "title of the tour",
        "description": "short description of the city and tour",
        "stops": ["short paragraph on the stop 1 ", "short paragraph on the stop 2","short paragraph on the stop 3"]
      }
    }
    "stops" property should include only three stops.
    If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country},   return { "tour": null }, with no additional characters.`;

    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "you are a helpful tour guide" },
        { role: "user", content: query },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });

    const tourData = JSON.parse(response.choices[0].message.content!);

    if (!tourData) {
      return null;
    }

    return tourData.tour;
  } catch (error) {
    return null;
  }
};

export const createNewTourToDatabase = async (tour: Tour) => {
  try {
    const newTour = await prisma.tour.create({
      data: {
        city: tour.city,
        country: tour.country,
        description: tour.description,
        stops: tour.stops as any,
        title: tour.title,
      },
    });

    return newTour;
  } catch (error) {
    return null;
  }
};
