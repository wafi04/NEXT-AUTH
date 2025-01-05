"use client";
import Image from "next/image";
import { useGetVenueImage } from "../venueimage.api";
import { VenueImage } from "@/types/venuesImage";
import { useCallback } from "react";
import { LoadingComponents } from "@/components/ui/loading";
import { ErrorComponents } from "@/components/ui/error";
import { DialogDetailsVenueImage } from "./dialogDetails";

export function VenueImageComponents() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useGetVenueImage();

  const observerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !hasNextPage) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(node);
      return () => observer.disconnect();
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  if (status === "pending") return <LoadingComponents />;
  if (status === "error") return <ErrorComponents error={error} />;

  return (
    <section className=' mx-auto p-8'>
      <div className='masonry-grid'>
        {data.pages.flatMap((page) =>
          page.data.map((image: VenueImage, index: number) => {
            const sizeVariants = [
              "md:col-span-2 md:row-span-2",
              "md:col-span-1 md:row-span-1",
              "md:col-span-1 md:row-span-2",
              "md:col-span-2 md:row-span-1",
            ];

            const getSizeClass = () => {
              const sizeIndex = index % sizeVariants.length;
              return sizeVariants[sizeIndex];
            };

            return (
              <div
                key={image.id}
                className={`
                  venue-card 
                  relative 
                  overflow-hidden 
                  rounded-2xl 
                  group 
                  ${getSizeClass()}
                  transition-all 
                  duration-300 
                  hover:scale-[1.02] 
                  hover:shadow-2xl
                `}>
                <Image
                  src={image.url}
                  alt={`Venue: ${image.venueName}`}
                  fill
                  className='
                    absolute 
                    inset-0 
                    w-full 
                    h-full 
                    object-cover 
                    transition-transform 
                    duration-300 
                    group-hover:scale-110
                  '
                />
                <div
                  className='
                  absolute 
                  inset-0 
                  bg-gradient-to-b 
                  from-transparent 
                  to-black/70 
                  flex 
                  items-end 
                  p-4
                '>
                  <div
                    className='
                    text-white 
                    transform 
                    translate-y-10 
                    opacity-0 
                    group-hover:translate-y-0 
                    group-hover:opacity-100 
                    transition-all 
                    duration-300
                  '>
                    <h3
                      className='
                      text-xl 
                      font-bold 
                      mb-2 
                      line-clamp-2
                    '>
                      {image.venueName}
                    </h3>
                    <DialogDetailsVenueImage data={image}>
                      <p
                        className='
                      text-sm 
                      cursor-pointer
                      text-gray-200 
                      opacity-0 
                      group-hover:opacity-100 
                      transition-opacity
                      '>
                        Click for details
                      </p>
                    </DialogDetailsVenueImage>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {hasNextPage && (
        <div ref={observerRef} className='flex justify-center mt-8'>
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className='
              px-8 
              py-3 
              bg-gradient-to-r 
              from-blue-500 
              to-blue-600 
              text-white 
              rounded-full 
              shadow-lg 
              hover:shadow-xl 
              transition-all 
              duration-300 
              flex 
              items-center 
              gap-2
              disabled:opacity-50
            '>
            {isFetchingNextPage ? (
              <>
                <div className='animate-spin'>
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                    />
                  </svg>
                </div>
                <span>Loading more...</span>
              </>
            ) : (
              "Load More Venues"
            )}
          </button>
        </div>
      )}
    </section>
  );
}
