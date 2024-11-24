import { ArrowDownIcon } from "../../../../../../../common/components/icons/arrow-down-icon";
import { ArrowUpIcon } from "../../../../../../../common/components/icons/arrow-up-icon";
import { Skeleton } from "../../../../../../../common/components/skeleton/skeleton";
import { ProfitabilityResultsListDateCellProps } from "../types";

export function ProfitabilityResultsListCalculatedCell({
  isLoading,
  results,
  params,
}: ProfitabilityResultsListDateCellProps) {
  return isLoading ? (
    <div className="flex flex-col justify-center items-center gap-2">
      <Skeleton className=" w-20 h-4" />
    </div>
  ) : (
    <div className=" flex justify-center items-center gap-2">
      <span className="text-lg font-bold">{results.averageDividendYield ?? 0}%</span>
      {params.desiredProfitability <= results.averageDividendYield ? (
        <ArrowUpIcon className=" text-success" />
      ) : (
        <ArrowDownIcon className=" text-danger" />
      )}
    </div>
  );
}
