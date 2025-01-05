"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
export const ImageGallery = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const nextImage = () =>
    setSelectedImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className='relative w-full space-y-6'>
      <div className='relative h-[600px] w-full overflow-hidden rounded-2xl group'>
        <img
          src={images[selectedImage] || "/api/placeholder/1200/600"}
          alt='Main venue view'
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
        />

        {/* Navigation Buttons */}
        <div className='absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity'>
          <button
            onClick={prevImage}
            className='p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition'>
            <ChevronLeft className='w-6 h-6' />
          </button>
          <button
            onClick={nextImage}
            className='p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition'>
            <ChevronRight className='w-6 h-6' />
          </button>
        </div>

        {/* Image Counter */}
        <div className='absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm'>
          {selectedImage + 1} / {images.length}
        </div>
      </div>

      <div className='flex gap-4 overflow-x-auto pb-2 px-1'>
        {images.map((url, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={`relative h-24 w-32 flex-shrink-0 rounded-xl overflow-hidden transition-all
              ${
                selectedImage === idx
                  ? "ring-4 ring-primary scale-105"
                  : "ring-1 ring-gray-200 hover:ring-primary/50"
              }`}>
            <img
              src={url || "/api/placeholder/128/96"}
              alt={`Thumbnail ${idx + 1}`}
              className='w-full h-full object-cover'
            />
          </button>
        ))}
      </div>
    </div>
  );
};
