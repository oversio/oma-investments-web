import { z, ZodType, ZodTypeDef } from "zod";

export function apiListDataResponse<T, A, D extends ZodTypeDef = ZodTypeDef>(item: ZodType<T, D, A>) {
  return z.object({
    data: z.array(item),
  });
}

export type ApiListDataResponse<T, A, D extends ZodTypeDef = ZodTypeDef> = z.infer<
  ReturnType<typeof apiListDataResponse<T, A, D>>
>;
