import { useQuery } from "@tanstack/react-query";

import { ApiEntryPoint } from "../../../../common/api/api-entry-point";
import { fetcher } from "../../../../common/api/fetcher";
import { SettingsQueryKey } from "../../../../common/api/support/settings-query-key";
import { AxiosMethod } from "../../../../common/api/types/axios-method";
import { GetCompanyTypeListRoot } from "./get-company-type-list-item";

export function useGetCompanyTypeList() {
  return useQuery({
    queryKey: [SettingsQueryKey.settings, SettingsQueryKey.companyTypes],
    queryFn: async () =>
      fetcher(AxiosMethod.Get, ApiEntryPoint.settings.companyTypes, GetCompanyTypeListRoot),
  });
}
