import { useQuery } from "@tanstack/react-query";

import { ApiEntryPoint } from "../../../../common/api/api-entry-point";
import { fetcherWithPagination } from "../../../../common/api/fetcher-with-pagination";
import { AnalysisQueryKey } from "../../../../common/api/support/analysis-query-key";
import { CompanyQueryKey } from "../../../../common/api/support/company-query-key";
import { AxiosMethod } from "../../../../common/api/types/axios-method";
import { ID } from "../../../../common/types";
import { GetProfitabilityResultsListItem } from "./get-profitability-results-list-item";

const buildEndpointPath = (page: number, size: number) => {
  return `${ApiEntryPoint.analysis.profitabilityResultsList}?page=${page}&size=${size}`;
};

export function useGetProfitabilityResultsList(page: number, size: number, companyId: ID | undefined) {
  const result = useQuery({
    queryKey: [CompanyQueryKey.Details, companyId, AnalysisQueryKey.ProfitabilityResultsList, page, size],
    queryFn: () =>
      fetcherWithPagination(AxiosMethod.Get, buildEndpointPath(page, size), GetProfitabilityResultsListItem),
  });

  const { data, ...rest } = result;

  return {
    ...rest,
    data: data?.data ?? [],
    pagination: data?.pagination,
  };
}
