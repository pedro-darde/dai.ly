export class AlreadyExistsError extends Error {
    constructor(entityName: string, uniqueKeyName: string) {
        super();
        this.name = "AlreadyExistsError";
        this.message = `An ${entityName}  with this ${uniqueKeyName} already exists.`;
    }
}