import { HeaderDashboard } from "@/components/layouts/header/HeaderDashboard";
import { Button } from "@/components/ui/button";
import { DialogVenue } from "@/features/venues/components/DialogVenue";
import { ActionGetVenue } from "../_action/venues";
import { CardVenues } from "@/features/venues/components/CardVenues";

export default async  function Page(){
    const data  = await ActionGetVenue()
    console.log(data)
    return (
        <>
            <HeaderDashboard  title="Venues"  subTitle="Manage your Venues">
                <DialogVenue>
                    <Button>
                        Create
                    </Button>
                </DialogVenue>
            </HeaderDashboard>
            <section className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4 mt-[25px]">
            {
                data.map((item)  => (
                    <CardVenues data={item} key={item.id}/>
                ))
            }
            </section>
        </>
    )
}