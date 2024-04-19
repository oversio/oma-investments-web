import { useState } from "react";
import { Outlet, useParams } from "react-router";

import { IndicatorWidget } from "../../../../common/components/widget/indicator-widget";
import { classMerge } from "../../../../common/utils/class-merge";
import { CompanyDetailsTitle } from "../../../companies/features/company-details/components/company-details-title";
import { DividendListSection } from "../../../dividends/features/dividend-list/dividend-list-section";
import { useCalculateProfitability } from "../../api/calculate-profitability/use-calculate-profitability";
import { useIndicatorData } from "../hooks/use-indicator-data";
import { ProfitabilityAnalysisForm } from "./components/profitability-analysis-form";
import { ProfitabilityAnalysisFormSchema } from "./components/profitability-analysis-form-schema";

export function ProfitabilityAnalysisPage() {
  const id = useParams().id ?? "";
  const { calculateProfitability, data, isPending, isError } = useCalculateProfitability(id);
  const [params, setParams] = useState<ProfitabilityAnalysisFormSchema>();

  const onSubmitCalculateProfitability = async (input: ProfitabilityAnalysisFormSchema) => {
    setParams(input);
    await calculateProfitability({
      ...input,
      companyId: id,
    });
  };

  const indicators = useIndicatorData({ params, data, isLoading: isPending || isError });

  return (
    <>
      <div className="flex flex-col">
        <CompanyDetailsTitle companyId={id} hideDescription />
        <h3 className=" text-xl mb-5">Análisis de rentabilidad</h3>
        <div className="grid grid-cols-24 gap-y-5 lg:gap-5">
          <div className="flex flex-col col-span-full xl:col-span-6 gap-5">
            <div className="grid grid-cols-24 lg:gap-5 xl:gap-0 xl:gap-y-5">
              <DividendListSection
                companyId={id}
                className=" col-span-full lg:col-span-12  xl:col-span-full"
              />
              <div className="col-span-full lg:col-span-12 xl:col-span-full">
                <h3 className=" text-2xl mb-5">Gráfico de rentabilidad</h3>
                <div className="flex justify-center items-center h-64 rounded-lg bg-default text-white">
                  GRÁFICO DE RENTABILIDAD
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-full xl:col-span-12">
            <h3 className=" text-2xl mb-5">Calcular rentabilidad</h3>
            <ProfitabilityAnalysisForm onSubmit={onSubmitCalculateProfitability} />
            <div className="grid grid-cols-24 mt-5 gap-y-5 md:gap-5">
              {indicators.length ? (
                indicators.map(indicator => (
                  <div
                    key={indicator.key}
                    className={classMerge(
                      " col-span-12 md:col-span-8",
                      indicator.key === "profitability" ? "col-span-full" : "",
                      indicator.key === "ideal-price" ? "pl-2.5 md:pl-0" : "",
                      indicator.key === "min-yield" ? "pr-2.5 md:pr-0" : "",
                    )}
                  >
                    <IndicatorWidget {...indicator} className="h-full" />
                  </div>
                ))
              ) : (
                <div className="col-span-full">
                  <p className=" text-center text-lg text-gray-500">No hay resultados para mostrar</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
