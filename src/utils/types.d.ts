import { z } from "zod";

export const searchParamsSchema = z.object({
  name: z.string(),
});

export const productCardSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.number(),
  slug: z.string(),
  image: z.array(z.string),
});
