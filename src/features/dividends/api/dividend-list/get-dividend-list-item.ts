import { z } from "zod";

import { ApiGetDividendDetailItem, getDividendDetailItemTransformer } from "./get-dividend-detail-item";

export const ApiGetDividendListItem = z.object({
  year: z.number(),
  total: z.number(),
  details: z.array(ApiGetDividendDetailItem),
});

export type ApiGetDividendListItem = z.infer<typeof ApiGetDividendListItem>;

export function getDividendListItemTransformer<T extends z.infer<typeof ApiGetDividendListItem>>({
  details,
  ...data
}: T) {
  return {
    id: data.year.toString(),
    ...data,
    dividends: details.map(getDividendDetailItemTransformer),
  };
}

export const GetDividendListItem = ApiGetDividendListItem.transform(getDividendListItemTransformer);
export type GetDividendListItem = z.infer<typeof GetDividendListItem>;
