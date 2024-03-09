import { z } from "zod";

export const ApiCreateCompany = z.object({
  _id: z.string(),
  name: z.string(),
  mnemonic: z.string().toUpperCase(),
});

export type ApiCreateCompany = z.input<typeof ApiCreateCompany>;

export function createCompanyTransformer<T extends z.infer<typeof ApiCreateCompany>>({ _id, ...data }: T) {
  return {
    ...data,
    id: _id,
  };
}

export const CreateCompany = ApiCreateCompany.transform(createCompanyTransformer);
export type CreateCompany = z.infer<typeof CreateCompany>;
