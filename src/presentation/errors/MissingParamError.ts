export class MissingParamError extends Error {
  constructor(paramName: string, extraPath: string = "") {
    super();
    this.name = "MissingParamError";
    this.message = `Missing param: ${extraPath}.${paramName}`;
  }
}
