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

export enum WebhookType {
  SUCCESS = 'SUCCESS',
  DOUBTS = 'DOUBTS',
}

@ValidatorConstraint({ async: false })
class PolymorphicDataValidator implements ValidatorConstraintInterface {
  validate(value: unknown, args: ValidationArguments) {
    const object = args.object as { type: WebhookType };
    const { type } = object;

    if (typeof value !== 'object' || value === null) {
      return false;
    }

    let dtoClass;

    switch (type) {
      case WebhookType.DOUBTS:
        dtoClass = QuestionDto;
        break;
      case WebhookType.SUCCESS:
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
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'validatePolymorphicData',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: PolymorphicDataValidator,
    });
  };
}
