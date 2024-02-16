import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ZodType, ZodTypeDef } from "zod";

import { logError } from "../logger/log-error";
import { restClient } from "./rest-client";
import { AxiosMethod } from "./types/axios-method";

export function fetcher<TItem, TApiItem, Def extends ZodTypeDef = ZodTypeDef>(
  method: AxiosMethod.Get | AxiosMethod.Delete,
  url: string,
  itemType: ZodType<TItem, Def, TApiItem>,
): Promise<TItem>;

export function fetcher<TItem, TApiItem, TPayload, Def extends ZodTypeDef = ZodTypeDef>(
  method: AxiosMethod.Post | AxiosMethod.Put,
  url: string,
  itemType: ZodType<TItem, Def, TApiItem>,
  body: TPayload,
): Promise<TItem>;

export function fetcher<TItem, TApiItem, TPayload, Def extends ZodTypeDef = ZodTypeDef>(
  method: AxiosMethod,
  url: string,
  itemType: ZodType<TItem, Def, TApiItem>,
  body?: TPayload,
): Promise<TItem> {
  return restClient[method]<unknown, AxiosResponse<{ data: unknown }, TPayload>, TPayload>(
    url,
    body as TPayload & AxiosRequestConfig<TPayload>,
  )
    .then(response => itemType.parse(response.data))
    .catch(error => {
      logError("error->", error);
      throw new Error("Invalid item");
    });
}
