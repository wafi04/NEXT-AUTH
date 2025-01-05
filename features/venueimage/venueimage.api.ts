import { useInfiniteQuery } from "@tanstack/react-query";
import { VenueImage, PaginatedResponse } from "@/types/venuesImage";

async function fetchVenueImages({ cursor = 0 }): Promise<PaginatedResponse<VenueImage>> {
  const response = await fetch(`/api/venueimage?cursor=${cursor}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export function useGetVenueImage() {
  return useInfiniteQuery({
    queryKey: ['venue-images'],
    queryFn: async ({ pageParam = 0 }) => fetchVenueImages({cursor : pageParam}),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0
  });
}