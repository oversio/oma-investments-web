import {
  Link,
  Navbar as NUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useState } from "react";

import { useLinkActive } from "../../hooks/use-link-active";
import { NavbarLink } from "./navbar-link";
import { UserDropdownMenu } from "./user-dropdown-menu";

export interface NavbarLinkItem {
  label: string;
  path: string;
}
interface NavbarProps {
  links: NavbarLinkItem[];
}

export function Navbar({ links }: NavbarProps) {
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
        {links.map(link => (
          <NavbarLink key={link.path} label={link.label} path={link.path} />
        ))}
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <UserDropdownMenu />
      </NavbarContent>
      <NavbarMenu>
        {links.map(link => (
          <NavbarMenuItem key={link.path}>
            <Link
              color={checkPath(link.path) ? undefined : "foreground"}
              className="w-full"
              href={link.path}
              size="lg"
            >
              {link.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NUINavbar>
  );
}
