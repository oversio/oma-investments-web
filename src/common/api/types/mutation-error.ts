import { AxiosError } from "axios";
import { ZodError } from "zod";

export type MutationError<TInput> = AxiosError<unknown, TInput> | ZodError | Error;
