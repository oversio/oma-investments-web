import { Skeleton } from "../../../../../../../common/components/skeleton/skeleton";
import { ProfitabilityResultsListDateCellProps } from "../types";

export function ProfitabilityResultsListPriceCell({
  params,
  isLoading,
}: ProfitabilityResultsListDateCellProps) {
  return isLoading ? (
    <div className="flex flex-col justify-center items-center gap-2">
      <Skeleton className=" w-20 h-4" />
    </div>
  ) : (
    <div className=" flex flex-col justify-center items-center">{params.currentPrice ?? 0}</div>
  );
}
