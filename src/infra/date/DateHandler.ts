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
}
