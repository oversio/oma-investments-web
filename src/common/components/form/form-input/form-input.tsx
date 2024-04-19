import { Input, InputProps } from "@nextui-org/react";
import { useController } from "react-hook-form";

import { classMerge } from "../../../utils/class-merge";

type FormInputProps = Omit<InputProps, "onChange"> & {
  name: string;
  label?: string;
  helperText?: string;
  onChange?: (value: string | number) => void;
};

export function FormInput({ name, helperText, className, onChange, ...props }: FormInputProps) {
  const {
    field,
    fieldState: { error },
  } = useController({ name });

  return (
    <Input
      {...props}
      {...field}
      className={classMerge(" mb-3", className)}
      labelPlacement="outside"
      description={helperText}
      isInvalid={Boolean(error)}
      errorMessage={error?.message}
      onChange={e => {
        const value = props.type === "number" ? parseFloat(e.target.value) : e.target.value;
        field.onChange(value);
        onChange?.(value);
      }}
    />
  );
}
