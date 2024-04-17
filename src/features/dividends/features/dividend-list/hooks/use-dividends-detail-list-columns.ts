import { useMemo } from "react";

import { Column } from "../../../../../common/components/table/data-table/types";
import { GetDividendDetailItem } from "../../../api/dividend-list/get-dividend-detail-item";
import { DividendAmountCell } from "../components/cells/dividend-amount-cell";
import { DividendDateCell } from "../components/cells/dividend-date-cell";
import { DividendTypeCell } from "../components/cells/dividend-type-cell";

export function useDividendsDetailListColumns() {
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
      ] as Column<GetDividendDetailItem, string, string, unknown>[],
    [],
  );
}
