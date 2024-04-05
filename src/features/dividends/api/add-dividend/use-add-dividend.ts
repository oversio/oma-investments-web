import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiEntryPoint } from "../../../../common/api/api-entry-point";
import { fetcher } from "../../../../common/api/fetcher";
import { DividendQueryKey } from "../../../../common/api/support/dividend-query-key";
import { AxiosMethod } from "../../../../common/api/types/axios-method";
import { MutationError } from "../../../../common/api/types/mutation-error";
import { apiPath } from "../../../../common/api/utils/url";
import { AddDividend } from "./add-dividend";
import { AddDividendInput, addDividendTransformer } from "./add-dividend-input";

export function useAddDividend() {
  const queryClient = useQueryClient();

  const result = useMutation<AddDividend, MutationError<AddDividendInput>, AddDividendInput>({
    mutationKey: [DividendQueryKey.Add],
    mutationFn: input =>
      fetcher(
        AxiosMethod.Post,
        apiPath(ApiEntryPoint.companies.addDividend, { params: { id: input.companyId } }),
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
