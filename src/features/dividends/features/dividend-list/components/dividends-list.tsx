import { DataTable } from "../../../../../common/components/table/data-table/data-table";
import { GetDividendListItem } from "../../../api/dividend-list/get-dividend-list-item";
import { useDividendsListColumns } from "../hooks/use-dividends-list-columns";

interface DividendsListProps {
  data: GetDividendListItem[];
  isLoading: boolean | undefined;
}

export function DividendsList({ data, isLoading }: DividendsListProps) {
  const columns = useDividendsListColumns();

  return <DataTable columns={columns} data={data} isLoading={isLoading} name="dividends table list" />;
}
