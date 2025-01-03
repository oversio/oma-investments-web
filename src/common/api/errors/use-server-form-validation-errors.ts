import { useEffect } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { isFileValidationErrors, isValidationErrors, MutationError } from "./mutation-error";

export const useServerFormValidationErrors = <TFieldValues extends FieldValues>(
  formProps: UseFormReturn<TFieldValues>,
  errors: MutationError<TFieldValues> | null | undefined,
) => {
  useEffect(() => {
    if (isValidationErrors(errors) && errors.hasFieldErrors()) {
      for (const key of errors.fieldsWithErrors) {
        const fieldName = key as Path<TFieldValues>;
        formProps.setError(fieldName, {
          type: "manual",
          message: errors.fieldErrorsMessage(fieldName),
        });
      }
    }
  }, [formProps, errors]);

  return {
    generalErrorMessages:
      isValidationErrors(errors) && errors.hasGeneralErrors ? errors.generalErrorsMessage : undefined,
    fileErrorList: isFileValidationErrors(errors) ? errors.getRowErrors() : undefined,
  };
};
