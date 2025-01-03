import { AxiosError } from "axios";

import { ApiFileValidationErrorsSchema } from "./api-file-validation-errors-schema";
import { ApiFormValidationErrorsSchema } from "./api-form-validation-errors-schema";

export function parseMutationErrors<TPayload, TData = TPayload>(error: AxiosError<unknown, TPayload>): TData {
  // Form validation errors
  if (error.response && error.response.status === 422)
    throw ApiFormValidationErrorsSchema.parse(error.response.data);

  // File server validation errors
  if (error.response && error.response.status === 412)
    throw ApiFileValidationErrorsSchema.parse(error.response.data);

  // Generic error
  throw error;
}
