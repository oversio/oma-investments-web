import { ColumnCellProps } from "../../../../common/components/table/data-table/types";
import { GetDividendDetailItem } from "../../api/dividend-list/get-dividend-detail-item";
import { GetDividendListItem } from "../../api/dividend-list/get-dividend-list-item";

export type DividendListCellProps = ColumnCellProps<GetDividendListItem, unknown>;
export type DividendDetailListCellProps = ColumnCellProps<GetDividendDetailItem, unknown>;
