import { z } from "zod";

import { DateTime } from "../../../../common/types";
import { ApiGetCompanyType } from "./get-company-type";

export const ApiGetCompanyListItem = z.object({
  _id: z.string(),
  name: z.string(),
  mnemonic: z.string().toUpperCase(),
  description: z.string().nullable(),
  type: ApiGetCompanyType,
  isActive: z.boolean(),
  createdAt: DateTime,
  updatedAt: DateTime,
});

export type ApiGetCompanyListItem = z.input<typeof ApiGetCompanyListItem>;

export function getCompanyTransformer<T extends z.infer<typeof ApiGetCompanyListItem>>({ _id, ...data }: T) {
  return {
    ...data,
    id: _id,
  };
}

export const GetCompanyListItem = ApiGetCompanyListItem.transform(getCompanyTransformer);
export type GetCompanyListItem = z.infer<typeof GetCompanyListItem>;
