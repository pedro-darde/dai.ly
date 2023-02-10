export default class InvalidCardCVVError extends Error {
    constructor(cvv: string) {
        super()
        this.name = 'InvalidCardCVVError'
        this.message = `Invalid CVV: ${cvv}`
    }
}