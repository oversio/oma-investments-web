import { Select, SelectItem, SelectProps } from "@nextui-org/react";
import { useController } from "react-hook-form";

import { classMerge } from "../../utils/class-merge";

type FormSelectItemProps = {
  value: string;
  label: string;
};
type FormSelectProps = Omit<SelectProps, "children"> & {
  name: string;
  label?: string;
  helperText?: string;
  options: FormSelectItemProps[];
};

export function FormSelect({ name, helperText, className, options, onChange, ...props }: FormSelectProps) {
  const {
    field,
    fieldState: { error },
  } = useController({ name });

  return (
    <Select
      {...props}
      {...field}
      className={classMerge(" mb-3", className)}
      labelPlacement="outside"
      description={helperText ?? error?.message}
      isInvalid={Boolean(error)}
      errorMessage={error?.message}
      onChange={e => {
        field.onChange(e);
        onChange?.(e);
      }}
    >
      {options.map(({ value, label }) => (
        <SelectItem key={value} value={value}>
          {label}
        </SelectItem>
      ))}
    </Select>
  );
}
