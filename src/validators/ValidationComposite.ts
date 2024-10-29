import { Validation } from "../presentation/protocols/Validation";

export class ValidationComposite implements Validation {
  
  constructor(private readonly validations: Validation[]) {}

  async validate(input: any): Promise<Error | void> {
    for (const validation of this.validations) {
      const err = await validation.validate(input);
      if (err) {
        return err;
      }
    }
  }
}
