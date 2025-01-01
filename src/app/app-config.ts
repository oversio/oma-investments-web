import OMAWhiteLogoSvg from "../assets/logos/red-white-logo.svg";
import { AuthenticationMethod } from "../features/auth/types";

export const appConfig = {
  logo: {
    svgWhite: OMAWhiteLogoSvg,
  },
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string,
  getLoginUrl: (method: AuthenticationMethod) => {
    return `${appConfig.apiBaseUrl}/auth/${method}`;
  },
};
