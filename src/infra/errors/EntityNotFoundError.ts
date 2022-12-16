export default class EntityNotFoundError extends Error {
  constructor(entityId: number, entityName: string) {
    super(`Could not find an ${entityName} with given identifier: ${entityId}`);
  }
}
