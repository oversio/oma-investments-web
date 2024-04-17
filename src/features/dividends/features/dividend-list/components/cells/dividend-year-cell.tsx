import { Skeleton } from "../../../../../../common/components/skeleton/skeleton";
import { DividendListCellProps } from "../../types";

export function DividendYearCell({ year, isLoading }: DividendListCellProps) {
  return isLoading ? (
    <Skeleton className=" w-40 h-4" />
  ) : (
    <div className=" w-full text-center text-base">{year ?? 0}</div>
  );
}
