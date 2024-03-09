import { KeyboardEvent } from "react";

import { classMerge } from "../../utils/class-merge";

const sizeMap = {
  sm: "sm:w-64 w-full",
  md: "sm:w-80 w-full",
  lg: "sm:w-96 w-full",
};

export interface DrawerProps {
  placement?: "left" | "right";
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  size?: "sm" | "md" | "lg";
  allowClickOutsideToClose?: boolean;
}

export function Drawer({
  placement = "right",
  isOpen,
  onClose,
  children,
  className,
  containerClassName,
  size = "md",
  allowClickOutsideToClose = true,
}: DrawerProps) {
  const rightStyles = !isOpen ? "right-0 translate-x-full" : "right-0 translate-x-0";
  const leftStyles = !isOpen ? "left-0 -translate-x-full" : "left-0 translate-x-0";

  const handleClose = () => allowClickOutsideToClose && onClose();
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => e.key === "Escape" && handleClose();

  return (
    <div className={isOpen ? "h-screen w-screen fixed top-0 right-0 z-[41]" : ""}>
      <div
        className="absolute top-0 right-0 left-0 bottom-0"
        onClick={handleClose}
        onKeyDownCapture={onKeyDown}
      />
      <div
        onKeyDownCapture={onKeyDown}
        className={classMerge(
          "fixed top-0 z-50 h-full transition-all duration-500 transform translate-x-full bg-gray-900 shadow-lg",
          sizeMap[size],
          placement === "right" ? rightStyles + " rounded-l-lg" : leftStyles + " rounded-r-lg",
          className,
        )}
      >
        <div className={classMerge(" flex flex-col h-screen", containerClassName)}>{children}</div>
      </div>
    </div>
  );
}
