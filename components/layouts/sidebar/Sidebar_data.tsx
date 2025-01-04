import { 
  Home,
  Building2,
  CalendarCheck,
  Wallet,
  User,
  Bell,
  Upload
} from "lucide-react";

export const menuItems = [
  {
    icon: Home,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: Building2,
    label: "Venues",
    path: "/dashboard/venues",
  },
  {
    icon: Upload,
    label: "Uploads",
    path: "/dashboard/uploads",
  },
  {
    icon: CalendarCheck,
    label: "Bookings",
    path: "/dashboard/bookings",
  },
  {
    icon: Wallet,
    label: "Payment",
    path: "/dashboard/payment",
  },
  {
    icon: Bell,
    label: "Notifications",
    path: "/dashboard/notifications",
  },
  {
    icon: User,
    label: "Profile",
    path: "/dashboard/profile",
  }
];

