import { Skeleton } from "../../../../../../common/components/skeleton/skeleton";
import { DividenListCellProps } from "./types";

export function DividendAmountCell({ amount, isLoading }: DividenListCellProps) {
  return isLoading ? <Skeleton className=" w-40 h-4" /> : <span className=" text-base">$ {amount ?? 0}</span>;
}
