import { useMemo } from "react";

import { SimpleLineChart, SimpleLineProps } from "../../../common/components/chart-widgets/simple-line-chart";
import { Skeleton } from "../../../common/components/skeleton/skeleton";
import { classMerge } from "../../../common/utils/class-merge";

interface DividendYearChartProps {
  title?: string;
  legend?: string;
  data: Array<{ year: number; total: number }>;
  isLoading?: boolean;
  aspectRatio?: `${number}/${number}`;
  className?: string;
}

export function DividendYearChart({
  title,
  legend = "",
  data,
  isLoading,
  aspectRatio,
  className,
}: DividendYearChartProps) {
  const chartData = useMemo(
    () =>
      [...data].reverse().map(({ year, total }) => ({
        label: year,
        values: [
          {
            name: legend,
            value: parseFloat(total.toFixed(3)),
          },
        ],
      })),
    [data, legend],
  );

  if (isLoading) {
    return (
      <div className={classMerge(" flex flex-col", className)}>
        <Skeleton className="w-[50%] h-7 rounded-md mb-3" />
        <Skeleton
          className={classMerge(
            "w-full h-auto aspect-[1060/660] rounded-md",
            aspectRatio ? `aspect-[${aspectRatio}]` : "",
          )}
        />
      </div>
    );
  }

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

  return (
    <div className={classMerge(" flex flex-col", className)}>
      {title ? <h3 className=" text-xl mb-3">{title}</h3> : null}
      <SimpleLineChart
        data={chartData}
        lineProps={lineProps}
        hideLegend={!legend}
        aspectRatio={aspectRatio}
      />
    </div>
  );
}
