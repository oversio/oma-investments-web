import { Skeleton } from "../../../../../../common/components/skeleton/skeleton";
import { DateTimeFormatType, formatDateTime } from "../../../../../../common/utils/format-date-time";
import { CompanyListCellProps } from "./types";

export function CompanyListDateCell({ createdAt, isLoading }: CompanyListCellProps) {
  return isLoading ? (
    <div className="flex flex-col justify-center items-center gap-2">
      <Skeleton className=" w-20 h-4" />
      <Skeleton className=" w-16 h-3" />
    </div>
  ) : (
    <div className=" flex flex-col justify-center items-center">
      <span>{formatDateTime(createdAt, DateTimeFormatType.Date)}</span>
      <span className=" text-sm text-gray-500">{formatDateTime(createdAt, DateTimeFormatType.Time)}</span>
    </div>
  );
}
