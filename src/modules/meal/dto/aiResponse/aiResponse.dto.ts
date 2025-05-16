import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import {
  ValidatePolymorphicData,
  WebhookType,
} from '../../decorator/validate-polymorphic-data.decorator';
import { NutrionalTableDto } from './nutrionalTable.dto';
import { QuestionDto } from './question.dto';

export class AIResponseDto {
  @ApiProperty({
    enum: WebhookType,
    description: 'Answer type',
  })
  @IsEnum(WebhookType)
  type: WebhookType;

  @ApiProperty({
    oneOf: [
      {
        $ref: getSchemaPath(QuestionDto),
      },
      {
        $ref: getSchemaPath(NutrionalTableDto),
      },
    ],
    description: 'Data of the answer',
  })
  @ValidatePolymorphicData({
    message: 'Invalid data type',
  })
  data: QuestionDto[] | NutrionalTableDto;
}
