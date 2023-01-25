export default interface PlanningMonthRepository{
    bulkDelete: (ids: number[]) => Promise<void>
}