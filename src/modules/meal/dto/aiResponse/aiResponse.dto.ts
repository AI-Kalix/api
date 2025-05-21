import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import {
  AIresponseType,
  ValidatePolymorphicData,
} from '../../decorator/validate-polymorphic-data.decorator';
import { NutrionalTableDto } from './nutrionalTable.dto';
import { QuestionDto } from './question.dto';
import { InvalidImageDto } from './invalideImage.dto';

export class AIResponseDto {
  @ApiProperty({
    enum: AIresponseType,
    description: 'Answer type',
  })
  @IsEnum(AIresponseType)
  type: AIresponseType;

  @ApiProperty({
    oneOf: [
      {
        $ref: getSchemaPath(QuestionDto),
      },
      {
        $ref: getSchemaPath(NutrionalTableDto),
      },
      {
        $ref: getSchemaPath(InvalidImageDto),
      },
    ],
    description: 'Data of the answer',
  })
  @ValidatePolymorphicData({
    message: 'Invalid data type',
  })
  data: QuestionDto[] | NutrionalTableDto | InvalidImageDto;
}
