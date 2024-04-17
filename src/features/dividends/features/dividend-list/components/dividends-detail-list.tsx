import { DataTable } from "../../../../../common/components/table/data-table/data-table";
import { GetDividendDetailItem } from "../../../api/dividend-list/get-dividend-detail-item";
import { useDividendsDetailListColumns } from "../hooks/use-dividends-detail-list-columns";

interface DividendsDetailsListProps {
  dividends: GetDividendDetailItem[];
  isLoading?: boolean;
}

export function DividendsDetailsList({ dividends, isLoading }: DividendsDetailsListProps) {
  const columns = useDividendsDetailListColumns();

  return (
    <DataTable columns={columns} data={dividends} isLoading={isLoading} name="Dividends details table" />
  );
}
