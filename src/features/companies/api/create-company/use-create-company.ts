import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiEntryPoint } from "../../../../common/api/api-entry-point";
import { fetcher } from "../../../../common/api/fetcher";
import { CompanyQueryKey } from "../../../../common/api/support/company-query-key";
import { AxiosMethod } from "../../../../common/api/types/axios-method";
import { MutationError } from "../../../../common/api/errors/mutation-error";
import { CreateCompany } from "./create-company";
import { CreateCompanyInput } from "./create-company-input";

export function useCreateCompany() {
  const queryClient = useQueryClient();

  const result = useMutation<CreateCompany, MutationError<CreateCompanyInput>, CreateCompanyInput>({
    mutationKey: [CompanyQueryKey.Companies, CompanyQueryKey.Create],
    mutationFn: async data => fetcher(AxiosMethod.Post, ApiEntryPoint.companies.create, CreateCompany, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [CompanyQueryKey.Companies, CompanyQueryKey.List],
      });
    },
  });

  const { mutateAsync, ...rest } = result;

  return {
    createCompany: mutateAsync,
    ...rest,
  };
}
