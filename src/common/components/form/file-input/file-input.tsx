import { faTrash } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@nextui-org/react";
import { DropzoneOptions } from "react-dropzone";
import { useController } from "react-hook-form";

import { Button } from "../../button/button";
import { FileDropzone } from "../../file-dropzone/file-dropzone";

interface FileInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  accept?: DropzoneOptions["accept"];
  helperText?: string;
  disabled?: boolean;
  onChange?: (files?: File) => void;
}

export function FileInput({
  name,
  label,
  placeholder,
  accept,
  helperText,
  disabled,
  onChange,
}: FileInputProps) {
  const {
    field,
    fieldState: { error },
  } = useController({ name });
  const currentValue = field.value as File | undefined;

  const handleSelectFile = (files: File[]) => {
    field.onChange(files[0]);
    onChange?.(files[0]);
  };

  const handleRemoveFile = () => {
    field.onChange(undefined);
    onChange?.();
  };

  return (
    <div>
      <FileDropzone
        onDrop={handleSelectFile}
        accept={accept}
        helperText={error?.message ?? helperText}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
      />
      <div className="mt-2 min-h-[40px] flex flex-col">
        <h4 className=" text-foreground-600">Archivo(s) seleccionado(s)</h4>
        <p className="flex justify-between items-center">
          {currentValue ? (
            <>
              <span className="text-primary"> {currentValue.name}</span>
              <Tooltip content="Eliminar archivo" placement="top">
                <Button isIconOnly onPress={handleRemoveFile} color="danger" variant="flat">
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Tooltip>
            </>
          ) : (
            <span className=" text-foreground-500 text-sm">No hay archivos seleccionados</span>
          )}
        </p>
      </div>
    </div>
  );
}
