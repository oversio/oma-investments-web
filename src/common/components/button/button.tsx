import { ButtonProps as BaseButtonProps, Ripple, Spinner, useButton } from "@heroui/react";
import { forwardRef } from "react";

export const Button = forwardRef<HTMLButtonElement | null, BaseButtonProps>((props, ref) => {
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

  return (
    <button ref={domRef} className={styles} {...getButtonProps()}>
      {startContent}
      {isLoading && spinnerPlacement === "start" && spinner}
      {children}
      {isLoading && spinnerPlacement === "end" && spinner}
      {endContent}
      {!disableRipple && <Ripple ripples={ripples} onClear={() => null} />}
    </button>
  );
});

Button.displayName = "LinkButton";
