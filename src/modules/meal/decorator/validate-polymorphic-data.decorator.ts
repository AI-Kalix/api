import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { QuestionDto } from '../dto/aiResponse/question.dto';
import { NutrionalTableDto } from '../dto/aiResponse/nutrionalTable.dto';

export enum AIresponseType {
  SUCCESS = 'SUCCESS',
  DOUBTS = 'DOUBTS',
  INVALID_IMAGE = 'INVALID IMAGE',
}

@ValidatorConstraint({ async: false })
class PolymorphicDataValidator implements ValidatorConstraintInterface {
  validate(value: unknown, args: ValidationArguments) {
    const object = args.object as { type: AIresponseType };
    const { type } = object;

    if (typeof value !== 'object' || value === null) {
      return false;
    }

    let dtoClass;

    switch (type) {
      case AIresponseType.DOUBTS:
        dtoClass = QuestionDto;
        break;
      case AIresponseType.SUCCESS:
        dtoClass = NutrionalTableDto;
        break;
      default:
        return false;
    }

    const instance = plainToInstance(dtoClass, value as object);

    const errors = validateSync(instance as object, { whitelist: true });

    return errors.length === 0;
  }

  defaultMessage(args: ValidationArguments) {
    return `El campo 'data' no es válido para el tipo '${(args.object as any).type}'`;
  }
}

export function ValidatePolymorphicData(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'validatePolymorphicData',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: PolymorphicDataValidator,
    });
  };
}
