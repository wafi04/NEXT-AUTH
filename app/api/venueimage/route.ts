import { currentUser } from "@/features/auth/data";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await currentUser();
        
        if (!user || user.role !== "ADMIN") {
            return NextResponse.json({
                error: "You are not authorized to access this page"
            }, {
                status: 401
            });
        }

        const data : [] = await prisma.$queryRaw`
            SELECT 
                i.url,
                i.id,
                i.venue_id,
                v.name,
                v.id as venue_id
            FROM 
                "VenueImage" i
            LEFT JOIN 
                "Venue" v ON i.venue_id = v.id
        `;

        if (!data || data.length === 0) {
            return NextResponse.json({
                error: "No data found"
            }, {
                status: 404
            });
        }

        return NextResponse.json({
            data
        }, {
            status: 200
        });

    } catch (error  : any) {
        console.error('Query error:', error);
        
        // More specific error handling
        if (error.code === 'P2002') {
            return NextResponse.json({ 
                error: 'Unique constraint violation' 
            }, { 
                status: 400 
            });
        }

        if (error.code === 'P2025') {
            return NextResponse.json({ 
                error: 'Record not found' 
            }, { 
                status: 404 
            });
        }

        return NextResponse.json({ 
            error: 'Internal Server Error' 
        }, { 
            status: 500 
        });
    }
}