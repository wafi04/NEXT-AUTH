"use client";
import React, { useEffect, useState } from "react";

export const ZoomParallaxBackground = ({ images }: { images: string[] }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const newPosition = window.pageYOffset;
      setScrollPosition(newPosition);

      if (images.length > 1) {
        const scrollHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = newPosition / scrollHeight;
        const newIndex = Math.floor(progress * images.length);
        setCurrentImageIndex(Math.min(newIndex, images.length - 1));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [images.length]);

  const scale = 1 + scrollPosition * 0.0005;
  const opacity = Math.max(0.3, 1 - scrollPosition * 0.002);

  return (
    <div className='fixed inset-0 -z-10 overflow-hidden bg-black'>
      {images.map((url, index) => (
        <div
          key={index}
          className='absolute inset-0 w-full h-screen'
          style={{
            opacity: index === currentImageIndex ? 1 : 0,
            transition: "opacity 800ms ease-in-out",
            backgroundColor: "black",
          }}>
          <div
            className='absolute inset-0 w-full h-full'
            style={{
              backgroundImage: `url(${url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `scale(${scale})`,
              opacity: opacity,
              filter: "brightness(0.7)",
              transition: "transform 300ms ease-out, opacity 800ms ease-in-out",
            }}
          />
          <div
            className='absolute inset-0 bg-gradient-to-b from-black/30 to-black/70'
            style={{
              opacity: 1 - opacity,
              transition: "opacity 800ms ease-in-out",
            }}
          />
        </div>
      ))}
    </div>
  );
};
