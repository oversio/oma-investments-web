import { z } from "zod";

import { ApiGetCompanyListItem, getCompanyTransformer } from "../company-list/get-company-list-item";
import { ApiGetDividend, getDividendTransformer } from "./get-dividends";
import { ApiGetRelevantFact, getRelevantFactTransformer } from "./get-relevant-facts";

export const ApiGetCompany = ApiGetCompanyListItem.extend({
  relevantFacts: z.array(ApiGetRelevantFact),
  dividends: z.array(ApiGetDividend),
});

export type ApiGetCompany = z.infer<typeof ApiGetCompany>;

export const GetCompany = ApiGetCompany.transform(({ dividends, relevantFacts, ...data }) => ({
  ...getCompanyTransformer(data),
  dividends: dividends.map(dividend => getDividendTransformer(dividend)),
  relevantFacts: relevantFacts.map(fact => getRelevantFactTransformer(fact)),
}));

export type GetCompany = z.infer<typeof GetCompany>;
