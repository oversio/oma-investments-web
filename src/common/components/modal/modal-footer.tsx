import { ModalFooter as ModalFooterUI } from "@nextui-org/react";

import { Button } from "../button/button";
import { ButtonAndLabel } from "../panel/panel-footer";
import { Skeleton } from "../skeleton/skeleton";

export interface ModalFooterProps {
  cancelButton?: ButtonAndLabel;
  confirmButton?: ButtonAndLabel;
  isLoading?: boolean;
  onClose?: () => void;
}

export function ModalFooter({ isLoading, confirmButton, cancelButton, onClose }: ModalFooterProps) {
  return (
    <ModalFooterUI>
      {cancelButton ? (
        <Button variant="flat" type="button" onPress={onClose} {...cancelButton}>
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
    </ModalFooterUI>
  );
}
