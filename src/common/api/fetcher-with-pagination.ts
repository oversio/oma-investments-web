import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ZodType, ZodTypeDef } from "zod";

import { logError } from "../logger/log-error";
import { restClient } from "./rest-client";
import { AxiosMethod } from "./types/axios-method";
import { apiListDataWithPagination, ListDataPaginatedResponse } from "./types/list-data-paginated-response";

export async function fetcherWithPagination<TItem, TApiItem, TPayload, Def extends ZodTypeDef = ZodTypeDef>(
  method: AxiosMethod,
  url: string,
  itemType: ZodType<TItem, Def, TApiItem>,
  body?: TPayload,
): Promise<ListDataPaginatedResponse<TItem, TApiItem, Def>> {
  return restClient[method]<unknown, AxiosResponse<unknown, TPayload>, TPayload>(
    url,
    body as TPayload & AxiosRequestConfig<TPayload>,
  )
    .then(response => apiListDataWithPagination(itemType).parse(response.data))
    .catch(error => {
      logError("error->", error);
      throw new Error("Invalid item");
    });
}
