import { faPlus } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

import { FormInput } from "../../../../../common/components/form/form-input/form-input";
import { FormSelect } from "../../../../../common/components/form/form-select/form-select";
import { SideForm } from "../../../../../common/components/side-form/side-form";
import { useTranslate } from "../../../../../common/i18n/hooks/use-translate";
import { isTranslationKey } from "../../../../../common/i18n/utils/is-translation-key";
import { useGetDividendTypeList } from "../../../../settings/api/dividend-type/use-get-dividend-type-list";
import { useAddDividend } from "../../../api/add-dividend/use-add-dividend";
import { AddDividendSchema } from "../add-dividend-schema";

export function AddDividendPanel() {
  const t = useTranslate();
  const { id = "" } = useParams();
  const { addDividend, isPending, isError } = useAddDividend();
  const { data: dividendTypes, isLoading } = useGetDividendTypeList();

  const form = useForm<AddDividendSchema>({
    defaultValues: {
      date: "",
      amount: 0,
    },
    resolver: zodResolver(AddDividendSchema),
  });

  const handleSubmit = (input: AddDividendSchema) => addDividend({ ...input, companyId: id });

  return (
    <SideForm
      formProps={form}
      size="sm"
      onSubmit={handleSubmit}
      successNavigationPath=".."
      title="Agregar dividendo"
      isLoading={isLoading || isPending}
      submitButtonProps={{
        label: "Agregar",
        startContent: <FontAwesomeIcon icon={faPlus} />,
        disabled: isError || isPending,
        isLoading: isPending,
      }}
    >
      <FormSelect
        name="typeId"
        label="Tipo de dividendo"
        placeholder="Seleccione un tipo de dividendo"
        disabled={isLoading}
        options={dividendTypes.map(({ id, name }) => ({
          label: isTranslationKey(name) ? t(name) : name,
          value: id,
        }))}
      />
      <FormInput name="date" label="Fecha" type="date" />
      <FormInput name="amount" label="Monto" placeholder="Monto del dividendo" type="number" />
    </SideForm>
  );
}
