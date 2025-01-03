import { MapPin, Users, Wifi, Wind, Music, Calendar,ParkingCircleIcon, Utensils, Projector ,} from "lucide-react"

export  const FACILITY_OPTIONS = [
  { value: "wifi", label: "WiFi",icon : Wifi },
  { value: "parking", label: "Parking",icon : ParkingCircleIcon },
  { value: "ac", label: "Air Conditioning", icon : Wind },
  { value: "catering", label: "Catering",icon : Utensils},
  { value: "sound_system", label: "Sound System",icon : Music },
  { value: "projector", label: "Projector",icon : Projector },
] as const

export function VenueIcon( icon: string ) {
  const IconComponent = FACILITY_OPTIONS.find((fas) => fas.value === icon)?.icon
  return IconComponent ? <IconComponent className="size-4" /> : null
}