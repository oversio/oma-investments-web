import { faArrowLeft, faSidebar } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Navbar as NextUINavbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";

import { Skeleton } from "../../skeleton/skeleton";
import { title as titleStyles } from "../../ui/primitive";
import { useLayoutContext } from "../context/layout-context";
import { UserDropdownMenu } from "./user-dropdown-menu";

export const Navbar = () => {
  const { onOpenChange, navbarTitle, navbarLeftButton } = useLayoutContext();

  const startContent = navbarLeftButton?.startContent ?? <FontAwesomeIcon icon={faArrowLeft} />;

  return (
    <NextUINavbar maxWidth="full" position="sticky" classNames={{ wrapper: "p-0", base: "mb-2" }}>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Button isIconOnly className="sm:hidden" size="sm" variant="flat" onPress={onOpenChange}>
            <FontAwesomeIcon className="text-default-500" icon={faSidebar} />
          </Button>
          {navbarLeftButton ? (
            navbarTitle?.isLoading ? (
              <Skeleton className="size-8 rounded-lg" />
            ) : (
              <Button {...navbarLeftButton} startContent={startContent} isIconOnly size="sm" />
            )
          ) : null}
          <h2
            className={titleStyles({
              size: "sm",
              ...navbarTitle,
            })}
          >
            {navbarTitle?.isLoading ? <Skeleton className="w-96 h-9 rounded-lg" /> : navbarTitle?.title}
          </h2>
          {navbarTitle?.endContent}
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
