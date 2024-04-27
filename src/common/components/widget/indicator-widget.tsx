import { IconDefinition } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody } from "@nextui-org/react";

import { classMerge } from "../../utils/class-merge";
import { Skeleton } from "../skeleton/skeleton";

type IndicatorColorType = "primary" | "secondary" | "success" | "warning" | "danger" | "default";
export interface IndicatorWidgetProps {
  key: string;
  className?: string;
  color?: IndicatorColorType;
  icon: IconDefinition;
  title: string;
  value: string;
  endContent?: React.ReactNode;
  isLoading?: boolean;
}

const colorMap: Record<IndicatorColorType, string> = {
  primary: "bg-primary/20 text-primary-600",
  secondary: "bg-secondary/20 text-secondary-600",
  success: "bg-success/20 text-success-600",
  warning: "bg-warning/20 text-warning-600",
  danger: "bg-danger/20 text-danger-600",
  default: "bg-default/40 text-default-foreground",
};

export function IndicatorWidget({
  className,
  color = "default",
  icon,
  title,
  value,
  endContent,
  isLoading,
}: IndicatorWidgetProps) {
  if (isLoading) {
    return <Skeleton className={classMerge(" w-full rounded-xl h-full", className)} />;
  }

  return (
    <Card className={className}>
      <CardBody>
        <div className="grid grid-cols-24 place-items-center h-full">
          <div className=" col-span-7">
            <div
              className={classMerge(
                "flex items-center justify-center w-12 h-12 bg-default/40 text-default-foreground rounded-lg",
                colorMap[color],
              )}
            >
              <FontAwesomeIcon icon={icon} className="text-2xl" />
            </div>
          </div>
          <div className="flex flex-col items-center col-span-17">
            <p className="text-sm text-gray-500">{title}</p>

            <div className="flex items-center gap-2">
              <p className={classMerge("text-lg font-semibold", `text-${color}`)}>{value}</p>
              {endContent ? <span>{endContent}</span> : null}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
