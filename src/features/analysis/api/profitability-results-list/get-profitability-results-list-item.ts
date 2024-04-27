import { z } from "zod";

import { DateTime, ID } from "../../../../common/types";
import { ApiCalculateProfitability } from "../calculate-profitability/calculate-profitability";

export const ApiGetProfitabilityResultsListItem = ApiCalculateProfitability.extend({
  _id: ID,
  date: DateTime,
  user: z.object({
    _id: ID,
    fullName: z.string(),
    email: z.string().email(),
  }),
  company: z.object({
    _id: ID,
    name: z.string(),
  }),
  years: z.array(
    z.object({
      year: z.number(),
      total: z.number(),
    }),
  ),
});
export type ApiGetProfitabilityResultsListItem = z.infer<typeof ApiGetProfitabilityResultsListItem>;

export function getProfitabilityResultsListTransformer<
  T extends z.infer<typeof ApiGetProfitabilityResultsListItem>,
>({ user, company, results, ...data }: T) {
  const { min, total, average, avgYield, minYield, ...rest } = results;
  return {
    id: data._id,
    user: {
      id: user._id,
      name: user.fullName,
      email: user.email,
    },
    company: {
      id: company._id,
      name: company.name,
    },
    results: {
      ...rest,
      minDividendPaid: min,
      totalDividendPaid: total,
      averageDividendPaid: average,
      averageDividendYield: avgYield,
      minDividendYield: minYield,
    },
    ...data,
  };
}

export const GetProfitabilityResultsListItem = ApiGetProfitabilityResultsListItem.transform(
  getProfitabilityResultsListTransformer,
);
export type GetProfitabilityResultsListItem = z.infer<typeof GetProfitabilityResultsListItem>;
