export const searchParams = (params: Record<string, string | number>) => {
  const paramsArray = Object.entries(params);
  const paramsMap = paramsArray.map(([key, value]) => [key, value.toString()]);

  return paramsArray.length ? "?" + new URLSearchParams(paramsMap).toString() : "";
};
