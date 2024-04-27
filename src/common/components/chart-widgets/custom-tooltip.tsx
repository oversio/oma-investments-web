import { TooltipProps } from "recharts";
import { NameType, Payload, ValueType } from "recharts/types/component/DefaultTooltipContent";

import { classMerge } from "../../utils/class-merge";

function isValidHexColor(colorCode: string) {
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexColorRegex.test(colorCode);
}

type CustomTooltipProps = Omit<TooltipProps<ValueType, NameType>, "payload"> & {
  className?: string;
  payload: (Payload<ValueType, NameType> & { fill: string })[];
};

export function CustomTooltip({ active, payload, label, className }: Partial<CustomTooltipProps>) {
  if (!active) return null;

  return (
    <div
      className={classMerge(
        "overflow-hidden rounded-md border border-gray-300 bg-gray-0 shadow-2xl dark:bg-gray-100",
        className,
      )}
    >
      <label className="label mb-0.5 block bg-gray-100 p-2 px-2.5 text-center text-xs font-semibold capitalize text-gray-600 dark:bg-gray-200/60 dark:text-gray-700">
        {label}
      </label>
      <div className="px-3 py-1.5 text-xs">
        {payload?.map(item => (
          <div key={item.dataKey} className="chart-tooltip-item flex items-center py-1.5">
            <span
              className="me-1.5 h-2 w-2 rounded-full"
              style={{
                backgroundColor: isValidHexColor(item.fill)
                  ? item.fill === "#fff"
                    ? item.stroke
                    : item.fill
                  : item.stroke,
              }}
            />
            <p>
              <span className="capitalize text-gray-900 dark:text-gray-700">{item.name}:</span>
              <span className="font-medium text-gray-900 dark:text-gray-700">{item.value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
