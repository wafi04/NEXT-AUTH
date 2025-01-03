"use client"
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { FACILITY_OPTIONS } from "@/utils/FasilityOptions"
import { UseVenue } from "@/hooks/venue"
import { Venue } from "@prisma/client"

export function VenueForm({data}  : {data? : Venue}) {
  const {form,isLoading,onSubmit,prevStep,nextStep,selectedFacilities,step,toggleFacility}  = UseVenue(data)
  return (
    <>
        <div className="mb-2">
          <div className="flex justify-between mb-2">
            <span>Basic Info</span>
            <span>Location</span>
            <span>Details</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {step === 1 && (
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Venue Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter venue name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter venue description" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Province</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter province" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter capacity" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter price" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>Facilities</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {FACILITY_OPTIONS.map((facility) => (
                      <Button
                        key={facility.value}
                        type="button"
                        variant={selectedFacilities.includes(facility.value) ? "default" : "outline"}
                        className={cn(
                          "flex items-center justify-start space-x-2",
                          selectedFacilities.includes(facility.value) && "bg-primary text-primary-foreground"
                        )}
                        onClick={() => toggleFacility(facility.value)}
                      >
                        <Check
                          className={cn(
                            "h-4 w-4",
                            selectedFacilities.includes(facility.value)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <span>{facility.label}</span>
                      </Button>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              </div>
            )}

            <div className="flex justify-between pt-4">
              {step > 1 && (
                <Button 
                  type="button" 
                  variant="outline"
                  className="w-full"
                  onClick={prevStep}
                >
                  Previous
                </Button>
              )}
              
              {step < 3 ? (
                <Button 
                  type="button"
                  className="ml-auto  w-full"
                  onClick={nextStep}
                >
                  Next
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="ml-auto w-full"
                  disabled={isLoading || step < 3}
                >
                  {isLoading ? "Creating..." : "Create Venue"}
                </Button>
              )}
            </div>
          </form>
        </Form>
    </>
  )
}