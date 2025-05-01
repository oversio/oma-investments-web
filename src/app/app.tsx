import { NextUIProvider } from "@nextui-org/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";

import { queryClient } from "../common/api/generate-query-client";
import { LayoutContextProvider } from "../common/components/layout/context/layout-context-provider";
import { I18nProvider } from "../common/i18n/i18n-provider";
import { ReactQueryDevTool } from "../common/react-query-dev-tool";
import { AuthContextProvider } from "../context/context-provider";
import { router } from "./routes";

export function App() {
  return (
    <I18nProvider>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <AuthContextProvider>
            <LayoutContextProvider>
              <RouterProvider router={router} />
            </LayoutContextProvider>
          </AuthContextProvider>
        </NextUIProvider>
        <ReactQueryDevTool />
      </QueryClientProvider>
    </I18nProvider>
  );
}
