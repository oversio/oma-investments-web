import { CompanyTypeBadge } from "../../../../components/company-type-badge";
import { CompanyListCellProps } from "./types";

export function CompanyListTypeCell({ type, isLoading }: CompanyListCellProps) {
  return (
    <div className="flex justify-center items-center">
      <CompanyTypeBadge typeName={type?.name ?? ""} isLoading={isLoading} />
    </div>
  );
}
