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
      min: data.minDividendPaid,
      total: data.totalDividendPaid,
      average: data.averageDividendPaid,
      avgYield: data.averageDividendYield,
      minYield: data.minDividendYield,
      slope: data.slope,
      risingDividend: data.risingDividend,
      idealPrice: data.idealPrice,
      dividendEveryYear: data.dividendEveryYear,
      goodDividend: data.goodDividend,
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
