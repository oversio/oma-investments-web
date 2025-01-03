import "@tanstack/react-query";

interface QueryMeta extends Record<string, unknown> {
  i18nToastKey?: string;
}

declare module "@tanstack/react-query" {
  interface Register {
    queryMeta: QueryMeta;
    mutationMeta: QueryMeta;
  }
}
