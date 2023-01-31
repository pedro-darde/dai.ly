import { Validation } from "../presentation/protocols/Validation";
import RequiredArrayFieldsValidation from "./RequiredArrayFieldsValidation";

export default class EditPlanningValidation implements Validation {
    private MONTH_REQUIRED_FIELDS: any = [
        { type: "number", field: "idMonth" },
        { type: "number", field: "totalIn" },
        { type: "number", field: "totalOut" },
        { type: "number", field: "spentOnDebit" },
        { type: "number", field: "spentOnCredit" }
    ]

    private MONTH_ITEM_REQUIRED_FIELDS: any = [
        { field: "value", type: "number"},
        { field: "date", type: "string"},
        { field: "operation", type: "string"},
    ]

    validate(input: any) : void|Error {
        if (input.months.toAdd) {
            const error = this.validateMonths(input.months.toAdd)
            if (error) return error
        } 

        if (input.months.toUpdate) {
            const error = this.validateMonths(input.months.toUpdate)
            if (error) return error
        }
    }

    private validateMonths(monthsToAdd: ToAdd[]): void|Error {
        const monthItemError = this.validateMonthsAndItems(monthsToAdd)
        if (monthItemError) return monthItemError
    }



    private validateMonthsAndItems(months: ToAdd[] | ToUpdate[]) {
        const validationMonth = new RequiredArrayFieldsValidation("months", this.MONTH_REQUIRED_FIELDS)
        const monthError = validationMonth.validate({ months: this.createMonthToValidate(months) })
        if (monthError) return monthError
        const itemError = this.validateItems(months)
        if (itemError) return itemError
    }

    private validateItems(months: any) {
        const monthItems: any = []
        months.forEach((month: any) => {
            if (month.items?.toAdd) {
                monthItems.push(...month.items?.toAdd!)
            }
            if (month.items?.toUpdate) {
                monthItems.push(...month.items?.toUpdate!)
            }
        })
        const itemValidation = new RequiredArrayFieldsValidation("items", this.MONTH_ITEM_REQUIRED_FIELDS)
        const itemError = itemValidation.validate({ items: this.createItemToValidate(monthItems)})
        if (itemError) return itemError
    }

    private createMonthToValidate (months: ToAdd[] | ToUpdate[]): MonthValidate[] {
        return months.map(month => ({
            idMonth: month.idMonth,
            spentOnCredit: month.spentOnCredit,
            spentOnDebit: month.spentOnDebit,
            totalIn : month.totalIn,
            totalOut: month.totalOut
        }))
    }

    private createItemToValidate (item: any[]): ItemValidate[] {
        return item.map(item => ({
            date: item.date,
            description: item.description,
            idType: item.idType,
            operation: item.operation,
            paymentMethod: item.paymentMethod,
            value: item.value
        }))
    }
}

type MonthValidate = {
    idMonth: number,
    totalIn: number,
    totalOut: number,
    spentOnDebit: number,
    spentOnCredit: number
}

type ItemValidate =  {
    idType: number,
    value: number,
    operation: "in" | "out",
    date: Date,
    paymentMethod: "debit" | "credit" | null,
    description: string
}

type ToAdd = {
    expectedAmount: number,
    idMonth: number,
    totalIn: number,
    totalOut: number,
    spentOnCredit: number,
    spentOnDebit: number,
    items?: {
        toAdd: {
            idType: number,
            value: number,
            operation: "in" | "out",
            date: Date,
            paymentMethod: "debit" | "credit" | null,
            description: string
        }[],
    }
}

type ToUpdate = {
    id: number,
    expectedAmount: number,
    idMonth: number,
    totalIn: number,
    totalOut: number,
    spentOnCredit: number,
    spentOnDebit: number,
    items: {
        toAdd: {
            idType: number,
            value: number,
            operation: "in" | "out",
            date: Date,
            paymentMethod: "debit" | "credit" | null,
            description: string
        }[],
        toUpdate: {
            id: number,
            idType: number,
            value: number,
            operation: "in" | "out",
            date: Date,
            paymentMethod: "debit" | "credit" | null,
            description: string
        }[],
    }
}