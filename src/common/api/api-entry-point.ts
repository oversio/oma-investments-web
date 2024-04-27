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
    generateProfitability: "/analysis/profitability/calculate",
    saveProfitability: "/analysis/profitability/save",
  },
  settings: {
    companyTypes: "/settings/company-types",
    dividendTypes: "/settings/dividend-types",
  },
};
