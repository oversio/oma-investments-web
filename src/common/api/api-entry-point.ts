import { ID } from "../types";

export const ApiEntryPoint = {
  user: {
    profile: "/users/profile",
  },
  companies: {
    create: "/companies",
    list: "/companies",
    details: (companyId: ID | undefined) => `/companies/${companyId}`,
    dividends: {
      list: (companyId: ID | undefined) => `/companies/${companyId}/dividends`,
      add: (companyId: ID | undefined) => `/companies/${companyId}/dividends`,
      upload: (companyId: ID | undefined) => `/companies/${companyId}/dividends/upload`,
    },
  },
  analysis: {
    profitability: {
      list: (companyId: ID | undefined) => `/companies/${companyId}/analysis/profitability`,
      result: (companyId: ID | undefined, resultId: ID | undefined) =>
        `/companies/${companyId}/analysis/profitability/${resultId}`,
      save: (companyId: ID | undefined) => `/companies/${companyId}/analysis/profitability`,
      generate: (companyId: ID | undefined) => `/companies/${companyId}/analysis/profitability/calculate`,
    },
    solvency: {
      list: (companyId: ID | undefined) => `/companies/${companyId}/analysis/solvency`,
    },
  },
  settings: {
    all: "/settings",
    companyTypes: "/settings/company-types",
    dividendTypes: "/settings/dividend-types",
    indicators: "/settings/indicators",
    securityLevels: "/settings/security-levels",
    thresholdSettings: "/settings/threshold-settings",
  },
};
