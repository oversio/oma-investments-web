import { useQuery } from "@tanstack/react-query";

import { ApiEntryPoint } from "../../../../common/api/api-entry-point";
import { fetcher } from "../../../../common/api/fetcher";
import { SettingsQueryKey } from "../../../../common/api/support/settings-query-key";
import { AxiosMethod } from "../../../../common/api/types/axios-method";
import { listOf } from "../../../../common/api/types/list-of";
import { GetIndicatorListItem } from "./get-indicator-list";

export function useGetIndicatorList() {
  return useQuery({
    queryKey: [SettingsQueryKey.settings, SettingsQueryKey.indicators],
    queryFn: async () =>
      fetcher(AxiosMethod.Get, ApiEntryPoint.settings.indicators, listOf(GetIndicatorListItem)),
  });
}
