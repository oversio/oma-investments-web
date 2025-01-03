import { z } from "zod";

import { parseDateTime } from "./utils/date-time";

export const ID = z.string();
export type ID = z.infer<typeof ID>;

export const DateTime = z.string().transform((value, ctx) => {
  const dateTime = parseDateTime(value);
  if (!dateTime) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Invalid date time",
    });
  }
  return dateTime ?? z.NEVER;
});

export type DateTime = z.infer<typeof DateTime>;

export type OnSubmitCallback<TFieldValues, TResult = unknown> = (
  input: TFieldValues,
) => Promise<TResult> | TResult;

export enum HowGoodIsIt {
  Penalty = -10,
  Bad = -1,
  Normal = 0,
  Good = 1,
}
