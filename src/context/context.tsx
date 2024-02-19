import { createContext, useContext } from "react";

import { GetUser } from "../features/auth/api/get-user-info";
import { AuthenticationMethod } from "../features/auth/types";

type ContextMethods = {
  login: (method: AuthenticationMethod, redirectTo?: string) => void;
  logout: () => void;
};
type UnauthenticatedUserState = ContextMethods & {
  isAuthenticated: false;
  userInfo: null;
};

type LoadingAuthenticationState = ContextMethods & {
  isAuthenticated: null;
  userInfo: null;
};

type AuthenticatedUserState = ContextMethods & {
  isAuthenticated: true;
  userInfo: GetUser;
};

export type AuthContextProps = UnauthenticatedUserState | LoadingAuthenticationState | AuthenticatedUserState;

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  userInfo: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (_method: AuthenticationMethod) => null,
  logout: () => null,
});

AuthContext.displayName = "AuthContext";

export const useAuthContext = () => useContext(AuthContext);
