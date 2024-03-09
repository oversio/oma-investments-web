import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

import { ID } from "../../../types";
import { classMerge } from "../../../utils/class-merge";
import { DataTableProps } from "./types";

const DEFAULT_LOADING_ROWS = 10;

export function DataTable<TData extends { readonly id: ID }, TApiSortCol, TUrlSortCol>({
  name,
  columns,
  data,
  isLoading,
  onClickRow,
  className,
}: DataTableProps<TData, TApiSortCol, TUrlSortCol>) {
  const records = isLoading
    ? (Array.from({ length: DEFAULT_LOADING_ROWS }).map((_, i) => ({ id: String(i) })) as TData[])
    : [...data];

  return (
    <Table
      aria-label={name}
      isHeaderSticky
      classNames={{
        base: "max-h-[520px] overflow-scroll",
      }}
      className={className}
    >
      <TableHeader>
        {columns.map(({ title, key, className }) => (
          <TableColumn key={String(key)}>
            <div className={classMerge(" flex items-center h-full uppercase", className)}>{title}</div>
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {records.map(item => (
          <TableRow
            key={item.id}
            onClick={() => onClickRow?.(item)}
            className={classMerge(" hover:bg-default-100", onClickRow && "cursor-pointer")}
          >
            {columns.map(({ key, component: Component }) => (
              <TableCell key={String(key)}>
                <Component {...item} isLoading={isLoading ?? false} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
