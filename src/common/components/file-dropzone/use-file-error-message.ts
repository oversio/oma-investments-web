import { useCallback, useMemo } from "react";
import { DropzoneOptions, ErrorCode, FileRejection } from "react-dropzone";

type UserFileErrorMapProps = Required<Pick<DropzoneOptions, "maxFiles" | "maxSize">> & {
  accept: string[];
};

export function useFileErrorMessage({ accept, maxFiles, maxSize }: UserFileErrorMapProps) {
  const errorMap: Record<ErrorCode, string> = useMemo(
    () => ({
      [ErrorCode.FileInvalidType]: `El tipo de archivo no es válido, solo se permiten los siguientes tipos: [${accept.join(
        ", ",
      )}]`,
      [ErrorCode.FileTooLarge]: `El archivo es demasiado grande, el tamaño máximo permitido es de ${maxSize / 1024}MB.`,
      [ErrorCode.FileTooSmall]: "El archivo es demasiado pequeño.",
      [ErrorCode.TooManyFiles]: `Demasiados archivos. máximo ${maxFiles} archivos.`,
    }),
    [accept, maxFiles, maxSize],
  );

  return useCallback(
    (rejectedFiles: FileRejection[]) => {
      return rejectedFiles
        .map(({ file, errors }) => {
          return file.name + " - " + errors.map(({ code }) => errorMap[code as ErrorCode]).join(", ");
        })
        .flat();
    },
    [errorMap],
  );
}
