import { useMutation } from "@tanstack/react-query";

import { ApiEntryPoint } from "../../../../common/api/api-entry-point";
import { fetcher } from "../../../../common/api/fetcher";
import { AnalysisQueryKey } from "../../../../common/api/support/analysis-query-key";
import { CompanyQueryKey } from "../../../../common/api/support/company-query-key";
import { AxiosMethod } from "../../../../common/api/types/axios-method";
import { MutationError } from "../../../../common/api/types/mutation-error";
import { ID } from "../../../../common/types";
import { SaveProfitabilityResults } from "./save-profitability-results";
import {
  SaveProfitabilityResultsInput,
  saveProfitabilityResultsInputTransformer,
} from "./save-profitability-results-input";

export function useSaveProfitabilityResults(id: ID | undefined) {
  const result = useMutation<
    SaveProfitabilityResults,
    MutationError<SaveProfitabilityResultsInput>,
    SaveProfitabilityResultsInput
  >({
    mutationKey: [CompanyQueryKey.Details, id, AnalysisQueryKey.SaveProfitability],
    mutationFn: input =>
      fetcher(
        AxiosMethod.Post,
        ApiEntryPoint.analysis.saveProfitability,
        SaveProfitabilityResults,
        saveProfitabilityResultsInputTransformer(input),
      ),
  });

  const { mutateAsync, ...rest } = result;

  return {
    saveProfitabilityResults: mutateAsync,
    ...rest,
  };
}
