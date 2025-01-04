import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const expansiveToCheap = request.nextUrl?.searchParams.get('price') === 'desc'
  const cheapToExpensive = request.nextUrl?.searchParams.get('price') === 'asc'
  const page = request.nextUrl.searchParams.get('cursor') ?? 1
  const limit = 10

  try {
    const orderBy = expansiveToCheap
      ? Prisma.sql`ORDER BY v.price DESC`
      : cheapToExpensive
      ? Prisma.sql`ORDER BY v.price ASC`
      : Prisma.sql`ORDER BY v.id`

    const offset = (Number(page) - 1) * limit

    const venues: any[] = await prisma.$queryRaw`
      SELECT 
        v.id,
        v.name,
        v.description,
        v.price,
        COALESCE(JSON_AGG(vi.url) FILTER (WHERE vi.url IS NOT NULL), '[]') AS image_urls,
       CAST(COUNT(*) OVER () AS INTEGER) total_count
      FROM "Venue" v
      LEFT JOIN "VenueImage" vi ON vi.venue_id = v.id
      GROUP BY v.id, v.name, v.description, v.price
      ${orderBy}
      LIMIT ${limit}
      OFFSET ${offset}
    `

const formattedVenues = venues.map(venue => ({
    ...venue,
    price: Number(venue.price),
    total_count: Number(venue.total_count)
  }))

  const totalItems = formattedVenues.length > 0 ? formattedVenues[0]?.total_count : 0
  const totalPages = Math.ceil(totalItems / limit)

  return NextResponse.json({
    venues: formattedVenues,
    pagination: {
      currentPage: Number(page),
      totalPages,
      totalItems,
      hasNextPage: Number(page) < totalPages
    }
  })
} catch (error) {
  console.error('Error fetching venues:', error)
  return NextResponse.json(
    { error: 'Failed to fetch venues' },
    { status: 500 }
  )
}
}