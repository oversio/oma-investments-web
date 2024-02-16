import { ToastContainer as ToastifyToastContainer, TypeOptions } from "react-toastify";

import { CloseButton } from "./close-button";

const typeColorMap = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-yellow-500",
  info: "bg-blue-500",
  default: "bg-gray-500",
};

const getClassName = (type: TypeOptions | undefined) => {
  return (
    (typeColorMap[type ?? "default"] || typeColorMap.default) +
    " text-white border-none relative flex justify-between overflow-hidden rounded-md shadow-lg p-4 mb-2"
  );
};

export function ToastContainer() {
  return (
    <ToastifyToastContainer
      toastClassName={ctx => getClassName(ctx?.type)}
      bodyClassName="text-base font-semibold p-0 m-0"
      hideProgressBar
      icon={false}
      position="top-right"
      theme="dark"
      closeButton={CloseButton}
    />
  );
}
