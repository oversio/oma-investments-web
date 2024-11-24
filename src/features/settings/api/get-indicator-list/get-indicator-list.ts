import { z } from "zod";

import { ID } from "../../../../common/types";

export const ApiGetIndicatorListItem = z.object({
  _id: ID,
  name: z.string(),
  order: z.string(),
  direction: z.number(),
  description: z.string().optional().nullable(),
});
export type ApiGetIndicatorListItem = z.input<typeof ApiGetIndicatorListItem>;

export function getIndicatorListTransformer<T extends z.infer<typeof ApiGetIndicatorListItem>>({
  _id,
  ...data
}: T) {
  return {
    ...data,
    order: data.order ?? "9999999",
    id: _id,
  };
}

export const GetIndicatorListItem = ApiGetIndicatorListItem.transform(getIndicatorListTransformer);
export type GetIndicatorListItem = z.infer<typeof GetIndicatorListItem>;
