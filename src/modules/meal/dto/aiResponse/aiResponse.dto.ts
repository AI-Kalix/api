import { IsEnum } from 'class-validator';
import {
  ValidatePolymorphicData,
  WebhookType,
} from '../../decorator/validate-polymorphic-data.decorator';
import { NutrionalTableDto } from './nutrionalTable.dto';
import { QuestionDto } from './question.dto';

export class AIResponseDto {
  @IsEnum(WebhookType)
  type: WebhookType;

  @ValidatePolymorphicData({
    message: 'La propiedad "data" no corresponde al tipo declarado en "type"',
  })
  data: QuestionDto[] | NutrionalTableDto;
}
