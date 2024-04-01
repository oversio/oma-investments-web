import { z } from "zod";

export const ApiAddDividend = z.unknown();
export type ApiAddDividend = z.infer<typeof ApiAddDividend>;

export const AddDividend = ApiAddDividend.transform(data => {
  return data;
});

export type AddDividend = z.infer<typeof AddDividend>;
