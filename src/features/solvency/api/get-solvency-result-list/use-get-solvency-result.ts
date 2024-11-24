import { useQuery } from "@tanstack/react-query";

import { ApiEntryPoint } from "../../../../common/api/api-entry-point";
import { fetcher } from "../../../../common/api/fetcher";
import { AnalysisQueryKey } from "../../../../common/api/support/analysis-query-key";
import { AxiosMethod } from "../../../../common/api/types/axios-method";
import { listOf } from "../../../../common/api/types/list-of";
import { ID } from "../../../../common/types";
import { GetSolvencyResultListItem } from "./get-solvency-result-list";

export function useGetSolvencyResult(companyId: ID) {
  return useQuery({
    queryKey: [AnalysisQueryKey.SolvencyResultsList],
    queryFn: async ({ signal }) =>
      fetcher(
        AxiosMethod.Get,
        ApiEntryPoint.analysis.solvency.list(companyId),
        listOf(GetSolvencyResultListItem),
        signal,
      ),
  });
}
