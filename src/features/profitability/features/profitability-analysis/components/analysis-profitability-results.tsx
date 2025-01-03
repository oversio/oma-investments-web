import { Fragment } from "react/jsx-runtime";

import { IndicatorWidget } from "../../../../../common/components/widget/indicator-widget";
import { classMerge } from "../../../../../common/utils/class-merge";
import { DividendYearChart } from "../../../../dividends/components/dividend-year-chart";
import {
  IndicatorDataProps,
  useProfitabilityIndicatorData,
} from "../../../hooks/use-profitability-indicator-data";
import { AnalysisObservationSection } from "./analysis-observation-section";

interface AnalysisProfitabilityResultsProps extends IndicatorDataProps {
  years: Array<{ year: number; total: number }> | undefined;
}

export function AnalysisProfitabilityResults({
  params,
  results,
  years,
  isLoading,
}: AnalysisProfitabilityResultsProps) {
  const indicators = useProfitabilityIndicatorData({ params, results, isLoading });

  return (
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

          <AnalysisObservationSection data={results} isLoading={isLoading} />

          <div className="col-span-full mt-4">
            <DividendYearChart
              data={years ?? []}
              legend="Dividendos"
              title="Años considerados en el análisis"
              isLoading={isLoading}
              aspectRatio="1060/660"
            />
          </div>
        </Fragment>
      ) : (
        <div className="col-span-full">
          <p className=" text-center text-lg text-gray-500">No hay resultados para mostrar</p>
        </div>
      )}
    </div>
  );
}
