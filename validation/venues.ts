import { z } from "zod";

export const VenueSchema = z.object({
  name: z.string().min(1,{
    message : "Name is required"
  }),
  description: z.string(),
  address: z.string().min(1, {message : "Address is required"}),
  city: z.string().min(1, {message : "City is required"}),
  province: z.string().min(1, {message : "Province is required"}),
  capacity: z.number().positive({message : "Capacity must be a positive number"}),
  price: z.number().nonnegative({message : "Price cannot be negative"}),
  facilities: z.array(z.string()).default([]),
});

export type VenueDto = z.infer<typeof VenueSchema>;