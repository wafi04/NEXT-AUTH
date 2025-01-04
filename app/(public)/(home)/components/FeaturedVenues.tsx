"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {  Star } from "lucide-react";
import { VenueWithImage } from '@/types/venues';
import Image from 'next/image';



const categories = ["All", "Popular", "Trending", "Expansive", "Cheaper"];

export default function VenuesFeatured({data}  : {data : VenueWithImage[]}) {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <section className="min-h-screen h-full w-full mx-auto bg-gray-50">
      <div className="p-6 md:p-20 space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 
            className="text-3xl md:text-4xl font-bold text-gray-900"
            style={{ fontFamily: 'Anton' }}
          >
            Popular Venues
          </h1>
          <Button variant="outline">View All</Button>
        </div>

        {/* Categories */}
        <Tabs defaultValue="All" className="w-full bg-transparent">
          <TabsList className="flex gap-2 justify-start bg-transparent   pb-2">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 whitespace-nowrap data-[state=active]:border-red-600 data-[state=active]:border-b-2  data-[state=active]:bg-transparent data-[state=active]:shadow-none  rounded-none`}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((venue, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={venue.image_urls[1]}
                  alt={venue.name}
                  width={500}
                  height={500}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    4.8
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{venue.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{venue.description}</p>
               
              </CardContent>
            
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}