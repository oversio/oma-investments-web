import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router";

import { useLayoutContext } from "../../../../common/components/layout/context/layout-context";
import { DividendListSection } from "../../../dividends/features/dividend-list/dividend-list-section";
import { ProfitabilityResultsListSection } from "../../../profitability/features/profitability-analysis/components/profitability-results-list/profitability-results-section";
import { useGetCompany } from "../../api/get-company/use-get-company";
import { CompanyTypeBadge } from "../../components/company-type-badge";
import { CompanyActions } from "./components/company-actions";

export function CompanyDetailsPage() {
  const navigator = useNavigate();
  const { id } = useParams();
  const { setNavbarTitle, setNavbarLeftButton } = useLayoutContext();
  const { data, isLoading, isError } = useGetCompany(id);

  useEffect(() => {
    setNavbarTitle({
      title: data?.name + ` (${data?.mnemonic})`,
      color: "violet",
      isLoading: isLoading || isError,
      endContent: <CompanyTypeBadge typeName={data?.type.name ?? ""} isLoading={isLoading} />,
    });
  }, [data, isError, isLoading, setNavbarTitle]);

  useEffect(() => {
    setNavbarLeftButton({
      onPress: () => navigator(".."),
    });
  }, [navigator, setNavbarLeftButton]);

  return (
    <>
      <div className="flex justify-end mb-2">
        <CompanyActions />
      </div>
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
