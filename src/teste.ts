import RequiredArrayFieldsValidation from "./validators/RequiredArrayFieldsValidation";

const requiredArrayValidation = new RequiredArrayFieldsValidation("months", [
  "name",
  "description",
]);

console.log(
  requiredArrayValidation.validate({
    months: [
      {
        name: "",
      },
    ],
  })
);
