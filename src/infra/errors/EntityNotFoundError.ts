export default class EntityNotFoundError extends Error {
  constructor(entityId: number) {
    super(`Could not find and register with given identifier: ${entityId}`);
  }
}
