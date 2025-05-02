import { Tab, Tabs } from "@heroui/react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";

import { useGetCompany } from "../../api/get-company/use-get-company";
import { CompanyNavbar } from "./components/company-navbar";

export function CompanyDetailsPage() {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { id } = useParams();
  const { data, isLoading, isError } = useGetCompany(id);

  const handleNavigate = (path: string) => {
    void navigate(path);
  };

  return (
    <div className="flex flex-col relative max-h-full">
      <div>
        <CompanyNavbar
          isLoading={isLoading || isError}
          companyName={data?.name}
          companyType={data?.type.name}
        />
        <Tabs
          selectedKey={pathname.split("/").pop()?.replace("/company/", "")}
          className=" mb-3"
          aria-label="Company tabs"
          color="primary"
          onSelectionChange={key => handleNavigate(key as string)}
        >
          <Tab key="dividends" title="Dividendos" />
          <Tab key="profitability" title="Rentabilidad" />
        </Tabs>
      </div>
      <div className="flex-1 overflow-y-auto w-full">
        <Outlet />
      </div>
    </div>
  );
}
