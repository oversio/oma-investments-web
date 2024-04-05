import { faPlus } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormInput } from "../../../../common/components/form/form-input/form-input";
import { FormSelect } from "../../../../common/components/form/form-select/form-select";
import { MultilineInput } from "../../../../common/components/form/multiline-input/multiline-input";
import { SideForm } from "../../../../common/components/side-form/side-form";
import { useTranslate } from "../../../../common/i18n/hooks/use-translate";
import { isTranslationKey } from "../../../../common/i18n/utils/is-translation-key";
import { useGetCompanyTypeList } from "../../../settings/api/company-type/use-get-company-type-list";
import { CreateCompany } from "../../api/create-company/create-company";
import { useCreateCompany } from "../../api/create-company/use-create-company";
import { CreateCompanySchema } from "./form-schemas/create-company-schema";

export function CreateCompanyPanel() {
  const t = useTranslate();
  const { createCompany, isPending, isError: isMutationError } = useCreateCompany();
  const { data: companyTypes, isLoading, isError } = useGetCompanyTypeList();

  const form = useForm<CreateCompanySchema>({
    defaultValues: {
      name: "",
      mnemonic: "",
      description: "",
      type: "",
    },
    resolver: zodResolver(CreateCompanySchema),
  });

  const getCompanyDetailPath = ({ id }: CreateCompany) => `/companies/${id}`;
  const options =
    companyTypes?.map(({ id, name }) => ({ value: id, label: isTranslationKey(name) ? t(name) : name })) ??
    [];

  return (
    <SideForm
      formProps={form}
      onSubmit={createCompany}
      successNavigationPath={getCompanyDetailPath}
      title="Agregar empresa"
      isLoading={isLoading}
      submitButtonProps={{
        label: "Agregar",
        startContent: <FontAwesomeIcon icon={faPlus} />,
        disabled: isError || isMutationError || isPending,
        isLoading: isPending,
      }}
    >
      <FormInput name="name" label="Nombre" placeholder="Nombre de la empresa" />
      <FormInput name="mnemonic" label="Mnemonic" placeholder="Mnemotecnico" />
      <FormSelect
        disabled={isLoading}
        name="type"
        label="Tipo"
        placeholder="Selecciona el tipo de empresa"
        options={options}
      />
      <MultilineInput name="description" label="Descripción" placeholder="Descripción de la empresa" />
    </SideForm>
  );
}
