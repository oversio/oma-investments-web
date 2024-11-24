import { z } from "zod";

import {
  ApiGetCompanyTypeListItem,
  getCompanyTypeListItemTransformer,
} from "../company-type/get-company-type-list-item";
import {
  ApiGetIndicatorListItem,
  getIndicatorListTransformer,
} from "../get-indicator-list/get-indicator-list";
import {
  ApiGetSecurityLevelItem,
  getSecurityLevelListTransformer,
} from "../get-security-levels-list/get-security-levels-list";
import {
  ApiGetThresholdSettingsItem,
  getThresholdSettingsListTransformer,
} from "../get-threshold-settings-list/get-threshold-settings-list";

export const ApiGetSecuritySettings = z.object({
  companyTypes: z.array(ApiGetCompanyTypeListItem),
  securityLevels: z.array(ApiGetSecurityLevelItem),
  indicators: z.array(ApiGetIndicatorListItem),
  thresholdSettings: z.array(ApiGetThresholdSettingsItem),
});

export type ApiGetSecuritySettings = z.infer<typeof ApiGetSecuritySettings>;

export function getSecuritySettingsTransformer<T extends z.infer<typeof ApiGetSecuritySettings>>({
  companyTypes,
  securityLevels,
  indicators,
  thresholdSettings,
}: T) {
  return {
    companyTypes: companyTypes.map(getCompanyTypeListItemTransformer),
    securityLevels: securityLevels.map(getSecurityLevelListTransformer),
    indicators: indicators.map(getIndicatorListTransformer),
    thresholdSettings: thresholdSettings.map(getThresholdSettingsListTransformer),
  };
}

export const GetSecuritySettings = ApiGetSecuritySettings.transform(getSecuritySettingsTransformer);
export type GetSecuritySettings = z.infer<typeof GetSecuritySettings>;
