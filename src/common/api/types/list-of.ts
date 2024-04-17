import { z, ZodType, ZodTypeDef } from "zod";

export function listOf<T, A, D extends ZodTypeDef = ZodTypeDef>(itemType: ZodType<T, D, A>) {
  return z.array(itemType);
}
