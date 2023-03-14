import Month from "../entity/Month";

export default interface MonthRepository {
    list: () => Promise<Month[]>
    reducedMonthValues: (planningYear: number) => Promise<any>
    stackedMonthWithItems: (planningYear: number) => Promise<any> 
}