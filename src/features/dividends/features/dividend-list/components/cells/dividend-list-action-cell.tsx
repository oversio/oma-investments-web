import { faEye } from "@fortawesome/pro-light-svg-icons";
import { Popover, PopoverContent, PopoverTrigger, Tooltip } from "@nextui-org/react";

import { IconButton } from "../../../../../../common/components/icon-button/icon-button";
import { Skeleton } from "../../../../../../common/components/skeleton/skeleton";
import { DividendListCellProps } from "../../types";
import { DividendsDetailsList } from "../dividends-detail-list";

export function DividendListActionCell({ dividends, isLoading }: DividendListCellProps) {
  return (
    <div className=" w-full text-base flex justify-center items-center">
      {isLoading ? (
        <Skeleton className=" size-8 rounded-full" />
      ) : (
        <Tooltip content="Ver detalle" placement="right" showArrow>
          <div>
            <Popover showArrow placement="top">
              <PopoverTrigger>
                <IconButton icon={faEye} color="secondary" size="sm" />
              </PopoverTrigger>
              <PopoverContent className=" w-[400px]">
                {() => <DividendsDetailsList dividends={dividends} isLoading={isLoading} />}
              </PopoverContent>
            </Popover>
          </div>
        </Tooltip>
      )}
    </div>
  );
}
