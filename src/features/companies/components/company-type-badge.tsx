import { faBuildingColumns, faChartMixedUpCircleDollar, faSparkles } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip } from "@nextui-org/react";

import { Skeleton } from "../../../common/components/skeleton/skeleton";
import { useTranslate } from "../../../common/i18n/hooks/use-translate";
import { TranslationKey } from "../../../common/i18n/locales/en";

type CompanyTypeBadgeProps = {
  typeName: string;
  isLoading: boolean;
};

export function CompanyTypeBadge({ typeName, isLoading }: CompanyTypeBadgeProps) {
  const t = useTranslate();
  return isLoading ? (
    <Skeleton className=" w-36 h-5" />
  ) : (
    <Chip
      startContent={<FontAwesomeIcon icon={getTypeIcon(typeName)} />}
      variant="flat"
      color={getTypeColor(typeName)}
    >
      <span>{t(typeName as TranslationKey)}</span>
    </Chip>
  );
}

const getTypeIcon = (name: string) => {
  if (RegExp(/bank/i).exec(name)) {
    return faBuildingColumns;
  }
  if (RegExp(/investments/i).exec(name)) {
    return faChartMixedUpCircleDollar;
  }
  return faSparkles;
};

const getTypeColor = (name: string) => {
  if (RegExp(/bank/i).exec(name)) {
    return "warning";
  }
  if (RegExp(/investments/i).exec(name)) {
    return "secondary";
  }
  return "success";
};
