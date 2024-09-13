import { faChartMixedUpCircleDollar, faHandsHoldingDollar } from "@fortawesome/pro-light-svg-icons";
import { useMemo } from "react";

import { ArrowDownIcon } from "../../../common/components/icons/arrow-down-icon";
import { ArrowUpIcon } from "../../../common/components/icons/arrow-up-icon";
import { IndicatorWidgetProps } from "../../../common/components/widget/indicator-widget";
import { CalculateProfitability } from "../api/calculate-profitability/calculate-profitability";
import { ProfitabilityAnalysisFormSchema } from "../features/profitability-analysis/form-schemas/profitability-analysis-form-schema";

export interface IndicatorDataProps {
  params: ProfitabilityAnalysisFormSchema | undefined;
  results: CalculateProfitability["results"] | undefined;
  isLoading: boolean;
}

export function useProfitabilityIndicatorData({ params, results, isLoading }: IndicatorDataProps) {
  return useMemo<IndicatorWidgetProps[]>(() => {
    if (!results && !isLoading) return [];

    const isProfitabilityUp = (params?.desiredProfitability ?? 0) <= (results?.averageDividendYield ?? 0);
    const isIdealPriceUp = (params?.currentPrice ?? 0) <= (results?.idealPrice ?? 0);
    const isMinYieldUp = (params?.desiredProfitability ?? 0) <= (results?.minDividendYield ?? 0);
    return [
      {
        key: "profitability",
        title: "Rentabilidad (Yield)",
        value: `${results?.averageDividendYield ?? 0}%`,
        color: isProfitabilityUp ? "success" : "warning",
        icon: faChartMixedUpCircleDollar,
        isLoading,
        endContent: isProfitabilityUp ? (
          <ArrowUpIcon className="text-success" />
        ) : (
          <ArrowDownIcon className="text-warning" />
        ),
      },
      {
        key: "min-yield",
        title: "Min. Yield",
        value: `${results?.minDividendYield ?? 0}%`,
        color: (results?.minDividendYield ?? 0) === 0 ? "warning" : isMinYieldUp ? "success" : "default",
        icon: faChartMixedUpCircleDollar,
        isLoading,
      },
      {
        key: "ideal-price",
        title: "Precio ideal",
        value: `$${results?.idealPrice ?? 0}`,
        color: isIdealPriceUp ? "success" : "warning",
        icon: faHandsHoldingDollar,
        isLoading,
        endContent: isIdealPriceUp ? (
          <ArrowUpIcon className="text-success" />
        ) : (
          <ArrowDownIcon className="text-warning" />
        ),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isLoading,
    params?.currentPrice,
    params?.desiredProfitability,
    results?.averageDividendYield,
    results?.idealPrice,
    results?.minDividendYield,
  ]);
}
