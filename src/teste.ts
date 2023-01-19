import { RequiredFieldValidation } from "./validators/RequiredFieldValidation";
import {ValidationComposite} from "./validators/ValidationComposite";

const validationComposite = new ValidationComposite([
    new RequiredFieldValidation("batatas,doces"),
    new RequiredFieldValidation("months.*.idMonth,items.*.name,fodase")
])
console.log(validationComposite.validate({batatas: null, doces: "asads",  months: [{ idMonth: 10 , items: [{"name": "123" }] }]}))