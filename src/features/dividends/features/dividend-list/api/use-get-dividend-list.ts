import { useQuery } from "@tanstack/react-query";

import { ApiEntryPoint } from "../../../../../common/api/api-entry-point";
import { API_PAGE_PARAM_NAME, API_PAGE_SIZE_PARAM_NAME } from "../../../../../common/api/constants";
import { fetcherWithPagination } from "../../../../../common/api/fetcher-with-pagination";
import { DividendQueryKey } from "../../../../../common/api/support/dividend-query-key";
import { AxiosMethod } from "../../../../../common/api/types/axios-method";
import { apiPath } from "../../../../../common/api/utils/url";
import { ID } from "../../../../../common/types";
import { GetDividendListItem } from "./get-dividend-list-item";

const getEndpointPath = (page: number, size: number, companyId: ID) => {
  return apiPath(ApiEntryPoint.companies.dividendList, {
    params: { id: companyId },
    query: {
      [API_PAGE_PARAM_NAME]: page.toString(),
      [API_PAGE_SIZE_PARAM_NAME]: size.toString(),
    },
  });
};

export function useGetDividendList(companyId: ID | undefined, page: number, size: number) {
  const result = useQuery({
    queryKey: [DividendQueryKey.List, companyId, page, size],
    queryFn: () =>
      fetcherWithPagination(AxiosMethod.Get, getEndpointPath(page, size, companyId!), GetDividendListItem),
    enabled: Boolean(companyId),
  });

  const { data, ...rest } = result;

  return {
    ...rest,
    data: data?.data ?? [],
    pagination: data?.pagination ?? {},
  };
}
