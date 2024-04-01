import { z } from "zod";

export const AddDividendSchema = z.object({
  date: z.string({ required_error: "La fecha es requerida" }).min(1, "La fecha es requerida"),
  amount: z.string({ required_error: "El monto es requerido" }).min(1, "El monto debe ser mayor a cero"),
  typeId: z
    .string({ required_error: "El tipo de dividendo es requerido" })
    .min(1, "El tipo de dividendo es requerido"),
});

export type AddDividendSchema = z.infer<typeof AddDividendSchema>;
