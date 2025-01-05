import { HeaderDashboard } from "@/components/layouts/header/HeaderDashboard";
import { VenueImageComponents } from "@/features/venueimage/components/venueImage";

export default function VenueImagePage(){
    return (
       <>
        <HeaderDashboard title="Venue Image"   subTitle=""/>
       <VenueImageComponents />
       </>
    )
}