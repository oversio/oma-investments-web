import { faPlusCircle } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet } from "react-router";

import { Layout } from "../../../../common/components/layout/layout";
import { Link } from "../../../../common/components/link/link";
import { CompanyList } from "./components/company-list";

export function CompanyListPage() {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-5">
        <h2 className=" text-3xl">Companies list</h2>
        <Link to="create" color="primary" startContent={<FontAwesomeIcon icon={faPlusCircle} />}>
          Add company
        </Link>
      </div>
      <CompanyList />
      <Outlet />
    </Layout>
  );
}
