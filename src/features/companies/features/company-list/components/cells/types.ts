import { ColumnCellProps } from "../../../../../../common/components/table/data-table/types";
import { GetCompanyListItem } from "../../../../api/companies-list/get-company-list-item";

export type CompanyListCellProps = ColumnCellProps<GetCompanyListItem, unknown>;
