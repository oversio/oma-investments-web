import { faDisplayChartUpCircleDollar, faHouse } from "@fortawesome/pro-light-svg-icons";

import { type SidebarItem } from "./sidebar";

export const items: SidebarItem[] = [
  {
    key: "dashboard",
    to: "/",
    icon: faHouse,
    title: "Dashboard",
  },
  {
    key: "companies",
    to: "/companies",
    icon: faDisplayChartUpCircleDollar,
    title: "Empresas",
  },
];
