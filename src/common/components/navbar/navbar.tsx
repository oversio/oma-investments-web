import {
  Navbar as NUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { menuItems } from "../../config/menu-item";
import { useLinkActive } from "../../hooks/use-link-active";
import { classMerge } from "../../utils/class-merge";
import { NavbarLink } from "./navbar-link";
import { UserDropdownMenu } from "./user-dropdown-menu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const checkPath = useLinkActive();

  return (
    <NUINavbar onMenuOpenChange={setIsMenuOpen} isBordered maxWidth="full">
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
        <NavbarBrand>
          <p className="font-bold text-inherit">Finance</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map(link => (
          <NavbarLink key={link.path} label={link.label} path={link.path} />
        ))}
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <UserDropdownMenu />
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map(link => (
          <NavbarMenuItem key={link.path}>
            <Link
              className={classMerge(" w-full", checkPath(link.path) ? " text-blue-600" : "")}
              to={link.path}
            >
              {link.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NUINavbar>
  );
}
