import { DataTable } from "../../../../../common/components/table/data-table/data-table";
import { useGetCompany } from "../../../api/company-details/use-get-company";
import { useDividendsListColumns } from "../hooks/use-dividends-list-columns";

interface DividendsListProps {
  companyId?: string;
}

export function DividendsList({ companyId }: DividendsListProps) {
  const { data, isLoading, isError } = useGetCompany(companyId);
  const columns = useDividendsListColumns();

  return (
    <DataTable
      columns={columns}
      data={data?.dividends ?? []}
      isLoading={!companyId || isLoading || isError}
      name="dividends table list"
    />
  );
}
