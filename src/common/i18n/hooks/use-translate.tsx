import { useIntl } from "react-intl";

import { TranslationKey } from "../locales/en";

export function useTranslate() {
  const intl = useIntl();

  return (key: TranslationKey, values?: Record<string, string | number>): string => {
    return intl.formatMessage({ id: key }, values);
  };
}
