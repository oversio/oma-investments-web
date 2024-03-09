import { faPlus } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet, useParams } from "react-router";

import { Layout } from "../../../../common/components/layout/layout";
import { Link } from "../../../../common/components/link/link";
import { DividendsList } from "../../../dividends/features/dividend-list/components/dividends-list";
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
        <section className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h3 className=" text-2xl mb-2">Dividendos pagados</h3>
            <Link to="add-dividend" startContent={<FontAwesomeIcon icon={faPlus} />} color="primary">
              Agregar nuevo
            </Link>
          </div>
          <DividendsList companyId={id} />
        </section>
        <RelevantFacts companyId={id} />
      </div>
      <Outlet />
    </Layout>
  );
}
