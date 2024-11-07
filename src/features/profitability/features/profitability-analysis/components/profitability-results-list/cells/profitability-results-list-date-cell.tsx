import { Skeleton } from "../../../../../../../common/components/skeleton/skeleton";
import { DateTimeFormatType, formatDateTime } from "../../../../../../../common/utils/format-date-time";
import { ProfitabilityResultsListDateCellProps } from "../types";

export function ProfitabilityResultsListDateCell({ date, isLoading }: ProfitabilityResultsListDateCellProps) {
  return isLoading ? (
    <div className="flex flex-col justify-center items-center gap-2">
      <Skeleton className=" w-20 h-4" />
      <Skeleton className=" w-16 h-3" />
    </div>
  ) : (
    <div className=" flex flex-col justify-center items-center">
      <span>{formatDateTime(date, DateTimeFormatType.Date)}</span>
      <span className=" text-sm text-gray-500">{formatDateTime(date, DateTimeFormatType.Time)}</span>
    </div>
  );
}
