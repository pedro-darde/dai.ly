export default class LogError extends Error{
    constructor(...props: any) {
        console.log(props)
        super();
        this.message = 'An error has been occured while processing your action, contat system ADM for more info.'
        this.name = 'LogError'
    }
}