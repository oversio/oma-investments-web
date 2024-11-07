import { DataTable } from "../../../../../../common/components/table/data-table/data-table";
import { GetProfitabilityResultsListItem } from "../../../../api/profitability-results-list/get-profitability-results-list-item";
import { useProfitabilityResultsListColumns } from "../../hooks/use-profitability-results-list-columns";

interface ProfitabilityResultsListProps {
  data: Array<GetProfitabilityResultsListItem>;
  isLoading?: boolean;
}

export function ProfitabilityResultsList({ data, isLoading }: ProfitabilityResultsListProps) {
  const columns = useProfitabilityResultsListColumns();

  return <DataTable data={data} columns={columns} isLoading={isLoading} name="profitability results list" />;
}
