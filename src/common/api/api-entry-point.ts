export const ApiEntryPoint = {
  user: {
    profile: "/users/profile",
  },
  companies: {
    create: "/companies",
    list: "/companies",
    details: "/companies/:id",
    addDividend: "/company/:id/dividends",
    dividendList: "/company/:id/dividends",
    uploadDividend: "/company/:id/dividends/upload",
  },
  analysis: {
    profitabilityResultsList: "/analysis/profitability",
    saveProfitability: "/analysis/profitability",
    generateProfitability: "/analysis/profitability/calculate",
  },
  settings: {
    companyTypes: "/settings/company-types",
    dividendTypes: "/settings/dividend-types",
  },
};
