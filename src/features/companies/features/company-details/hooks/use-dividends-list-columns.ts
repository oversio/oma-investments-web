import { useMemo } from "react";

import { Column } from "../../../../../common/components/table/data-table/types";
import { GetDividend } from "../../../api/company-details/get-dividends";
import { DividendAmountCell } from "../components/cells/dividend-amount-cell";
import { DividendDateCell } from "../components/cells/dividend-date-cell";

export function useDividendsListColumns() {
  return useMemo(
    () =>
      [
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
          align: "start",
          sorting: {
            apiColumnName: "amount",
            order: "asc",
          },
          component: DividendAmountCell,
        },
      ] as Column<GetDividend, string, string>[],
    [],
  );
}
