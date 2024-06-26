import { useNavigate, useSearchParams } from "react-router-dom";

import { DataTable } from "../../../../../common/components/table/data-table/data-table";
import { GetCompanyListItem } from "../../../api/companies-list/get-company-list-item";
import { useGetCompanyList } from "../../../api/companies-list/use-get-company-list";
import { useCompanyListColumns } from "../hooks/use-company-list-columns";

export function CompanyList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const size = Number(searchParams.get("size") ?? 10);
  const { data, isLoading } = useGetCompanyList(page, size);
  const columns = useCompanyListColumns();

  const onClickRow = ({ id }: GetCompanyListItem) => navigate(id);

  return (
    <DataTable
      name="Company list table"
      data={data ?? []}
      columns={columns}
      isLoading={isLoading}
      onClickRow={onClickRow}
    />
  );
}
