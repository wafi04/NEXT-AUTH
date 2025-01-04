"use server"    
import { VenueDto, VenueSchema } from "@/validation/venues"
import { Venue } from "@prisma/client"
import { prisma } from "@/lib/prisma" 
import { currentUser } from "@/features/auth/data"
import { VenueWithImage } from "@/types/venues"

export interface VenueResponse {
  data?: Venue
  error?: string | null
}
export interface VenueWithImageResponse {
  data?: VenueWithImage[]
  error?: string | null
}
export async function ActionCreateVenue(datas: VenueDto): Promise<VenueResponse> {
  try {
    const user =  await currentUser()
    console.log(datas)

    const venue = await prisma.venue.create({
      data: {
        ...datas,
        createdBy : user?.id as string
      }
    })

    return {
      data: venue,
      error: null
    }

  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message  || "Something Went Wrong"
      }
    }
    return {
      error: "Failed to create venue"
    }
  }
}


export async function  ActionGetVenue(){
  return await  prisma.venue.findMany({})
}


export async function  ActionUpdateVenue(data : VenueDto,id  : string) : Promise<VenueResponse>{
  try {
    const user =  await currentUser()

    if(!user){
      return {
        error : "UNAUTHORIZED"
      }
    }
    console.log(data)

    const venue = await prisma.venue.update({
      where : {id},
      data: {
        ...data,
      }
    })

    return {
      data: venue,
      error: null
    }

  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message  || "Something Went Wrong"
      }
    }
    return {
      error: "Failed to create venue"
    }
  }
}



export async function DeleteVenue(id : string) : Promise<string>{
  try {
    
    await prisma.venue.delete({
      where : {id}
    })
    return "Succesfully deleted venue"
  } catch (error) {
    if (error instanceof Error) {
      return "Something Went Wrong"
    }
    return "Failed to create venue"
  
  }
}



export async function ActionGetVenueWithImage(): Promise<{
  data?: VenueWithImage[];
  error?: string;
}> {
  try {
    const data = await prisma.$queryRaw`
      SELECT 
        v.id, 
        v.name, 
        v.description,
        V.price,
        JSON_AGG(vi.url) AS image_urls
      FROM "Venue" v
      LEFT JOIN "VenueImage" vi ON v.id = vi.venue_id
      GROUP BY v.id, v.name 
    `;

    
    return {
      data: data as VenueWithImage[]
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message || "Something Went Wrong"
      };
    }
    return {
      error: "Failed to fetch venues"
    };
  }
}