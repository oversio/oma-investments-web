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
      save: (companyId: ID | undefined) => `/companies/${companyId}/analysis/profitability`,
      generate: (companyId: ID | undefined) => `/companies/${companyId}/analysis/profitability/calculate`,
    },
  },
  settings: {
    companyTypes: "/settings/company-types",
    dividendTypes: "/settings/dividend-types",
  },
};
