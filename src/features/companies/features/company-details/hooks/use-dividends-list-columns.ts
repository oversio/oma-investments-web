import { useMemo } from "react";

import { Column } from "../../../../../common/components/table/data-table/types";
import { GetDividendListItem } from "../../../../dividends/features/dividend-list/api/get-dividend-list-item";
import { DividendAmountCell } from "../../../../dividends/features/dividend-list/components/cells/dividend-amount-cell";
import { DividendDateCell } from "../../../../dividends/features/dividend-list/components/cells/dividend-date-cell";
import { DividendTypeCell } from "../../../../dividends/features/dividend-list/components/cells/dividend-type-cell";

export function useDividendsListColumns() {
  return useMemo(
    () =>
      [
        {
          key: "type",
          title: "Tipo",
          align: "start",
          sorting: {
            apiColumnName: "type.name",
            order: "asc",
          },
          component: DividendTypeCell,
        },
        {
          key: "date",
          title: "Fecha de pago",
          align: "start",
          sorting: {
            apiColumnName: "date",
            order: "asc",
          },
          component: DividendDateCell,
        },
        {
          key: "amount",
          title: "Monto pagado",
          align: "end",
          sorting: {
            apiColumnName: "amount",
            order: "asc",
          },
          component: DividendAmountCell,
        },
      ] as Column<GetDividendListItem, string, string>[],
    [],
  );
}
