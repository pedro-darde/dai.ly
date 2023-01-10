import DateHandler from "./DateHandler";
import {add, sub, format as formatter, differenceInHours, differenceInDays, differenceInMinutes} from "date-fns";

export default class DateFnsAdapter implements DateHandler {
    add(
        date: Date,
        quantity: number,
        unity: "days" | "months" | "years" | "weeks"
    ): Date {
        return add(date, {[unity]: quantity});
    }

    remove(
        date: Date,
        quantity: number,
        unity: "days" | "months" | "years" | "weeks"
    ): Date {
        return sub(date, {[unity]: quantity});
    }

    format(date: Date, format: string): string {
        return formatter(date, format);
    }

    difference(firstDate: Date, secondDate: Date, returnAs: "hours" | "days" | "minutes" = "hours"): number {
        const mapMethodsNames = {
            hours: "differenceInHours",
            days: "differenceInDays",
            minutes: "differenceInMinutes"
        }
        /** @ts-ignore- */
        console.log(this[mapMethodsNames[returnAs]](firstDate, secondDate))
        /** @ts-ignore- */
        return this[mapMethodsNames[returnAs]](firstDate, secondDate);
    }

    private differenceInDays(firstDate: Date, secondDate: Date) {
        return differenceInDays(firstDate, secondDate)
    }

    private differenceInMinutes(firstDate: Date, secondDate: Date) {
        return differenceInMinutes(firstDate, secondDate)
    }

    private differenceInHours(firstDate: Date, secondDate: Date) {
        return differenceInHours(firstDate, secondDate)
    }
}
