import { ZodType, ZodTypeDef } from "zod";

import { logError } from "../logger/log-error";

export function decodeJwtToken<TData = unknown, Def extends ZodTypeDef = ZodTypeDef>(
  token: string,
  type?: ZodType<TData, Def, unknown>,
) {
  try {
    const payload = token.split(".")[1];
    const parsedPayload = JSON.parse(atob(payload)) as TData;
    return type ? type.parse(parsedPayload) : parsedPayload;
  } catch (error) {
    throw logError(error);
  }
}
