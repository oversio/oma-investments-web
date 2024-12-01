import { useQuery } from "@tanstack/react-query";

import { ApiEntryPoint } from "../../../../common/api/api-entry-point";
import { fetcher } from "../../../../common/api/fetcher";
import { AnalysisQueryKey } from "../../../../common/api/support/analysis-query-key";
import { AxiosMethod } from "../../../../common/api/types/axios-method";
import { ID } from "../../../../common/types";
import { GetProfitabilityResult } from "./get-profitability-result";

export function useGetProfitabilityResult(companyId: ID, id: ID) {
  return useQuery({
    queryKey: [AnalysisQueryKey.ProfitabilityResults, companyId, id],
    queryFn: () =>
      fetcher(
        AxiosMethod.Get,
        ApiEntryPoint.analysis.profitability.result(companyId, id),
        GetProfitabilityResult,
      ),
  });
}
