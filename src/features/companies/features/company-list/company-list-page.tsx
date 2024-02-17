import { faPlusCircle } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";

import { CompanyList } from "./components/company-list";

export function CompanyListPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className=" text-3xl">Companies list</h2>
        <Button color="primary">
          <FontAwesomeIcon icon={faPlusCircle} />
          <span className="ml-2">Add company</span>
        </Button>
      </div>
      <CompanyList />
    </div>
  );
}
