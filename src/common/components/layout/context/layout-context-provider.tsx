import { ButtonProps, useDisclosure } from "@nextui-org/react";
import { useCallback, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { useLocalStorage } from "../../../hooks/use-local-storage";
import { LayoutContext, NavbarTitleProps } from "./layout-context";

const SIDEBAR_COLLAPSED_KEY = "sidebar-collapsed";

export function LayoutContextProvider({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpenChange } = useDisclosure();
  const [isCollapsed, setIsCollapsed] = useLocalStorage(SIDEBAR_COLLAPSED_KEY, false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [navbarLeftButton, setNavbarLeftButton] = useState<Omit<ButtonProps, "size">>();
  const [navbarTitle, setNavbarTitle] = useState<NavbarTitleProps>();

  const onToggle = useCallback(() => {
    setIsCollapsed(prev => !prev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCollapsed]);

  return (
    <LayoutContext.Provider
      value={{
        isOpen,
        isCollapsed,
        isMobile,
        navbarTitle,
        onOpenChange,
        setIsCollapsed,
        onToggle,
        setNavbarTitle,
        navbarLeftButton,
        setNavbarLeftButton,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
