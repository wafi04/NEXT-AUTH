"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react"
import { useState } from "react"
import { VenueForm } from "../form/FormVenues"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Venue } from "@prisma/client"
import { DeleteVenue } from "@/app/(admin)/dashboard/_action/venues"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function HandleOther({venue}  : {venue : Venue}){
    const [openUpdate,setOpenUpdate]  = useState<boolean>(false)
    const {refresh}  = useRouter()
    return (
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={"icon"} className="bg-gray-200 hover:bg-gray-300 rounded-full px-2 py-0 z-10">
                    <Ellipsis className=" text-gray-900"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem  onClick={()  => setOpenUpdate(true)}>
                    Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={async()  => {
                    const deletes = await  DeleteVenue(venue.id)
                    toast.success(deletes)
                    refresh()
                }}> 
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
            {
                openUpdate && (
                    <Dialog open={openUpdate}  onOpenChange={setOpenUpdate}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Update Venue
                                </DialogTitle>
                                <DialogDescription>
                                    Update Data Venues
                                </DialogDescription>
                            </DialogHeader>
                            <VenueForm data={venue}/>
                        </DialogContent>
                    </Dialog>
                )
            }
        </>
    )
}