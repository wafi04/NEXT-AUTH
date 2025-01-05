import { ActionGetVenueById } from "@/app/(admin)/dashboard/_action/venues";
import { ErrorComponents } from "@/components/ui/error";
import { HeaderSection, QuickStats } from "./HeaderSection";
import { ImageGallery } from "./imageGallery";
import { Building, Clock, MapPin, Star, Users } from "lucide-react";
import { ZoomParallaxBackground } from "./Testing";

interface IParams {
  params: Promise<{
    venueId: string;
  }>;
}

export default async function Page({ params }: IParams) {
  const { venueId } = await params;
  const { data: venue, error } = await ActionGetVenueById(venueId);
  if (!venue) {
    return <div>Data not found</div>;
  }
  if (error) {
    return <ErrorComponents error={error} />;
  }
  return (
    <main className='relative min-h-[200vh] text-white'>
      <ZoomParallaxBackground images={venue.image_urls} />

      {/* Content */}
      <div className='relative z-10'>
        {/* Hero Section */}
        <section className='min-h-screen flex items-center justify-center px-8 sticky top-0'>
          <div className='max-w-4xl text-center space-y-6'>
            <h1 className='text-7xl font-bold tracking-tight'>{venue.name}</h1>
            <div className='flex items-center justify-center gap-2 text-gray-200'>
              <MapPin className='w-6 h-6' />
              <span className='text-xl'>
                {`${venue.address}, ${venue.city}, ${venue.province}`}
              </span>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className='min-h-screen py-24 px-8 bg-black/30 backdrop-blur-sm  sticky top-0'>
          <div className='max-w-7xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {[
                {
                  icon: Users,
                  label: "Capacity",
                  value: `${venue.capacity}`,
                  subtext: "people",
                },
                {
                  icon: Building,
                  label: "Type",
                  value: "Event",
                  subtext: "Venue",
                },
                {
                  icon: Clock,
                  label: "Since",
                  value: new Date(venue.createdAt).getFullYear(),
                  subtext: "established",
                },
                {
                  icon: Star,
                  label: "Rating",
                  value: "4.9",
                  subtext: "out of 5.0",
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className='p-8 rounded-2xl bg-white/10 backdrop-blur-md 
                         hover:bg-white/20 transition-all duration-300
                         group transform hover:scale-105'>
                  <div className='flex items-center gap-4 mb-6'>
                    <div
                      className='p-3 rounded-xl bg-white/20 group-hover:bg-white/30 
                                transition-all duration-300'>
                      <stat.icon className='w-6 h-6' />
                    </div>
                    <p className='text-lg font-medium text-gray-300'>
                      {stat.label}
                    </p>
                  </div>
                  <div>
                    <p className='text-4xl font-bold'>{stat.value}</p>
                    <p className='text-sm text-gray-400 mt-2'>{stat.subtext}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
