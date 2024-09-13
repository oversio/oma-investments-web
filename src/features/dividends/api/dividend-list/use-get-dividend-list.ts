import { useQuery } from "@tanstack/react-query";

import { ApiEntryPoint } from "../../../../common/api/api-entry-point";
import { API_PAGE_PARAM_NAME, API_PAGE_SIZE_PARAM_NAME } from "../../../../common/api/constants";
import { fetcher } from "../../../../common/api/fetcher";
import { DividendQueryKey } from "../../../../common/api/support/dividend-query-key";
import { AxiosMethod } from "../../../../common/api/types/axios-method";
import { listOf } from "../../../../common/api/types/list-of";
import { getQueryString } from "../../../../common/api/utils/url";
import { ID } from "../../../../common/types";
import { GetDividendListItem } from "./get-dividend-list-item";

const getEndpointPath = (page: number, size: number, companyId: ID | undefined) => {
  return (
    ApiEntryPoint.companies.dividends.list(companyId) +
    getQueryString({
      [API_PAGE_PARAM_NAME]: page.toString(),
      [API_PAGE_SIZE_PARAM_NAME]: size.toString(),
    })
  );
};

export function useGetDividendList(companyId: ID | undefined, page: number, size: number) {
  const result = useQuery({
    queryKey: [DividendQueryKey.List, companyId, page, size],
    queryFn: () =>
      fetcher(AxiosMethod.Get, getEndpointPath(page, size, companyId), listOf(GetDividendListItem)),
    enabled: Boolean(companyId),
  });

  const { data, ...rest } = result;

  return {
    data: data ?? [],
    ...rest,
  };
}
