import { createBrowserRouter, Outlet } from "react-router";

import { Layout } from "../common/components/layout/layout";
import { ProtectedRoute } from "../common/components/protected-route/protected-route";
import { ToastContainer } from "../common/components/toast/components/toast-container";
import { LoginPage } from "../features/auth/login-page";
import { CompanyDetailsPage } from "../features/companies/features/company-details/company-details-page";
import { CompanyListPage } from "../features/companies/features/company-list/company-list-page";
import { CreateCompanyPanel } from "../features/companies/features/create-company/create-company-panel";
import { DashboardPage } from "../features/dashboard/dashboard-page";
import { AddDividendPanel } from "../features/dividends/features/add-dividend/components/add-dividend-panel";
import { SettingsPage } from "../features/settings/settings-page";

export const router = createBrowserRouter([
  {
    element: (
      <>
        <Outlet />
        <ToastContainer />
      </>
    ),
    children: [
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            Component: DashboardPage,
          },
          {
            path: "companies",
            children: [
              {
                path: "",
                Component: CompanyListPage,
                children: [
                  {
                    path: "new",
                    Component: CreateCompanyPanel,
                  },
                ],
              },

              {
                path: ":id",
                Component: CompanyDetailsPage,
                children: [
                  {
                    path: "add-dividend",
                    Component: AddDividendPanel,
                  },
                ],
              },
            ],
          },
          {
            path: "settings",
            Component: SettingsPage,
          },
        ],
      },
      {
        path: "*",
        element: <div>Not found</div>,
      },
    ],
  },
]);
