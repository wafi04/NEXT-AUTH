"use client";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VenueImage } from "@/types/venuesImage";
import { ReactNode } from "react";
import {
  MapPin,
  DollarSign,
  FileText,
  Star,
  Users,
  Calendar,
} from "lucide-react";
import { formatPrice } from "@/utils/Format";

export function DialogDetailsVenueImage({
  children,
  data,
}: {
  children: ReactNode;
  data: VenueImage;
}) {
  console.log(data);
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='max-w-4xl p-0 overflow-hidden'>
        <div className='grid md:grid-cols-3 gap-0'>
          <div className='md:col-span-2 relative w-full aspect-video'>
            <Image
              src={data.url}
              alt={data.venueName || "Venue Image"}
              fill
              priority
              className='object-cover h-full'
            />
          </div>

          <div className='p-6 bg-white space-y-6 text-gray-500'>
            <DialogHeader>
              <DialogTitle className='text-2xl font-bold text-gray-900 mb-2'>
                {data.venueName}
              </DialogTitle>
              <DialogDescription className='text-sm text-gray-600 mt-1'>
                {data.description || "No description available"}
              </DialogDescription>
            </DialogHeader>
            <div className='flex items-center space-x-2 '>
              <MapPin className='size-4' />
              <span className='text-md'>{data.address}</span>
            </div>
            <div className='flex items-center space-x-2 mb-2 '>
              <DollarSign className='size-4' />
              <p className='text-md'>{formatPrice(data.price)}/day</p>
            </div>
            <div className='flex items-center space-x-2 mb-2'>
              <Users className='size-4 ' />
              <p className='text-md'>{data.capacity} Pax</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
