import { PropsWithChildren, useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { appConfig } from "../app/app-config";
import { queryClient } from "../common/api/generate-query-client";
import { UserQueryKey } from "../common/api/support/user-query-key";
import { TOKEN_KEY_NAME, TOKEN_PARAM_NAME } from "../common/constants";
import { useLocalStorage } from "../common/hooks/use-local-storage";
import { useGetUserInfo } from "../features/auth/api/use-get-user-info";
import { AuthenticationMethod } from "../features/auth/types";
import { cleanStorage } from "../features/auth/utils/clean-storage";
import { AuthContext, AuthContextProps } from "./context";

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlToken = searchParams.get(TOKEN_PARAM_NAME);
  const [token, setToken] = useLocalStorage<string | undefined>(TOKEN_KEY_NAME, undefined);

  const { user, isLoading } = useGetUserInfo(Boolean(token));

  useEffect(() => {
    if (urlToken) {
      setToken(urlToken);
      searchParams.delete(TOKEN_PARAM_NAME);
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams, setToken, urlToken]);

  const isAuthenticated = useMemo(() => {
    if (user) return true;
    if (isLoading || urlToken) return null;
    return false;
  }, [isLoading, user, urlToken]);

  const login = (method: AuthenticationMethod, redirectTo?: string) => {
    window.location.href = appConfig.getLoginUrl(method, redirectTo);
  };

  const logout = useCallback(() => {
    queryClient.removeQueries({
      queryKey: [UserQueryKey.User, UserQueryKey.Info],
    });
    setToken("");
    cleanStorage();
  }, [setToken]);

  const contextValue = useMemo<AuthContextProps>(() => {
    if (isAuthenticated) {
      return {
        isAuthenticated: true,
        userInfo: user!,
        login,
        logout,
      };
    }

    return {
      isAuthenticated,
      userInfo: null,
      login,
      logout,
    };
  }, [isAuthenticated, logout, user]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
