import { useMemo } from "react";

import { Column } from "../../../../../common/components/table/data-table/types";
import { GetCompanyListItem } from "../../../api/companies-list/get-company-list-item";
import { CompanyListDateCell } from "../components/cells/company-list-date-cell";
import { CompanyListMnemonicCell } from "../components/cells/company-list-mnemonic-cell";
import { CompanyListNameCell } from "../components/cells/company-list-name-cell";
import { CompanyListTypeCell } from "../components/cells/company-list-type-cell";
import { CompanyListApiColumn } from "../types/company-list-api-column";
import { CompanyListUrlColumn } from "../types/company-list-url-column";

export function useCompanyListColumns() {
  return useMemo(() => {
    return [
      {
        key: "name",
        title: "Name",
        align: "start",
        sorting: {
          apiColumnName: CompanyListApiColumn.Name,
          urlColumnName: CompanyListUrlColumn.Name,
          order: "asc",
        },
        component: CompanyListNameCell,
      },
      {
        key: "mnemonic",
        title: "Mnemonic",
        align: "start",
        sorting: {
          apiColumnName: CompanyListApiColumn.Mnemonic,
          urlColumnName: CompanyListUrlColumn.Mnemonic,
          order: "asc",
        },
        component: CompanyListMnemonicCell,
        width: "10%",
      },
      {
        key: "type",
        title: "Type",
        align: "start",
        sorting: {
          apiColumnName: CompanyListApiColumn.Type,
          urlColumnName: CompanyListUrlColumn.Type,
          order: "asc",
        },
        component: CompanyListTypeCell,
        className: " justify-center",
        width: "15%",
      },
      {
        key: "created-at",
        title: "Created At",
        align: "center",
        sorting: {
          apiColumnName: CompanyListApiColumn.CreatedAt,
          urlColumnName: CompanyListUrlColumn.CreatedAt,
          order: "asc",
        },
        component: CompanyListDateCell,
        className: " justify-center",
        width: "15%",
      },
      {
        key: "updated-at",
        title: "Updated At",
        align: "start",
        sorting: {
          apiColumnName: CompanyListApiColumn.UpdatedAt,
          urlColumnName: CompanyListUrlColumn.UpdatedAt,
          order: "asc",
        },
        component: CompanyListDateCell,
        className: " justify-center",
        width: "15%",
      },
    ] as Column<GetCompanyListItem, CompanyListApiColumn, CompanyListUrlColumn>[];
  }, []);
}
