import { faEye } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Skeleton, Tooltip } from "@heroui/react";
import { useState } from "react";

import { Button } from "../../../../../../common/components/button/button";
import { AnalysisProfitabilityResultsModal } from "../../../profitability-analysis/components/analysis-profitability-results-modal";
import { ProfitabilityResultsListDateCellProps } from "../../types";

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
            <Button
              onPress={() => setIsOpen(true)}
              startContent={<FontAwesomeIcon icon={faEye} />}
              color="secondary"
              size="sm"
              variant="flat"
              isIconOnly
            />
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
