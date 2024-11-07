import { useQuery } from "@tanstack/react-query";

import { ApiEntryPoint } from "../../../../common/api/api-entry-point";
import { API_PAGE_PARAM_NAME, API_PAGE_SIZE_PARAM_NAME } from "../../../../common/api/constants";
import { fetcherWithPagination } from "../../../../common/api/fetcher-with-pagination";
import { AnalysisQueryKey } from "../../../../common/api/support/analysis-query-key";
import { CompanyQueryKey } from "../../../../common/api/support/company-query-key";
import { AxiosMethod } from "../../../../common/api/types/axios-method";
import { getQueryString } from "../../../../common/api/utils/url";
import { ID } from "../../../../common/types";
import { GetProfitabilityResultsListItem } from "./get-profitability-results-list-item";

const buildEndpointPath = (companyId: ID | undefined, page: number, size: number) => {
  return (
    ApiEntryPoint.analysis.profitability.list(companyId) +
    getQueryString({ [API_PAGE_PARAM_NAME]: page.toString(), [API_PAGE_SIZE_PARAM_NAME]: size.toString() })
  );
};

export function useGetProfitabilityResultsList(page: number, size: number, companyId: ID | undefined) {
  const result = useQuery({
    queryKey: [CompanyQueryKey.Details, companyId, AnalysisQueryKey.ProfitabilityResultsList, page, size],
    queryFn: () =>
      fetcherWithPagination(
        AxiosMethod.Get,
        buildEndpointPath(companyId, page, size),
        GetProfitabilityResultsListItem,
      ),
  });

  const { data, ...rest } = result;

  return {
    ...rest,
    data: data?.data ?? [],
    pagination: data?.pagination,
  };
}
