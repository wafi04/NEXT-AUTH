import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MoveLeft, MoveRight } from 'lucide-react';
import Image from 'next/image';
import { DialogSearch } from '../../../../components/modals/DialogSearch';

export default function Banner() {
  return (
    <section className="relative min-h-screen max-h-[900px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/banner.jpg"
          alt="Background"
          fill
          priority
          quality={100}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHSIiIx0jKicpIygnKScsLTMzLCw1NyEhNTVBQUFBQUFBQUFBQUFBQUFBQUH/2wBDARUXFyAeIBohHiAoIyIjKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
      </div>

      <div className="relative z-10 flex flex-col h-screen ">
        <div className="text-center flex-1 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 
              className="text-white text-[50px] leading-none"
              style={{ fontFamily: "Anton" }}
            >
              Discover
              <Separator className="w-[250px] h-1" style={{ backgroundColor: 'red' }} />
            </h1>

            <h3
              className="text-transparent text-[100px] tracking-widest leading-none"
              style={{
                fontFamily: "Anton",
                WebkitTextStroke: "2px red"
              }}
            >
              VENUES
            </h3>
              <DialogSearch />
          </div>
        </div>

        <div className="w-full mb-8">
          <div className="flex items-center justify-center gap-3 py-1 container">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/30 border-white/20 backdrop-blur-sm hover:bg-black/40 hover:border-white/40 transition-all duration-300 group shadow-lg"
            >
              <MoveLeft className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-red-600 text-white border-red-500 hover:bg-red-700 hover:scale-105 hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 group"
            >
              <MoveRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Button>

            <Separator className="w-[800px] ml-10" />
          </div>
        </div>
      </div>
    </section>
  );
}