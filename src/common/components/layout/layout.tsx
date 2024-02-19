import { Navigate, Outlet } from "react-router";

import { useAuthContext } from "../../../context/context";
import { Navbar, NavbarLinkItem } from "../navbar/navbar";
import { LoadingPageState } from "./loading-page-state";

export function Layout() {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated === null) {
    return <LoadingPageState />;
  }

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

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
