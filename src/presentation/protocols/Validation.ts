export interface Validation {
  validate: (input: any, ...extraProps: any) => Promise<Error | void>;
}
