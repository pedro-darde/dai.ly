import CardRepository from "../domain/repository/CardRepository";
import ItemTypeRepository from "../domain/repository/ItemTypeRepository";
import MonthRepository from "../domain/repository/MonthRepository";

export default class Dashboard {
  constructor(
    readonly itemTypeRepository: ItemTypeRepository,
    readonly monthRepository: MonthRepository,
    readonly cardRepository: CardRepository
  ) {}

  async execute(year: number) {
    const [
      inAndOutTypes,
      reducedMonthValues,
      stackedMonthWithItems,
      outWithItems,
      spentOnCredit,
      spentOnDebit,
    ] = await Promise.all([
      this.itemTypeRepository.inAndOut(year),
      this.monthRepository.reducedMonthValues(year),
      this.monthRepository.stackedMonthWithItems(year),
      this.itemTypeRepository.outWithItems(year),
      this.cardRepository.spentOnCredit(),
      this.cardRepository.spentOnDebit(),
    ]);
    return {
      inAndOutTypes,
      reducedMonthValues,
      stackedMonthWithItems,
      outWithItems,
      cardInfos: {
        spentOnCredit,
        spentOnDebit,
      },
    };
  }
}
