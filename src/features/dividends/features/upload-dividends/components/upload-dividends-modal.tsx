import { faUpFromLine } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { FileInput } from "../../../../../common/components/form/file-input/file-input";
import { RadioGroup, RadioGroupItem } from "../../../../../common/components/form/radio-group/radio-group";
import { ModalForm } from "../../../../../common/components/modal-form/modal-form";
import { ID } from "../../../../../common/types";
import { useUploadDividendsFile } from "../../../api/upload-dividends/use-upload-dividends-file";
import { UploadDividendsFileSchema } from "../form-schemas/upload-dividends-file-schema";

interface UploadDividendModalProps {
  companyId: ID | undefined;
  onClose: () => void;
}

export function UploadDividendModal({ companyId, onClose }: UploadDividendModalProps) {
  const { uploadDividends, isPending, isError } = useUploadDividendsFile(companyId);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
    return () => setIsOpen(false);
  }, []);

  const handleClose = async () => {
    setIsOpen(false);
    await new Promise(resolve => setTimeout(resolve, 200));
    onClose();
  };

  const form = useForm<UploadDividendsFileSchema>({
    defaultValues: {
      overwrite: "false",
    },
    resolver: zodResolver(UploadDividendsFileSchema),
  });

  const handleSubmit = async (input: UploadDividendsFileSchema) => {
    const overwrite = input.overwrite === "true";
    await uploadDividends({ file: input.file, overwrite }).then(onClose);
  };

  const overwriteOptions: RadioGroupItem[] = [
    {
      key: "add",
      label: "Agregar nuevos",
      value: "false",
      description: "Con esta opción se mantendrán los registros actuales y se agregarán los nuevos",
    },
    {
      key: "overwrite",
      label: "Reemplazar actuales",
      value: "true",
      description: "Con esta opción se eliminarán los registros actuales antes de cargar los nuevos",
    },
  ];

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={() => void handleClose()}
      formProps={form}
      onSubmit={handleSubmit}
      title="Importar dividendos"
      size="xl"
      submitButtonProps={{
        label: "Cargar",
        startContent: <FontAwesomeIcon icon={faUpFromLine} />,
        disabled: isError || isPending,
        isLoading: isPending,
      }}
    >
      <FileInput
        name="file"
        label="Archivo"
        placeholder="Arrastra y suelta tu archivo aquí o haz click para cargar"
        accept={{ "text/csv": [".csv"] }}
        helperText="Solo se permiten archivos CSV y tamaño máximo de 100KB"
      />
      <RadioGroup label="Modo de carga" name="overwrite" items={overwriteOptions} variant="block" />
    </ModalForm>
  );
}
