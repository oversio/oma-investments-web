export const logError = (...errors: unknown[]) => {
  // TODO: Add Sentry or similar error logging here
  // eslint-disable-next-line no-console
  console.error(...errors);
};
