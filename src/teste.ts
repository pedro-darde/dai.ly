import EditPlanningValidation from "./validators/EditPlanningValidation";
import RequiredArrayFieldsValidation from "./validators/RequiredArrayFieldsValidation";
import { RequiredFieldValidation } from "./validators/RequiredFieldValidation";

const itemsValidation = new EditPlanningValidation()
const error = itemsValidation.validate({months:{
    "toAdd": [{
        "idMonth": 3,
            "expectedAmount": 4500,
            "spentOnDebit": 2000,
            "spentOnCredit": 0,
            "totalIn": 10500,
            "totalOut": 2000,
            "items": {
                "toAdd": [{
                    "value": 4000,
                    "operation": "in",
                    "date": "2023-01-25",
                    "description": "Salddddary",
                    "idType": 1,
                    "paymentMethod": "debit",
                }]
            }
    }],
    "toUpdate": [
        {
            "idMonth": 3,
            "expectedAmount": 4500,
            "spentOnDebit": 2000,
            "spentOnCredit": 0,
            "totalIn": 10500,
            "totalOut": 2000,
            "id": 3,
            "items": {
                "toAdd": [
                    {
                    "value": 4000,
                    "operation": "in",
                    "date": "2023-01-25",
                    "description": "Salary",
                    "idType": 1,
                    "paymentMethod": "debit",
                    },
                ],
                "toUpdate": [
                    {
                        "value": 4000,
                        "operation": "in",
                        "date": "2023-01-25",
                        "description": "Salary",
                        "idType": 1,
                        "paymentMethod": "debit",
                        "id": 2
                    },
                    {
                        "value": 6000,
                        "operation": "in",
                        "date": "2023-01-25",
                        "description": "Salary",
                        "idType": 2,
                        "paymentMethod": "debit",
                        "id": 3
                    },
                    {
                        "value": 2000,
                        "operation": "out",
                        "date": "2023-01-25",
                        "description": "Salary",
                        "idType": 2,
                        "paymentMethod": "debit",
                        "id": 4
                    },
                    {
                        "value": 500,
                        "operation": "in",
                        "date": "2023-01-25",
                        "description": "Salary",
                        "idType": 2,
                        "paymentMethod": "debit",
                        "id": 5
                    }
                ]
            }
        }
    ]
}})

console.log(error)