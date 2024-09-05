import {
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    registerDecorator,
} from "class-validator";
import { isCuid } from "cuid";

@ValidatorConstraint({ async: false })
class IsCuidConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        return typeof value === "string" && isCuid(value);
    }

    defaultMessage(args: ValidationArguments) {
        return "The value ($value) is not a valid CUID!";
    }
}

export function IsCuid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCuidConstraint,
        });
    };
}
