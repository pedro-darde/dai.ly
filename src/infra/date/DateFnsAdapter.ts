import DateHandler from "./DateHandler";
import { add, sub, format as formatter } from "date-fns";

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
}
