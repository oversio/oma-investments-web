import { z } from "zod";

import { DateTime } from "../../../../../common/types";

export const ApiGetDividendListItem = z.object({
  _id: z.string(),
  date: DateTime,
  amount: z.number(),
  type: z.object({
    _id: z.string(),
    name: z.string(),
  }),
  user: z.object({
    _id: z.string(),
    fullName: z.string(),
  }),
});

export type ApiGetDividendListItem = z.infer<typeof ApiGetDividendListItem>;

export function getDividendListItemTransformer<T extends z.infer<typeof ApiGetDividendListItem>>({
  _id,
  type,
  user,
  ...data
}: T) {
  return {
    ...data,
    id: _id,
    type: { name: type.name, id: type._id },
    user: { name: user.fullName, id: user._id },
  };
}

export const GetDividendListItem = ApiGetDividendListItem.transform(getDividendListItemTransformer);
export type GetDividendListItem = z.infer<typeof GetDividendListItem>;
