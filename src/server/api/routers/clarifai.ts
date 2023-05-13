/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { imageUrlSchema } from "~/schema/clarifai.z";
import { TRPCError } from "@trpc/server";
import requestOptions from "~/constants/clarifai";

export const clarifaiRouter = createTRPCRouter({
  predict: publicProcedure
    .input(z.object({ imageUrl: imageUrlSchema }))
    .mutation(({ input }) => {
      return fetch(
        `https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`,
        requestOptions(input.imageUrl)
      )
        .then((response) => response.json())
        .catch(
          (error) =>
            new TRPCError({
              code: "BAD_REQUEST",
              message: JSON.stringify(error),
            })
        );
    }),
});
