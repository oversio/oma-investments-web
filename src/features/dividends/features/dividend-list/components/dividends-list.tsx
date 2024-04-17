import { useSearchParams } from "react-router-dom";

import { DataTable } from "../../../../../common/components/table/data-table/data-table";
import { ID } from "../../../../../common/types";
import { useGetDividendList } from "../../../api/dividend-list/use-get-dividend-list";
import { useDividendsListColumns } from "../hooks/use-dividends-list-columns";

interface DividendsListProps {
  companyId: ID | undefined;
}

const DEFAULT_PAGE_SIZE = 20;

export function DividendsList({ companyId }: DividendsListProps) {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const size = Number(searchParams.get("size") ?? DEFAULT_PAGE_SIZE);
  const { data, isLoading, isError } = useGetDividendList(companyId, page, size);
  const columns = useDividendsListColumns();

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={!companyId || isLoading || isError}
      name="dividends table list"
    />
  );
}
