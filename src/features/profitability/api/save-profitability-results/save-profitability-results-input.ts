import { ID } from "../../../../common/types";
import {
  ApiCalculateProfitability,
  CalculateProfitability,
} from "../calculate-profitability/calculate-profitability";

export type SaveProfitabilityResultsInput = CalculateProfitability & {
  companyId: ID;
};

export function saveProfitabilityResultsInputTransformer(
  data: SaveProfitabilityResultsInput,
): ApiSaveProfitabilityResultsInput {
  return {
    companyId: data.companyId,
    results: {
      min: data.results.minDividendPaid,
      total: data.results.totalDividendPaid,
      average: data.results.averageDividendPaid,
      avgYield: data.results.averageDividendYield,
      minYield: data.results.minDividendYield,
      slope: data.results.slope,
      risingDividend: data.results.risingDividend,
      idealPrice: data.results.idealPrice,
      dividendEveryYear: data.results.dividendEveryYear,
      goodDividend: data.results.goodDividend,
    },
    years: data.years,
    params: data.params,
  };
}

export type ApiSaveProfitabilityResultsInput = Omit<ApiCalculateProfitability, "years"> & {
  companyId: string;
  years: Array<{
    year: number;
    total: number;
  }>;
};
