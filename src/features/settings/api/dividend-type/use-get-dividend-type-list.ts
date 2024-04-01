import { useQuery } from "@tanstack/react-query";

import { ApiEntryPoint } from "../../../../common/api/api-entry-point";
import { fetcher } from "../../../../common/api/fetcher";
import { SettingsQueryKey } from "../../../../common/api/support/settings-query-key";
import { AxiosMethod } from "../../../../common/api/types/axios-method";
import { GetDividendTypeList } from "./get-dividend-type-list-item";

export function useGetDividendTypeList() {
  const result = useQuery({
    queryKey: [SettingsQueryKey.dividendTypes],
    queryFn: () => fetcher(AxiosMethod.Get, ApiEntryPoint.settings.dividendTypes, GetDividendTypeList),
  });

  const { data, ...rest } = result;

  return {
    data: data ?? [],
    ...rest,
  };
}
