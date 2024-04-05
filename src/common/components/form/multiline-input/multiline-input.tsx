import { Textarea, TextAreaProps } from "@nextui-org/react";
import { useController } from "react-hook-form";

import { classMerge } from "../../../utils/class-merge";

type MultilineInputProps = TextAreaProps & {
  name: string;
  label?: string;
  helperText?: string;
};

export function MultilineInput({ name, helperText, className, onChange, ...props }: MultilineInputProps) {
  const {
    field,
    fieldState: { error },
  } = useController({ name });

  return (
    <Textarea
      {...props}
      {...field}
      className={classMerge(" mb-3", className)}
      labelPlacement="outside"
      description={helperText}
      errorMessage={error?.message}
      isInvalid={Boolean(error)}
      onChange={e => {
        field.onChange(e);
        onChange?.(e);
      }}
    />
  );
}
