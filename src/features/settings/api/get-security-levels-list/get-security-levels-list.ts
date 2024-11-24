import { z } from "zod";

import { ID } from "../../../../common/types";

export const ApiGetSecurityLevelItem = z.object({
  _id: ID,
  name: z.string(),
  order: z.string(),
  description: z.string().optional().nullable(),
});

export type ApiGetSecurityLevelItem = z.input<typeof ApiGetSecurityLevelItem>;

export function getSecurityLevelListTransformer<T extends z.infer<typeof ApiGetSecurityLevelItem>>({
  _id,
  ...data
}: T) {
  return {
    ...data,
    order: data.order ?? "9999999",
    id: _id,
  };
}

export const GetSecurityLevelItem = ApiGetSecurityLevelItem.transform(getSecurityLevelListTransformer);
export type GetSecurityLevelItem = z.infer<typeof GetSecurityLevelItem>;
