import { z, ZodType, ZodTypeDef } from "zod";

import { apiListDataResponse } from "./list-data-response";

export function apiListDataWithPagination<T, A, D extends ZodTypeDef = ZodTypeDef>(item: ZodType<T, D, A>) {
  return apiListDataResponse(item).extend({
    pagination: z.object({
      page: z.number(),
      limit: z.number(),
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
