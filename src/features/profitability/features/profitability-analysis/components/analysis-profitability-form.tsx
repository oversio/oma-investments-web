import { faChartMixedUpCircleCurrency } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "../../../../../common/components/button/button";
import { FormInput } from "../../../../../common/components/form/form-input/form-input";
import { FormSelect } from "../../../../../common/components/form/form-select/form-select";
import { FormSwitch } from "../../../../../common/components/form/switch/form-switch";
import {
  MAX_BASED_YEARS_ON,
  MIN_BASED_YEARS_ON,
  ProfitabilityAnalysisFormSchema,
} from "../form-schemas/profitability-analysis-form-schema";

interface ProfitabilityAnalysisFormProps {
  onSubmit: (data: ProfitabilityAnalysisFormSchema) => Promise<void> | void;
}

export function AnalysisProfitabilityForm({ onSubmit }: ProfitabilityAnalysisFormProps) {
  const form = useForm<ProfitabilityAnalysisFormSchema>({
    defaultValues: {
      desiredProfitability: 0,
      basedYearsOn: 5,
      currentPrice: 0,
      includeCurrentYear: false,
    },
    resolver: zodResolver(ProfitabilityAnalysisFormSchema),
  });

  return (
    <FormProvider {...form}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-24 gap-3"
      >
        <div className="col-span-full grid grid-cols-24 gap-3">
          <FormInput
            className="col-span-full md:col-span-8"
            name="desiredProfitability"
            label="Rentabilidad deseada (%)"
            type="number"
            placeholder="Ingresa rentabilidad"
          />
          <div className="col-span-12 md:col-span-8">
            <FormSelect
              dataType="number"
              name="basedYearsOn"
              label="Años a considerar"
              placeholder="Cantidad de años"
              options={Array.from({ length: MAX_BASED_YEARS_ON })
                .map((_, index) => ({
                  value: (index + 1).toString(),
                  label: `${index + 1} año${index === 0 ? "" : "s"}`,
                }))
                .filter(({ value }) => parseInt(value) >= MIN_BASED_YEARS_ON)}
            />
          </div>
          <FormInput
            className="col-span-12 md:col-span-8"
            name="currentPrice"
            label="Precio actual"
            type="number"
            placeholder="Ingresa precio actual"
          />

          <div className="col-span-12 md:col-span-8">
            <FormSwitch name="includeCurrentYear" label="Incluir año actual" className="col-span-12" />
          </div>
        </div>
        <div className="col-span-full flex items-center justify-end">
          <Button
            type="submit"
            color="primary"
            variant="flat"
            startContent={<FontAwesomeIcon icon={faChartMixedUpCircleCurrency} />}
            isLoading={form.formState.isSubmitting}
            fullWidth
          >
            Calcular
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
