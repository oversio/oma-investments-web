import axios from "axios";

import { appConfig } from "../../app/app-config";
import { TOKEN_KEY_NAME, TOKEN_TYPE_KEY_NAME } from "../constants";

export const restClient = axios.create({
  baseURL: appConfig.apiBaseUrl,
});

restClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem(TOKEN_KEY_NAME);
    const tokenType = localStorage.getItem(TOKEN_TYPE_KEY_NAME) ?? "Bearer";

    if (token) {
      config.headers["Authorization"] ??= `${tokenType} ${token}`.replace(/"/g, "");
    }

    return config;
  },
  error => Promise.reject(error),
);
