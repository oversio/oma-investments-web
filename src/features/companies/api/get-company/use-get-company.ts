import { useQuery } from "@tanstack/react-query";

import { ApiEntryPoint } from "../../../../common/api/api-entry-point";
import { fetcher } from "../../../../common/api/fetcher";
import { CompanyQueryKey } from "../../../../common/api/support/company-query-key";
import { AxiosMethod } from "../../../../common/api/types/axios-method";
import { ID } from "../../../../common/types";
import { GetCompany } from "./get-company";

export function useGetCompany(id: ID | undefined) {
  return useQuery({
    enabled: Boolean(id),
    queryKey: [CompanyQueryKey.Details, id],
    queryFn: async () => fetcher(AxiosMethod.Get, ApiEntryPoint.companies.details(id ?? ""), GetCompany),
  });
}
