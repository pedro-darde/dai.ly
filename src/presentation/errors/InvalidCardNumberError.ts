export default class InvalidCardNumberError extends Error {
    constructor(cardNumber: string) {
        super()
        this.name = 'InvalidCardNumberError'
        this.message = `Invalid Card Number: ${cardNumber}`
    }
}