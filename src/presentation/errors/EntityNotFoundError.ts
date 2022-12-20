export default class EntityNotFoundError extends Error {
  statusCode;
  constructor(entityId: number, entityName: string) {
    super();
    this.name = "EntityNotFoundError";
    this.message = `Could not find an ${entityName} with given identifier: ${entityId}`;
    this.statusCode = 404;
  }
}
