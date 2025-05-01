import { faArrowLeft } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

import { Button } from "../../../../../common/components/button/button";
import { Skeleton } from "../../../../../common/components/skeleton/skeleton";
import { CompanyTypeBadge } from "../../../components/company-type-badge";
import { CompanyActions } from "./company-actions";

type Props = {
  isLoading: boolean;
  companyName: string | undefined;
  companyType: string | undefined;
};
export function CompanyNavbar({ isLoading, companyName, companyType }: Props) {
  const navigator = useNavigate();

  return (
    <div className="flex justify-between mb-3">
      <div className="flex items-center gap-2">
        {isLoading ? (
          <>
            <Skeleton className="size-8 rounded-lg" />
            <Skeleton className="w-96 h-9 rounded-lg" />
          </>
        ) : (
          <>
            <Button
              startContent={<FontAwesomeIcon icon={faArrowLeft} />}
              isIconOnly
              size="sm"
              onPress={() => void navigator("..")}
            />
            <h3 className=" text-2xl">{companyName}</h3>
            <CompanyTypeBadge typeName={companyType ?? ""} isLoading={isLoading} />
          </>
        )}
      </div>
      <CompanyActions />
    </div>
  );
}
