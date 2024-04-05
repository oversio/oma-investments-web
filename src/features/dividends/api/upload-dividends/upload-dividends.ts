import { z } from "zod";

export const ApiUploadDividends = z.unknown();
export type ApiUploadDividends = z.infer<typeof ApiUploadDividends>;

export const UploadDividends = ApiUploadDividends.transform(data => data);
export type UploadDividends = z.infer<typeof UploadDividends>;
