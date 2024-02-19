import { NextUIProvider } from "@nextui-org/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";

import { queryClient } from "../common/api/generate-query-client";
import { Layout } from "../common/components/layout/layout";
import { ToastContainer } from "../common/components/toast/components/toast-container";
import { I18nProvider } from "../common/i18n/i18n-provider";
import { AuthContextProvider } from "../context/context-provider";
import { LoginPage } from "../features/auth/login-page";
import { CompanyListPage } from "../features/companies/features/company-list/company-list-page";
import { DashboardPage } from "../features/dashboard/dashboard-page";
import { SettingsPage } from "../features/settings/settings-page";

export function App() {
  const navigate = useNavigate();

  return (
    <I18nProvider>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider navigate={navigate}>
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
                <Route path="/" element={<Layout />}>
                  <Route path="" element={<DashboardPage />} />
                  <Route path="companies" element={<CompanyListPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>
              </Route>
            </Routes>
          </AuthContextProvider>
        </NextUIProvider>
      </QueryClientProvider>
    </I18nProvider>
  );
}
