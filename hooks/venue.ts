"use client"
import { ActionCreateVenue, ActionUpdateVenue, VenueResponse } from "@/app/(admin)/dashboard/_action/venues";
import { VenueDto, VenueSchema } from "@/validation/venues";
import { zodResolver } from "@hookform/resolvers/zod";
import { Venue } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function UseVenue(venue? : Venue){
const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const {refresh}  = useRouter()
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])

  const form = useForm<VenueDto>({
    resolver: zodResolver(VenueSchema),
    defaultValues: {
      address: venue?.address ?? "",
      city: venue?.city ?? "",
      description: venue?.description ?? "",
      capacity: venue?.capacity ?? 0,
      price: venue?.price ?? 0,
      facilities: venue?.facilities ?? [],
      name: venue?.name ?? "",
      province: venue?.province ?? ""
    }
  })
    const validateStep = async () => {
        let fieldsToValidate: (keyof VenueDto)[] = [];
        
        switch (step) {
          case 1:
            fieldsToValidate = ['name', 'description'];
            break;
          case 2:
            fieldsToValidate = ['address', 'city', 'province'];
            break;
          case 3:
            fieldsToValidate = ['capacity', 'price'];
            break;
        }
    
        const result = await form.trigger(fieldsToValidate);
        return result;
      }
    
      const nextStep = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const isValid = await validateStep();
        if (isValid) {
          setStep(prev => prev + 1);
        }
      }
    
      const prevStep = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); 
        setStep(prev => prev - 1);
      }
      const onSubmit = async (data: VenueDto) => {
        try {
          setIsLoading(true)
          data.facilities = selectedFacilities

          let result : VenueResponse
          venue ?  result = await ActionUpdateVenue(data,venue.id)  : result =  await ActionCreateVenue(data)
          
          if (result.error) {
            toast.error(result.error)
            return
          }
    
          toast.success("Venue created successfully")
          form.reset()
          setStep(1)
          setSelectedFacilities([])
          refresh()
        } catch (error) {
          toast.error("Something went wrong")
        } finally {
          setIsLoading(false)
        }
      }
    
      const toggleFacility = (facility: string) => {
        setSelectedFacilities(prev => 
          prev.includes(facility)
            ? prev.filter(f => f !== facility)
            : [...prev, facility]
        )
        form.setValue('facilities', selectedFacilities)
      }


    return {
        form,
        step,
        selectedFacilities,
        toggleFacility,
        prevStep,
        onSubmit,
        isLoading,
        nextStep
    }
}