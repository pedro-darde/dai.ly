import MonthRepository from "../domain/repository/MonthRepository";

export default class GetMonths {
  constructor(readonly monthRepository: MonthRepository) {}
  async execute() {
    return await this.monthRepository.list();
  }
}
