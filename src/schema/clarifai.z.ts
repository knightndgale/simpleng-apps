import { z } from "zod";

export const imageUrlSchema = z.string().url();
