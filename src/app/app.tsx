import { NextUIProvider } from "@nextui-org/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { queryClient } from "../common/api/generate-query-client";
import { Layout } from "../common/components/layout/layout";
import { ProtectedRoute } from "../common/components/protected-route/protected-route";
import { ToastContainer } from "../common/components/toast/components/toast-container";
import { I18nProvider } from "../common/i18n/i18n-provider";
import { ReactQueryDevTool } from "../common/react-query-dev-tool";
import { AuthContextProvider } from "../context/context-provider";
import { LoginPage } from "../features/auth/login-page";
import { CompanyListPage } from "../features/companies/features/companies-list/company-list-page";
import { CompanyDetailsPage } from "../features/companies/features/company-details/company-details-page";
import { CreateCompanyPanel } from "../features/companies/features/create-company/create-company-panel";
import { DashboardPage } from "../features/dashboard/dashboard-page";
import { AddDividendPanel } from "../features/dividends/features/add-dividend/components/add-dividend-panel";
import { SettingsPage } from "../features/settings/settings-page";

export function App() {
  return (
    <I18nProvider>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <BrowserRouter>
            <AuthContextProvider>
              <Routes>
                <Route
                  element={
                    <>
                      <Outlet />
                      <ToastContainer />
                    </>
                  }
                >
                  <Route path="/login" element={<LoginPage />} />

                  <Route path="/" element={<ProtectedRoute />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="companies">
                      <Route path="" element={<CompanyListPage />}>
                        <Route path="create" element={<CreateCompanyPanel />} />
                      </Route>
                      <Route path=":id" element={<Layout />}>
                        <Route path="" element={<CompanyDetailsPage />}>
                          <Route path="add-dividend" element={<AddDividendPanel />} />
                        </Route>
                      </Route>
                    </Route>
                    <Route path="settings" element={<SettingsPage />} />
                  </Route>
                  <Route path="*" element={<div>Not found</div>} />
                </Route>
              </Routes>
            </AuthContextProvider>
          </BrowserRouter>
        </NextUIProvider>
        <ReactQueryDevTool />
      </QueryClientProvider>
    </I18nProvider>
  );
}
