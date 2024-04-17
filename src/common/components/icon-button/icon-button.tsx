import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonProps } from "@nextui-org/react";
import { forwardRef } from "react";

import { classMerge } from "../../utils/class-merge";

type IconButtonProps = Omit<ButtonProps, "children"> & {
  icon: IconDefinition;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, className, ...props },
  ref,
) {
  return (
    <Button
      ref={ref}
      {...props}
      isIconOnly
      variant="flat"
      className={classMerge(" rounded-full dark:hover:bg-default-100", className)}
    >
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
});
