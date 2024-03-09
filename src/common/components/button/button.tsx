import { Button as UIButton, ButtonProps } from "@nextui-org/react";
import { forwardRef } from "react";

import { classMerge } from "../../utils/class-merge";

export const Button = forwardRef<HTMLButtonElement | null, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <UIButton ref={ref} {...props} className={classMerge(" flex justify-center items-center", className)}>
        {children}
      </UIButton>
    );
  },
);

Button.displayName = "Button";
