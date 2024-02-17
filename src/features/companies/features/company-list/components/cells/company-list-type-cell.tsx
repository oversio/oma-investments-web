import { faSparkles } from "@fortawesome/pro-light-svg-icons";
import { faBuildingColumns } from "@fortawesome/pro-light-svg-icons/faBuildingColumns";
import { faChartMixedUpCircleDollar } from "@fortawesome/pro-light-svg-icons/faChartMixedUpCircleDollar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip } from "@nextui-org/react";

import { Skeleton } from "../../../../../../common/components/skeleton/skeleton";
import { useTranslate } from "../../../../../../common/i18n/hooks/use-translate";
import { TranslationKey } from "../../../../../../common/i18n/locales/en";
import { CompanyListCellProps } from "./types";

export function CompanyListTypeCell({ type, isLoading }: CompanyListCellProps) {
  const t = useTranslate();
  return (
    <div className="flex justify-center items-center">
      {isLoading ? (
        <Skeleton className=" w-36 h-5" />
      ) : (
        <Chip
          startContent={<FontAwesomeIcon icon={getTypeIcon(type.name)} />}
          color={getTypeColor(type.name)}
        >
          <span>{t(type.name as TranslationKey)}</span>
        </Chip>
      )}
    </div>
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
