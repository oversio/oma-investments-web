import { z } from "zod";

export const MIN_DESIRED_PROFITABILITY = 1;
export const MAX_DESIRED_PROFITABILITY = 99;
export const MIN_BASED_YEARS_ON = 3;
export const MAX_BASED_YEARS_ON = 10;

export const ProfitabilityAnalysisFormSchema = z.object({
  desiredProfitability: z
    .number()
    .min(MIN_DESIRED_PROFITABILITY, `Sube tus aspiraciones, al menos un ${MIN_DESIRED_PROFITABILITY}%`)
    .max(
      MAX_DESIRED_PROFITABILITY,
      `El máximo es ${MAX_DESIRED_PROFITABILITY}% pero vamos! seamos realistas no?`,
    ),
  basedYearsOn: z
    .number()
    .min(
      MIN_BASED_YEARS_ON,
      `Es necesario al menos unos ${MIN_BASED_YEARS_ON} años para hacer un buen análisis`,
    )
    .max(MAX_BASED_YEARS_ON, `El limite máximo son ${MAX_BASED_YEARS_ON} años`),
  currentPrice: z.number().min(1, "El precio actual no puede ser cero o negativo"),
  includeCurrentYear: z.boolean().optional(),
});

export type ProfitabilityAnalysisFormSchema = z.infer<typeof ProfitabilityAnalysisFormSchema>;
