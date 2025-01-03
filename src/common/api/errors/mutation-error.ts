import { AxiosError } from "axios";
import { ZodError } from "zod";

import { FileValidationErrors } from "./file-validation-errors";
import { ValidationErrors } from "./validation-errors";

export type MutationError<TInput> =
  | AxiosError<unknown, TInput>
  | ZodError
  | Error
  | ValidationErrors
  | FileValidationErrors;

export function isValidationErrors<TInput>(
  error: MutationError<TInput> | null | undefined,
): error is ValidationErrors {
  return error instanceof ValidationErrors;
}

export function isFileValidationErrors<TInput>(
  error: MutationError<TInput> | null | undefined,
): error is FileValidationErrors {
  return error instanceof FileValidationErrors;
}
