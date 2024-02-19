import { z } from "zod";

import { ID } from "../../../common/types";
import { Locales } from "../types";

export const ApiGetUser = z.object({
  _id: ID,
  fullName: z.string(),
  givenName: z.string().optional(),
  familyName: z.string().optional(),
  email: z.string(),
  picture: z.string().optional(),
  isActive: z.boolean(),
  locale: z.nativeEnum(Locales).optional(),
});

export type ApiGetUser = z.infer<typeof ApiGetUser>;

export function getUserTransformer<T extends z.infer<typeof ApiGetUser>>({ _id, ...data }: T) {
  return {
    id: _id,
    givenName: data.givenName ?? "",
    familyName: data.familyName ?? "",
    picture: data.picture ?? "",
    ...data,
  };
}

export const GetUser = ApiGetUser.transform(getUserTransformer);
export type GetUser = z.infer<typeof GetUser>;
