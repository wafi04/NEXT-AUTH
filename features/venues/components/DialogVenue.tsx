import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode } from "react";
import { VenueForm } from "../form/FormVenues";

export function DialogVenue({children}  : {children : ReactNode}){
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                    <DialogHeader>
                <DialogTitle>
                        Create Venues
                </DialogTitle>
                    <DialogDescription>
                            Venues create data
                        </DialogDescription>
                    </DialogHeader>
                <VenueForm />
            </DialogContent>
        </Dialog>
    )
}