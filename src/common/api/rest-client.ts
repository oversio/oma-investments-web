import axios from "axios";
import Cookies from "js-cookie";

import { appConfig } from "../../app/app-config";
import { TOKEN_PARAM_NAME } from "../constants";

export const restClient = axios.create({
  baseURL: appConfig.apiBaseUrl,
});

restClient.interceptors.request.use(
  config => {
    const token = Cookies.get(TOKEN_PARAM_NAME);

    if (token) {
      config.headers["Authorization"] ??= `Bearer ${token}`.replace(/"/g, "");
    }

    return config;
  },
  error => Promise.reject(error),
);
