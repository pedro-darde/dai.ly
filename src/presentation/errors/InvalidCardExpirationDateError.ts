export default class InvalidCardExpirationDateError extends Error {
    constructor(expirationDate: string) {
        super()
        this.name = 'InvalidCardExpirationDateError'
        this.message = `Invalid Card Expiration Date: ${expirationDate}`
    }
}