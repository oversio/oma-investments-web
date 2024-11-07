import { useMemo } from "react";

import { Column } from "../../../../../common/components/table/data-table/types";
import { GetProfitabilityResultsListItem } from "../../../api/profitability-results-list/get-profitability-results-list-item";
import { ProfitabilityResultsListCalculatedCell } from "../components/profitability-results-list/cells/profitability-results-list-calculated-cell";
import { ProfitabilityResultsListDateCell } from "../components/profitability-results-list/cells/profitability-results-list-date-cell";
import { ProfitabilityResultsListDesiredCell } from "../components/profitability-results-list/cells/profitability-results-list-desired-cell";

export function useProfitabilityResultsListColumns() {
  return useMemo(() => {
    return [
      {
        key: "desired-profitability",
        title: "Rent. Buscada",
        align: "start",
        component: ProfitabilityResultsListDesiredCell,
      },
      {
        key: "calculated-profitability",
        title: "Rent. Calculada",
        align: "start",
        component: ProfitabilityResultsListCalculatedCell,
      },
      {
        key: "date",
        title: "Fecha",
        align: "start",
        component: ProfitabilityResultsListDateCell,
      },
    ] as Column<GetProfitabilityResultsListItem, string, string, unknown>[];
  }, []);
}
