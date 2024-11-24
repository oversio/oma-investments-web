import { useMemo } from "react";

import { Column } from "../../../../../common/components/table/data-table/types";
import { GetProfitabilityResultsListItem } from "../../../api/profitability-results-list/get-profitability-results-list-item";
import { ProfitabilityResultsListCalculatedCell } from "../components/profitability-results-list/cells/profitability-results-list-calculated-cell";
import { ProfitabilityResultsListDateCell } from "../components/profitability-results-list/cells/profitability-results-list-date-cell";
import { ProfitabilityResultsListDesiredCell } from "../components/profitability-results-list/cells/profitability-results-list-desired-cell";
import { ProfitabilityResultsListPriceCell } from "../components/profitability-results-list/cells/profitability-results-list-price-cell";
import { ProfitabilityResultsListYearsCell } from "../components/profitability-results-list/cells/profitability-results-list-years-cell";

export function useProfitabilityResultsListColumns() {
  return useMemo(() => {
    return [
      {
        key: "date",
        title: "Fecha",
        className: "justify-center",
        component: ProfitabilityResultsListDateCell,
      },
      {
        key: "price",
        title: "Precio",
        className: "justify-center",
        component: ProfitabilityResultsListPriceCell,
      },
      {
        key: "years",
        title: "Años",
        className: "justify-center",
        component: ProfitabilityResultsListYearsCell,
      },
      {
        key: "desired-profitability",
        title: "Rent. Buscada",
        className: "justify-center",
        component: ProfitabilityResultsListDesiredCell,
      },
      {
        key: "calculated-profitability",
        title: "Rent. Calculada",
        className: "justify-center",
        component: ProfitabilityResultsListCalculatedCell,
      },
    ] as Column<GetProfitabilityResultsListItem, string, string, unknown>[];
  }, []);
}
