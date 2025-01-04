import { Users, Heart, Calendar, Star } from 'lucide-react';

type StatKey = 'users' | 'clients' | 'events' | 'rating';

interface StatData {
  icon: typeof Users;
  value: number;
  label: string;
  suffix: string;
  countKey: StatKey;
}
export const stats: StatData[] = [
    {
      icon: Users,
      value: 15000,
      label: "Active Users",
      suffix: "+",
      countKey: 'users'
    },
    {
      icon: Heart,
      value: 25000,
      label: "Happy Clients",
      suffix: "+",
      countKey: 'clients'
    },
    {
      icon: Calendar,
      value: 1000,
      label: "Events Hosted",
      suffix: "+",
      countKey: 'events'
    },
    {
      icon: Star,
      value: 4.9,
      label: "Average Rating",
      suffix: "/5",
      countKey: 'rating'
    }
  ];

