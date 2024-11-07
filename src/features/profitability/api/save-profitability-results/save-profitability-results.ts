import { z } from "zod";

export const ApiSaveProfitabilityResults = z.unknown();
export type ApiSaveProfitabilityResults = z.infer<typeof ApiSaveProfitabilityResults>;

export const SaveProfitabilityResults = ApiSaveProfitabilityResults.transform(data => data);
export type SaveProfitabilityResults = z.infer<typeof SaveProfitabilityResults>;
