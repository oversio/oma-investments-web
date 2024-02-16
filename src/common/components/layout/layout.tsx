import { Outlet } from "react-router";

import { Navbar, NavbarLinkItem } from "../navbar/navbar";

export function Layout() {
  const links: NavbarLinkItem[] = [
    { label: "Dashboard", path: "/" },
    { label: "Companies", path: "/companies" },
    { label: "Settings", path: "/settings" },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Navbar links={links} />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
