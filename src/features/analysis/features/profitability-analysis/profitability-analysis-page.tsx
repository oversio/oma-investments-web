import { Fragment, useState } from "react";
import { Outlet, useParams } from "react-router";

import { IndicatorWidget } from "../../../../common/components/widget/indicator-widget";
import { classMerge } from "../../../../common/utils/class-merge";
import { CompanyDetailsTitle } from "../../../companies/features/company-details/components/company-details-title";
import { useGetDividendList } from "../../../dividends/api/dividend-list/use-get-dividend-list";
import { DividendYearChart } from "../../../dividends/components/dividend-year-chart";
import {
  DEFAULT_DIVIDEND_LIST_PAGE_SIZE,
  DividendListSection,
} from "../../../dividends/features/dividend-list/dividend-list-section";
import { useCalculateProfitability } from "../../api/calculate-profitability/use-calculate-profitability";
import { useProfitabilityIndicatorData } from "../../hooks/use-profitability-indicator-data";
import { AnalysisProfitabilityForm } from "./components/analysis-profitability-form";
import { ProfitabilityAnalysisFormSchema } from "./form-schemas/profitability-analysis-form-schema";

export function ProfitabilityAnalysisPage() {
  const id = useParams().id ?? "";
  const { calculateProfitability, data, isPending, isError } = useCalculateProfitability(id);
  const [params, setParams] = useState<ProfitabilityAnalysisFormSchema>();
  const { data: dividendYearList, isLoading: isLoadingDividend } = useGetDividendList(
    id,
    1,
    DEFAULT_DIVIDEND_LIST_PAGE_SIZE,
  );

  const onSubmitCalculateProfitability = async (input: ProfitabilityAnalysisFormSchema) => {
    setParams(input);
    await calculateProfitability({
      ...input,
      companyId: id,
    });
  };

  const indicators = useProfitabilityIndicatorData({ params, data, isLoading: isPending || isError });

  return (
    <>
      <div className="flex flex-col">
        <CompanyDetailsTitle companyId={id} hideDescription />
        <h3 className=" text-xl mb-5">Análisis de rentabilidad</h3>
        <div className="flex-1">
          <div className="grid grid-cols-24 gap-y-5 lg:gap-5">
            {/* Left section */}
            <div className="flex flex-col col-span-full xl:col-span-6 gap-5">
              <div className="grid grid-cols-24 lg:gap-5 xl:gap-0 xl:gap-y-5">
                <DividendListSection
                  companyId={id}
                  className=" col-span-full lg:col-span-12 xl:col-span-full"
                />
                <div className="col-span-full lg:col-span-12 xl:col-span-full mt-5 lg:mt-0">
                  Histórico de resultados
                </div>
              </div>
            </div>

            {/* Center */}
            <div className="col-span-full xl:col-span-12">
              <h3 className=" text-2xl mb-5">Calcular rentabilidad</h3>
              <AnalysisProfitabilityForm onSubmit={onSubmitCalculateProfitability} />
              <div className="grid grid-cols-24 mt-5 gap-y-3 md:gap-x-3">
                {indicators.length ? (
                  <Fragment>
                    {indicators.map(indicator => (
                      <IndicatorWidget
                        {...indicator}
                        key={indicator.key}
                        className={classMerge(
                          " col-span-12 md:col-span-8 min-h-[72px]",
                          indicator.key === "profitability" ? "col-span-full" : "",
                          indicator.key === "ideal-price" ? "ml-1.5 md:ml-0" : "",
                          indicator.key === "min-yield" ? "mr-1.5 md:mr-0" : "",
                        )}
                      />
                    ))}

                    <div className="col-span-full">
                      <DividendYearChart
                        data={data?.years ?? []}
                        legend="Dividendos"
                        title="Años considerados en el análisis"
                        isLoading={isPending || isError}
                      />
                    </div>
                  </Fragment>
                ) : (
                  <div className="col-span-full">
                    <p className=" text-center text-lg text-gray-500">No hay resultados para mostrar</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right section */}
            <div className="col-span-full xl:col-span-6 mt-5 lg:mt-0">
              <DividendYearChart
                isLoading={isLoadingDividend}
                title="Histórico de dividendos"
                data={dividendYearList ?? []}
              />
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
