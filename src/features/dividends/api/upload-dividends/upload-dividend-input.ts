import { objectToForm } from "../../../../common/utils/object-to-form";

export interface UploadDividendInput {
  file: File;
  overwrite: boolean;
}

export function uploadDividendTransformer(input: UploadDividendInput) {
  return objectToForm({ ...input });
}
