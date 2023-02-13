export class MismatchTypeError extends Error {
  constructor(
    paramName: string,
    expectedType: string,
    realType: string,
    extraPath: string = ""
  ) {
    super();
    this.name = "MismatchTypeError";
    this.message = `Mismatch type for: ${extraPath}.${paramName} expected: ${expectedType}, received: ${realType}`;
  }
}
