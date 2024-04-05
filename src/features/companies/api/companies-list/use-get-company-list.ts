import { useQuery } from "@tanstack/react-query";

import { ApiEntryPoint } from "../../../../common/api/api-entry-point";
import { API_PAGE_PARAM_NAME, API_PAGE_SIZE_PARAM_NAME } from "../../../../common/api/constants";
import { fetcherWithPagination } from "../../../../common/api/fetcher-with-pagination";
import { CompanyQueryKey } from "../../../../common/api/support/company-query-key";
import { AxiosMethod } from "../../../../common/api/types/axios-method";
import { apiPath } from "../../../../common/api/utils/url";
import { GetCompanyListItem } from "./get-company-list-item";

const getEndpointPath = (page: number, size: number) => {
  return apiPath(ApiEntryPoint.companies.list, {
    query: {
      [API_PAGE_PARAM_NAME]: page.toString(),
      [API_PAGE_SIZE_PARAM_NAME]: size.toString(),
    },
  });
};

export function useGetCompanyList(page: number, size: number) {
  const result = useQuery({
    queryKey: [CompanyQueryKey.Companies, CompanyQueryKey.List, page, size],
    queryFn: async () =>
      fetcherWithPagination(AxiosMethod.Get, getEndpointPath(page, size), GetCompanyListItem),
  });

  const { data, ...rest } = result;

  return {
    ...rest,
    data: data?.data,
    pagination: data?.pagination,
  };
}
