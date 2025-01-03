import { z } from "zod";

import { FileValidationErrors } from "./file-validation-errors";

export const ApiFileValidationErrorsSchema = z
  .object({
    errors: z
      .array(
        z
          .object({
            line: z.number().int().positive(),
            errors: z.array(
              z.object({
                code: z.string(),
                message: z.string(),
                property: z.string(),
              }),
            ),
          })
          .passthrough(),
      )
      .min(1),
  })
  .transform(apiErrors => new FileValidationErrors(apiErrors.errors));

export type ApiFileValidationErrorsSchema = z.infer<typeof ApiFileValidationErrorsSchema>;
