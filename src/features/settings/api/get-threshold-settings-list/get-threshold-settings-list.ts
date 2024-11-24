import { z } from "zod";

import { ID } from "../../../../common/types";

export const ApiGetThresholdSettingsItem = z.object({
  _id: ID,
  companyTypeId: ID,
  securityLevelId: ID,
  indicatorId: ID,
  max: z.number(),
  min: z.number(),
  isActive: z.boolean(),
});
export type ApiGetThresholdSettingsItem = z.input<typeof ApiGetThresholdSettingsItem>;

export function getThresholdSettingsListTransformer<T extends z.infer<typeof ApiGetThresholdSettingsItem>>({
  _id,
  ...data
}: T) {
  return {
    ...data,
    id: _id,
  };
}

export const GetThresholdSettingsItem = ApiGetThresholdSettingsItem.transform(
  getThresholdSettingsListTransformer,
);
export type GetThresholdSettingsItem = z.infer<typeof GetThresholdSettingsItem>;
