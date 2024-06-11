import {
  Bell,
  CircleUser,
  HandCoins,
  Home,
  LineChart,
  Menu,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}
export const sidelinks: SideLink[] = [
  {
    title: "Overview",
    label: "",
    href: "/",
    icon: <Home size={18} />,
  },
  {
    title: "Proposals",
    label: "3",
    href: "/proposals",
    icon: <Package size={18} />,
  },
  {
    title: "Rounds",
    label: "9",
    href: "/rounds",
    icon: <HandCoins size={18} />,
  },
  {
    title: "Delegates",
    label: "",
    href: "/delegates",
    icon: <Users size={18} />,
  },
];
