import { TableColumnProps, TableProps } from "@nextui-org/react";
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

export type ColumnCellProps<TData, TContext> = TData & { isLoading: boolean; context?: TContext };

export interface Column<TData, TApiSortCol, TUrlSortCol, TContext = unknown> {
  key: string;
  context: TContext;
  width?: TableColumnProps<TData>["width"];
  title?: ReactNode;
  align?: "center" | "start" | "end";
  sorting?: Sorting<TApiSortCol, TUrlSortCol>;
  component: (props: ColumnCellProps<TData, TContext>) => React.ReactNode | null;
  className?: string;
}

export type DataTableProps<TData, TApiSortCol, TUrlSortCol, TContext> = TableProps & {
  name: string;
  columns: Column<TData, TApiSortCol, TUrlSortCol, TContext>[];
  data: ReadonlyArray<TData>;
  isLoading?: boolean;
  defaultSortColumn?: TApiSortCol;
  defaultSortOrder?: SortOrder;
  onClickRow?: (data: TData) => void;
  className?: string;
};
