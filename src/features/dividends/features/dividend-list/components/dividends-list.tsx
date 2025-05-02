import { DataTable } from "../../../../../common/components/table/data-table/data-table";
import { ID } from "../../../../../common/types";
import { classMerge } from "../../../../../common/utils/class-merge";
import { useGetDividendList } from "../../../api/dividend-list/use-get-dividend-list";
import { useDividendsListColumns } from "../hooks/use-dividends-list-columns";

interface DividendsListProps {
  companyId: ID | undefined;
  className?: string;
}

const DEFAULT_DIVIDEND_LIST_PAGE_SIZE = 20;

export function DividendsList({ companyId, className }: DividendsListProps) {
  const { data, isLoading, isError } = useGetDividendList(companyId, 1, DEFAULT_DIVIDEND_LIST_PAGE_SIZE);
  const columns = useDividendsListColumns();

  return (
    <div className={classMerge("w-full", className)}>
      <DataTable columns={columns} data={data} isLoading={isLoading || isError} name="dividends table list" />
    </div>
  );
}
