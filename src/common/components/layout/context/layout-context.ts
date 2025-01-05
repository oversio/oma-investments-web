import { ButtonProps } from "@nextui-org/react";
import { createContext, useContext } from "react";

import { TitleProps } from "../../ui/primitive";

export type NavbarTitleProps = TitleProps & {
  title?: string;
  endContent?: React.ReactNode;
  isLoading?: boolean;
};

interface LayoutContextProps {
  isOpen: boolean;
  isCollapsed: boolean;
  isMobile: boolean;
  navbarTitle?: NavbarTitleProps;
  navbarLeftButton?: Omit<ButtonProps, "size">;
  onOpenChange: () => void;
  setIsCollapsed: (value: boolean) => void;
  onToggle: () => void;
  setNavbarTitle: (titleProps: NavbarTitleProps) => void;
  setNavbarLeftButton: (buttonProps?: Omit<ButtonProps, "size">) => void;
}

export const LayoutContext = createContext<LayoutContextProps>({
  isOpen: false,
  isCollapsed: false,
  isMobile: true,
  onOpenChange: () => { },
  setIsCollapsed: () => { },
  onToggle: () => { },
  setNavbarTitle: () => { },
  setNavbarLeftButton: () => { },
} as LayoutContextProps);

LayoutContext.displayName = "LayoutContext";

export const useLayoutContext = () => useContext(LayoutContext);
