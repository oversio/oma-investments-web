import { z } from "zod";

import { DateTime } from "../../../../common/types";

export const ApiGetDividendDetailItem = z.object({
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

export type ApiGetDividendDetailItem = z.infer<typeof ApiGetDividendDetailItem>;

export function getDividendDetailItemTransformer<T extends z.infer<typeof ApiGetDividendDetailItem>>({
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

export const GetDividendDetailItem = ApiGetDividendDetailItem.transform(getDividendDetailItemTransformer);
export type GetDividendDetailItem = z.infer<typeof GetDividendDetailItem>;
