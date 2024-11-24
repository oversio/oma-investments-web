import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ZodType, ZodTypeDef } from "zod";

import { logError } from "../logger/log-error";
import { restClient } from "./rest-client";
import { AxiosMethod } from "./types/axios-method";
import { DataResponse } from "./types/data-response";

export async function fetcher<TItem, TApiItem, Def extends ZodTypeDef = ZodTypeDef>(
  method: AxiosMethod.Get | AxiosMethod.Delete,
  url: string,
  itemType: ZodType<TItem, Def, TApiItem>,
  signal?: AbortSignal,
): Promise<DataResponse<TItem, TApiItem, Def>>;

export async function fetcher<TItem, TApiItem, TPayload, Def extends ZodTypeDef = ZodTypeDef>(
  method: AxiosMethod.Post | AxiosMethod.Put,
  url: string,
  itemType: ZodType<TItem, Def, TApiItem>,
  body: TPayload,
  signal?: AbortSignal,
): Promise<DataResponse<TItem, TApiItem, Def>>;

export async function fetcher<TItem, TApiItem, TPayload, Def extends ZodTypeDef = ZodTypeDef>(
  method: AxiosMethod,
  url: string,
  itemType: ZodType<TItem, Def, TApiItem>,
  body?: TPayload,
  signal?: AbortSignal,
): Promise<DataResponse<TItem, TApiItem, Def>> {
  let request: Promise<AxiosResponse<unknown, TApiItem | TPayload>>;

  if (method === AxiosMethod.Get || method === AxiosMethod.Delete) {
    request = restClient[method]<unknown, AxiosResponse<unknown, TApiItem>, TApiItem>(url, { signal });
  } else {
    request = restClient[method]<unknown, AxiosResponse<unknown, TApiItem>, TPayload>(
      url,
      body as TPayload & AxiosRequestConfig<TPayload>,
    );
  }

  return request
    .then(response => itemType.parse(response.data))
    .catch(error => {
      logError("error->", error);
      throw new Error("Invalid item");
    });
}
