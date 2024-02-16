import { faTimes } from "@fortawesome/pro-light-svg-icons";
import { ButtonProps } from "@nextui-org/react";
import { TypeOptions } from "react-toastify";

import { CloseButtonProps } from "../../../../../node_modules/react-toastify/dist/components/CloseButton";
import { IconButton } from "../../icon-button/icon-button";

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
    <IconButton
      onClick={closeToast}
      color={getButtonColor(type)}
      icon={faTimes}
      className=" box-border bg-inherit text-inherit"
    />
  );
};
