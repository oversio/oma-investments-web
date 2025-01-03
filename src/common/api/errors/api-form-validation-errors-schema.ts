import { z } from "zod";

import { ValidationErrors } from "./validation-errors";

export const ApiFormValidationErrorsSchema = z
  .object({
    errors: z
      .array(
        z.object({
          errorCode: z.number().int().positive(),
          errorMessage: z.string(),
          fieldName: z.string().optional(),
        }),
      )
      .min(1),
  })
  .transform(apiErrors => {
    const errors = new ValidationErrors();

    apiErrors.errors.forEach(({ errorCode, errorMessage, fieldName }) => {
      if (fieldName) {
        errors.addFieldError(fieldName, errorCode, errorMessage);
      } else {
        errors.addGeneralError(errorCode, errorMessage);
      }
    });

    return errors;
  });

export type ApiFormValidationErrorsSchema = z.infer<typeof ApiFormValidationErrorsSchema>;
