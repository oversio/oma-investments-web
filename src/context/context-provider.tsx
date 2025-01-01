import Cookies from "js-cookie";
import { PropsWithChildren, useCallback, useMemo } from "react";
import { useCookie } from "react-use";

import { appConfig } from "../app/app-config";
import { queryClient } from "../common/api/generate-query-client";
import { UserQueryKey } from "../common/api/support/user-query-key";
import { TOKEN_PARAM_NAME } from "../common/constants";
import { useGetUserInfo } from "../features/auth/api/use-get-user-info";
import { AuthenticationMethod } from "../features/auth/types";
import { AuthContext, AuthContextProps } from "./context";

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [token, , removeToken] = useCookie(TOKEN_PARAM_NAME);
  const { user, isLoading } = useGetUserInfo(Boolean(token));

  const login = (method: AuthenticationMethod, redirectTo: string = "/") => {
    Cookies.set("returnTo", redirectTo, {
      path: "/",
      sameSite: import.meta.env.DEV ? "lax" : "none",
      secure: !import.meta.env.DEV,
      domain: import.meta.env.DEV ? undefined : location.hostname,
    });

    setTimeout(() => {
      window.location.href = appConfig.getLoginUrl(method);
    }, 100);
  };

  const logout = useCallback(() => {
    removeToken();
    queryClient.removeQueries({
      queryKey: [UserQueryKey.User, UserQueryKey.Info],
    });
  }, [removeToken]);

  const contextValue = useMemo<AuthContextProps>(() => {
    if (user) {
      return {
        isAuthenticated: true,
        userInfo: user,
        login,
        logout,
      };
    }

    if (isLoading) {
      return {
        isAuthenticated: null,
        userInfo: null,
        login,
        logout,
      };
    }

    return {
      isAuthenticated: false,
      userInfo: null,
      login,
      logout,
    };
  }, [isLoading, logout, user]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
