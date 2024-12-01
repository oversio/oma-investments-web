import { Switch, SwitchProps } from "@nextui-org/react";
import { useController } from "react-hook-form";

import { classMerge } from "../../../utils/class-merge";

type SwitchInputProps = Omit<SwitchProps, "onChange"> & {
  name: string;
  label?: string;
  onChange?: (value: boolean) => void;
};

export function FormSwitch({ label, name, className, onChange, ...props }: SwitchInputProps) {
  const { field } = useController({ name });

  return (
    <Switch
      {...props}
      {...field}
      defaultSelected={Boolean(field.value)}
      className={classMerge(" mb-3", className)}
      onValueChange={value => {
        field.onChange(value);
        onChange?.(value);
      }}
    >
      {label}
    </Switch>
  );
}
