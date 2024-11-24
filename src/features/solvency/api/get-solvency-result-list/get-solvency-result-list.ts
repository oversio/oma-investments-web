import { z } from "zod";

import { DateTime, HowGoodIsIt, ID } from "../../../../common/types";
import {
  ApiGetSolvencyIndicatorItem,
  getSolvencyIndicatorItemTransformer,
} from "./get-solvency-indicator-item";

export const ApiGetSolvencyResultListItem = z.object({
  _id: ID,
  date: DateTime,
  user: z.object({
    _id: ID,
    fullName: z.string(),
    email: z.string().email(),
  }),
  indicators: z.array(ApiGetSolvencyIndicatorItem),
  company: z.object({
    _id: ID,
    name: z.string(),
  }),
  companyType: z.object({
    _id: ID,
    name: z.string(),
  }),
  securityLevel: z.object({
    _id: ID,
    name: z.string(),
  }),
  solvency: z.nativeEnum(HowGoodIsIt),
  goodPrice: z.nativeEnum(HowGoodIsIt),
});
export type ApiGetSolvencyResultListItem = z.infer<typeof ApiGetSolvencyResultListItem>;

export function getSolvencyResultListItemTransformer<T extends z.infer<typeof ApiGetSolvencyResultListItem>>(
  data: T,
) {
  return {
    id: data._id,
    date: data.date,
    user: {
      id: data.user._id,
      name: data.user.fullName,
      email: data.user.email,
    },
    indicators: data.indicators.map(indicator => getSolvencyIndicatorItemTransformer(indicator)),
    company: {
      id: data.company._id,
      name: data.company.name,
    },
    companyType: {
      id: data.companyType._id,
      name: data.companyType.name,
    },
    securityLevel: {
      id: data.securityLevel._id,
      name: data.securityLevel.name,
    },
    solvency: data.solvency,
    goodPrice: data.goodPrice,
  };
}

export const GetSolvencyResultListItem = ApiGetSolvencyResultListItem.transform(
  getSolvencyResultListItemTransformer,
);
export type GetSolvencyResultListItem = z.infer<typeof GetSolvencyResultListItem>;
