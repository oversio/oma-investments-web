import { useEffect, useState } from "react";

import { Modal } from "../../../../../common/components/modal/modal";
import { ID } from "../../../../../common/types";
import { DateTimeFormatType, formatDateTime } from "../../../../../common/utils/format-date-time";
import { useGetProfitabilityResult } from "../../../api/profitability-results/use-get-profitability-result";
import { AnalysisProfitabilityResults } from "./analysis-profitability-results";

interface AnalysisProfitabilityResultsModalProps {
  companyId: ID;
  resultId: ID;
  onClose: () => void;
}
export function AnalysisProfitabilityResultsModal({
  companyId,
  resultId,
  onClose,
}: AnalysisProfitabilityResultsModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isError } = useGetProfitabilityResult(companyId, resultId);

  useEffect(() => setIsOpen(true), []);

  const handleClose = async () => {
    setIsOpen(false);
    await new Promise(resolve => setTimeout(resolve, 300));
    onClose();
  };

  const { params, results, years } = data ?? {};

  const title =
    "Resultados del análisis" + (data ? ` (${formatDateTime(data.date, DateTimeFormatType.DateTime)})` : "");

  return (
    <Modal
      isOpen={isOpen}
      size="3xl"
      header={title}
      onClose={() => void handleClose()}
      backdrop="blur"
      confirmButton={{
        label: "Cerrar",
        onPress: () => void handleClose(),
      }}
    >
      <AnalysisProfitabilityResults
        params={params}
        results={results}
        years={years}
        isLoading={isLoading || isError}
      />
    </Modal>
  );
}
