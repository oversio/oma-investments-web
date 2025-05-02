import { faPlus } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@heroui/react";
import { Outlet, useParams } from "react-router";

import { LinkButton } from "../../../../common/components/button/link-button";
import { useGetProfitabilityResultsList } from "../../api/profitability-results-list/use-get-profitability-results-list";
import { ProfitabilityResultsList } from "./components/profitability-results-list";

const DEFAULT_LIST_PAGE_SIZE = 20;

export function ProfitabilityPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetProfitabilityResultsList(1, DEFAULT_LIST_PAGE_SIZE, id);

  return (
    <>
      <section className=" flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3 className=" text-2xl mb-2">Análisis de rentabilidad</h3>
          <div className="flex items-center justify-end gap-2">
            <Tooltip content="Generar nuevo análisis">
              <LinkButton
                variant="flat"
                color="primary"
                to="new"
                startContent={<FontAwesomeIcon icon={faPlus} />}
              >
                Nuevo
              </LinkButton>
            </Tooltip>
          </div>
        </div>
        <ProfitabilityResultsList data={data} isLoading={isLoading} />
      </section>
      <Outlet />
    </>
  );
}
