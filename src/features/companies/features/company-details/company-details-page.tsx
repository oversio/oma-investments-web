import { Outlet, useParams } from "react-router";

import { Layout } from "../../../../common/components/layout/layout";
import { DividendListSection } from "../../../dividends/features/dividend-list/dividend-list-section";
import { CompanyActions } from "./components/company-actions";
import { CompanyDetailsTitle } from "./components/company-details-title";
import { RelevantFacts } from "./components/relevant-facts";

export function CompanyDetailsPage() {
  const { id } = useParams();

  return (
    <Layout>
      <div className="flex justify-between">
        <CompanyDetailsTitle companyId={id} />
        <CompanyActions />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <DividendListSection companyId={id} />
        <RelevantFacts companyId={id} />
      </div>
      <Outlet />
    </Layout>
  );
}
