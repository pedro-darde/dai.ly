import Planning from "../entity/Planning";
import BaseRepository from "./BaseRepository";

export type PlanningDatabase = {
  id: number;
  year: number;
  status: number;
  title: string;
  expected_amount: string;
  balance: number;
  start_at: Date;
  end_at: Date;
  months: {
    id: number;
    id_month: number;
    balance: string;
    spent_on_debit: string;
    spent_on_credit: string;
    total_in: string;
    total_out: string;
    credit_status: string;
    open: boolean;
    items: ItemsPlanning[];
    types_spent: TypesSpentDatabase[];
    budgets: {
      id: number;
      id_type: number;
      id_planning_month: number;
      amount: string;
    }[];
  }[];
};

export type ItemsPlanning = {
  id: number;
  id_month_planning: number;
  value: string;
  description: string;
  operation: "in" | "out";
  date: Date;
  id_card?: number;
  payment_method: "debit" | "credit";
  id_type: number;
};

export type TypesSpentDatabase = {
  expected: {
    value: number;
    description: string;
    operation: "in" | "out";
    type: number;
  };
};
export default interface PlanningRepository extends BaseRepository {
  save: (planning: Planning) => Promise<void>;
  getByYear: (year: number) => Promise<Planning | void>;
  update: (planning: Planning) => Promise<void>;
  existingYears: () => Promise<{ year: number; id: number }[]>;
}
