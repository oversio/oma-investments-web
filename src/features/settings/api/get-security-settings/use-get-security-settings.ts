import { useQuery } from "@tanstack/react-query";

import { ApiEntryPoint } from "../../../../common/api/api-entry-point";
import { fetcher } from "../../../../common/api/fetcher";
import { SettingsQueryKey } from "../../../../common/api/support/settings-query-key";
import { AxiosMethod } from "../../../../common/api/types/axios-method";
import { listOf } from "../../../../common/api/types/list-of";
import { GetThresholdSettingsItem } from "../get-threshold-settings-list/get-threshold-settings-list";

export function useGetSecuritySettings() {
  return useQuery({
    queryKey: [SettingsQueryKey.settings, SettingsQueryKey.all],
    queryFn: async () =>
      fetcher(AxiosMethod.Get, ApiEntryPoint.settings.all, listOf(GetThresholdSettingsItem)),
  });
}
