import { Select, SelectItem, SelectProps } from "@nextui-org/react";
import { useController } from "react-hook-form";

import { classMerge } from "../../../utils/class-merge";

type FormSelectItemProps<T> = {
  value: T;
  label: string;
};
type FormSelectProps<T> = Omit<SelectProps, "children" | "onChange"> & {
  name: string;
  label?: string;
  helperText?: string;
  options: FormSelectItemProps<T>[];
  dataType?: "string" | "number";
  onChange?: (value: T) => void;
};

export function FormSelect<T extends string | number>({
  name,
  helperText,
  className,
  options,
  onChange,
  ...props
}: FormSelectProps<T>) {
  const {
    field,
    fieldState: { error },
    formState: { defaultValues },
  } = useController({ name });
  const defaultValue = (props.isMultiline ? defaultValues?.[name] : [String(defaultValues?.[name])]) as
    | T[]
    | undefined;

  return (
    <Select
      {...props}
      {...field}
      defaultSelectedKeys={defaultValue}
      className={classMerge(" mb-3", className)}
      labelPlacement="outside"
      description={helperText ?? error?.message}
      isInvalid={Boolean(error)}
      errorMessage={error?.message}
      onChange={e => {
        const value = (props.dataType === "number" ? parseFloat(e.target.value) : e.target.value) as T;
        field.onChange(value);
        onChange?.(value);
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
