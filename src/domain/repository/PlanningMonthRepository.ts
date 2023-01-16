import PlanningMonth from "../entity/PlanningMonth";

export default interface PlanningMonthRepository{
    save: (planningMonth: PlanningMonth) => Promise<void>
}