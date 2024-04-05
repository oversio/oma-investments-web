import { z } from "zod";

const MAX_DESCRIPTION_LENGTH = 250;

export const CreateCompanySchema = z.object({
  name: z.string().trim().min(1, "Company name is required"),
  mnemonic: z.string().trim().min(1, "Mnemonic is required"),
  description: z
    .string()
    .max(MAX_DESCRIPTION_LENGTH, ` Máximo ${MAX_DESCRIPTION_LENGTH} caracteres para la descripción`)
    .optional()
    .nullable(),
  type: z.string().trim().min(1, "Company type is required"),
});

export type CreateCompanySchema = z.input<typeof CreateCompanySchema>;
