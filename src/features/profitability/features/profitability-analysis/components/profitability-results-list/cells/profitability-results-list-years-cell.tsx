import { Skeleton } from "../../../../../../../common/components/skeleton/skeleton";
import { ProfitabilityResultsListDateCellProps } from "../types";

export function ProfitabilityResultsListYearsCell({
  years,
  isLoading,
}: ProfitabilityResultsListDateCellProps) {
  const startYear = years?.[years?.length - 1]?.year;
  const endYear = years?.[0]?.year;

  return isLoading ? (
    <div className="flex flex-col justify-center items-center gap-2">
      <Skeleton className=" w-20 h-4" />
    </div>
  ) : (
    <div className=" flex flex-col justify-center items-center">
      {startYear ?? 0}-{endYear ?? 0}
    </div>
  );
}
