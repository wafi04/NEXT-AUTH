"use client"
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Search, MapPin, Calendar,X} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useState } from "react";
  
export function DialogSearch(){
  const [open,setOpen]  = useState(false)
    return (
        <div className="relative mt-5">
        <Popover onOpenChange={(open)  => setOpen(open)}>
          <PopoverTrigger asChild>
            <Button 
              className="bg-gradient-to-r from-red-600 to-red-700 tracking-widest rounded-3xl hover:from-red-700 hover:to-red-800 text-white p-6 group shadow-lg hover:shadow-red-600/50 transition-all duration-300"
              style={{ fontFamily: "Anton" }}
            >
            {open ? (
              <>
              Close
              <X />
              </>
            ) : (
              <>
              TO BEGIN
              <Search className="ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )} 
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[800px] p-0 bg-transparent border-none shadow-2xl">
            <div className="bg-black/80 backdrop-blur-md p-2 rounded-xl border border-white/10">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                    <Input 
                      placeholder="Search venues..."
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-12 h-12 text-lg"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                    <Input 
                      type="date"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-12 h-12 text-lg"
                    />
                  </div>
                <Button className="rounded-full bg-red-600 hover:bg-red-700 text-white h-12 text-lg tracking-wide font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50">
                  <Search />
                </Button>
                </div>
                
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    )
}