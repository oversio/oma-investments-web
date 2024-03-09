import { z } from "zod";

export const ApiGetDividendTypeListItem = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  order: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ApiGetDividendTypeListItem = z.input<typeof ApiGetDividendTypeListItem>;

export function getDividendTransformer<T extends z.infer<typeof ApiGetDividendTypeListItem>>({
  _id,
  ...data
}: T) {
  return {
    ...data,
    id: _id,
  };
}

export const GetDividendTypeListItem = ApiGetDividendTypeListItem.transform(getDividendTransformer);
export type GetDividendTypeListItem = z.infer<typeof GetDividendTypeListItem>;

export const ApiGetDividendTypeList = z.array(ApiGetDividendTypeListItem);
export type ApiGetDividendTypeList = z.infer<typeof ApiGetDividendTypeList>;

export const GetDividendTypeList = ApiGetDividendTypeList.transform(data =>
  data.map(item => GetDividendTypeListItem.parse(item)),
);
export type GetDividendTypeList = z.infer<typeof GetDividendTypeList>;
