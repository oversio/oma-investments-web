import { ButtonProps as BaseButtonProps, Ripple, Spinner, useButton } from "@nextui-org/react";
import { forwardRef } from "react";
import { Link } from "react-router-dom";

export interface ButtonProps extends BaseButtonProps {
  to: string;
}

export const LinkButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    domRef,
    children,
    spinnerSize,
    styles,
    spinner = <Spinner color="current" size={spinnerSize} />,
    spinnerPlacement,
    startContent,
    endContent,
    isLoading,
    disableRipple,
    getButtonProps,
    getRippleProps,
  } = useButton({
    ref,
    ...props,
  });

  const { ripples } = getRippleProps();

  // Remove default onClick from NextUI button props since it's causing full page rendering
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onClick: _, ...btnProps } = getButtonProps();

  return (
    <Link ref={domRef} className={styles} {...btnProps} to={props.to}>
      {startContent}
      {isLoading && spinnerPlacement === "start" && spinner}
      {children}
      {isLoading && spinnerPlacement === "end" && spinner}
      {endContent}
      {!disableRipple && <Ripple ripples={ripples} onClear={() => null} />}
    </Link>
  );
});

LinkButton.displayName = "LinkButton";
