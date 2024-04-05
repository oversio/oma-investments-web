import { z } from "zod";

import { DateTime } from "../../../../common/types";

export const ApiGetRelevantFact = z.object({
  _id: z.string(),
  userId: z.string(),
  description: z.string(),
  dateTime: DateTime,
});
export type ApiGetRelevantFact = z.input<typeof ApiGetRelevantFact>;

export function getRelevantFactTransformer<T extends z.infer<typeof ApiGetRelevantFact>>({
  _id,
  ...data
}: T) {
  return {
    ...data,
    id: _id,
  };
}

export const GetRelevantFact = ApiGetRelevantFact.transform(getRelevantFactTransformer);
export type GetRelevantFact = z.infer<typeof GetRelevantFact>;
