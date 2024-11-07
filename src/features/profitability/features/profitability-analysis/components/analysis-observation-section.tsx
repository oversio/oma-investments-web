import { useMemo } from "react";

import { Skeleton } from "../../../../../common/components/skeleton/skeleton";
import { useTranslate } from "../../../../../common/i18n/hooks/use-translate";
import { CalculateProfitability } from "../../../api/calculate-profitability/calculate-profitability";
import { GoodLevelResult } from "../../../types";
import { AnalysisObservationItem, AnalysisObservationItemProps } from "./analysis-observation-item";

interface AnalysisObservationSectionProps {
  data: CalculateProfitability["results"] | undefined;
  isLoading?: boolean;
}

export function AnalysisObservationSection({ data, isLoading }: AnalysisObservationSectionProps) {
  const t = useTranslate();

  const observationsData = useMemo<AnalysisObservationItemProps[]>(() => {
    return [
      {
        i18nKey: "every-year",
        value: data?.dividendEveryYear ?? false,
        color: data?.dividendEveryYear ? "success" : "danger",
      },
      {
        i18nKey: "good-dividend",
        value: data?.goodDividend ?? GoodLevelResult.Bad,
        color: getLevelColor(data?.goodDividend ?? GoodLevelResult.Bad),
      },
      {
        i18nKey: "rising-dividends",
        value: data?.risingDividend ?? GoodLevelResult.Bad,
        color: getLevelColor(data?.risingDividend ?? GoodLevelResult.Bad),
      },
    ];
  }, [data?.dividendEveryYear, data?.goodDividend, data?.risingDividend]);

  return data || isLoading ? (
    <div className="col-span-full flex flex-col gap-2 mt-5">
      {isLoading ? (
        <Skeleton className="w-[40%] h-7 rounded-md" />
      ) : (
        <h3 className="text-xl font-semibold">{t("analysis.profitability.results.observations.title")}</h3>
      )}
      {observationsData.map(observation => (
        <AnalysisObservationItem key={observation.i18nKey} {...observation} isLoading={isLoading} />
      ))}
    </div>
  ) : null;
}

const getLevelColor = (value: GoodLevelResult) =>
  value === GoodLevelResult.Good ? "success" : value === GoodLevelResult.Normal ? "warning" : "danger";
