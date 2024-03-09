import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button as UIButton, ButtonProps as UIButtonProps } from "@nextui-org/react";

import { classMerge } from "../../utils/class-merge";

export interface ButtonProps extends UIButtonProps {
  icon?: IconDefinition;
  iconClassName?: string;
}

export function Button({ icon, iconClassName, className, children, ...props }: ButtonProps) {
  return (
    <UIButton {...props} className={classMerge(" flex justify-center items-center", className)}>
      {icon ? <FontAwesomeIcon icon={icon} className={classMerge("", iconClassName)} /> : null}
      {children}
    </UIButton>
  );
}
