import { z } from "zod";

import { HowGoodIsIt, ID } from "../../../../common/types";

export const ApiGetSolvencyIndicatorItem = z.object({
  indicatorId: ID,
  value: z.number(),
  min: z.number(),
  max: z.number(),
  result: z.nativeEnum(HowGoodIsIt),
});

export type ApiGetSolvencyIndicatorItem = z.infer<typeof ApiGetSolvencyIndicatorItem>;

export function getSolvencyIndicatorItemTransformer<T extends z.infer<typeof ApiGetSolvencyIndicatorItem>>({
  indicatorId,
  ...data
}: T) {
  return {
    ...data,
    id: indicatorId,
  };
}

export const GetSolvencyIndicatorItem = ApiGetSolvencyIndicatorItem.transform(
  getSolvencyIndicatorItemTransformer,
);
export type GetSolvencyIndicatorItem = z.infer<typeof GetSolvencyIndicatorItem>;
