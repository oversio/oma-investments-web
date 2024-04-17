import { useMemo } from "react";

import { Column } from "../../../../../common/components/table/data-table/types";
import { DividendListActionCell } from "../components/cells/dividend-list-action-cell";
import { DividendTotalCell } from "../components/cells/dividend-total-cell";
import { DividendYearCell } from "../components/cells/dividend-year-cell";
import { GetDividendListItem } from "./../../../api/dividend-list/get-dividend-list-item";

export function useDividendsListColumns() {
  return useMemo(
    () =>
      [
        {
          key: "year",
          title: "Año",
          align: "start",
          className: " justify-center",
          component: DividendYearCell,
        },
        {
          key: "total",
          title: "Total",
          className: " justify-center",
          component: DividendTotalCell,
        },
        {
          key: "actions",
          title: "",
          align: "end",
          className: " justify-end",
          component: DividendListActionCell,
        },
      ] as Column<GetDividendListItem, string, string, unknown>[],
    [],
  );
}
