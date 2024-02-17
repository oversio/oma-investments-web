import { TableProps } from "@nextui-org/react";
import { ReactNode } from "react";

export const enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export interface Sorting<TApiSortCol, TUrlSortCol> {
  apiColumnName: TApiSortCol;
  urlColumnName: TUrlSortCol;
  order: SortOrder;
}

export type ColumnCellProps<T> = T & { isLoading: boolean };

export interface Column<TData, TApiSortCol, TUrlSortCol> {
  key: string;
  title?: ReactNode;
  align?: "center" | "start" | "end";
  sorting?: Sorting<TApiSortCol, TUrlSortCol>;
  component: (props: ColumnCellProps<TData>) => React.ReactNode | null;
  className?: string;
}

export type DataTableProps<TData, TApiSortCol, TUrlSortCol> = TableProps & {
  name: string;
  columns: Column<TData, TApiSortCol, TUrlSortCol>[];
  data: ReadonlyArray<TData>;
  isLoading?: boolean;
  defaultSortColumn?: TApiSortCol;
  defaultSortOrder?: SortOrder;
  onClickRow?: (data: TData) => void;
  className?: string;
};
