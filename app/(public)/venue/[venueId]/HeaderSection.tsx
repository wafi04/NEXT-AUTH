"use client";
import { VenueWithImage } from "@/types/venues";
import { MapPin, Users, Clock, Building, Star } from "lucide-react";

import React, { ReactNode, useState } from "react";

const ParallaxCard = ({
  children,
  gradient,
}: {
  children: ReactNode;
  gradient: string;
}) => {
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e: any) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = -(x - centerX) / 20;

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    );
  };

  const handleMouseLeave = () => {
    setTransform(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    );
  };

  return (
    <div
      className='relative h-48 rounded-2xl bg-white overflow-hidden cursor-pointer'
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: "transform 0.2s ease-out",
        transformStyle: "preserve-3d",
      }}>
      {/* Background gradient with parallax effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`}
        style={{
          transform: transform ? transform.replace("1.05", "1.1") : "none",
          transition: "transform 0.2s ease-out",
          transformStyle: "preserve-3d",
        }}
      />

      {/* Content with parallax effect */}
      <div
        className='relative h-full p-6'
        style={{
          transform: transform ? transform.replace("1.05", "1.02") : "none",
          transition: "transform 0.2s ease-out",
          transformStyle: "preserve-3d",
        }}>
        {children}
      </div>
    </div>
  );
};

export const QuickStats = ({ venue }: { venue: VenueWithImage }) => {
  const stats = [
    {
      icon: Users,
      label: "Capacity",
      value: `${venue.capacity}`,
      subtext: "people",
      gradient: "from-blue-600 to-blue-400",
    },
    {
      icon: Building,
      label: "Type",
      value: "Event",
      subtext: "Venue",
      gradient: "from-purple-600 to-purple-400",
    },
    {
      icon: Clock,
      label: "Since",
      value: new Date(venue.createdAt).getFullYear(),
      subtext: "established",
      gradient: "from-amber-600 to-amber-400",
    },
    {
      icon: Star,
      label: "Rating",
      value: "4.9",
      subtext: "out of 5.0",
      gradient: "from-green-600 to-green-400",
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8'>
      {stats.map((stat, idx) => (
        <ParallaxCard key={idx} gradient={stat.gradient}>
          {/* Icon */}
          <div
            className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient}`}>
            <stat.icon className='w-6 h-6 text-white' />
          </div>

          {/* Content */}
          <div className='mt-4 space-y-4'>
            <p className='text-sm font-medium text-gray-500'>{stat.label}</p>
            <div>
              <p
                className={`text-3xl font-bold bg-gradient-to-br ${stat.gradient} 
                            bg-clip-text text-transparent`}>
                {stat.value}
              </p>
              <p className='text-sm text-gray-500 mt-1'>{stat.subtext}</p>
            </div>
          </div>
        </ParallaxCard>
      ))}
    </div>
  );
};

export default QuickStats;

export const HeaderSection = ({ venue }: { venue: VenueWithImage }) => {
  return (
    <section className='relative mt-8'>
      <div className='max-w-4xl space-y-4'>
        <h1 className='text-4xl font-bold text-gray-900 tracking-tight'>
          {venue.name}
        </h1>
        <div className='flex items-center  text-gray-600'>
          <MapPin className='w-5 h-5 text-primary' />
          <span className='text-lg font-medium'>
            {`${venue.address}, ${venue.city}, ${venue.province}`}
          </span>
        </div>
      </div>
    </section>
  );
};
