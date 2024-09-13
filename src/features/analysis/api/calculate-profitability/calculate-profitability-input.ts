import { z } from "zod";

export interface CalculateProfitabilityInput {
  desiredProfitability: number;
  basedYearsOn: number;
  currentPrice: number;
  includeCurrentYear?: boolean;
}

export function calculateProfitabilityInputTransformer(
  data: CalculateProfitabilityInput,
): ApiCalculateProfitabilityInput {
  return {
    ...data,
    includeCurrentYear: data.includeCurrentYear ?? false,
  };
}

export const ApiCalculateProfitabilityInput = z.object({
  desiredProfitability: z.number(),
  basedYearsOn: z.number(),
  currentPrice: z.number(),
  includeCurrentYear: z.boolean(),
});

export type ApiCalculateProfitabilityInput = z.infer<typeof ApiCalculateProfitabilityInput>;
