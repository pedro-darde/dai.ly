import PlanningRepository from "../domain/repository/PlanningRepository";

export default class GetPlanning {
    constructor(readonly planningRepository: PlanningRepository) {}
    async execute(year: number) {
        return await this.planningRepository.getByYear(year)
    }
}