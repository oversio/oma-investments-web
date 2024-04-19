import { faArrowLeft } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "../../../../../common/components/link/link";
import { Skeleton } from "../../../../../common/components/skeleton/skeleton";
import { useGetCompany } from "../../../api/get-company/use-get-company";

interface CompanyDetailsTitleProps {
  companyId?: string;
  hideDescription?: boolean;
}

export function CompanyDetailsTitle({ companyId, hideDescription }: CompanyDetailsTitleProps) {
  const { data, isLoading, isError } = useGetCompany(companyId);

  return (
    <div className="flex flex-col mb-4">
      <div className="flex items-center mb-5 gap-3">
        <Link to=".." isIconOnly>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h1 className=" flex items-center gap-1 text-3xl capitalize">
          {isLoading || isError ? <Skeleton className=" w-80 h-8" /> : data?.name}
          {isLoading || isError ? (
            <Skeleton className=" w-20 h-8" />
          ) : (
            <span className=" uppercase">({data?.mnemonic})</span>
          )}
        </h1>
      </div>

      {!hideDescription && (
        <>
          <h3 className="text-lg font-semibold">Descripción</h3>
          {isLoading || isError ? (
            <div className=" flex flex-col gap-1 mb-[31px]">
              <Skeleton className=" w-full h-5" />
              <Skeleton className=" w-4/5 h-5" />
              <Skeleton className=" w-3/5 h-5" />
            </div>
          ) : (
            <p className="mb-7 max-w-screen-sm">{data?.description}</p>
          )}
        </>
      )}
    </div>
  );
}
