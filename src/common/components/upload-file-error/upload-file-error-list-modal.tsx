import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

import { ModalInfo } from "../modal-info/modal-info";
import { FileRowErrorProps } from "./upload-file-error-alert";

type UploadFileErrorListModalProps = {
  isOpen: boolean;
  errors: FileRowErrorProps[];
  onClose: () => void;
};
export function UploadFileErrorListModal({ errors, isOpen, onClose }: UploadFileErrorListModalProps) {
  return (
    <ModalInfo
      title={<h3 className="text-danger-300 text-medium font-semibold">Lista de errores</h3>}
      onClose={onClose}
      isOpen={isOpen}
      size="3xl"
      confirmButton={{ label: "Cerrar", onClick: onClose }}
    >
      <Table
        aria-label="Lista de errores en el archivo"
        isStriped
        isHeaderSticky
        classNames={{
          base: "max-h-[520px] overflow-scroll",
          table: "min-h-[420px]",
        }}
      >
        <TableHeader>
          <TableColumn key="line">Linea del archivo</TableColumn>
          <TableColumn key="errors">Errores encontrados</TableColumn>
        </TableHeader>
        <TableBody>
          {errors.map(({ line, errors: messages }) => (
            <TableRow key={line}>
              <TableCell>
                <div className="flex justify-center items-center">{line}</div>
              </TableCell>
              <TableCell>
                <ul className="list-disc">
                  {messages.map((message, i) => (
                    <li key={i} className="text-xs">
                      {message}
                    </li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ModalInfo>
  );
}
