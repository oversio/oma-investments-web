import { useSearchParams } from "react-router-dom";

import { DataTable } from "../../../../../common/components/table/data-table/data-table";
import { useGetDividendList } from "../../../../dividends/features/dividend-list/api/use-get-dividend-list";
import { useDividendsListColumns } from "../hooks/use-dividends-list-columns";

interface DividendsListProps {
  companyId?: string;
}

export function DividendsList({ companyId }: DividendsListProps) {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const size = Number(searchParams.get("size") ?? 10);

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
