import { Skeleton } from "../../../../../../common/components/skeleton/skeleton";
import { CompanyListCellProps } from "./types";

export function CompanyListNameCell({ name, description, isLoading }: CompanyListCellProps) {
  return isLoading ? (
    <div className="flex flex-col justify-center gap-2">
      <Skeleton className="w-60 h-5" />
      <Skeleton className=" w-80 h-4" />
    </div>
  ) : (
    <div>
      <div className="font-bold text-large capitalize">{name}</div>
      <div>{description}</div>
    </div>
  );
}
