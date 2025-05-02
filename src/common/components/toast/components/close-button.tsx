import { faTimes } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ButtonProps } from "@heroui/react";
import { TypeOptions } from "react-toastify";

import { CloseButtonProps } from "../../../../../node_modules/react-toastify/dist/components/CloseButton";
import { Button } from "../../button/button";

const colorMap: Record<TypeOptions, ButtonProps["color"]> = {
  info: "secondary",
  success: "success",
  warning: "warning",
  error: "danger",
  default: "default",
};
const getButtonColor = (type: TypeOptions): ButtonProps["color"] => colorMap[type];

export const CloseButton = ({ closeToast, type }: CloseButtonProps) => {
  return (
    <Button
      onPress={e => closeToast(e as unknown as React.MouseEvent<HTMLButtonElement>)}
      color={getButtonColor(type)}
      startContent={<FontAwesomeIcon icon={faTimes} />}
      className="rounded-full"
      size="sm"
      isIconOnly
      variant="flat"
    />
  );
};
