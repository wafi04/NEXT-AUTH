import { PaginationInfo } from "@/types/next.auth";
import { VenueWithImage } from "@/types/venues";
import { useInfiniteQuery } from "@tanstack/react-query";

interface VenueResponse {
  venues: VenueWithImage[];
  pagination: PaginationInfo;
}

interface UseVenueParams {
  sortPrice?: "asc" | "desc" | null;
  enabled?: boolean;
}

export function useGetVenueWithImage({
  sortPrice = null,
  enabled = true,
}: UseVenueParams = {}) {
  return useInfiniteQuery<VenueResponse>({
    queryKey: ["venues", sortPrice],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams();
      params.append("cursor", String(pageParam));
      if (sortPrice) {
        params.append("price", sortPrice);
      }

      const response = await fetch(`/api/venue?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasNextPage) {
        return lastPage.pagination.currentPage + 1;
      }
      return undefined;
    },
    enabled,
    initialPageParam: 0,
  });
}
