import { Skeleton } from "../../../../../../common/components/skeleton/skeleton";
import { useTranslate } from "../../../../../../common/i18n/hooks/use-translate";
import { isTranslationKey } from "../../../../../../common/i18n/utils/is-translation-key";
import { DividenListCellProps } from "../../types";

export function DividendTypeCell({ type, isLoading }: DividenListCellProps) {
  const t = useTranslate();

  if (isLoading) return <Skeleton className=" w-14 h-4" />;

  const typeName = isTranslationKey(type.name) ? t(type.name) : type.name;

  return <div className=" uppercase">{typeName.substring(0, 3)}</div>;
}
