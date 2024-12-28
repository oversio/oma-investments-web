import { Card, CardBody } from "@nextui-org/react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  LineProps,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { classMerge } from "../../utils/class-merge";
import { CustomTooltip } from "./custom-tooltip";

export type SimpleLineChartDataProps = {
  label: string | number;
  values: Array<{
    name: string;
    value: number;
  }>;
};
export type SimpleLineProps = {
  name: string;
  props: LineProps;
};

interface SimpleLineChartProps {
  className?: string;
  data: SimpleLineChartDataProps[];
  lineProps?: Array<SimpleLineProps>;
  hideLegend?: boolean;
  aspectRatio?: `${number}/${number}`;
}

export function SimpleLineChart({
  className,
  data,
  lineProps,
  hideLegend,
  aspectRatio,
}: SimpleLineChartProps) {
  return (
    <Card title={"Simple Line Chart"} className={className}>
      <CardBody
        className={classMerge(
          "mt-5 aspect-[1060/660] w-full lg:mt-7",
          aspectRatio ? `aspect-[${aspectRatio}]` : "",
        )}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={getData(data)}
            margin={{
              left: -10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            {!hideLegend && <Legend />}
            {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
            {lineProps?.map(({ name, props: { ref, ...props } }) => (
              <Line key={name} {...props} label={<CustomeSingleLineLabel />} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}

function getData(data: SimpleLineChartDataProps[]) {
  return data.map(item => {
    const chartItem: Record<string, string | number> = { label: item.label };
    item.values.forEach(value => {
      chartItem[value.name] = value.value;
    });

    return chartItem;
  });
}

function CustomeSingleLineLabel(props: Record<string, string | number | undefined>) {
  const { x, y, stroke = "#fff", value } = props;

  return (
    <text x={x} y={y} dy={-4} fill={stroke as string} fontSize={12} textAnchor="middle">
      {value}
    </text>
  );
}
