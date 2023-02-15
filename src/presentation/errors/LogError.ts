export default class LogError extends Error{
    constructor(...props: any) {
        super();
        this.message = 'An error has been occured while processing your action, contat system ADM for more info.'
        this.name = 'LogError'
    }
}