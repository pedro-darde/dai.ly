export default interface PlanningMonthItemRepository{
    bulkDelete: (ids: number[]) => Promise<void>
}