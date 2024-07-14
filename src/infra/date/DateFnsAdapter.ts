import DateHandler from "./DateHandler";
import {
  add,
  sub,
  format as formatter,
  differenceInHours,
  differenceInDays,
  differenceInMinutes,
  parse,
} from "date-fns";

export default class DateFnsAdapter implements DateHandler {
  add(
    date: Date,
    quantity: number,
    unity: "days" | "months" | "years" | "weeks"
  ): Date {
    return add(date, { [unity]: quantity });
  }

  remove(
    date: Date,
    quantity: number,
    unity: "days" | "months" | "years" | "weeks"
  ): Date {
    return sub(date, { [unity]: quantity });
  }

  format(date: Date, format: string): string {
    return formatter(date, format);
  }

  difference(
    firstDate: Date,
    secondDate: Date,
    returnAs: "hours" | "days" | "minutes" = "hours"
  ): number {
    const mapMethodsNames = {
      hours: this.differenceInHours,
      days: this.differenceInDays,
      minutes: this.differenceInMinutes,
    };
    return mapMethodsNames[returnAs](firstDate, secondDate);
  }

  createFromFormat(date: string, format: string = "yyyy-MM-dd"): Date {
    return parse(date, format, new Date());
  }

  private differenceInDays(firstDate: Date, secondDate: Date) {
    return differenceInDays(firstDate, secondDate);
  }

  private differenceInMinutes(firstDate: Date, secondDate: Date) {
    return differenceInMinutes(firstDate, secondDate);
  }

  private differenceInHours(firstDate: Date, secondDate: Date) {
    return differenceInHours(firstDate, secondDate);
  }
}
