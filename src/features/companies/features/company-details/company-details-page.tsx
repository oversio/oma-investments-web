import { useState } from "react";
import { Outlet, useParams } from "react-router";

import { AnalysisProfitabilityModal } from "../../../analysis/features/profitability-analysis/analysis-profitability-modal";
import { DividendListSection } from "../../../dividends/features/dividend-list/dividend-list-section";
import { CompanyActions, CompanyActionType } from "./components/company-actions";
import { CompanyDetailsTitle } from "./components/company-details-title";

export function CompanyDetailsPage() {
  const { id } = useParams();
  const [openProfitabilityModal, setOpenProfitabilityModal] = useState(false);

  const handleActionClick = (type: CompanyActionType) => {
    if (type === "profitability") setOpenProfitabilityModal(true);
  };

  return (
    <>
      <div className="flex justify-between">
        <CompanyDetailsTitle companyId={id} />
        <CompanyActions onActionClick={handleActionClick} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 md:gap-x-3">
        <DividendListSection companyId={id} />
      </div>
      {openProfitabilityModal && (
        <AnalysisProfitabilityModal companyId={id} onClose={() => setOpenProfitabilityModal(false)} />
      )}
      <Outlet />
    </>
  );
}
