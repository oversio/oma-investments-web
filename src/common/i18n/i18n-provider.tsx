import { RawIntlProvider } from "react-intl";

import { createNewIntl } from "./create-intl";
import { en } from "./locales/en";

export const i18n = {
  intl: createNewIntl(navigator.language, { ...en }),
};

type I18nProviderProps = {
  children: React.ReactNode;
};

export const I18nProvider = ({ children }: I18nProviderProps) => {
  return <RawIntlProvider value={i18n.intl}>{children}</RawIntlProvider>;
};
