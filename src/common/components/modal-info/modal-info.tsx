import { Modal, ModalProps } from "../modal/modal";
import { ModalFooterProps } from "../modal/modal-footer";

type ModalInfoProps = ModalFooterProps & {
  isOpen: boolean;
  title: React.ReactNode;
  children: React.ReactNode;
  size?: ModalProps["size"];
};
export function ModalInfo({
  isOpen,
  title,
  children,
  onClose,
  size = "sm",
  confirmButton,
  cancelButton,
}: ModalInfoProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="top-center"
      size={size}
      header={title}
      isDismissable={true}
      backdrop="blur"
      isKeyboardDismissDisabled
      confirmButton={confirmButton}
      cancelButton={cancelButton}
    >
      {children}
    </Modal>
  );
}
