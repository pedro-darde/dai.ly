import PlanningMonthItemRepository from "../domain/repository/PlanningMonthItemRepository";

export default class GetCardTransactions {
    
    constructor(readonly planningMonthItemRepository: PlanningMonthItemRepository) {}

    async execute(idCard: number) {
        const data = await this.planningMonthItemRepository.getItemsByCard(idCard)
        return data;
    }
}