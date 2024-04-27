import {
  Globe,
  Store,
  ShoppingCart,
  FileText,
  MonitorDot,
  UserRound,
  Armchair,
} from "lucide-react";

const menuData: any = [
  {
    label: "menu",
    isTitle: true,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    link: "/",
    icon: <MonitorDot />,
  },
  {
    label: "Cities",
    isTitle: true,
  },
  {
    id: "cities",
    label: "Manage Cities",
    link: "/cities",
    icon: <Globe />,
  },
  {
    label: "Shops",
    isTitle: true,
  },
  {
    id: "shops",
    label: "Manage Shops",
    link: "/shops",
    icon: <Store />,
  },
  {
    label: "Items",
    isTitle: true,
  },
  {
    id: "items",
    label: "Manage Items",
    link: "/items",
    icon: <Armchair />,
  },
  {
    label: "Orders",
    isTitle: true,
  },
  {
    id: "orders",
    label: "Orders",
    icon: <ShoppingCart />,
    link: "/orders",
    parentId: 2,
  },

  {
    label: "Users",
    isTitle: true,
  },
  {
    id: "users",
    label: "Users",
    link: "/users",
    icon: <UserRound />,
    parentId: 2,
  },
];

export { menuData };
