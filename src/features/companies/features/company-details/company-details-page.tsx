import { Outlet, useParams } from "react-router";

import { DividendListSection } from "../../../dividends/features/dividend-list/dividend-list-section";
import { ProfitabilityResultsListSection } from "../../../profitability/features/profitability-analysis/components/profitability-results-list/profitability-results-section";
import { useGetCompany } from "../../api/get-company/use-get-company";
import { CompanyNavbar } from "./components/company-navbar";

export function CompanyDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetCompany(id);

  return (
    <>
      <CompanyNavbar
        isLoading={isLoading || isError}
        companyName={data?.name}
        companyType={data?.type.name}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 md:gap-x-3">
        <DividendListSection companyId={id} />
        <div className=" col-span-1 md:col-span-2">
          <ProfitabilityResultsListSection companyId={id} />
        </div>
      </div>
      <Outlet />
    </>
  );
}
