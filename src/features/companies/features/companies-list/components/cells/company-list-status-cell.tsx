import { faCheckCircle } from "@fortawesome/pro-light-svg-icons/faCheckCircle";
import { faTimesCircle } from "@fortawesome/pro-light-svg-icons/faTimesCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip } from "@nextui-org/react";

import { Skeleton } from "../../../../../../common/components/skeleton/skeleton";
import { CompanyListCellProps } from "./types";

export function CompanyListStatusCell({ isActive, isLoading }: CompanyListCellProps) {
  return (
    <div className="flex justify-center items-center">
      {isLoading ? (
        <Skeleton className=" w-20 h-5" />
      ) : (
        <Chip
          className="capitalize"
          color={isActive ? "success" : "danger"}
          size="sm"
          variant="flat"
          startContent={<FontAwesomeIcon icon={isActive ? faCheckCircle : faTimesCircle} />}
        >
          {isActive ? "Active" : "Inactive"}
        </Chip>
      )}
    </div>
  );
}
