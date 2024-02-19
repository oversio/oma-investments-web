import OMAWhiteLogoSvg from "../assets/logos/red-white-logo.svg";
import { AuthenticationMethod } from "../features/auth/types";

export const appConfig = {
  logo: {
    svgWhite: OMAWhiteLogoSvg,
  },
  apiBaseUrl: "http://localhost:3001/api",
  getLoginUrl: (method: AuthenticationMethod, redirectTo?: string) => {
    const redirect = redirectTo ?? window.location.origin;
    return `${appConfig.apiBaseUrl}/auth/${method}?redirectTo=${redirect}`;
  },
};
