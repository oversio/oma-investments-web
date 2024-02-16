type QueryParams = {
  query?: Record<string, string>;
  params?: Record<string, string>;
};

export function url(path: string, { query, params }: QueryParams = {}) {
  return replaceParamsInPath(path, params) + getQueryString(query);
}

const replaceParamsInPath = (path: string, params?: QueryParams["params"]) => {
  return params ? path.replace(/:\w+/g, match => params[match.slice(1)]) : path;
};

const getQueryString = (query?: QueryParams["query"]) => {
  return query ? "?" + new URLSearchParams(query ?? {}).toString() : "";
};
