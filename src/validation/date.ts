import { isDate } from 'node:util/types';
import { Issue, ValidationError } from './error';
import { ModifiableSchema } from './modifiable';

class DateSchema extends ModifiableSchema<Date> {
  public override parse(obj: unknown): Date {
    if (isDate(obj)) {
      return obj;
    }
    if (typeof obj === 'string' || typeof obj === 'number') {
      const date = new Date(obj);
      if (date.toString() !== 'Invalid Date') {
        return date;
      }
    }
    throw new ValidationError([
      new Issue('invalidType', [], 'date', typeof obj),
    ]);
  }

  public override documentation(): object {
    return {
      type: 'string',
      format: 'date-time',
    };
  }
}

/**
 * A schema matching date objects, or strings and numbers that can be
 * interpreted as dates.
 */
export const date = (): DateSchema => new DateSchema();
