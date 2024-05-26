import PlanningMonthItemRepository from "../domain/repository/PlanningMonthItemRepository";

export default class RemovePlanningItem { 
    constructor(private readonly planningMonthItemRepository: PlanningMonthItemRepository) {}

    async execute({ id }: Input ): Promise<void> {
        await this.planningMonthItemRepository.bulkDelete([+id]);
    }
    
}

type Input = {
    id: string;
}