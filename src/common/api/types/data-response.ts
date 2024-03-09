import { z, ZodType, ZodTypeDef } from "zod";

export const ApiDataResponse = z.object({
  data: z.any(),
});
export type ApiDataResponse = z.infer<typeof ApiDataResponse>;

export function apiDataResponse<T, A, D extends ZodTypeDef = ZodTypeDef>(itemType: ZodType<T, D, A>) {
  return ApiDataResponse.transform(data => itemType.parse(data.data));
}

export type DataResponse<T, A, D extends ZodTypeDef = ZodTypeDef> = z.infer<
  ReturnType<typeof apiDataResponse<T, A, D>>
>;
