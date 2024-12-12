import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
} from 'class-validator';

@ValidatorConstraint({ name: 'isEqual', async: false })
export class IsEqualConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedField] = args.constraints;
    const object = args.object as Record<string, any>;
    return value === object[relatedField]; // Checks if password and confirmPassword match
  }

  defaultMessage(args: ValidationArguments) {
    console.log(args);
    return `Passwords must match`; // Custom error message
  }
}

export function IsEqual(property: string) {
  return Validate(IsEqualConstraint, [property]);
}
