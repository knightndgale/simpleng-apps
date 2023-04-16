/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { imageUrlSchema } from "~/schema/clarifai.z";
import { TRPCError } from "@trpc/server";
import requestOptions from "~/constants/clarifai";

type BoundingBox = {
  top_row: number;
  left_col: number;
  bottom_row: number;
  right_col: number;
};

type Regions = {
  regions: BoundingBox[];
};
type Outputs = {
  data: Regions;
};
type ClarifaiReponse = {
  outputs: Outputs[];
};

export const clarifaiRouter = createTRPCRouter({
  predict: protectedProcedure
    .input(z.object({ imageUrl: imageUrlSchema }))
    .mutation(({ input }) => {
      return fetch(
        `https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`,
        requestOptions(input.imageUrl)
      )
        .then((response) => response.json().then((res: ClarifaiReponse) => res))
        .catch(
          (error) =>
            new TRPCError({
              code: "BAD_REQUEST",
              message: JSON.stringify(error),
            })
        );

      // return input.imageUrl;
    }),
});
