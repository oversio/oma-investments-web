export interface NavbarLinkItem {
  label: string;
  path: string;
}

export const menuItems: NavbarLinkItem[] = [
  { label: "Dashboard", path: "/" },
  { label: "Companies", path: "/companies" },
  { label: "Settings", path: "/settings" },
];
