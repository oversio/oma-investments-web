export interface CreateCompanyInput {
  name: string;
  mnemonic: string;
  description?: string | null;
  type: string;
}

export function createCompanyInputTransformer({
  description,
  ...data
}: CreateCompanyInput): ApiCreateCompanyInput {
  return { ...data, description: description ?? null };
}

export interface ApiCreateCompanyInput {
  name: string;
  mnemonic: string;
  description?: string | null;
  type: string;
}
