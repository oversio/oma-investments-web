import { Skeleton } from "../../../../../../../common/components/skeleton/skeleton";
import { ProfitabilityResultsListDateCellProps } from "../types";

export function ProfitabilityResultsListDesiredCell({
  isLoading,
  params,
}: ProfitabilityResultsListDateCellProps) {
  return isLoading ? (
    <div className="flex flex-col justify-center items-center gap-2">
      <Skeleton className=" w-20 h-4" />
    </div>
  ) : (
    <div className=" flex flex-col justify-center items-center">{params.desiredProfitability ?? 0}%</div>
  );
}
