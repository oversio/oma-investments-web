import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { queryClient } from "./api/generate-query-client";

export const ReactQueryDevTool = () => (
  <ReactQueryDevtools client={queryClient} initialIsOpen={false} buttonPosition="bottom-left" />
);
