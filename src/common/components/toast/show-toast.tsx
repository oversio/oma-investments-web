import { ReactNode } from "react";
import { toast, TypeOptions } from "react-toastify";

import { ToastContent } from "./components/toast-content";

interface ShowToastOptions {
  autoClose?: boolean;
}

const AUTO_CLOSE_DEFAULT = 5000;

export const showToast = (type: TypeOptions, message: ReactNode, { autoClose }: ShowToastOptions = {}) => {
  toast(<ToastContent message={message} />, {
    autoClose: autoClose
      ? AUTO_CLOSE_DEFAULT
      : autoClose === false || type === "error"
        ? false
        : AUTO_CLOSE_DEFAULT,
    type,
  });
};
