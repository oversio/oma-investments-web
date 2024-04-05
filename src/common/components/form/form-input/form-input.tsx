import { Input, InputProps } from "@nextui-org/react";
import { useController } from "react-hook-form";

import { classMerge } from "../../../utils/class-merge";

type FormInputProps = InputProps & {
  name: string;
  label?: string;
  helperText?: string;
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
        field.onChange(e);
        onChange?.(e);
      }}
    />
  );
}
