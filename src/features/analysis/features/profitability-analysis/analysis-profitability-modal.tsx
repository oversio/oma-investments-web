import { faCheck } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import { Modal } from "../../../../common/components/modal/modal";
import { ID } from "../../../../common/types";
import { CalculateProfitability } from "../../api/calculate-profitability/calculate-profitability";
import { useCalculateProfitability } from "../../api/calculate-profitability/use-calculate-profitability";
import { useSaveProfitabilityResults } from "../../api/save-profitability-results/use-save-profitability-results";
import { AnalysisProfitabilityForm } from "./components/analysis-profitability-form";
import { AnalysisProfitabilityResults } from "./components/analysis-profitability-results";
import { ProfitabilityAnalysisFormSchema } from "./form-schemas/profitability-analysis-form-schema";

interface AnalysisProfitabilityModalProps {
  companyId: ID | undefined;
  onClose: () => void;
}

export function AnalysisProfitabilityModal({ companyId = "", onClose }: AnalysisProfitabilityModalProps) {
  const { calculateProfitability, data, isPending, isError } = useCalculateProfitability(companyId);
  const {
    saveProfitabilityResults,
    isPending: isSavingProf,
    isError: isErrorSavingProf,
  } = useSaveProfitabilityResults(companyId);
  const [isOpen, setIsOpen] = useState(false);
  const [params, setParams] = useState<ProfitabilityAnalysisFormSchema>();

  useEffect(() => setIsOpen(true), []);

  const handleCalculateProfitability = async (input: ProfitabilityAnalysisFormSchema) => {
    setParams(input);
    await calculateProfitability({
      ...input,
      companyId,
    });
  };

  const handleClose = async () => {
    setIsOpen(false);
    await new Promise(resolve => setTimeout(resolve, 300));
    onClose();
  };

  const handleSaveProfitabilityResults = async () => {
    await saveProfitabilityResults({
      companyId,
      results: data?.results ?? ({} as CalculateProfitability["results"]),
      years: data?.years ?? [],
      params: data?.params ?? ({} as CalculateProfitability["params"]),
    });
    void handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      size="3xl"
      header="Análisis de rentabilidad"
      onClose={() => void handleClose()}
      backdrop="blur"
      cancelButton={{
        label: "Cerrar",
      }}
      confirmButton={{
        label: "Guardar",
        startContent: <FontAwesomeIcon icon={faCheck} />,
        isDisabled: !params || !data || isSavingProf || isErrorSavingProf,
        isLoading: isSavingProf || isErrorSavingProf,
        onPress: () => void handleSaveProfitabilityResults(),
      }}
    >
      <AnalysisProfitabilityForm onSubmit={handleCalculateProfitability} />

      {/* Results */}
      <AnalysisProfitabilityResults
        params={params}
        results={data?.results}
        years={data?.years}
        isLoading={!companyId || isPending || isError}
      />
    </Modal>
  );
}
