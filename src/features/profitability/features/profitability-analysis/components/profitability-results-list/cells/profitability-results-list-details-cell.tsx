import { faEye } from "@fortawesome/pro-light-svg-icons";
import { Skeleton, Tooltip } from "@nextui-org/react";
import { useState } from "react";

import { IconButton } from "../../../../../../../common/components/icon-button/icon-button";
import { AnalysisProfitabilityResultsModal } from "../../analysis-profitability-results-modal";
import { ProfitabilityResultsListDateCellProps } from "../types";

export function ProfitabilityResultsListDetailsCell({
  isLoading,
  company,
  id,
}: ProfitabilityResultsListDateCellProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" w-full text-base flex justify-center items-center">
      {isLoading ? (
        <Skeleton className=" size-8 rounded-full" />
      ) : (
        <Tooltip content="Ver detalle" placement="right" showArrow>
          <div>
            <IconButton onPress={() => setIsOpen(true)} icon={faEye} color="secondary" size="sm" />
          </div>
        </Tooltip>
      )}
      {isOpen && (
        <AnalysisProfitabilityResultsModal
          companyId={company.id}
          resultId={id}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
