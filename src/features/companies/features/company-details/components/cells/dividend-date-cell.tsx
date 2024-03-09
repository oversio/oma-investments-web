import { Skeleton } from "../../../../../../common/components/skeleton/skeleton";
import { DateTimeFormatType, formatDateTime } from "../../../../../../common/utils/format-date-time";
import { DividenListCellProps } from "./types";

export function DividendDateCell({ date, isLoading }: DividenListCellProps) {
  return isLoading ? (
    <Skeleton className=" w-20 h-4" />
  ) : (
    <div className="">{formatDateTime(date, DateTimeFormatType.Date)}</div>
  );
}
