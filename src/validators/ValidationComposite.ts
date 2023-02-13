import { Validation } from "../presentation/protocols/Validation";

export class ValidationComposite implements Validation {
  private readonly validations: Validation[];
  constructor(validations: Validation[]) {
    this.validations = validations;
  }

  async validate(input: any): Promise<Error | void> {
    for (const validation of this.validations) {
      const err = await validation.validate(input);
      if (err) {
        return err;
      }
    }
  }
}
