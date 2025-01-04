import React from 'react';
import { Venue } from "@prisma/client";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar, ExternalLink, Upload, LocateIcon } from "lucide-react";
import { formatDate, formatPrice } from "@/utils/Format";
import { VenueIcon } from "@/utils/FasilityOptions";
import { HandleOther } from "./HandleOther";
import FileUploadDialog from '@/components/ui/uploads/ButtonUploads';
import { Button } from '@/components/ui/button';

export function CardVenues({ data }: { data: Venue }) {
  return (
    <Card className="w-full max-w-md group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardHeader className="space-y-3 p-6">
        <div className="flex flex-col w-full">
            <h3 className="font-semibold text-2xl pr-2 group-hover:text-primary transition-colors">
              {data.name}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {data.city}, {data.province}
              </span>
            </div>
          <HandleOther venue={data} />
          </div>
        {data.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {data.description.slice(0, 100)}
            {data.description.length > 100 && '...'}
          </p>
           
        )}

      </CardHeader>
      <CardContent className="space-y-5 ">
        <div className="space-y-3">
      <h4 className="text-sm font-medium flex items-center space-x-2">
      <LocateIcon className="h-4 w-4" />
        <span className='text-sm'>
          {data.address}
          </span>
        </h4>
          <h4 className="text-sm font-medium flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Available Facilities</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.facilities.map((facility) => (
              <Badge
                key={facility}
                variant="secondary"
                className="flex items-center space-x-1.5 px-3 py-1 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {VenueIcon(facility)}
                <span className="capitalize">{facility.replace('_', ' ')}</span>
              </Badge>
            ))}
          </div>
      
          </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4 px-6">
        <div className="flex justify-between items-center w-full z-10 relative">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Added {formatDate(data.createdAt)}</span>
          </div>
          <FileUploadDialog id={data.id}>
            <Button 
              size="sm" 
              variant="secondary"
              className="hover:bg-primary hover:text-primary-foreground"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </FileUploadDialog>
        </div>

        <div className="flex justify-between items-center w-full border-t border-border/50">
          <span className="text-sm text-muted-foreground">Starting from</span>
          <span className="text-lg font-semibold text-primary">
            {formatPrice(data.price)}/day
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default CardVenues;