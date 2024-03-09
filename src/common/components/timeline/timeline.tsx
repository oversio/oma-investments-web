import { ButtonProps, Card, CardBody, CardHeader, Chip, ChipProps } from "@nextui-org/react";

import { classMerge } from "../../utils/class-merge";
import { DateTimeFormatType, formatDateTime } from "../../utils/format-date-time";
import { randomTimelineColor } from "./utils/random-timeline-color";

interface TimeLineItemProps {
  date: Date;
  title?: string;
  description: string;
  color?: ButtonProps["color"];
}

interface TimeLineProps {
  initialLeft?: boolean;
  items: TimeLineItemProps[];
}

export function Timeline({ items, initialLeft = true }: TimeLineProps) {
  let currentSideLeft = initialLeft;
  return (
    <div className="container dark:bg-default-50 mx-auto w-full h-auto">
      <div className="relative wrap overflow-hidden p-10 h-full">
        <div className="border-2-2 absolute border-opacity-20 border-red-700 h-full border left-1/2" />

        {items.map((item, i) => {
          currentSideLeft = !currentSideLeft;
          const { chip, card } = stylesMap[item.color ?? randomTimelineColor()];
          return (
            <div
              key={i}
              className={classMerge(
                "mb-8 flex justify-between items-center w-full",
                currentSideLeft && "flex-row-reverse",
              )}
            >
              <div className="w-5/12" />
              <div className="z-20 dark:bg-default-50">
                <Chip color={chip} size="sm" variant="flat">
                  {formatDateTime(item.date, DateTimeFormatType.Date)}
                </Chip>
              </div>
              <div className="w-5/12">
                <Card className={classMerge("px-3", card)}>
                  <CardHeader>
                    <h3 className=" text-lg">
                      {item.title ?? formatDateTime(item.date, DateTimeFormatType.Date)}
                    </h3>
                  </CardHeader>
                  <CardBody>{item.description}</CardBody>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const stylesMap: Record<string, { chip: ChipProps["color"]; card: string }> = {
  default: {
    chip: "default",
    card: "bg-default/40 text-default-foreground",
  },
  warning: {
    chip: "warning",
    card: "bg-warning/20 text-warning-600 dark:text-warning",
  },
  success: {
    chip: "success",
    card: "bg-success/20 text-success-600 dark:text-success",
  },
  primary: {
    chip: "primary",
    card: "bg-primary/20 text-primary-600 dark:text-primary",
  },
  secondary: {
    chip: "secondary",
    card: "bg-secondary/20 text-secondary-600 dark:text-secondary",
  },
  danger: {
    chip: "danger",
    card: "bg-danger/20 text-danger-600 dark:text-danger",
  },
};
