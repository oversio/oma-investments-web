import { i18n } from "../i18n-provider";
import { TranslationKey } from "../locales/en";

export function isTranslationKey(key: string | undefined): key is TranslationKey {
  return key ? i18n.intl.messages[key] !== undefined : false;
}
