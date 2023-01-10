export default interface DateHandler {
  add: (
    date: Date,
    quantity: number,
    unity: "days" | "months" | "years" | "weeks"
  ) => Date;
  remove: (
    date: Date,
    quantity: number,
    unity: "days" | "months" | "years" | "weeks"
  ) => Date;
  format: (date: Date, format: string) => string;
  difference: (firstDate: Date, secondDate: Date, returnAs: "hours" | "days" | "minutes") => number;
}
