export default interface AsyncValidation {
  validate(data: any): Promise<Error | void>;
}
