import { ButtonProps } from "@nextui-org/react";

import { Button } from "../button/button";
import { Skeleton } from "../skeleton/skeleton";

export type ButtonAndLabel = ButtonProps & {
  label: string;
};

export interface PanelFooterProps {
  cancelButton?: ButtonAndLabel;
  confirmButton?: ButtonAndLabel;
  isLoading?: boolean;
  onClose?: () => void;
}

export function PanelFooter({ isLoading, confirmButton, cancelButton, onClose }: PanelFooterProps) {
  return (
    <div className=" box-border h-24 flex justify-end items-center p-5 gap-2 border-t border-default-200">
      {cancelButton ? (
        <Button variant="ghost" onClick={onClose} {...cancelButton}>
          {cancelButton.label}
        </Button>
      ) : null}
      {confirmButton &&
        (!isLoading ? (
          <Button color="primary" {...confirmButton}>
            {confirmButton.label}
          </Button>
        ) : (
          <Skeleton className=" h-10 w-24" />
        ))}
    </div>
  );
}
