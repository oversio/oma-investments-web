import { useQuery } from "@tanstack/react-query";

import { ApiEntryPoint } from "../../../common/api/api-entry-point";
import { fetcher } from "../../../common/api/fetcher";
import { UserQueryKey } from "../../../common/api/support/user-query-key";
import { AxiosMethod } from "../../../common/api/types/axios-method";
import { GetUser } from "./get-user-info";

export function useGetUserInfo(hasToken?: boolean) {
  const query = useQuery({
    queryKey: [UserQueryKey.User, UserQueryKey.Info],
    queryFn: async () => fetcher(AxiosMethod.Get, ApiEntryPoint.user.profile, GetUser),
    enabled: hasToken ?? true,
  });

  const { data, ...rest } = query;

  return {
    user: data,
    ...rest,
  };
}
