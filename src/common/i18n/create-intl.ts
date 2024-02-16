import { createIntl, createIntlCache } from "react-intl";

const intlCache = createIntlCache();

export const createNewIntl = (locale: string, messages: Record<string, string>) => {
  return createIntl({ locale, messages }, intlCache);
};
