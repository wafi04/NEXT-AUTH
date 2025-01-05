import { prisma } from "@/lib/prisma";
import { Prisma, Venue } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface VenueWithImages extends Venue {
  image_urls: string[];
  total_count: number;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
}

interface APIResponse {
  venues: VenueWithImages[];
  pagination: PaginationInfo;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sortDirection = searchParams.get("price");
    const page = Math.max(1, Number(searchParams.get("cursor") ?? 1));
    const limit = 5;

    const orderBy = getSortOrder(sortDirection);
    const offset = (page - 1) * limit;
    const venues = await prisma.$queryRaw<VenueWithImages[]>`
      SELECT 
        v.id,
        v.name,
        v.description,
        v.price,
        COALESCE(
          JSON_AGG(vi.url) FILTER (WHERE vi.url IS NOT NULL), 
          '[]'
        ) AS image_urls,
        CAST(COUNT(*) OVER () AS INTEGER) total_count
      FROM "Venue" v
      LEFT JOIN "VenueImage" vi ON vi.venue_id = v.id
      GROUP BY v.id, v.name, v.description, v.price
      ${orderBy}
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    const formattedVenues = formatVenues(venues);
    const paginationInfo = calculatePagination(formattedVenues, page, limit);

    return NextResponse.json<APIResponse>({
      venues: formattedVenues,
      pagination: paginationInfo,
    });
  } catch (error) {
    console.error("Error fetching venues:", error);
    return NextResponse.json(
      { error: "Failed to fetch venues" },
      { status: 500 }
    );
  }
}

function getSortOrder(sortDirection: string | null): Prisma.Sql {
  switch (sortDirection) {
    case "desc":
      return Prisma.sql`ORDER BY v.price DESC`;
    case "asc":
      return Prisma.sql`ORDER BY v.price ASC`;
    default:
      return Prisma.sql`ORDER BY v.id`;
  }
}

function formatVenues(venues: VenueWithImages[]): VenueWithImages[] {
  return venues.map((venue) => ({
    ...venue,
    price: Number(venue.price),
    total_count: Number(venue.total_count),
  }));
}

function calculatePagination(
  venues: VenueWithImages[],
  currentPage: number,
  limit: number
): PaginationInfo {
  const totalItems = venues.length > 0 ? venues[0]?.total_count : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    currentPage,
    totalPages,
    totalItems,
    hasNextPage: currentPage < totalPages,
  };
}
