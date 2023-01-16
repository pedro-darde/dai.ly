import Planning from "../entity/Planning";

export default interface PlanningRepository {
    save: (planning: Planning) => Promise<void>
}