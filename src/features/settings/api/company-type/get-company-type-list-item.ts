import { z } from "zod";

import { ApiGetCompanyType } from "../../../companies/api/companies-list/get-company-type";

export const ApiGetCompanyTypeListItem = ApiGetCompanyType.extend({
  description: z.string().optional().nullable(),
  order: z.string().optional().nullable(),
});

export type ApiGetCompanyTypeListItem = z.input<typeof ApiGetCompanyTypeListItem>;

export function getCompanyTypeListItemTransformer<T extends z.infer<typeof ApiGetCompanyTypeListItem>>({
  _id,
  ...data
}: T) {
  return {
    ...data,
    description: data.description ?? "",
    order: data.order ?? "9999999",
    id: _id,
  };
}

export const GetCompanyTypeListItem = ApiGetCompanyTypeListItem.transform(getCompanyTypeListItemTransformer);

export type GetCompanyTypeListItem = z.infer<typeof GetCompanyTypeListItem>;
