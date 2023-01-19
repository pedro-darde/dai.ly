import { RequiredFieldValidation } from "./validators/RequiredFieldValidation";

const validate = new RequiredFieldValidation("months.*.name.*.o")
console.log(validate.validate({months: [{ name: [ {o: 123} ] }, { name: 123 }]}))