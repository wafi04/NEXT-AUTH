"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star } from "lucide-react";
import Image from "next/image";
import { useGetVenueWithImage } from "@/features/venues/api/venue.api";
import { LoadingComponents } from "@/components/ui/loading";
import { ErrorComponents } from "@/components/ui/error";
import { formatPrice } from "@/utils/Format";
import Link from "next/link";

const categories = ["All", "Popular", "Trending", "Expensive", "Cheaper"];

export default function VenuesFeatured() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortPrice, setSortPrice] = useState<"asc" | "desc" | null>(null);

  const { data, isLoading, error } = useGetVenueWithImage({
    sortPrice,
    enabled: true,
  });

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    switch (category) {
      case "Expensive":
        setSortPrice("desc");
        break;
      case "Cheaper":
        setSortPrice("asc");
        break;
      default:
        setSortPrice(null);
    }
  };

  const venues = data?.pages.flatMap((page) => page.venues) ?? [];

  if (isLoading) {
    return <LoadingComponents />;
  }

  if (error) {
    return <ErrorComponents error={error} />;
  }

  return (
    <section className='min-h-screen h-full w-full mx-auto bg-gray-50'>
      <div className='p-6 md:p-20 space-y-8'>
        <div className='space-y-4'>
          <div className='flex justify-between items-center'>
            <h1
              className='text-3xl md:text-4xl font-bold text-gray-900'
              style={{ fontFamily: "Anton" }}>
              Popular Venues
            </h1>
          </div>

          <div className='flex justify-between items-center'>
            <Tabs defaultValue='All' className='bg-transparent'>
              <TabsList className='flex gap-2 justify-start bg-transparent'>
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 whitespace-nowrap data-[state=active]:border-red-600 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none`}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {venues.map((venue, index) => (
            <Link href={`/venue/${venue.id}`} key={venue.id || index}>
              <Card className='overflow-hidden hover:shadow-lg transition-shadow cursor-pointer'>
                <div className='relative'>
                  <Image
                    src={venue.image_urls[1]}
                    alt={venue.name}
                    width={500}
                    height={500}
                    className='w-full h-48 object-cover'
                  />
                  <div className='absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold'>
                    <div className='flex items-center gap-1'>
                      <Star className='w-4 h-4 text-yellow-400 fill-yellow-400' />
                      4.8
                    </div>
                  </div>
                </div>
                <CardContent className='p-4'>
                  <h3 className='font-semibold text-lg mb-2'>{venue.name}</h3>
                  <p className='text-gray-600 text-sm mb-3'>
                    {venue.description}
                  </p>
                  <div className='flex space-x-0.5 items-center'>
                    <span className='font-bold text-lg'>
                      {formatPrice(venue.price)}
                    </span>
                    <span className='text-sm'>/day</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
