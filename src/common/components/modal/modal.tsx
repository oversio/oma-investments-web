import {
  Modal as ModalUI,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalProps as ModalUIProps,
} from "@nextui-org/react";
import { ReactNode } from "react";

import { ModalFooter, ModalFooterProps } from "./modal-footer";

export type ModalProps = Pick<
  ModalUIProps,
  "placement" | "size" | "backdrop" | "isDismissable" | "isKeyboardDismissDisabled"
> &
  ModalFooterProps & {
    isOpen: boolean;
    header?: ReactNode;
    children: ReactNode;
  };

export function Modal({
  isOpen,
  onClose,
  header,
  children,
  isLoading,
  cancelButton,
  confirmButton,
  isDismissable,
  isKeyboardDismissDisabled,
  placement = "top-center",
  size,
  backdrop = "blur",
}: ModalProps) {
  const handleCloseModal = (open: boolean) => !open && onClose?.();

  return (
    <ModalUI
      isOpen={isOpen}
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      onOpenChange={handleCloseModal}
      placement={placement}
      size={size}
      backdrop={backdrop}
      scrollBehavior="inside"
    >
      <ModalContent>
        {closeModal => (
          <>
            <ModalHeader className="flex flex-col gap-1">{header}</ModalHeader>

            <ModalBody>{children}</ModalBody>

            <ModalFooter
              onClose={closeModal}
              isLoading={isLoading}
              cancelButton={cancelButton}
              confirmButton={confirmButton}
            />
          </>
        )}
      </ModalContent>
    </ModalUI>
  );
}
