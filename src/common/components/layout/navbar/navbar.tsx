import { faSidebar } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Navbar as NextUINavbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";

import { appConfig } from "../../../../app/app-config";
import { useLayoutContext } from "../context/layout-context";
import { UserDropdownMenu } from "./user-dropdown-menu";

export const Navbar = () => {
  const { onOpenChange } = useLayoutContext();
  return (
    <NextUINavbar maxWidth="full" position="sticky" classNames={{ wrapper: "p-0", base: "mb-2" }}>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Button isIconOnly className="sm:hidden" size="sm" variant="flat" onPress={onOpenChange}>
            <FontAwesomeIcon className="text-default-500" icon={faSidebar} />
          </Button>
          <h2 className="text-3xl">{appConfig.name}</h2>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">{/* <ThemeSwitch /> */}</NavbarItem>
        <NavbarItem className="hidden md:flex">
          <UserDropdownMenu />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <UserDropdownMenu />
        {/* <ThemeSwitch /> */}
      </NavbarContent>
    </NextUINavbar>
  );
};
