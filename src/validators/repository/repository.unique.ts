import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { getRepository } from 'typeorm';
import { access } from 'fs';

@ValidatorConstraint({ async: true })
export class IsUniqueIndexConstraint<E> implements ValidatorConstraintInterface {
  recordFound : string;
  async validate (value: any, args: ValidationArguments) {
    const findOptions = Object.keys(args.object)
      .filter(key => key.toLowerCase() === args.property.toLowerCase())
      .reduce((acc, key) => {
        acc[key] = args.object[key];
        return acc;
      }, {});
    const repository = await getRepository<E>(args.constraints[0]);
    const record = await repository.findOne(findOptions);
    this.recordFound = JSON.stringify(record);
    return !record;
  }

  defaultMessage (args: ValidationArguments): string {
    return '$property has a unique index.' +
      'There is already a record with $property set to $value. ' +
      'Record found: ' + this.recordFound;
  }
}

export function IsUniqueIndex (entity: any, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity],
      validator: IsUniqueIndexConstraint
    });
  };
}
