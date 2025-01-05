import { faPlusCircle } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Outlet } from "react-router";

import { appConfig } from "../../../../app/app-config";
import { useLayoutContext } from "../../../../common/components/layout/context/layout-context";
import { LinkButton } from "../../../../common/components/link/link";
import { CompanyList } from "./components/company-list";

export function CompanyListPage() {
  const { setNavbarTitle, setNavbarLeftButton } = useLayoutContext();

  useEffect(() => {
    setNavbarTitle({
      title: appConfig.name,
      color: "violet",
    });
    setNavbarLeftButton(undefined);
  }, [setNavbarLeftButton, setNavbarTitle]);

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h2 className=" text-3xl">Companies list</h2>
        <LinkButton to="new" color="primary" startContent={<FontAwesomeIcon icon={faPlusCircle} />}>
          Add company
        </LinkButton>
      </div>
      <CompanyList />
      <Outlet />
    </>
  );
}
