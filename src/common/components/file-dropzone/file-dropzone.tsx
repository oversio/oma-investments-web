import { faCloudSlash, faCloudUpload } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from "@nextui-org/react";
import { ReactNode, useMemo, useState } from "react";
import { DropEvent, DropzoneOptions, FileRejection, useDropzone } from "react-dropzone";

import { classMerge } from "../../utils/class-merge";
import { DropzoneHelperMessage } from "./dropzone-helper-message";
import { useFileErrorMessage } from "./use-file-error-message";

type FileDropzoneProps = DropzoneOptions & {
  dragActiveMessage?: string;
  label?: ReactNode;
  placeholder?: string;
  isLoading?: boolean;
  isSubmitting?: boolean;
  isError?: boolean;
  helperText?: string;
};

export function FileDropzone({
  onDrop,
  dragActiveMessage,
  label,
  placeholder,
  isLoading,
  disabled,
  isSubmitting,
  helperText,
  isError,
  ...props
}: FileDropzoneProps) {
  const [errorMessage, setErrorMessage] = useState<string[] | null>(null);
  const types = Object.values(props.accept ?? {}).flat();

  const getFileErrorMessage = useFileErrorMessage({
    accept: types ?? [],
    maxFiles: props.maxFiles ?? 0,
    maxSize: props.maxSize ?? 0,
  });

  const { getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept } = useDropzone({
    onDrop: (files: File[], rejected: FileRejection[], event: DropEvent) => {
      if (rejected.length) {
        const message = getFileErrorMessage(rejected);
        setErrorMessage(message);
      }
      onDrop?.(files, rejected, event);
    },
    ...props,
    disabled: disabled || isSubmitting,
  });

  const dragMessage = useMemo(() => {
    setErrorMessage(null);
    if (isDragReject) return "Algo no esta bien con el archivo!";
    if (isDragAccept) return dragActiveMessage ?? "Suéltalo aquí ...";
  }, [dragActiveMessage, isDragAccept, isDragReject]);

  const helperMessage = errorMessage ?? helperText;

  return (
    <>
      <div
        {...getRootProps({
          className: "flex flex-col gap-2",
        })}
      >
        <input {...getInputProps()} />
        {label && <label className=" text-foreground-500 font-medium">{label}</label>}
        <div
          className={classMerge(
            " w-full min-h-[130px] border-2 text-foreground border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-content1 px-4 cursor-pointer",
            isDragReject ? "border-danger" : "",
            isDragAccept ? "border-secondary" : "",
          )}
        >
          <h5 className=" flex justify-center items-center flex-col gap-3">
            {isLoading ? (
              <Spinner />
            ) : (
              <FontAwesomeIcon
                icon={isDragReject ? faCloudSlash : faCloudUpload}
                size="xl"
                className={classMerge(
                  isDragAccept ? "text-secondary" : "",
                  isDragReject ? "text-danger" : "",
                )}
              />
            )}
            <span
              className={classMerge(
                " text-center font-medium text-foreground-400",
                isDragAccept ? "text-secondary" : "",
                isDragReject ? "text-danger" : "",
              )}
            >
              {isDragActive ? dragMessage : placeholder}
            </span>
          </h5>
        </div>
      </div>
      <DropzoneHelperMessage
        helperMessage={helperMessage}
        isError={Boolean(errorMessage) || (isError ?? false)}
      />
    </>
  );
}
