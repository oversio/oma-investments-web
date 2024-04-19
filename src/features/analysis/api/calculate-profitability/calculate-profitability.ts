import { z } from "zod";

import { GoodLevelResult } from "../../types";
import { ApiCalculateProfitabilityInput } from "./calculate-profitability-input";

export const ApiCalculateProfitability = z.object({
  results: z.object({
    min: z.number(),
    total: z.number(),
    average: z.number(),
    avgYield: z.number(),
    minYield: z.number(),
    slope: z.number(),
    risingDividend: z.nativeEnum(GoodLevelResult),
    idealPrice: z.number(),
    dividendEveryYear: z.boolean(),
    goodDividend: z.nativeEnum(GoodLevelResult),
  }),
  years: z.array(
    z.object({
      _id: z.number(),
      total: z.number(),
    }),
  ),
  params: ApiCalculateProfitabilityInput,
});
export type ApiCalculateProfitability = z.infer<typeof ApiCalculateProfitability>;

export function calculateProfitabilityTransformer<T extends z.infer<typeof ApiCalculateProfitability>>(
  data: T,
) {
  const { min, total, average, avgYield, minYield, ...rest } = data.results;
  return {
    ...rest,
    minDividendPaid: min,
    totalDividendPaid: total,
    averageDividendPaid: average,
    averageDividendYield: avgYield,
    minDividendYield: minYield,
    years: data.years.map(year => ({
      year: year._id,
      total: year.total,
    })),
    params: data.params,
  };
}

export const CalculateProfitability = ApiCalculateProfitability.transform(calculateProfitabilityTransformer);
export type CalculateProfitability = z.infer<typeof CalculateProfitability>;
