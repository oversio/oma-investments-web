import { useMemo } from "react";

import { SimpleLineChart, SimpleLineProps } from "../../../common/components/chart-widgets/simple-line-chart";
import { Skeleton } from "../../../common/components/skeleton/skeleton";
import { GetDividendListItem } from "../api/dividend-list/get-dividend-list-item";

interface DividendYearChartProps {
  title: string;
  legend?: string;
  data: Array<{ year: number; total: number }>;
  isLoading?: boolean;
}

export function DividendYearChart({ title, legend = "", data, isLoading }: DividendYearChartProps) {
  const chartData = useMemo(
    () =>
      [...data].reverse().map(({ year, total }) => ({
        label: year,
        values: [
          {
            name: legend,
            value: total,
          },
        ],
      })),
    [data, legend],
  );

  const lineProps: SimpleLineProps[] = [
    {
      name: legend,
      props: {
        label: "Pagado",
        type: "monotone",
        dataKey: legend,
        stroke: "#3b82f6",
        activeDot: { r: 4 },
        strokeWidth: 2,
        dot: true,
      },
    },
  ];

  if (isLoading) {
    return (
      <div className=" flex flex-col">
        <Skeleton className="w-[50%] h-10 rounded-md mb-3" />
        <Skeleton className="w-full h-auto aspect-[1060/660] rounded-md" />
      </div>
    );
  }

  return (
    <div className=" flex flex-col">
      <h3 className=" text-2xl mb-3">{title}</h3>
      <SimpleLineChart data={chartData} lineProps={lineProps} hideLegend={!legend} />
    </div>
  );
}
