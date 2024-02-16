import { useSearchParams } from "react-router-dom";

import { useGetCompany } from "../../api/company-list/use-get-company";

export function CompanyListPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const size = Number(searchParams.get("size") ?? 10);
  const { data, isLoading } = useGetCompany(page, size);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Company List</h1>
      <ul>{data?.map(company => <li key={company.id}>{company.name}</li>)}</ul>
    </div>
  );
}
