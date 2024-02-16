import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

import { showToast } from "../components/toast/show-toast";
import { i18n } from "../i18n/i18n-provider";
import { logError } from "../logger/log-error";

const DEFAULT_STALE_TIME = 5 * 60 * 1000; // 5 minutes

const queryCache = new QueryCache({
  onError: (err, query) => {
    logError(err, query);
    showToast("error", i18n.intl.formatMessage({ id: "toast.query.generic.error.unknown" }));
  },
});

const mutationCache = new MutationCache({
  onError: (err, variables, context, mutation) => {
    logError(err, variables, context, mutation);
    showToast("error", i18n.intl.formatMessage({ id: "toast.mutation.generic.error.unknown" }));
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DEFAULT_STALE_TIME,
    },
    mutations: {
      retry: false,
    },
  },
  queryCache,
  mutationCache,
});
