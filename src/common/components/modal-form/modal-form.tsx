import { Alert, ModalProps } from "@nextui-org/react";
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";

import { MutationError } from "../../api/errors/mutation-error";
import { useServerFormValidationErrors } from "../../api/errors/use-server-form-validation-errors";
import { OnSubmitCallback } from "../../types";
import { classMerge } from "../../utils/class-merge";
import { Modal } from "../modal/modal";
import { ButtonAndLabel } from "../panel/panel";
import { UploadFileErrorAlert } from "../upload-file-error/upload-file-error-alert";

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
  mutationErrors?: MutationError<TFieldValues> | null;
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
  mutationErrors,
}: ModalFormProps<TFieldValues, TResult>) {
  const { isSubmitting } = formProps.formState;

  const handleSubmit: SubmitHandler<TFieldValues> = async form => {
    await onSubmit(form);
    onClose();
  };

  const { generalErrorMessages, fileErrorList } = useServerFormValidationErrors(formProps, mutationErrors);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      placement="top-center"
      size={size}
      header={title}
      isDismissable={false}
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
          {fileErrorList && <UploadFileErrorAlert errors={fileErrorList} />}
          {generalErrorMessages && (
            <Alert color="danger" description={generalErrorMessages} className="mb-4" variant="flat" />
          )}
          {children}
        </form>
      </FormProvider>
    </Modal>
  );
}
