import dayjs from "dayjs";

import { ID } from "../../../../common/types";

export interface AddDividendInput {
  companyId: ID;
  date: string;
  amount: number;
  typeId: string;
}

export function addDividendTransformer({ date, amount, typeId }: AddDividendInput): ApiAddDividendInput {
  return {
    date: dayjs(date).toDate(),
    amount,
    typeId,
  };
}

export interface ApiAddDividendInput {
  date: Date;
  amount: number;
  typeId: string;
}
