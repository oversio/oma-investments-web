import { Alert } from "@nextui-org/react";
import { useState } from "react";

import { UploadFileErrorListModal } from "./upload-file-error-list-modal";

export type FileRowErrorProps = {
  line: number;
  errors: string[];
};
type UploadFileErrorAlertProps = {
  errors: FileRowErrorProps[];
};
export function UploadFileErrorAlert({ errors }: UploadFileErrorAlertProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Alert
        color="danger"
        title="Se encontraron algunos errores en el archivo"
        description={
          <p>
            Haz click{" "}
            <button
              className="text-medium font-semibold underline"
              type="button"
              onClick={() => setIsOpen(true)}
            >
              aquí
            </button>{" "}
            para ver el detalle
          </p>
        }
        className="mb-4"
        variant="flat"
      />
      <UploadFileErrorListModal isOpen={isOpen} errors={errors} onClose={() => setIsOpen(false)} />
    </>
  );
}
