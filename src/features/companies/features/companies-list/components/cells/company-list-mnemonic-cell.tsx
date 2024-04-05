import { Skeleton } from "../../../../../../common/components/skeleton/skeleton";
import { CompanyListCellProps } from "./types";

export function CompanyListMnemonicCell({ mnemonic, isLoading }: CompanyListCellProps) {
  return isLoading ? <Skeleton className=" w-40 h-4" /> : <span className=" uppercase">{mnemonic}</span>;
}
