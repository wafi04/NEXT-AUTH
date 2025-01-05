import { Venue } from "@prisma/client";

export interface VenueWithImage extends Venue {
  image_urls: string[];
}
