import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VenueWithImage } from "@/types/venues";

export function LeftSection({ venue }: { venue: VenueWithImage }) {
  return (
    <div className='md:col-span-2 space-y-6'>
      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>About this Venue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-gray-600 leading-relaxed text-lg'>
            {venue.description || "No description available."}
          </p>
        </CardContent>
      </Card>

      {/* Facilities */}
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Facilities & Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-y-4'>
            {venue.facilities.map((facility, index) => (
              <div key={index} className='flex items-center gap-3'>
                <div className='w-2 h-2 bg-primary rounded-full' />
                <span className='text-gray-700'>{facility}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
