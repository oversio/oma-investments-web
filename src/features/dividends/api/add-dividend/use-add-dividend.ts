import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiEntryPoint } from "../../../../common/api/api-entry-point";
import { MutationError } from "../../../../common/api/errors/mutation-error";
import { fetcher } from "../../../../common/api/fetcher";
import { DividendQueryKey } from "../../../../common/api/support/dividend-query-key";
import { AxiosMethod } from "../../../../common/api/types/axios-method";
import { AddDividend } from "./add-dividend";
import { AddDividendInput, addDividendTransformer } from "./add-dividend-input";

export function useAddDividend() {
  const queryClient = useQueryClient();

  const result = useMutation<AddDividend, MutationError<AddDividendInput>, AddDividendInput>({
    mutationKey: [DividendQueryKey.Add],
    mutationFn: input =>
      fetcher(
        AxiosMethod.Post,
        ApiEntryPoint.companies.dividends.add(input.companyId),
        AddDividend,
        addDividendTransformer(input),
      ),
    onSuccess(_, { companyId }) {
      void queryClient.invalidateQueries({
        queryKey: [DividendQueryKey.List, companyId],
      });
    },
  });

  const { mutateAsync } = result;

  return { ...result, addDividend: mutateAsync };
}
