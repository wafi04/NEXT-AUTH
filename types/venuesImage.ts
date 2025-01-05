export interface VenueImage {
    id: string
    url: string
    venue_id: string
    venueName: string
    description : string
    price : number
    address : string
    capacity : number
  }
  
  export interface PaginatedResponse<T> {
    data: T[]
    nextCursor?: number
    hasNextPage: boolean
    totalPages: number
    totalItems: number
  }