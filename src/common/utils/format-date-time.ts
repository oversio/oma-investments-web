import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(advancedFormat);
dayjs.extend(timezone);

export const enum DateTimeFormatType {
  Date = "DD MMM YYYY",
  Time = "HH:MM",
  TimeAmPm = "HH:MM A",
  DateTime = "DD MMM YYYY HH:MM",
  DateTimeZone = "DD MMM YYYY - HH:MM z",
}

export interface FormatDateTimeProps {
  date: Date | string;
  format?: DateTimeFormatType;
}

export const formatDateTime = ({ date, format }: FormatDateTimeProps) =>
  dayjs(date).format(format ?? DateTimeFormatType.DateTimeZone);
