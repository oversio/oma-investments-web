import { Skeleton } from "../../../../../../common/components/skeleton/skeleton";
import { DividendDetailListCellProps } from "../../types";

export function DividendAmountCell({ amount, isLoading }: DividendDetailListCellProps) {
  return isLoading ? <Skeleton className=" w-40 h-4" /> : <span className=" text-base">$ {amount ?? 0}</span>;
}
