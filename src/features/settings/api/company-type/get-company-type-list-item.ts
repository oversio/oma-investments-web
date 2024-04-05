import { z } from "zod";

import { ApiGetCompanyType } from "../../../companies/api/companies-list/get-company-type";

export const ApiGetCompanyTypeListItem = ApiGetCompanyType.extend({
  description: z.string().optional().nullable(),
  order: z.string().optional().nullable(),
});

export type ApiGetCompanyTypeListItem = z.input<typeof ApiGetCompanyTypeListItem>;

export const GetCompanyTypeListItem = ApiGetCompanyTypeListItem.transform(({ _id, ...data }) => ({
  id: _id,
  name: data.name,
  description: data.description ?? "",
  order: data.order ?? "9999999",
}));

export type GetCompanyTypeListItem = z.infer<typeof GetCompanyTypeListItem>;

export const ApiGetCompanyTypeListRoot = z.array(ApiGetCompanyTypeListItem);
export type ApiGetCompanyTypeListRoot = z.infer<typeof ApiGetCompanyTypeListRoot>;

export const GetCompanyTypeListRoot = ApiGetCompanyTypeListRoot.transform(data =>
  data.map(item => GetCompanyTypeListItem.parse(item)),
);
export type GetCompanyTypeListRoot = z.infer<typeof GetCompanyTypeListRoot>;
