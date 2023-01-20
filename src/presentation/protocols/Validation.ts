export interface Validation {
  validate: (input: any, ...extraProps: any) => Error | void;
}
