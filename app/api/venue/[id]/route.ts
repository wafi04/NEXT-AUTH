import { uploadToCloudinary } from '@/lib/cloudinary';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client'

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await Promise.resolve(context.params);

  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = formData.get('folder') as string ?? 'uploads';

    if (!file) {
      return NextResponse.json({ message: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileUri = `data:${file.type};base64,${buffer.toString('base64')}`;
    const fileName = `upload_${Date.now()}_${file.name}`;

    const uploadResult = await uploadToCloudinary(fileUri, fileName, folder);
    console.log(uploadResult);

    if (uploadResult.success && uploadResult.result) {
      await prisma.venueImage.create({
        data: {
          url: uploadResult.result.url,
          venueId: id, 
        },
      });
      return NextResponse.json(
        {
          message: 'Upload successful',
          imageUrl: uploadResult.result.secure_url,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: 'Upload failed' }, { status: 500 });
    }
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}


export async function GET(request: NextRequest) {
  const expansiveToCheap = request.nextUrl.searchParams.get('price') === 'desc'
  const cheapToExpensive = request.nextUrl.searchParams.get('price') === 'asc'
  const page = request.nextUrl.searchParams.get('cursor') ?? 1
  const limit = 10

  try {
    // Tentukan order berdasarkan parameter
    const orderClause = expansiveToCheap 
      ? 'ORDER BY v.price DESC' 
      : cheapToExpensive 
      ? 'ORDER BY v.price ASC' 
      : 'ORDER BY v.id'

    // Hitung offset untuk pagination
    const offset = (Number(page) - 1) * limit

    // Query untuk mendapatkan venues
    const venues :any[] = await prisma.$queryRaw`
      SELECT 
        v.id, 
        v.name, 
        v.description,
        v.price,
        JSON_AGG(vi.url) AS image_urls,
        COUNT(*) OVER () as total_count
      FROM "Venue" v
      LEFT JOIN "VenueImage" vi ON v.id = vi.venue_id
      GROUP BY v.id, v.name, v.description, v.price
      ${Prisma.sql`${orderClause}`}
      LIMIT ${limit}
      OFFSET ${offset}
    `
    // Hitung total halaman
    const totalItems = venues.length > 0 ? Number(venues[0]?.total_count) : 0
    const totalPages = Math.ceil(totalItems / limit)

    return NextResponse.json({
      venues,
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