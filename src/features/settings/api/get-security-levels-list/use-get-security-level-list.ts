import { useQuery } from "@tanstack/react-query";

import { ApiEntryPoint } from "../../../../common/api/api-entry-point";
import { fetcher } from "../../../../common/api/fetcher";
import { SettingsQueryKey } from "../../../../common/api/support/settings-query-key";
import { AxiosMethod } from "../../../../common/api/types/axios-method";
import { listOf } from "../../../../common/api/types/list-of";
import { GetSecurityLevelItem } from "./get-security-levels-list";

export function useGetSecurityLevelsList() {
  return useQuery({
    queryKey: [SettingsQueryKey.settings, SettingsQueryKey.securityLevels],
    queryFn: async () =>
      fetcher(AxiosMethod.Get, ApiEntryPoint.settings.securityLevels, listOf(GetSecurityLevelItem)),
  });
}
