import { Outlet, useParams } from "react-router";

import { ProfitabilityResultsListSection } from "../../../analysis/features/profitability-analysis/components/profitability-results-list/profitability-results-section";
import { DividendListSection } from "../../../dividends/features/dividend-list/dividend-list-section";
import { CompanyActions } from "./components/company-actions";
import { CompanyDetailsTitle } from "./components/company-details-title";

export function CompanyDetailsPage() {
  const { id } = useParams();

  return (
    <>
      <div className="flex justify-between">
        <CompanyDetailsTitle companyId={id} />
        <CompanyActions />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 md:gap-x-3">
        <DividendListSection companyId={id} />
        <ProfitabilityResultsListSection companyId={id} />
      </div>
      <Outlet />
    </>
  );
}
