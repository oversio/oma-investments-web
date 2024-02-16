import { z } from "zod";

export const ApiGetCompanyType = z.object({
  _id: z.string(),
  name: z.string(),
});

export type ApiGetCompanyType = z.input<typeof ApiGetCompanyType>;

export function getCompanyTypeTransformer<T extends z.infer<typeof ApiGetCompanyType>>({ _id, ...data }: T) {
  return {
    ...data,
    id: _id,
  };
}

export const GetCompanyType = ApiGetCompanyType.transform(getCompanyTypeTransformer);
export type GetCompanyType = z.infer<typeof GetCompanyType>;
