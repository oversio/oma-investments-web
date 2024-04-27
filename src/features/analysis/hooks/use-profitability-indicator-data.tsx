import { faChartMixedUpCircleDollar, faHandsHoldingDollar } from "@fortawesome/pro-light-svg-icons";
import { useMemo } from "react";

import { ArrowDownIcon } from "../../../common/components/icons/arrow-down-icon";
import { ArrowUpIcon } from "../../../common/components/icons/arrow-up-icon";
import { IndicatorWidgetProps } from "../../../common/components/widget/indicator-widget";
import { CalculateProfitability } from "../api/calculate-profitability/calculate-profitability";
import { ProfitabilityAnalysisFormSchema } from "../features/profitability-analysis/form-schemas/profitability-analysis-form-schema";

export interface IndicatorDataProps {
  params: ProfitabilityAnalysisFormSchema | undefined;
  data: CalculateProfitability | undefined;
  isLoading: boolean;
}

export function useProfitabilityIndicatorData({ params, data, isLoading }: IndicatorDataProps) {
  return useMemo<IndicatorWidgetProps[]>(() => {
    if (!data && !isLoading) return [];

    const isProfitabilityUp = (params?.desiredProfitability ?? 0) <= (data?.averageDividendYield ?? 0);
    const isIdealPriceUp = (params?.currentPrice ?? 0) <= (data?.idealPrice ?? 0);
    const isMinYieldUp = (params?.desiredProfitability ?? 0) <= (data?.minDividendYield ?? 0);
    return [
      {
        key: "profitability",
        title: "Rentabilidad (Yield)",
        value: `${data?.averageDividendYield ?? 0}%`,
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
        value: `${data?.minDividendYield ?? 0}%`,
        color: (data?.minDividendYield ?? 0) === 0 ? "warning" : isMinYieldUp ? "success" : "default",
        icon: faChartMixedUpCircleDollar,
        isLoading,
      },
      {
        key: "ideal-price",
        title: "Precio ideal",
        value: `$${data?.idealPrice ?? 0}`,
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
  }, [data, isLoading, params]);
}
