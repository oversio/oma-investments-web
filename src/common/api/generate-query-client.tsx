import { MutationCache, QueryCache, QueryClient, QueryMeta } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { showToast } from "../components/toast/show-toast";
import { i18n } from "../i18n/i18n-provider";
import { isTranslationKey } from "../i18n/utils/is-translation-key";
import { logError } from "../logger/log-error";
import { FileValidationErrors } from "./errors/file-validation-errors";
import { ValidationErrors } from "./errors/validation-errors";

const DEFAULT_STALE_TIME = 5 * 60 * 1000; // 5 minutes

const getTranslationErrorKey = (error: unknown, type: "query" | "mutation", meta: QueryMeta | undefined) => {
  const errorCode = error instanceof AxiosError ? error.response?.status : undefined;

  let key = meta?.i18nToastKey && `toast.${type}.${meta.i18nToastKey}.${errorCode ?? "unknown"}`;

  if (!key || !isTranslationKey(key)) {
    key = `toast.${type}.generic.error.${errorCode ?? "unknown"}`;
    if (errorCode && !isTranslationKey(key)) {
      key = `toast.${type}.generic.error.unknown`;
    }
  }

  return key;
};

const queryCache = new QueryCache({
  onError: (err, query) => {
    logError(err, query);
    showToast("error", i18n.intl.formatMessage({ id: getTranslationErrorKey(err, "query", query.meta) }));
  },
});

const mutationCache = new MutationCache({
  onError: (err, variables, _ctx, mutation) => {
    if (!(err instanceof ValidationErrors) && !(err instanceof FileValidationErrors)) {
      logError(err, variables, mutation.mutationId, mutation.meta);
      showToast(
        "error",
        i18n.intl.formatMessage({ id: getTranslationErrorKey(err, "mutation", mutation.meta) }),
      );
    }
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
