import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  Dropdown as UIDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownProps as UIDropdownProps,
  DropdownTrigger,
  MenuItemProps,
} from "@nextui-org/react";
import { PropsWithChildren, ReactNode } from "react";

type DropdownItemProps = {
  content: ReactNode;
  key: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  color?: MenuItemProps["color"];
  variant?: MenuItemProps["variant"];
  disabled?: boolean;
  startIcon?: IconDefinition;
  endIcon?: IconDefinition;
  description?: string;
  showDivider?: boolean;
};
type DropdownProps = PropsWithChildren<Omit<UIDropdownProps, "children" | "items">> & {
  name: string;
  items: DropdownItemProps[];
};

export function Dropdown({ children, name, items, placement = "bottom-end", ...props }: DropdownProps) {
  return (
    <UIDropdown {...props} placement={placement}>
      <DropdownTrigger>{children}</DropdownTrigger>
      <DropdownMenu variant="flat" aria-label={name}>
        {items.map(({ key, content, onClick, ...itemProps }) => (
          <DropdownItem key={key} textValue={key} onPress={onClick ? onClick : undefined} {...itemProps}>
            {content}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UIDropdown>
  );
}
