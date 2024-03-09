import { z, ZodType, ZodTypeDef } from "zod";

export function apiListDataWithPagination<T, A, D extends ZodTypeDef = ZodTypeDef>(item: ZodType<T, D, A>) {
  return z.object({
    data: z.array(item),
    pagination: z.object({
      page: z.number(),
      size: z.number(),
      total: z.number(),
    }),
  });
}

export type ApiListDataPaginatedResponse<T, A, D extends ZodTypeDef = ZodTypeDef> = z.infer<
  ReturnType<typeof apiListDataWithPagination<T, A, D>>
>;

export type ListDataPaginatedResponse<T, A, D extends ZodTypeDef = ZodTypeDef> = z.infer<
  ReturnType<typeof apiListDataWithPagination<T, A, D>>
>;
