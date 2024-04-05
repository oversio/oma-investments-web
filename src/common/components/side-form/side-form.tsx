import { useEffect, useState } from "react";
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router";

import { OnSubmitCallback } from "../../types";
import { classMerge } from "../../utils/class-merge";
import { Panel, PanelProps } from "../panel/panel";
import { ButtonAndLabel } from "../panel/panel-footer";

const SIDE_FORM_ID = "side-form-id";

interface SideFormProps<TFieldValues extends FieldValues, TResult> {
  formProps: UseFormReturn<TFieldValues>;
  onSubmit: OnSubmitCallback<TFieldValues, TResult>;
  title: string;
  isLoading?: boolean;
  isError?: boolean;
  children?: React.ReactNode;
  submitButtonProps?: ButtonAndLabel;
  successNavigationPath: string | ((result: TResult) => string);
  cancelNavigationPath?: string;
  size?: PanelProps["size"];
}

export function SideForm<TFieldValues extends FieldValues, TResult = unknown>({
  title,
  formProps,
  onSubmit,
  isLoading,
  children,
  submitButtonProps,
  successNavigationPath,
  cancelNavigationPath,
  size,
}: SideFormProps<TFieldValues, TResult>) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { isSubmitting } = formProps.formState;

  useEffect(() => setIsOpen(true), []);

  const handleSubmit: SubmitHandler<TFieldValues> = async form => {
    const result = await onSubmit(form);
    const successPath =
      typeof successNavigationPath === "function" ? successNavigationPath(result) : successNavigationPath;
    navigate(successPath);
  };

  const handleClose = async () => {
    setIsOpen(false);
    await new Promise(resolve => setTimeout(resolve, 300));
    navigate(cancelNavigationPath ?? "..");
  };

  return (
    <Panel
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={() => void handleClose()}
      placement="right"
      size={size}
      title={title}
      cancelButton={{
        label: "Cancelar",
        disabled: isSubmitting || isLoading,
      }}
      confirmButton={{
        ...submitButtonProps,
        label: submitButtonProps?.label ?? "Guardar",
        color: "primary",
        type: "submit",
        form: SIDE_FORM_ID,
        disabled: submitButtonProps?.disabled,
        className: classMerge("min-w-[100px]", submitButtonProps?.className),
        isLoading: isSubmitting || submitButtonProps?.isLoading,
      }}
    >
      <FormProvider {...formProps}>
        <form
          id={SIDE_FORM_ID}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={formProps.handleSubmit(handleSubmit)}
          className=" flex flex-col max-h-full overflow-y-hidden px-7 py-6"
        >
          {children}
        </form>
      </FormProvider>
    </Panel>
  );
}
