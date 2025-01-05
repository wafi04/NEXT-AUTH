import { currentUser } from "@/features/auth/data";
import { prisma } from "@/lib/prisma";
import { handleDatabaseError } from "@/types/error";
import { VenueImage } from "@/types/venuesImage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({
        error: "You are not authorized to access this page"
      }, {
        status: 401
      });
    }

    const cursor = request.nextUrl.searchParams.get("cursor")
    const limit = 5
    const offset = cursor ? parseInt(cursor) : 0

    const data: (VenueImage & { total_count: number })[] = await prisma.$queryRaw`
      SELECT 
        i.url,
        i.id,
        i.venue_id,
        v.name as "venueName",
        v.description  as description,
        v.address,
        v.price,
        v.capacity,
        COUNT(*) OVER() as total_count
      FROM 
        "VenueImage" i
      LEFT JOIN 
        "Venue" v ON i.venue_id = v.id
      ORDER BY i.id
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    if (!data || data.length === 0) {
      return NextResponse.json({
        error: "No data found"
      }, {
        status: 404
      });
    }

    const totalItems = Number(data[0].total_count)
    const totalPages = Math.ceil(totalItems / limit)
    const remainingItems = totalItems - (offset + data.length)
    const nextCursor = remainingItems > 0 ? offset + limit : undefined

    return NextResponse.json({
      data: data.map(({ total_count, ...item }) => item),
      nextCursor,
      hasNextPage: remainingItems > 0,
      totalPages,
      totalItems,
      remainingItems
    }, {
      status: 200
    });

  } catch (error) {
    handleDatabaseError(error);
    
    return NextResponse.json({
      error: 'Internal Server Error'
    }, {
      status: 500
    });
  }
}