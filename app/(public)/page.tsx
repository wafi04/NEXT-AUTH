import { ActionGetVenueWithImage } from "../(admin)/dashboard/_action/venues";
import  Banner  from "./(home)/components/Banner";
import VenuesFeatured from "./(home)/components/FeaturedVenues";
import ParallaxDesign from "./(home)/components/ParallaxDesign";

export default async function Home(){
  const {data} = await ActionGetVenueWithImage()
  console.log(data)
  return (
    <>
        <Banner />
        {
          data && (
            <VenuesFeatured data={data}/>
          )
        }
        <ParallaxDesign />
    </>
  )
}