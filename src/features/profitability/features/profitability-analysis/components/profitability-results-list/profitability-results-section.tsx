import { faPlus } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@nextui-org/react";
import { useState } from "react";

import { Button } from "../../../../../../common/components/button/button";
import { ID } from "../../../../../../common/types";
import { useGetProfitabilityResultsList } from "../../../../api/profitability-results-list/use-get-profitability-results-list";
import { AnalysisProfitabilityModal } from "../analysis-profitability-modal";
import { ProfitabilityResultsList } from "./profitability-results-list";

interface ProfitabilityResultsListSectionProps {
  companyId: ID | undefined;
  className?: string;
  hideActions?: boolean;
}
const DEFAULT_LIST_PAGE_SIZE = 20;

export function ProfitabilityResultsListSection({ companyId }: ProfitabilityResultsListSectionProps) {
  const { data, isLoading } = useGetProfitabilityResultsList(1, DEFAULT_LIST_PAGE_SIZE, companyId);
  const [openProfitabilityModal, setOpenProfitabilityModal] = useState(false);

  return (
    <>
      <section className=" flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3 className=" text-2xl mb-2">Análisis de rentabilidad</h3>
          <div className="flex items-center justify-end gap-2">
            <Tooltip content="Generar nuevo análisis">
              <Button variant="flat" color="primary" onPress={() => setOpenProfitabilityModal(true)}>
                <FontAwesomeIcon icon={faPlus} />
                Nuevo
              </Button>
            </Tooltip>
          </div>
        </div>
        <ProfitabilityResultsList data={data} isLoading={isLoading} />
      </section>

      {openProfitabilityModal && (
        <AnalysisProfitabilityModal companyId={companyId} onClose={() => setOpenProfitabilityModal(false)} />
      )}
    </>
  );
}
