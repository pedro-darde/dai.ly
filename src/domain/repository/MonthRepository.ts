import Month from "../entity/Month";

export default interface MonthRepository {
    list: () => Promise<Month[]>
}