import { z, ZodType, ZodTypeDef } from "zod";

import { listOf } from "./list-of";

export function apiListDataWithPagination<T, A, D extends ZodTypeDef = ZodTypeDef>(item: ZodType<T, D, A>) {
  return z.object({
    data: listOf(item),
    pagination: z.object({
      page: z.number(),
      size: z.number(),
      total: z.number(),
    }),
  });
}

export type ListDataPaginatedResponse<T, A, D extends ZodTypeDef = ZodTypeDef> = z.infer<
  ReturnType<typeof apiListDataWithPagination<T, A, D>>
>;
