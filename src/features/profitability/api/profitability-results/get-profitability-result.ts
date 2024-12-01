import { z } from "zod";

import {
  ApiGetProfitabilityResultsListItem,
  getProfitabilityResultsListTransformer,
} from "../profitability-results-list/get-profitability-results-list-item";

export const ApiGetProfitabilityResult = ApiGetProfitabilityResultsListItem.extend({});
export type ApiGetProfitabilityResult = z.infer<typeof ApiGetProfitabilityResult>;

export const GetProfitabilityResult = ApiGetProfitabilityResult.transform(
  getProfitabilityResultsListTransformer,
);
export type GetProfitabilityResult = z.infer<typeof GetProfitabilityResult>;
