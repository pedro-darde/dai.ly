import PlanningRepository from "../domain/repository/PlanningRepository";

export default class GetPlanning {
  constructor(readonly planningRepository: PlanningRepository) {}
  async execute(year: number) {
    const planning = await this.planningRepository.getByYear(year);
    return {
      ...planning,
      existingYears: await this.planningRepository.existingYears(),
    };
  }
}
