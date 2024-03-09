import { z } from "zod";

import { DateTime } from "../../../../common/types";

export const ApiGetDividend = z.object({
  date: DateTime,
  amount: z.number(),
  userId: z.string(),
  _id: z.string(),
});
export type ApiGetDividend = z.infer<typeof ApiGetDividend>;

export function getDividendTransformer<T extends z.infer<typeof ApiGetDividend>>({ _id, ...data }: T) {
  return {
    ...data,
    id: _id,
  };
}

export const GetDividend = ApiGetDividend.transform(getDividendTransformer);
export type GetDividend = z.infer<typeof GetDividend>;
