import { ModalProps } from "@nextui-org/react";
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";

import { OnSubmitCallback } from "../../types";
import { classMerge } from "../../utils/class-merge";
import { Modal } from "../modal/modal";
import { ButtonAndLabel } from "../panel/panel-footer";

const MODAL_FORM_ID = "modal-form-id";

interface ModalFormProps<TFieldValues extends FieldValues, TResult> {
  formProps: UseFormReturn<TFieldValues>;
  onSubmit: OnSubmitCallback<TFieldValues, TResult>;
  onClose: () => void;
  isOpen: boolean;
  title: string;
  isLoading?: boolean;
  isError?: boolean;
  children?: React.ReactNode;
  submitButtonProps?: ButtonAndLabel;
  cancelButtonProps?: ButtonAndLabel;
  size?: ModalProps["size"];
  formClassName?: string;
}

export function ModalForm<TFieldValues extends FieldValues, TResult = unknown>({
  title,
  formProps,
  onSubmit,
  onClose,
  isOpen,
  isLoading,
  children,
  submitButtonProps,
  cancelButtonProps,
  size,
  formClassName,
}: ModalFormProps<TFieldValues, TResult>) {
  const { isSubmitting } = formProps.formState;

  const handleSubmit: SubmitHandler<TFieldValues> = async form => {
    await onSubmit(form);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      placement="top-center"
      size={size}
      header={title}
      isDismissable={false}
      backdrop="blur"
      isKeyboardDismissDisabled={true}
      cancelButton={{
        label: cancelButtonProps?.label ?? "Cancelar",
        isDisabled: isSubmitting || isLoading || cancelButtonProps?.disabled,
        className: cancelButtonProps?.className,
      }}
      confirmButton={{
        ...submitButtonProps,
        label: submitButtonProps?.label ?? "Guardar",
        color: "primary",
        type: "submit",
        form: MODAL_FORM_ID,
        isDisabled: isSubmitting || submitButtonProps?.disabled,
        className: classMerge("min-w-[100px]", submitButtonProps?.className),
        isLoading: isSubmitting || submitButtonProps?.isLoading,
      }}
    >
      <FormProvider {...formProps}>
        <form
          id={MODAL_FORM_ID}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={formProps.handleSubmit(handleSubmit)}
          className={classMerge(" flex flex-col max-h-full overflow-y-hidden gap-4", formClassName)}
        >
          {children}
        </form>
      </FormProvider>
    </Modal>
  );
}
