import { z } from "zod";

export const UploadDividendsFileSchema = z.object({
  file: z.instanceof(File, { message: "Debes seleccionar un archivo" }),
  overwrite: z.union([z.literal("true"), z.literal("false")]).optional(),
});

export type UploadDividendsFileSchema = z.infer<typeof UploadDividendsFileSchema>;
