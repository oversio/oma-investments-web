import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiEntryPoint } from "../../../../common/api/api-entry-point";
import { fetcher } from "../../../../common/api/fetcher";
import { CompanyQueryKey } from "../../../../common/api/support/company-query-key";
import { DividendQueryKey } from "../../../../common/api/support/dividend-query-key";
import { AxiosMethod } from "../../../../common/api/types/axios-method";
import { MutationError } from "../../../../common/api/types/mutation-error";
import { ID } from "../../../../common/types";
import { UploadDividendInput, uploadDividendTransformer } from "./upload-dividend-input";
import { UploadDividends } from "./upload-dividends";

export function useUploadDividendsFile(companyId: ID | undefined = "") {
  const queryClient = useQueryClient();

  const result = useMutation<UploadDividends, MutationError<UploadDividendInput>, UploadDividendInput>({
    mutationKey: [CompanyQueryKey.Details, companyId, DividendQueryKey.Upload],
    mutationFn: input =>
      fetcher(
        AxiosMethod.Post,
        ApiEntryPoint.companies.dividends.upload(companyId),
        UploadDividends,
        uploadDividendTransformer(input),
      ),
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [DividendQueryKey.List],
      });
    },
  });

  const { mutateAsync, ...rest } = result;

  return {
    ...rest,
    uploadDividends: mutateAsync,
  };
}
