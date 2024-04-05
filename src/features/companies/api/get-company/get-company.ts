import { z } from "zod";

import { ApiGetCompanyListItem, getCompanyTransformer } from "../companies-list/get-company-list-item";
import { ApiGetRelevantFact, getRelevantFactTransformer } from "./get-relevant-facts";

export const ApiGetCompany = ApiGetCompanyListItem.extend({
  relevantFacts: z.array(ApiGetRelevantFact),
});

export type ApiGetCompany = z.infer<typeof ApiGetCompany>;

export const GetCompany = ApiGetCompany.transform(({ relevantFacts, ...data }) => ({
  ...getCompanyTransformer(data),
  relevantFacts: relevantFacts.map(fact => getRelevantFactTransformer(fact)),
}));

export type GetCompany = z.infer<typeof GetCompany>;
