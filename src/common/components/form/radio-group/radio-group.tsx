import { Radio, RadioGroup as RadioGroupUI } from "@nextui-org/react";
import { useController } from "react-hook-form";

import { classMerge } from "../../../utils/class-merge";

export type RadioGroupItem = {
  key: string;
  value: string;
  label: string;
  description?: string;
};

interface RadioGroupProps {
  name: string;
  label?: string;
  variant?: "default" | "block";
  items: RadioGroupItem[];
}

export function RadioGroup({ name, label, items, variant = "default" }: RadioGroupProps) {
  const {
    field,
    fieldState: { error },
  } = useController({ name });

  return (
    <RadioGroupUI {...field} label={label} errorMessage={error ? error.message : undefined}>
      {items.map(({ key, label: itemLabel, ...props }) => (
        <Radio
          key={key}
          {...props}
          classNames={
            variant === "default"
              ? undefined
              : {
                  base: classMerge(
                    "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                    "flex-row-reverse cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                    "data-[selected=true]:border-primary",
                  ),
                }
          }
        >
          {itemLabel}
        </Radio>
      ))}
    </RadioGroupUI>
  );
}
