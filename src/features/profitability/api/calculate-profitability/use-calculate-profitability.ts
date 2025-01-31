import { useMutation } from "@tanstack/react-query";

import { ApiEntryPoint } from "../../../../common/api/api-entry-point";
import { MutationError } from "../../../../common/api/errors/mutation-error";
import { fetcher } from "../../../../common/api/fetcher";
import { AnalysisQueryKey } from "../../../../common/api/support/analysis-query-key";
import { CompanyQueryKey } from "../../../../common/api/support/company-query-key";
import { AxiosMethod } from "../../../../common/api/types/axios-method";
import { ID } from "../../../../common/types";
import { CalculateProfitability } from "./calculate-profitability";
import {
  CalculateProfitabilityInput,
  calculateProfitabilityInputTransformer,
} from "./calculate-profitability-input";

export function useCalculateProfitability(id: ID | undefined) {
  const result = useMutation<
    CalculateProfitability,
    MutationError<CalculateProfitabilityInput>,
    CalculateProfitabilityInput
  >({
    mutationKey: [CompanyQueryKey.Details, id, AnalysisQueryKey.CalculateProfitability],
    mutationFn: input =>
      fetcher(
        AxiosMethod.Post,
        ApiEntryPoint.analysis.profitability.generate(id),
        CalculateProfitability,
        calculateProfitabilityInputTransformer(input),
      ),
  });

  const { mutateAsync, ...rest } = result;

  return {
    calculateProfitability: mutateAsync,
    ...rest,
  };
}
