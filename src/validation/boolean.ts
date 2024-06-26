import { Issue, ValidationError } from './error';
import { ModifiableSchema } from './modifiable';

class BooleanSchema extends ModifiableSchema<boolean> {
  public override parse(obj: unknown): boolean {
    if (typeof obj !== 'boolean') {
      throw new ValidationError([
        new Issue('invalidType', [], 'boolean', typeof obj),
      ]);
    }
    return obj;
  }

  public override documentation(): object {
    return {
      type: 'boolean',
    };
  }
}

/**
 * A schema matching any boolean.
 */
export const boolean = (): BooleanSchema => new BooleanSchema();
