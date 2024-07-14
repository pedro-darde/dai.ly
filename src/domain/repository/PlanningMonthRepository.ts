import PlanningMonth from "../entity/PlanningMonth";
import BaseRepository from "./BaseRepository";

export default interface PlanningMonthRepository extends BaseRepository {
  create: (planningMonth: PlanningMonth) => Promise<number>;
  edit: (id: number, data: PlanningMonth) => Promise<void>;
  bulkDelete: (ids: number[]) => Promise<void>;
  findOrCreate: (idMonth: number, planningYear: number) => Promise<number>;
  createWithItems: (data: PlanningMonth) => Promise<number>;
  createMultipleWithItems: (data: PlanningMonth[]) => Promise<number[]>;
  getByPlanningAndMonth: (idPlanning: number, idMonth: number) => Promise<number | undefined >;
}
