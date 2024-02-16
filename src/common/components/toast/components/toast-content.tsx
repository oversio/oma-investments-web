import { ReactNode } from "react";

interface ToastContentProps {
  message: ReactNode;
}

export function ToastContent({ message }: ToastContentProps) {
  return (
    <div className=" flex h-2 pl-4 py-[14px] gap-[10px] box-border items-center">
      <p className=" text-base font-semibold text-inherit">{message}</p>
    </div>
  );
}
