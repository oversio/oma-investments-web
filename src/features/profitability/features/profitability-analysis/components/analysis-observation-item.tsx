import { Chip } from "@nextui-org/react";

import { Skeleton } from "../../../../../common/components/skeleton/skeleton";
import { useTranslate } from "../../../../../common/i18n/hooks/use-translate";
import { isTranslationKey } from "../../../../../common/i18n/utils/is-translation-key";
import { GoodLevelResult } from "../../../types";

type EveryYearType = {
  i18nKey: "every-year";
  value: boolean;
};
type GoodAndRisingDividendType = {
  i18nKey: "good-dividend" | "rising-dividends";
  value: GoodLevelResult;
};
export type AnalysisObservationItemProps = (EveryYearType | GoodAndRisingDividendType) & {
  color: "success" | "danger" | "warning";
  isLoading?: boolean;
};

export function AnalysisObservationItem({ i18nKey, value, color, isLoading }: AnalysisObservationItemProps) {
  const t = useTranslate();

  const translationKey = `analysis.profitability.results.${i18nKey}.${value}`;

  return isLoading ? (
    <Skeleton className="w-full h-20 rounded-md" />
  ) : (
    <Chip variant="flat" color={color} className="max-w-full text-center py-4 h-auto" radius="sm">
      <h4 className="text-lg">{t(`analysis.profitability.results.${i18nKey}.title`)}</h4>
      <span>{isTranslationKey(translationKey) ? t(translationKey) : ""}</span>
    </Chip>
  );
}
