import { useSearchParams } from "react-router-dom";

import { DataTable } from "../../../../../common/components/table/data-table/data-table";
import { ID } from "../../../../../common/types";
import { useDividendsListColumns } from "../../../../companies/features/company-details/hooks/use-dividends-list-columns";
import { useGetDividendList } from "../api/use-get-dividend-list";

interface DividendsListProps {
  companyId: ID | undefined;
}

export function DividendsList({ companyId }: DividendsListProps) {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const size = Number(searchParams.get("size") ?? 100);
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
