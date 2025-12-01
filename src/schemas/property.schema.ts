import { z } from "zod";

export const PropertySchema = z.object({
  id: z.string(),
  name: z.string(),
  lat: z.number(),
  lng: z.number(),
  price: z.number().nullable().optional(),
  configuration: z.string().optional(),
  micromarket: z.string().optional(),
});

export type Property = z.infer<typeof PropertySchema>;
