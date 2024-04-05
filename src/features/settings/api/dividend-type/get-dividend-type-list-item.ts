import { z } from "zod";

import { DateTime } from "../../../../common/types";
import { DividendTypeCode } from "../../types";

export const ApiGetDividendTypeListItem = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  code: z.nativeEnum(DividendTypeCode),
  createdAt: DateTime,
  updatedAt: DateTime,
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

export const GetDividendTypeList = ApiGetDividendTypeList.transform(data => data.map(getDividendTransformer));
export type GetDividendTypeList = z.infer<typeof GetDividendTypeList>;
