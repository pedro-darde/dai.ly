import ItemTypeRepository from "../domain/repository/ItemTypeRepository";
import MonthRepository from "../domain/repository/MonthRepository";

export default class Dashboard {
    constructor(readonly itemTypeRepository: ItemTypeRepository, readonly monthRepository: MonthRepository) {}

    async execute(year: number) {
        const [
            inAndOutTypes, 
            reducedMonthValues,
            stackedMonthWithItems,
            outWithItems
        ] = await Promise.all([
            this.itemTypeRepository.inAndOut(year), 
            this.monthRepository.reducedMonthValues(year),
            this.monthRepository.stackedMonthWithItems(year),
            this.itemTypeRepository.outWithItems(year)
        ])
        return {
            inAndOutTypes,
            reducedMonthValues,
            stackedMonthWithItems,
            outWithItems
        };
    }
}