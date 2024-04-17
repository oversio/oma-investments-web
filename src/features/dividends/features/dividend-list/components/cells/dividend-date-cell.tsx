import { Skeleton } from "../../../../../../common/components/skeleton/skeleton";
import { DateTimeFormatType, formatDateTime } from "../../../../../../common/utils/format-date-time";
import { DividendDetailListCellProps } from "../../types";

export function DividendDateCell({ date, isLoading }: DividendDetailListCellProps) {
  return isLoading ? (
    <Skeleton className=" w-20 h-4" />
  ) : (
    <div className="">{formatDateTime(date.toISOString().substring(0, 19), DateTimeFormatType.Date)}</div>
  );
}
