import { Validation } from "../../../presentation/protocols/Validation";
import EditPlanningValidation from "../../../validators/EditPlanningValidation";
import { RequiredFieldValidation } from "../../../validators/RequiredFieldValidation";
import { ValidationComposite } from "../../../validators/ValidationComposite";

export const makeEditPlanningValidation = (): Validation => {
    return new ValidationComposite([new EditPlanningValidation(), ..."year,startAt,title,expectedAmount".split(",").map((field) => new RequiredFieldValidation(field))])
}